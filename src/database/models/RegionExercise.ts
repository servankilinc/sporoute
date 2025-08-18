import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import Exercise from './Exercise';
import Region from './Region';

export default class RegionExercise extends Model {
  static table = 'region_exercises';

  @field('region_id') regionId!: string;
  @field('exercise_id') exerciseId!: string;

  @relation('regions', 'region_id') region?: Region;
  @relation('exercises', 'exercise_id') exercise?: Exercise;

  static associations: Associations = {
    regions: {type: 'belongs_to', key: 'region_id'},
    exercises: {type: 'belongs_to', key: 'exercise_id'},
  };
}
