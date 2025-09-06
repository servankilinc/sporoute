import * as yup from 'yup';

export default class ProgramUpdateRequest {
  id!: string;
  name!: string;

  public constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export const ProgramUpdateValidation = yup.object().shape({
  id: yup
    .string()
    .required(),
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters long!')
    .required('You must enter a name!'),
});
