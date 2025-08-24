import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ProgramExerciseBaseModel from '../../models/Program/Fulfillments/ProgramExerciseBaseModel'; 

interface StateUI {
    programExercises: ProgramExerciseBaseModel[];
    isFullfilled: boolean;
    isPending: boolean;
    isRejected: boolean;
};

const initialState: StateUI = {
    programExercises: [],
    isFullfilled: false,
    isPending: false,
    isRejected: false,
}

export const programExercisesSlice = createSlice({
    name: 'programExercises',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<ProgramExerciseBaseModel[]>) => {
            state.programExercises = action.payload;
        },
        update: (state, action: PayloadAction<ProgramExerciseBaseModel>) => {
            state.programExercises = state.programExercises.map(pe => pe.programExerciseId == action.payload.programExerciseId ? action.payload : pe);
        },
        removeById: (state, action: PayloadAction<string>) => {
            state.programExercises = state.programExercises.filter(pe => pe.programExerciseId != action.payload);
        },
    },
})

export const { set, update, removeById} = programExercisesSlice.actions

export default programExercisesSlice.reducer