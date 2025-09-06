import ProgramExerciseDetailModel from "../programExercise/ProgramExerciseDetailModel";
import ProgramResponseDto from "./ProgramResponseDto";

export default class ProgramDetailModel {
  program!: ProgramResponseDto;
  programExercises!: ProgramExerciseDetailModel[];
}