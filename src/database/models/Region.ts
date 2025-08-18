import { Model } from '@nozbe/watermelondb';
import { children, field } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import RegionExercise from './RegionExercise';

export default class Region extends Model {
  static table = 'regions';

  @field('name') name!: string;
  @field('content') content?: string;

  @children('region_exercises') regionExercises?: RegionExercise[];

  static associations: Associations = {
    region_exercises: {type: 'has_many', foreignKey: 'region_id'},
  };
}
