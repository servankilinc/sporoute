export default interface UserResponseDto {
  id: string;
  firstName?: string;
  lastName?: string;
  // userName?: string;
}
export interface UserPhysicalResponseDto {
  id: string;
  firstName?: string;
  lastName?: string;
  height?: number;
  weight?: number;
  body_mass_index?: number;
}
