import {database} from '../index.native';
import {SchmeaModels} from '@/src/constants/SchemaModels';
import User from '../models/User';
import UserResponseDto, { UserPhysicalResponseDto } from '@/src/models/user/UserResponseDto';
import SaveOrUpdateWeightRequest from '@/src/models/user/SaveOrUpdateWeightRequest';
import WeightHistoryData from '../models/WeightHistoryData';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import SaveOrUpdateHeightRequest from '@/src/models/user/SaveOrUpdateHeightRequest';
import WeightHistoryDataResponseDto from '@/src/models/user/WeightHistoryDataResponseDto';
import {Q} from '@nozbe/watermelondb';

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
  GetUserByPhysicalData: async function (): Promise<UserPhysicalResponseDto> {
    const userCollection = await database.get<User>(SchmeaModels.users).query();
    const user = userCollection[0];
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName, 
      height: user.height, 
      weight: user.weight, 
      body_mass_index: user.bodyMassIndex, 
    };
  },
  GetWeightHistory: async function (userId: string): Promise<WeightHistoryDataResponseDto[]> {
    const collection = await database.get<WeightHistoryData>(SchmeaModels.weight_history_data).query(Q.where('user_id', userId)).fetch();

    return collection.map(d => {
      return {
        id: d.id,
        userId: d.userId,
        weight: d.weight,
        addedDate: d.addedDate,
      } as WeightHistoryDataResponseDto;
    });
  },
  AddOrUpdateWeight: async function (request: SaveOrUpdateWeightRequest): Promise<void> {
    await database.write(async () => {
      await database.get<WeightHistoryData>(SchmeaModels.weight_history_data).create(toInsert => {
        toInsert._raw.id = uuidv4();
        toInsert.userId = request.userId;
        toInsert.weight = request.weight;
        toInsert.addedDate = new Date();
      });

      const user = await database.get<User>(SchmeaModels.users).find(request.userId);
      await user.update(u => {
        u.weight = request.weight;
      });
    });
  },
  RemoveWeight: async function (weightHistoryId: string): Promise<void> {
    await database.write(async () => {
      const existData = await database.get<WeightHistoryData>(SchmeaModels.weight_history_data).find(weightHistoryId);
      if (existData != null) await existData.markAsDeleted();
    });
  },
  UpdateHeight: async function (request: SaveOrUpdateHeightRequest): Promise<void> {
    let user = await database.write(async () => {
      const user = await database.get<User>(SchmeaModels.users).find(request.userId);
      return await user.update(u => {
        u.height = request.height;
      });
    });
  },
};
