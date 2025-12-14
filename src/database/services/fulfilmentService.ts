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
import Fulfillment from '../models/Fulfillment';

export default {

  CompletedTrigger: async function (programExerciseId: string): Promise<void> {
    const dateIndex = new Date().toISOString().split('T')[0];
    await database.write(async () => {
      const collection = await database.get<Fulfillment>(SchmeaModels.fulfillments)
      .query(
        Q.and(
          Q.where("program_exercise_id", Q.eq(programExerciseId)),
          Q.where("completionDateIndexer", Q.eq(dateIndex))            
        )
      ).fetch();
      const exist = collection != null ? collection[0] : undefined;
      if (exist == null){
        await database.get<Fulfillment>(SchmeaModels.fulfillments).create(toInsert => {
          toInsert._raw.id = uuidv4();
          toInsert.programExerciseId = programExerciseId;
          toInsert.completionDate = new Date();
          toInsert.completionDateIndexer = dateIndex
        });
      }
      else{
        await exist.markAsDeleted();
      }
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
