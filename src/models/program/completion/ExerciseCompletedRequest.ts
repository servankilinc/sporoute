export default class ExerciseCompletedRequest {
  programExerciseId!: string;

  public constructor(programExerciseId: string) {
    this.programExerciseId = programExerciseId;
  }
}
