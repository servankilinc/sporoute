export default interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  authenticatorType: number;
  height: number;
  weight: number;
  bodyMassIndex: number;
}
