// database/schema.ts
import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1, // Şema versiyonunu her değişiklikte artırılmalı
  tables: [
    tableSchema({
      name: 'exercises',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'content', type: 'string', isOptional: true},
        {name: 'description', type: 'string', isOptional: true},
        {name: 'exercise_type', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'fulfillments',
      columns: [
        {name: 'program_exercise_id', type: 'string', isIndexed: true},
        {name: 'completion_date', type: 'number'},
        {name: 'completion_date_indexer', type: 'string'},
      ],
    }),
    tableSchema({
      name: 'programs',
      columns: [
        {name: 'user_id', type: 'string', isIndexed: true},
        {name: 'name', type: 'string'},
        {name: 'created_date', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'program_exercises',
      columns: [
        {name: 'program_id', type: 'string', isIndexed: true},
        {name: 'exercise_id', type: 'string', isIndexed: true},
        {name: 'added_date', type: 'number'},
        {name: 'day', type: 'number'},
        {name: 'number_of_sets', type: 'number'},
        {name: 'number_of_repetition', type: 'number'},
        {name: 'time', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'regions',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'content', type: 'string', isOptional: true},
      ],
    }),
    tableSchema({
      name: 'region_exercises',
      columns: [
        {name: 'region_id', type: 'string', isIndexed: true},
        {name: 'exercise_id', type: 'string', isIndexed: true},
      ],
    }),
    tableSchema({
      name: 'users',
      columns: [
        {name: 'first_name', type: 'string', isOptional: true},
        {name: 'last_name', type: 'string', isOptional: true},
        {name: 'authenticator_type', type: 'number'},
        {name: 'height', type: 'number'},
        {name: 'weight', type: 'number'},
        {name: 'body_mass_index', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'weight_history_data',
      columns: [
        {name: 'user_id', type: 'string', isIndexed: true},
        {name: 'weight', type: 'number'},
        {name: 'added_date', type: 'number'},
      ],
    }),
  ],
});
