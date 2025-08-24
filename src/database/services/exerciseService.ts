import {database} from '../index.native';
import {SchmeaModels} from '@/src/constants/SchemaModels';
import {Q} from '@nozbe/watermelondb';
import ExerciseResponseDto from '@/src/models/Exercise/ExerciseResponseDto';
import Exercise from '../models/Exercise';
import ProgramExerciseResponseModel from '@/src/models/exercise/ProgramExerciseResponseModel';
import ProgramExercise from '../models/ProgramExercise';

export default {
  GetExercisesByRegions: async function (regionIds: string[]): Promise<ExerciseResponseDto[]> {
    const exercises = await database.get<Exercise>(SchmeaModels.exercises)
      .query(Q.on('region_exercises', 'region_id', Q.oneOf(regionIds)))
      .fetch();

    return Promise.all(
      exercises.map(async e => {
        const regionExercises = await e.regionExercises.fetch();
        // if (regionExercises === null) continue;
        
        return {
          id: e.id,
          name: e.name,
          content: e.content,
          description: e.description,
          exerciseType: e.exerciseType,
          regions: await Promise.all(
            regionExercises.map(async re => {
              const region = await re.region.fetch();
              return {
                id: region.id,
                name: region.name,
                content: region.content,
              };
            }),
          ),
        }
      })
    );
  },
  GetAllByProgram: async function (programId: string): Promise<ProgramExerciseResponseModel[]> {
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
