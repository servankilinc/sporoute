import {database} from '../index.native';
import Program from '../models/Program';
import {SchmeaModels} from '@/src/constants/SchemaModels';
import {Q} from '@nozbe/watermelondb';
import UserService from './userService';
import ProgramExercise from '../models/ProgramExercise';
import CreateProgramRequest from '@/src/models/program/ProgramCreateRequest';
import ProgramResponseDto from '@/src/models/program/ProgramResponseDto';
import ProgramExerciseResponseDto, { MapToProgramExerciseResponseDto } from '@/src/models/programExercise/ProgramExerciseResponseDto';
import userService from './userService';
import UpdateExerciseOfProgramRequest from '@/src/models/programExercise/ProgramExerciseUpdateRequest';
import Exercise from '../models/Exercise';
import ProgramExerciseCreateRequest from '@/src/models/programExercise/ProgramExerciseCreateRequest';
import { ExerciseAddProgramUIModel } from '@/src/redux/reducers/StatesCreateProgram';
import ProgramDetailCurrentDayModel, { FulfillmentsCurrentDayModel } from '@/src/models/program/ProgramDetailCurrentDayModel';
import ExerciseResponseDto, { MapToExerciseResponseDto } from '@/src/models/exercise/ExerciseResponseDto';
import ProgramDetailModel from '@/src/models/program/ProgramDetailModel';
import exerciseService from './exerciseService';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

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
  AddExerciseToProgram: async function (request: ProgramExerciseCreateRequest): Promise<ProgramExerciseCreateRequest> {
    const insertedData = await database.write(async () => {
      return await database.get<ProgramExercise>(SchmeaModels.program_exercises).create(toInsert => {
        toInsert._raw.id = uuidv4();
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
      day: insertedData.day,
      numberOfSets: insertedData.numberOfSets,
      numberOfRepetition: insertedData.numberOfRepetition,
      time: insertedData.time,
    };
  },
  UpdateExerciseOfProgram: async function (request: UpdateExerciseOfProgramRequest): Promise<ProgramExerciseCreateRequest> {
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
  Get: async function (programId: string): Promise<ProgramResponseDto> {
    const program = await database.get<Program>(SchmeaModels.programs).find(programId);

      return { 
        id: program.id,
        name: program.name,
        userId: program.userId,
        createdDate: program.createdDate
      } as ProgramResponseDto
  },
  GetUserPrograms: async function (userId: string): Promise<ProgramDetailModel[]> {
    const programs = await database.get<Program>(SchmeaModels.programs).query(Q.where('user_id', userId)).fetch();

    return await Promise.all(programs.map(async p => {
      const programExercises = await exerciseService.GetProgramExerciseDetails(p.id);

      return {
        program: {
          id: p.id,
          name: p.name,
          userId: p.userId,
          createdDate: p.createdDate
        },
        programExercises: programExercises
      } as ProgramDetailModel
    }));
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
  GetProgramExercisesCreateModels: async function (programId: string, regionIds: string[]): Promise<ExerciseAddProgramUIModel[]> {
    const programExercises = await database.get<ProgramExercise>(SchmeaModels.program_exercises).query(Q.where('program_id', programId)).fetch();

    const exercises = await database
      .get<Exercise>(SchmeaModels.exercises)
      .query(Q.on('region_exercises', 'region_id', Q.oneOf(regionIds)))
      .fetch();
    return await Promise.all(
      exercises.map(async e => {
        return {
          // ui props
          isAdded: false,
          selectedDay: 0, 
          isChanged: false,
          
          // persist props
          exercise: await MapToExerciseResponseDto(e),
          programExercises: programExercises.filter(f => f.exerciseId == e.id).map(pe => {
            return {
              id: pe.id,
              programId: pe.programId,
              exerciseId: pe.exerciseId,
              day: pe.day,
              numberOfSets: pe.numberOfSets,
              numberOfRepetition: pe.numberOfRepetition,
              time: pe.time,
            }
          }),
        } as ExerciseAddProgramUIModel;
      }),
    );
  },
  GetCurrentDayProgramDetails : async function (): Promise<ProgramDetailCurrentDayModel[]> {
    const today = new Date();
    let filtredPrograms: Program[] = [];

    const user = await UserService.GetUser();
    await database.get<Program>(SchmeaModels.programs).query(Q.where('user_id', user.id)).fetch()
      .then(async allPrograms => {
        await Promise.all(
          allPrograms.map(async p => {
            let pe = await p.programExercises.fetch();
            if (pe != null && pe.some(f => f.day === (today.getDay()))) {
              console.log("pushed", p);
              filtredPrograms.push(p);
            }
          })
        );
      });
      
    const todayStr = today.toLocaleDateString();
    
    return await Promise.all(
      filtredPrograms.map(async p => {
        let programExercises = await p.programExercises.fetch();
        if (programExercises === null) programExercises = [];

        const fulfillmentExerciseModel = await Promise.all(
          programExercises.filter(pe => pe.day === today.getDay())
            .map(async pe => {
              const exercise = await pe.exercise.fetch();
              const fulfillments = await pe.fulfillments?.fetch();
           
              return {
                exercise: await MapToExerciseResponseDto(exercise),
                programExercise: await MapToProgramExerciseResponseDto(pe),
                completionStatus:
                  fulfillments == null ? false : fulfillments.some(f => new Date(f.completionDate).toLocaleDateString() === todayStr),
                completionCount: fulfillments == null ? 0 : fulfillments.length,
                inCompletionCount: fulfillments == null ? 0 : 
                  findMissedDays(pe.addedDate, new Set(fulfillments.map(f => new Date(f.completionDate).toISOString().split('T')[0])), pe.day),
              } as FulfillmentsCurrentDayModel;
            }
          ),
        );

        return {
          program: {
            id: p.id,
            name: p.name,
            userId: p.userId,
            createdDate: p.createdDate,
          },
          fulfillmentExerciseModel: fulfillmentExerciseModel
        };
      }),
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
