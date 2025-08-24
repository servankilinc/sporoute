import { Model, Query } from '@nozbe/watermelondb';
import { children, field, text } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import Program from './Program';
import WeightHistoryData from './WeightHistoryData';

export default class User extends Model {
  static table = 'users';

  @text('first_name') firstName?: string;
  @text('last_name') lastName?: string;
  @field('authenticator_type') authenticatorType!: number;
  @field('height') height?: number;
  @field('weight') weight?: number;
  @field('body_mass_index') bodyMassIndex?: number;

  // One-to-Many
  @children('programs') programs?: Query<Program>;
  @children('weight_history_data') weightDataset?: Query<WeightHistoryData>;

  static associations: Associations = {
    programs: {type: 'has_many', foreignKey: 'user_id'},
    weight_history_data: {type: 'has_many', foreignKey: 'user_id'},
  };
}
