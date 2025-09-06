export default interface ProgramExerciseCreateRequest {
  id?: string | null;
  programId: string;
  exerciseId: string;
  day: number;
  numberOfSets?: number;
  numberOfRepetition?: number;
  time?: number;
}
