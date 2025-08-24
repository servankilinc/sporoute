export default class ExerciseNotCompletedRequest {
  programExerciseId!: string;

  public constructor(programExerciseId: string) {
    this.programExerciseId = programExerciseId;
  }
}
