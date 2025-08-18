import { Model } from '@nozbe/watermelondb'
import { children, date, field, relation, text } from '@nozbe/watermelondb/decorators'
import { Associations } from '@nozbe/watermelondb/Model'
import ProgramExercise from './ProgramExercise'
import User from './User'

export default class Program extends Model {
  static table = 'programs'

  @field('user_id') userId!: string
  @text('name') name!: string
  @date('created_date') createdDate!: Date

  @relation('users', 'user_id') user!: User
  @children('program_exercises') programExercises!: ProgramExercise[]

  // TS tip uyumlu associations
  static associations: Associations = {
    users: { type: 'belongs_to', key: 'user_id' },
    program_exercises: { type: 'has_many', foreignKey: 'program_id' },
  }
}
