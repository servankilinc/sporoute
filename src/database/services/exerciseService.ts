import {database} from '../index.native';
import {SchmeaModels} from '@/src/constants/SchemaModels';
import {Q} from '@nozbe/watermelondb';
import Exercise from '../models/Exercise';
import ProgramExerciseDetailModel from '@/src/models/programExercise/ProgramExerciseDetailModel';
import ProgramExercise from '../models/ProgramExercise';
import { ExerciseType } from '@/src/constants/ExerciseTypes';
import { RegionResponseDto } from '@/src/models/Region/RegionResponseDto';
import RegionExercise from '../models/RegionExercise';
import ExerciseResponseDto, { MapToExerciseResponseDto } from '@/src/models/exercise/ExerciseResponseDto';

export default {
  Get: async function (exerciseId: string): Promise<ExerciseResponseDto> {
    const exercise = await database.get<Exercise>(SchmeaModels.exercises).find(exerciseId);
    const region_exercises = await exercise.regionExercises.fetch();
    const regions = await Promise.all(
      region_exercises.map(async re => {
        let r = await re.region.fetch();
        return {
          id: r.id,
          name: r.name,
          content: r.content
        } as RegionResponseDto
      })
    )
 
    return {
      id: exercise.id,
      name: exercise.name,
      content: exercise.content,
      description: exercise.description,
      exerciseType: 
        exercise.exerciseType == 1 ? ExerciseType.Weight : 
        exercise.exerciseType == 2 ? ExerciseType.Cardio : 
        exercise.exerciseType == 3 ? ExerciseType.Basic :
        ExerciseType.Basic,
      regions: regions
    }
  },
  GetExercisesByRegions: async function (regionIds: string[]): Promise<ExerciseResponseDto[]> {
    const region_exercises = await database.get<RegionExercise>(SchmeaModels.region_exercises)
      .query(Q.where('region_id', Q.oneOf(regionIds)))
      .fetch();

    const exercises : Exercise[]=[];
    await Promise.all(
      region_exercises.map(async re =>{
        const e = await re.exercise.fetch();
        if(!exercises.some(f => f.id == e.id))
        {
          exercises.push(e);
        }
      })
    )

    return Promise.all(
      exercises.map(async e => {
        return await MapToExerciseResponseDto(e);
      })
    );
  },
  // OK. BU Metod Reducer'da kullanılıyor.
  GetProgramExerciseDetails: async function (programId: string): Promise<ProgramExerciseDetailModel[]> {
    const programExercises = await database.get<ProgramExercise>(SchmeaModels.program_exercises)
      .query(Q.where('program_id', Q.eq(programId)))
      .fetch();

    var result = await Promise.all(
      programExercises.map(async pe => {
        let exercise = await pe.exercise.fetch();
        let regionExercises = await exercise.regionExercises.fetch();
        let regions = await Promise.all(
          regionExercises.map(async re => {
            let region = await re.region.fetch();
            return region;
          }),
        );

        return {
          exerciseId: exercise.id,
          name: exercise.name,
          content: exercise.content ?? '',
          description: exercise.description ?? '',
          exerciseType: exercise.exerciseType,
          programExerciseId: pe.id,
          addedDate: pe.addedDate,
          day: pe.day,
          numberOfSets: pe.numberOfSets,
          numberOfRepetition: pe.numberOfRepetition,
          time: pe.time,
          regions: regions,
        };
      }),
    );

    return result;
  },
};
