import ProgramResponseDto from './ProgramResponseDto';
import ProgramExerciseResponseDto from '../programExercise/ProgramExerciseResponseDto';
import ExerciseResponseDto from '../Exercise/ExerciseResponseDto';

export default class ProgramDetailCurrentDayModel {
  program!: ProgramResponseDto;
  fulfillmentExerciseModel!: FulfillmentsCurrentDayModel[];
}

export class FulfillmentsCurrentDayModel {
  exercise!: ExerciseResponseDto;
  programExercise!: ProgramExerciseResponseDto;

  completionStatus!: boolean;
  completionCount!: number;
  inCompletionCount!: number;
}
