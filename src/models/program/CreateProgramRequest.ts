import * as yup from 'yup';

export default class CreateProgramRequest {
  userId!: string;
  name!: string;

  public constructor(userId: string, name: string) {
    this.userId = userId;
    this.name = name;
  }
}

export const CreateProgramValidation = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters long!')
    .required('You must enter a name!'),
});
