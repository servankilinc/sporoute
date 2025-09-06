import ProgramExercise from '@/src/database/models/ProgramExercise';

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

export const MapToProgramExerciseResponseDto = async (programExercise: ProgramExercise): Promise<ProgramExercise> => {
  return {
    id: programExercise.id,
    programId: programExercise.programId,
    exerciseId: programExercise.exerciseId,
    addedDate: programExercise.addedDate,
    day: programExercise.day,
    numberOfSets: programExercise.numberOfSets,
    numberOfRepetition: programExercise.numberOfRepetition,
    time: programExercise.numberOfRepetition,
  } as ProgramExercise;
};
