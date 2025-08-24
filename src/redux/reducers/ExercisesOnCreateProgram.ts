import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import ProgramExerciseInteractionMultipleDayModel from '../../models/Program/Interactions/ProgramExerciseInteractionMultipleDayModel';
import ProgramExerciseResponseDto from '../../models/Program/ProgramExerciseResponseDto';

interface StateUI {
  exerciseList: ProgramExerciseInteractionMultipleDayModel[];
  isFullfilled: boolean;
  isPending: boolean;
  isRejected: boolean;
}

const initialState: StateUI = {
  exerciseList: [],
  isFullfilled: false,
  isPending: false,
  isRejected: false,
};

export const exercisesOnCreateProgramSlice = createSlice({
  name: 'exercisesOnCreateProgram',
  initialState,
  reducers: {
    setAll: (state, action: PayloadAction<ProgramExerciseInteractionMultipleDayModel[]>) => {
      state.exerciseList = [...action.payload];
    },
    updateOne: (state, action: PayloadAction<ProgramExerciseResponseDto>) => {
      state.exerciseList = state.exerciseList.map(f => {
        return {
          ...f,
          programExercises: f.programExercises?.map(pe => (pe.id == action.payload.id ? action.payload : pe)),
        };
      });
    },
    addOne: (state, action: PayloadAction<ProgramExerciseResponseDto>) => {
      state.exerciseList = state.exerciseList.map(f => {
        return {
          ...f,
          programExercises: f.programExercises != null ? [...f.programExercises, action.payload] : [action.payload],
        };
      });
    },
    removeByProgramExerciseId: (state, action: PayloadAction<string>) => {
      state.exerciseList = state.exerciseList.map(f => {
        return {
          ...f,
          programExercises: f.programExercises?.filter(pe => pe.id != action.payload),
        };
      });
    },
  },
});

export const {setAll, updateOne, addOne, removeByProgramExerciseId} = exercisesOnCreateProgramSlice.actions;

export default exercisesOnCreateProgramSlice.reducer;
