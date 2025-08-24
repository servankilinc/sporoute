import { Model, Relation } from '@nozbe/watermelondb';
import { date, field, relation } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import User from './User';

export default class WeightHistoryData extends Model {
  static table = 'weight_history_data';

  @field('user_id') userId!: string;
  @field('weight') weight!: number;
  @date('added_date') addedDate!: Date;

  @relation('users', 'user_id') user?: Relation<User>;

  static associations: Associations = {
    users: {type: 'belongs_to', key: 'user_id'},
  };
}
