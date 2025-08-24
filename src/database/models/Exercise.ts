import { Model, Query } from '@nozbe/watermelondb';
import { children, field, text } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import ProgramExercise from './ProgramExercise';
import RegionExercise from './RegionExercise';

export default class Exercise extends Model {
  static table = 'exercises';

  @text('name') name!: string;
  @text('content') content?: string;
  @text('description') description?: string;
  @field('exercise_type') exerciseType!: number;

  @children('program_exercises') programExercises!: Query<ProgramExercise>;
  @children('region_exercises') regionExercises!: Query<RegionExercise>;

  static associations: Associations = {
    program_exercises: {type: 'has_many', foreignKey: 'exercise_id'},
    region_exercises: {type: 'has_many', foreignKey: 'exercise_id'},
  };
}
