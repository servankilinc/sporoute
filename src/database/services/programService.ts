import ProgramDetailCurrentDayResponseModel from '@/src/models/program/fulfillments/ProgramDetailCurrentDayResponseModel';
import {database} from '../index.native';
import Program from '../models/Program';
import {SchmeaModels} from '@/src/constants/SchemaModels';
import {Q} from '@nozbe/watermelondb';
import UserService from './userService';
import ProgramExercise from '../models/ProgramExercise';
import CreateProgramRequest from '@/src/models/program/CreateProgramRequest';
import ProgramResponseDto from '@/src/models/program/ProgramResponseDto';
import ProgramExerciseInteractionMultipleDayModel from '@/src/models/program/interactions/ProgramExerciseInteractionMultipleDayModel';
import ProgramExerciseResponseDto from '@/src/models/program/ProgramExerciseResponseDto';
import exerciseService from './exerciseService';
import userService from './userService';
import AddExerciseToProgramRequest from '@/src/models/program/AddExerciseToProgramRequest';
import UpdateExerciseOfProgramRequest from '@/src/models/program/UpdateExerciseOfProgramRequest';

export default {
  Save: async function (request: CreateProgramRequest): Promise<ProgramResponseDto> {
    const user = await userService.GetUser();
    request.userId = user.id;

    var insertedData = await database.write(async () => {
      return await database.get<Program>(SchmeaModels.programs).create(toInsert => {
        (toInsert.userId = request.userId), (toInsert.name = request.name);
      });
    });

    return {
      id: insertedData.id,
      userId: insertedData.userId,
      name: insertedData.name,
      createdDate: insertedData.createdDate,
    };
  },
  AddExerciseToProgram: async function (request: AddExerciseToProgramRequest): Promise<ProgramExerciseResponseDto> {
    const insertedData = await database.write(async () => {
      return await database.get<ProgramExercise>(SchmeaModels.program_exercises).create(toInsert => {
        toInsert.programId = request.programId;
        toInsert.exerciseId = request.exerciseId;
        toInsert.addedDate = new Date();
        toInsert.day = request.day;
        toInsert.numberOfSets = request.numberOfSets ?? 0;
        toInsert.numberOfRepetition = request.numberOfRepetition ?? 0;
        toInsert.time = request.time ?? 0;
      });
    });

    return {
      id: insertedData.id,
      programId: insertedData.programId,
      exerciseId: insertedData.exerciseId,
      addedDate: insertedData.addedDate,
      day: insertedData.day,
      numberOfSets: insertedData.numberOfSets,
      numberOfRepetition: insertedData.numberOfRepetition,
      time: insertedData.time,
    };
  },
  UpdateExerciseOfProgram: async function (request: UpdateExerciseOfProgramRequest): Promise<ProgramExerciseResponseDto> {
    const updatedData = await database.write(async () => {
      const programExercise = await database.get<ProgramExercise>(SchmeaModels.program_exercises).find(request.programExerciseId);
      return await programExercise.update(pe => {
        pe.numberOfSets = request.numberOfSets ?? 0;
        pe.numberOfRepetition = request.numberOfRepetition ?? 0;
        pe.time = request.time ?? 0;
      });
    });

    return {
      id: updatedData.id,
      programId: updatedData.programId,
      exerciseId: updatedData.exerciseId,
      addedDate: updatedData.addedDate,
      day: updatedData.day,
      numberOfSets: updatedData.numberOfSets,
      numberOfRepetition: updatedData.numberOfRepetition,
      time: updatedData.time,
    };
  },
  RemoveExerciseFromProgram: async function (programExerciseId: string): Promise<void> {
    const programExercise = await database.get<ProgramExercise>(SchmeaModels.program_exercises).find(programExerciseId);
    await database.write(async () => {
      await programExercise.markAsDeleted();
    });
  },
  GetProgramExercises: async function (programId: string): Promise<ProgramExerciseResponseDto[]> {
    const programExercises = await database.get<ProgramExercise>(SchmeaModels.program_exercises).query(Q.where('program_id', programId)).fetch();

    return programExercises.map(pe => {
      return {
        id: pe.id,
        programId: pe.programId,
        exerciseId: pe.exerciseId,
        addedDate: pe.addedDate,
        day: pe.day,
        numberOfSets: pe.numberOfSets,
        numberOfRepetition: pe.numberOfRepetition,
        time: pe.time,
      };
    });
  },
  GetProgramExercisesInteractionByRegion: async function (
    programId: string,
    regionIds: string[],
  ): Promise<ProgramExerciseInteractionMultipleDayModel[]> {
    const programExercises = await this.GetProgramExercises(programId);

    console.log('ProgramService:programExercises => ', programExercises);
    const exercises = await exerciseService.GetExercisesByRegions(regionIds);
    console.log('ProgramService:exercises => ', exercises);

    return exercises.map(e => {
      return {
        regions: e.regions,
        exercise: e,
        programExercises: programExercises.filter(f => f.exerciseId == e.id),
      };
    });
  },
  GetAllDetailCurrentDayByUser: async function (): Promise<ProgramDetailCurrentDayResponseModel[]> {
    const today = new Date();
    var filtredPrograms: Program[] = [];
    
    const user = await UserService.GetUser();
    await database.get<Program>(SchmeaModels.programs)
      .query(Q.where('user_id', user.id))
      .fetch()
      .then(async allPrograms => {
        allPrograms.forEach(async p => {
          let pe = await p.programExercises.fetch();
          if (pe.some(f => f.day === today.getDay())) {
            filtredPrograms.push(p);
          }
        });
      });

    const todayStr = today.toLocaleDateString();

    // const programExercises: ProgramExercise[] = [];
    return await Promise.all(
      filtredPrograms.map(async p => {
        let programExercises = await p.programExercises.fetch();
        if (programExercises === null) programExercises = [];

        return {
          program: {
            id: p.id,
            name: p.name,
            userId: p.userId,
            createdDate: p.createdDate,
          },
          exerciseList: await Promise.all(
            programExercises.filter(pe => pe.day === today.getDay()).map(async pe => {
              let exercise = await pe.exercise.fetch();
              let fulfillments = await pe.fulfillments?.fetch();

              return {
                programExerciseId: pe.id,
                addedDate: pe.addedDate,
                day: pe.day,
                numberOfSets: pe.numberOfSets,
                numberOfRepetition: pe.numberOfRepetition,
                time: pe.time,
                exerciseId: pe.exerciseId,
                name: exercise?.name || '',
                content: exercise?.content || '',
                description: exercise?.description,
                exerciseType: exercise?.exerciseType!,
                completionStatus: fulfillments == null ? false : fulfillments.some(f => new Date(f.completionDate).toLocaleDateString() === todayStr),
                completionCount: fulfillments == null ? 0 : fulfillments.length,
                inCompletionCount: 
                  fulfillments == null ? 0 : 
                  findMissedDays(pe.addedDate, new Set(fulfillments.map(f => new Date(f.completionDate).toISOString().split('T')[0])), pe.day),
              };
            })
          )
        };
      })
    );
  },
};

// completionList: yyyy-MM-dd formatında tarih stringleri
function findMissedDays(addedDate: Date, completionList: Set<string>, day: number): number {
  const addedDateIndex = ((addedDate.getDay() + 6) % 7) + 1;

  const now = new Date();

  const dayDifference = (day - addedDateIndex + 7) % 7;

  const firstCheckDate = new Date(addedDate);
  firstCheckDate.setDate(firstCheckDate.getDate() + dayDifference);

  let missedDayCount = 0;
  for (let d = new Date(firstCheckDate); d <= now; d.setDate(d.getDate() + 7)) {
    const key = d.toISOString().split('T')[0]; // yyyy-MM-dd
    if (!completionList.has(key)) {
      missedDayCount++;
    }
  }

  return missedDayCount;
}
