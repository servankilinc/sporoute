import {configureStore} from '@reduxjs/toolkit';
import statesCreateProgramReducer from './reducers/StatesCreateProgram';
import statesEditProgramReducer from './reducers/StatesEditProgram';
import statesProgramListReducer from './reducers/StatesProgramList';

export const store = configureStore({
  reducer: {
    statesCreateProgram: statesCreateProgramReducer,
    statesEditProgram: statesEditProgramReducer,
    statesProgramList: statesProgramListReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
