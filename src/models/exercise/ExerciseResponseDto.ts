import {ExerciseType} from '@/src/constants/ExerciseTypes';
import {RegionResponseDto} from '../Region/RegionResponseDto';
import Exercise from '@/src/database/models/Exercise';

export default interface ExerciseResponseDto {
  id: string;
  name: string;
  content?: string;
  description?: string;
  exerciseType: number | ExerciseType;
  regions?: RegionResponseDto[];
}

export const MapToExerciseResponseDto = async (exercise: Exercise): Promise<ExerciseResponseDto> => {
  let region_exercises = await exercise.regionExercises.fetch();
  if (region_exercises === null) region_exercises = [];
        
  let regions = await Promise.all(
    region_exercises.map(async re => {
      let r = await re.region.fetch();
      return {
        id: r.id,
        name: r.name,
        content: r.content,
      } as RegionResponseDto;
    }),
  ); 
  return {
    id: exercise.id,
    name: exercise.name,
    content: exercise.content,
    description: exercise.description,
    regions: regions,
    exerciseType: exercise.exerciseType
  } as ExerciseResponseDto;
};
