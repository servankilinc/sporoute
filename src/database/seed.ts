import Region from './models/Region';
import Exercise from './models/Exercise';
import RegionExercise from './models/RegionExercise';
import {database} from './index.native';
import User from './models/User';
import {SchmeaModels} from '@/src/constants/SchemaModels';
import {data as seed_data_region} from './data/region';
import {data as seed_data_exercise} from './data/exercise';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export default async function SeedDatabase(): Promise<boolean> {
  //#region USERS
  const userCollection = database.get<User>(SchmeaModels.users);
  const userExisting = await userCollection.query().fetch();

  if (userExisting.length === 0) {
    await database.write(async () => {
      await userCollection.create(x => {
        x._raw.id = uuidv4();
        x.firstName = uuidv4();
        x.authenticatorType = 4;
      });
    });
  }
  //#endregion

  //#region Regions
  const regionCollection = database.get<Region>(SchmeaModels.regions);
  const regionExisting = await regionCollection.query().fetch();

  if (regionExisting.length === 0) {
    await database.write(async () => {
      for (const region of seed_data_region) {
        await regionCollection.create(x => {
          x._raw.id = region.id;
          x.name = region.name;
          x.content = region.content;
        });
      }
    });
  }
  //#endregion

  //#region Exercises
  const exerciseCollection = database.get<Exercise>(SchmeaModels.exercises);
  const regionExerciseCollection = database.get<RegionExercise>(SchmeaModels.region_exercises);

  const exerciseExisting = await exerciseCollection.query().fetch();

  if (exerciseExisting.length === 0) {
    await database.write(async () => {
      for (const seedData of seed_data_exercise) {
        await exerciseCollection.create(x => {
          x._raw.id = seedData.exercise.id;
          x.name = seedData.exercise.name;
          x.content = seedData.exercise.content;
          x.description = seedData.exercise.description;
          x.exerciseType = seedData.exercise.exerciseType;
        });

        for (const region of seedData.regions) {
          await regionExerciseCollection.create(x => {
            x.regionId = region.id;
            x.exerciseId = seedData.exercise.id;
          });
        }
      }
    });
  }
  //#endregion

  return true;
}
