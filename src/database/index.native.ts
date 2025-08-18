// database/index.ts
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from './schema';

// Models
import Exercise from './models/Exercise';
import Fulfillment from './models/Fulfillment';
import Program from './models/Program';
import ProgramExercise from './models/ProgramExercise';
import Region from './models/Region';
import RegionExercise from './models/RegionExercise';
import User from './models/User';
import WeightHistoryData from './models/WeightHistoryData';

const adapter = new SQLiteAdapter({
  schema,
  dbName: 'app_local_db',
  jsi: true,
  onSetUpError: error => {
    console.error('DB setup error', error);
  }
});

export const database = new Database({
  adapter,
  modelClasses: [Exercise, Fulfillment, Program, ProgramExercise, Region, RegionExercise, User, WeightHistoryData],
});
