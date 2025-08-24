import { createSlice, PayloadAction } from '@reduxjs/toolkit' 
import ProgramExerciseInteractionModel from '../../models/Program/Interactions/ProgramExerciseInteractionModel';

interface StateUI {
    exerciseList: ProgramExerciseInteractionModel[];
    isFullfilled: boolean;
    isPending: boolean;
    isRejected: boolean;
};

const initialState: StateUI = {
    exerciseList: [],
    isFullfilled: false,
    isPending: false,
    isRejected: false,
}

export const exercisesOnAddNewSlice = createSlice({
    name: 'exercisesOnAddNew',
    initialState,
    reducers: {
        setAll: (state, action: PayloadAction<ProgramExerciseInteractionModel[]>) => {
            state.exerciseList = action.payload;
        },
        updateOne: (state, action: PayloadAction<ProgramExerciseInteractionModel>) => {
            state.exerciseList = state.exerciseList.map(pe => pe.exercise.id == action.payload.exercise.id ? action.payload : pe);
        }
    },
})

export const { setAll, updateOne} = exercisesOnAddNewSlice.actions

export default exercisesOnAddNewSlice.reducer