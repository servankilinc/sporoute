import { configureStore } from '@reduxjs/toolkit';
import programExercisesReducer from './reducers/ProgramExercisesSlice'
import exercisesOnAddNewReducer from './reducers/ExercisesOnAddNewSlice';
import exercisesOnCreateProgramReducer from './reducers/ExercisesOnCreateProgram';

export const store = configureStore({
    reducer: {
        programExercises: programExercisesReducer,
        exercisesOnAddNew: exercisesOnAddNewReducer,
        exercisesOnCreateProgram: exercisesOnCreateProgramReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch