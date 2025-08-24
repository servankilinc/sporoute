import {database} from '../index.native';
import {SchmeaModels} from '@/src/constants/SchemaModels';
import User from '../models/User';
import UserResponseDto from '@/src/models/user/UserResponseDto';

export default {
  GetUser: async function (): Promise<UserResponseDto> {
    const userCollection = await database.get<User>(SchmeaModels.users).query();
    const user = userCollection[0];
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  },
};
