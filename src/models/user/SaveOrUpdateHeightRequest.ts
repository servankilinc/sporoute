import * as yup from 'yup';

export default class SaveOrUpdateHeightRequest {
  userId!: string;
  height!: number;

  public constructor(userId: string, height: number) {
    this.userId = userId;
    this.height = height;
  }
}

export const SaveOrUpdateHeightValidation = yup.object().shape({
  userId: yup
    .string()
    .required(),
  height: yup
    .number()
    .min(10, 'Height must be grather than 10!')
    .max(400, 'Height must be less than 400!')
    .required('You must enter a height!'),
});
