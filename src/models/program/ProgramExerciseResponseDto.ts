export default interface ProgramExerciseResponseDto {
  id: string;
  programId: string;
  exerciseId: string;
  addedDate: Date;
  day: number;
  numberOfSets: number;
  numberOfRepetition: number;
  time: number;
}
