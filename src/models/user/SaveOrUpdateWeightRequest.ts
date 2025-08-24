import * as yup from 'yup';

export default class SaveOrUpdateWeightRequest {
  userId!: string;
  weight!: number;

  public constructor(userId: string, weight: number) {
    this.userId = userId;
    this.weight = weight;
  }
}

export const SaveOrUpdateWeightValidation = yup.object().shape({
  userId: yup
    .string()
    .required(),
  weight: yup
    .number()
    .min(10, 'Weight must be grather than 10!')
    .max(400, 'Weight must be less than 400!')
    .required('You must enter a weight!'),
});
