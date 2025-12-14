import { Model, Relation } from '@nozbe/watermelondb';
import { date, field, relation } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import ProgramExercise from './ProgramExercise';

export default class Fulfillment extends Model {
  static table = 'fulfillments';

  @field('program_exercise_id') programExerciseId!: string;
  @date('completion_date') completionDate!: Date;
  @date('completion_date_indexer') completionDateIndexer!: string; // ISO string // YYYY-MM-DD

  @relation('program_exercises', 'program_exercise_id') programExercises?: Relation<ProgramExercise>;

  static associations: Associations = {
    program_exercises: {type: 'belongs_to', key: 'program_exercise_id'},
  };
}
