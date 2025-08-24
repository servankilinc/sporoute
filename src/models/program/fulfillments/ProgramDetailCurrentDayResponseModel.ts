import FulfillmentsCurrentDayModel from './FulfillmentsCurrentDayModel';
import ProgramResponseDto from '../ProgramResponseDto';

export default class ProgramDetailCurrentDayResponseModel {
  program!: ProgramResponseDto;
  exerciseList!: FulfillmentsCurrentDayModel[];
}
