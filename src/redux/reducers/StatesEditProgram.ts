import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import ExerciseAddProgramModel from '@/src/models/exercise/ExerciseAddProgramModel';
import { RegionResponseDto } from '@/src/models/Region/RegionResponseDto';
import ProgramResponseDto from '@/src/models/program/ProgramResponseDto';
import ProgramExerciseCreateRequest from '@/src/models/programExercise/ProgramExerciseCreateRequest';

type dayUI = {
  text: string;
  isSelected: boolean;
  index: number;
};

export class ExerciseAddProgramUIModel extends ExerciseAddProgramModel {
  isAdded: boolean = false;
  isChanged: boolean = false;
}

interface StateUI {
  program?: ProgramResponseDto | null;
  exerciseList: ExerciseAddProgramUIModel[];
  
  dayList: dayUI[];
  selectedDay: number;
  
  regionList: RegionResponseDto[];
  selectedRegionList: RegionResponseDto[];
}

const initialState: StateUI = {
  exerciseList: [],
  regionList: [],
  selectedRegionList: [],
  selectedDay: 0,
  dayList: [
    {
      text: 'Mon',
      isSelected: true,
      index: 0,
    },
    {
      text: 'Tue',
      isSelected: false,
      index: 1,
    },
    {
      text: 'Wed',
      isSelected: false,
      index: 2,
    },
    {
      text: 'Thu',
      isSelected: false,
      index: 3,
    },
    {
      text: 'Fri',
      isSelected: false,
      index: 4,
    },
    {
      text: 'Sat',
      isSelected: false,
      index: 5,
    },
    {
      text: 'Sun',
      isSelected: false,
      index: 6,
    },
  ]
};

export const statesOnCreateProgramSlice = createSlice({
  name: 'statesOnEditProgramSlice',
  initialState,
  reducers: {

    // CREATED PROGRAM METHODS
    resetStates: (state, action: PayloadAction) => {
      state.program = undefined;
      state.exerciseList = [];
      state.regionList = [];
      state.selectedRegionList = [];
    },
    
    // Exist PROGRAM METHODS
    setProgram: (state, action: PayloadAction<ProgramResponseDto | null>) => {
      state.program = action.payload;
    },
    
    // EXERCISE LIST METHODS
    setExerciseList: (state, action: PayloadAction<ExerciseAddProgramModel[]>) => {
      state.exerciseList = [...action.payload.map(e => {
        let selectedDayProgramExercise = e.programExercises.find(f=> f.day == state.selectedDay);
        let _isAdded = selectedDayProgramExercise != null;
        let stateExercise = state.exerciseList.find(f=> f.exercise.id == e.exercise.id);
        return {
          ...e, 
          isAdded: _isAdded,
          // selectedDay: 0, 
          isChanged: _isAdded && stateExercise != null && stateExercise.isChanged
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
    setSelectedDay: (state, action: PayloadAction<number>) => {
      state.selectedDay = action.payload
      state.dayList = state.dayList.map(d => {
        if (d.index == action.payload) {
          return{
            ...d,
            isSelected: true
          }
        }
        else{
          return {
            ...d,
            isSelected: false
          }
        }
      })
      // set isAdded property
      // burada bütün isAdded bilgilerini set edebilirsin
      // state.exerciseList = [...state.exerciseList.map(e => {
      //   return {
      //     ...e, 
      //     isAdded: e.programExercises.some(f=> f.day == action.payload),
      //     // selectedDay: 0, 
      //     isChanged: false
      //   }
      // })];
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
    }
  },
});

export const {
  resetStates,

  setProgram,
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
} = statesOnCreateProgramSlice.actions;

export default statesOnCreateProgramSlice.reducer;
