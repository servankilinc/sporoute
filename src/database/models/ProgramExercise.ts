import { Model, Query, Relation } from '@nozbe/watermelondb';
import { children, date, field, relation } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import Exercise from './Exercise';
import Fulfillment from './Fulfillment';
import Program from './Program';

export default class ProgramExercise extends Model {
  static table = 'program_exercises';

  @field('program_id') programId!: string;
  @field('exercise_id') exerciseId!: string;
  @date('added_date') addedDate!: Date;
  @field('day') day!: number;
  @field('number_of_sets') numberOfSets!: number;
  @field('number_of_repetition') numberOfRepetition!: number;
  @field('time') time!: number;

  @relation('programs', 'program_id') program!: Relation<Program>;
  @relation('exercises', 'exercise_id') exercise!: Relation<Exercise>;
  @children('fulfillments') fulfillments?: Query<Fulfillment>;

  static associations: Associations = {
    programs: {type: 'belongs_to', key: 'program_id'},
    exercises: {type: 'belongs_to', key: 'exercise_id'},
    fulfillments: {type: 'has_many', foreignKey: 'program_exercise_id'},
  };
}
