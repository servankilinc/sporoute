import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import ProgramExerciseCreateRequest from '@/src/models/programExercise/ProgramExerciseCreateRequest';
import ProgramDetailModel from '@/src/models/program/ProgramDetailModel';

interface StateUI {
  userPrograms: ProgramDetailModel[];
}

const initialState: StateUI = {
  userPrograms: []
};

export const statesProgramListSlice = createSlice({
  name: 'statesProgramListSlice',
  initialState,
  reducers: {
    resetStates: (state, action: PayloadAction) => {
      state.userPrograms = [];
    },

    // EXERCISE LIST METHODS
    setUserPrograms: (state, action: PayloadAction<ProgramDetailModel[]>) => {
      state.userPrograms = [...action.payload];
    },

    updateProgramExercise: (state, action: PayloadAction<ProgramExerciseCreateRequest>) => {
      state.userPrograms = state.userPrograms.map(up => {
        if (up.program.id != action.payload.programId) return up;
        return {
          ...up,
          programExercises: up.programExercises?.map(pe => {
            if (pe.programExerciseId != action.payload.id) return pe;
            return {
              ...pe,
              numberOfSets: action.payload.numberOfSets!,
              numberOfRepetition: action.payload.numberOfRepetition!,
              time: action.payload.time!,
            };
          }),
        };
      });
    },
    removeProgramExercise: (state, action: PayloadAction<{programId: string; programExerciseId: string}>) => {
      state.userPrograms = state.userPrograms.map(up => {
        if (up.program.id != action.payload.programId) return up;
        return {
          ...up,
          programExercises: up.programExercises.filter(pe => pe.programExerciseId != action.payload.programExerciseId),
        };
      });
    },

    // SETTER METHODS PROGRAM EXERCISE FIELDS
    setNumberOfSets: (state, action: PayloadAction<{programId: string; programExerciseId: string; value: number}>) => {
      state.userPrograms = state.userPrograms.map(up => {
        if (up.program.id != action.payload.programId) return up;
        return {
          ...up,
          programExercises: up.programExercises.map(
            pe =>
              (pe.programExerciseId != action.payload.programExerciseId ? pe
                : 
                {
                  ...pe,
                  numberOfSets: action.payload.value,
                }
              ) ?? [],
          ),
        };
      });
    },
    setNumberOfRepetition: (state, action: PayloadAction<{programId: string; programExerciseId: string; value: number}>) => {
      state.userPrograms = state.userPrograms.map(up => {
        if (up.program.id != action.payload.programId) return up;
        return {
          ...up,
          programExercises: up.programExercises.map(
            pe =>
              (pe.programExerciseId != action.payload.programExerciseId ? pe
                : 
                {
                  ...pe,
                  numberOfRepetition: action.payload.value,
                }
              ) ?? [],
          ),
        };
      });
    },
    setValueOfTime: (state, action: PayloadAction<{programId: string; programExerciseId: string; value: number}>) => {
      state.userPrograms = state.userPrograms.map(up => {
        if (up.program.id != action.payload.programId) return up;
        return {
          ...up,
          programExercises: up.programExercises.map(
            pe =>
              (pe.programExerciseId != action.payload.programExerciseId ? pe
                : 
                {
                  ...pe,
                  time: action.payload.value,
                }
              ) ?? [],
          ),
        };
      });
    },
  },
});

export const {
  resetStates,
  setUserPrograms, 

  updateProgramExercise,
  removeProgramExercise,

  setNumberOfSets, 
  setNumberOfRepetition, 
  setValueOfTime, 
} = statesProgramListSlice.actions;

export default statesProgramListSlice.reducer;
