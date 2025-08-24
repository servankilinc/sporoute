import ProgramExerciseBaseModel from './ProgramExerciseBaseModel';

export default class FulfillmentsCurrentDayModel extends ProgramExerciseBaseModel {
  completionStatus!: boolean;
  completionCount!: number;
  inCompletionCount!: number;
}
