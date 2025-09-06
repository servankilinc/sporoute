import ProgramExerciseCreateRequest from '../programExercise/ProgramExerciseCreateRequest';
import ExerciseResponseDto from './ExerciseResponseDto';

export default class ExerciseAddProgramModel {
  programExercises!: ProgramExerciseCreateRequest[];
  exercise!: ExerciseResponseDto;
}
