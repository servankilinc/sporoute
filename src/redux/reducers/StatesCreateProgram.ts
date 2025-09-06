import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import ExerciseAddProgramModel from '@/src/models/exercise/ExerciseAddProgramModel';
import { StepperProps } from '@/src/components/programs/create/Stepper';
import { RegionResponseDto } from '@/src/models/Region/RegionResponseDto';
import ProgramResponseDto from '@/src/models/program/ProgramResponseDto';
import ProgramExerciseCreateRequest from '@/src/models/programExercise/ProgramExerciseCreateRequest';

export class ExerciseAddProgramUIModel extends ExerciseAddProgramModel {
  isAdded: boolean = false;
  selectedDay: number = 0;
  isChanged: boolean = false;
}

interface StateUI {
  createdProgram?: ProgramResponseDto | null;
  exerciseList: ExerciseAddProgramUIModel[];

  stepps: StepperProps[];

  regionList: RegionResponseDto[];
  selectedRegionList: RegionResponseDto[];
}

const initialState: StateUI = {
  exerciseList: [],
  stepps: [  
    {title: 'Create Program', step: 1, isActive: true},
    {title: 'Add Exercises', step: 2, isActive: false}
  ],
  regionList: [],
  selectedRegionList: [],
};

export const statesOnCreateProgramSlice = createSlice({
  name: 'statesOnCreateProgramSlice',
  initialState,
  reducers: {

    // CREATED PROGRAM METHODS
    resetStates: (state, action: PayloadAction) => {
      state.createdProgram = undefined;
      state.exerciseList = [];
      state.stepps[0].isActive = true;
      state.regionList = [];
      state.selectedRegionList = [];
      
      // swipeToStep(1);
      state.stepps = state.stepps.map(step => {
        const control = step.step != 1;
        return {...step, isActive: control ? false : true};
      });
    },
    
    // CREATED PROGRAM METHODS
    setCreatedProgram: (state, action: PayloadAction<ProgramResponseDto | null>) => {
      state.createdProgram = action.payload;
      
      // swipeToStep(2);
      state.stepps = state.stepps.map(step => {
        const control = step.step != 2;
        return {...step, isActive: control ? false : true};
      });
    },
    
    // EXERCISE LIST METHODS
    setExerciseList: (state, action: PayloadAction<ExerciseAddProgramModel[]>) => {
      state.exerciseList = [...action.payload.map(e => {
        return {
          ...e, 
          isAdded: false,
          selectedDay: 0, 
          isChanged: false
        }
      })];
    },

    // PROGRAM EXERCISE METHODS
    addProgramExercise: (state, action: PayloadAction<ProgramExerciseCreateRequest>) => {
      state.exerciseList = state.exerciseList.map(f => {
        if (f.exercise.id != action.payload.exerciseId) return f;
        return {
          ...f,
          isAdded: true,
          isChanged: false,
          programExercises: f.programExercises != null ? [...f.programExercises, action.payload] : [action.payload],
        };
      });
    },
    updateProgramExercise: (state, action: PayloadAction<ProgramExerciseCreateRequest>) => {
      state.exerciseList = state.exerciseList.map(f => {
        if (f.exercise.id != action.payload.exerciseId) return f;
        return {
          ...f,
          isChanged: false,
          programExercises: f.programExercises?.map(pe => {
            if (pe.id != action.payload.id) return pe;
            return action.payload
          }),
        };
      });
    },
    removeProgramExercise: (state, action: PayloadAction<{exerciseId: string, programExerciseId: string}>) => {
      state.exerciseList = state.exerciseList.map(f => {
        if (f.exercise.id != action.payload.exerciseId || f.programExercises == null) return f;
        return {
          ...f,
          isAdded: false,
          programExercises: f.programExercises.filter(pe => pe.id != action.payload.programExerciseId),
        };
      });
    },

    // HANDLE SELECTED DAY CHANGE
    setSelectedDay: (state, action: PayloadAction<{exerciseId: string; day: number}>) => {
      state.exerciseList = state.exerciseList.map(f => {  
        if (f.exercise.id != action.payload.exerciseId) return f;
        return {
          ...f,
          selectedDay: action.payload.day,
        };
      });

      // set isAdded property
      let relatedExercise = state.exerciseList.find(f => f.exercise.id == action.payload.exerciseId);
      if (relatedExercise != null)
      {
        relatedExercise.isAdded = relatedExercise.programExercises?.some(pe => pe.day == action.payload.day) ?? false;
      }
    },
    
    // SETTER METHODS PROGRAM EXERCISE FIELDS 
    setNumberOfSets: (state, action: PayloadAction<{exerciseId: string, programExerciseId: string, value: number}>) => {
      state.exerciseList = state.exerciseList.map(data => {
        if (data.exercise.id != action.payload.exerciseId) return data;
        return {
          ...data,
          isChanged: data.programExercises == null ? false : data.programExercises.some(f => f.id == action.payload.programExerciseId) ? true : data.isChanged,
          programExercises: data.programExercises?.map(pe => 
            (pe.id != action.payload.programExerciseId ? pe : 
              {
                ...pe,
                numberOfSets: action.payload.value
              }
            ) ?? []
          ),
        };
      });
    },
    setNumberOfRepetition: (state, action: PayloadAction<{exerciseId: string, programExerciseId: string, value: number}>) => {
      state.exerciseList = state.exerciseList.map(data => {
        if (data.exercise.id != action.payload.exerciseId) return data;
        return {
          ...data,
          isChanged: data.programExercises == null ? false : data.programExercises.some(f => f.id == action.payload.programExerciseId) ? true : data.isChanged,
          programExercises: data.programExercises?.map(pe => 
            (pe.id != action.payload.programExerciseId ? pe : 
              {
                ...pe,
                numberOfRepetition: action.payload.value
              }
            ) ?? []
          ),
        };
      });
    },
    setValueOfTime: (state, action: PayloadAction<{exerciseId: string, programExerciseId: string, value: number}>) => {
      state.exerciseList = state.exerciseList.map(data => {
        if (data.exercise.id != action.payload.exerciseId) return data;
        return {
          ...data,
          isChanged: data.programExercises == null ? false : data.programExercises.some(f => f.id == action.payload.programExerciseId) ? true : data.isChanged,
          programExercises: data.programExercises?.map(pe => 
            (pe.id != action.payload.programExerciseId ? pe : 
              {
                ...pe,
                time: action.payload.value
              }
            ) ?? []
          ),
        };
      });
    },
    
    // REGION METHODS
    setRegionList: (state, action: PayloadAction<RegionResponseDto[]>) => {
      state.regionList = [...action.payload];
    },
    setSelectedRegionList: (state, action: PayloadAction<string>) => {
      if (state.selectedRegionList != null && state.selectedRegionList.some(r => r.id == action.payload)) {
        state.selectedRegionList = state.selectedRegionList.filter(r => r.id != action.payload);
      }
      else {
        const region = state.regionList.find(r => r.id == action.payload);
        if (region != null) {
          state.selectedRegionList = [...state.selectedRegionList, region];
        }
      }

      // Clear exercise list if no region is selected
      if(state.selectedRegionList.length == 0){
        state.exerciseList = [];
      }
    },

    
    setIsChangedStatus: (state, action: PayloadAction<{exerciseId: string; value: boolean}>) => {
      state.exerciseList = state.exerciseList.map(f => {
        if (f.exercise.id != action.payload.exerciseId) return f;
        return {
          ...f,
          isChanged: action.payload.value,
        };
      })
    },

    // STEPPER METHODS
    swipeToStep: (state, action: PayloadAction<number>) => {
      state.stepps = state.stepps.map(step => {
        const control = step.step != action.payload;
        return {...step, isActive: control ? false : true};
      });
    }  
  },
});

export const {
  resetStates,

  setCreatedProgram,
  setExerciseList, 

  updateProgramExercise,
  addProgramExercise, 
  removeProgramExercise,

  setSelectedDay,
  setNumberOfSets, 
  setNumberOfRepetition, 
  setValueOfTime, 
  setRegionList, 
  setSelectedRegionList, 

  setIsChangedStatus,

  swipeToStep
} = statesOnCreateProgramSlice.actions;

export default statesOnCreateProgramSlice.reducer;
