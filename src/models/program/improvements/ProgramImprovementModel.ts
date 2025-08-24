import ProgramResponseDto from '../ProgramResponseDto';
import ProgramExerciseFulfillmentModel from './ProgramExerciseFulfillmentModel';

export default class ProgramImprovementModel {
  program!: ProgramResponseDto;
  programExerciseFulfillments?: ProgramExerciseFulfillmentModel[];
}
