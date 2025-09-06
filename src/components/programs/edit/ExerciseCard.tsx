//#region imports
import React, {useEffect, useState} from 'react';
import {HStack} from '@/components/ui/hstack';
import {Image} from '@/components/ui/image';
import {VStack} from '@/components/ui/vstack';
import UpdateExerciseOfProgramRequest from '@/src/models/programExercise/ProgramExerciseUpdateRequest';
import {addProgramExercise, ExerciseAddProgramUIModel, removeProgramExercise, setNumberOfRepetition, setNumberOfSets, setSelectedDay, setValueOfTime, updateProgramExercise} from '../../../redux/reducers/StatesEditProgram';
import {useAppDispatch, useAppSelector} from '@/src/redux/hook';
import {ThemedButton,ThemedText, ThemedView} from '../../global';
import {ExerciseType} from '@/src/constants/ExerciseTypes';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import programService from '@/src/database/services/programService';
import {exerciseImageMap} from '@/assets/images/exercises';
import {View} from 'react-native';
import ProgramExerciseCreateRequest from '@/src/models/programExercise/ProgramExerciseCreateRequest';
import { RootState } from '@/src/redux/Store';
import TriggerInput from '../../general/TriggerInput';
//#endregion

type SectionProps = {
  exerciseAddProgramModel: ExerciseAddProgramUIModel;
  programId: string;
};

function ExerciseCard({exerciseAddProgramModel, programId}: SectionProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {exercise, programExercises, isAdded, isChanged} = exerciseAddProgramModel;
  
  const selectedDay = useAppSelector((state: RootState) => state.statesEditProgram.selectedDay);
  
  const [programExercise, setProgramExercise] = useState<ProgramExerciseCreateRequest>();
  const [isPendingAdd, setIsPendingAdd] = useState(false);
  const [isPendingUpdate, setIsPendingUpdate] = useState(false);
  const [isPendingRemove, setIsPendingRemove] = useState(false);
  
  useEffect(() => {
    if (selectedDay < 1 && selectedDay > 7) return; 
    
    var _isAdded = programExercises != null && programExercises.some(pe => pe.day == selectedDay); // && pe.exerciseId == exercise.id
    // this exercise is already exist on selected day
    if (_isAdded) {
      const relatedProgrmaExercise = programExercises.find(pe => pe.day == selectedDay); // && pe.exerciseId == exercise.id
      setProgramExercise(relatedProgrmaExercise);
    }
    else {
      setProgramExercise({
        programId: programId,
        exerciseId: exercise.id,
        day: selectedDay,
        numberOfSets: 0,
        numberOfRepetition: 0,
        time: 0,
      });
    }
  }, [selectedDay]);


  // ----------- Add Procesess -----------
  //#region
  const AddExerciseToProgram = async (): Promise<void> => {
    try {
      if (programExercise == null) return;

      setIsPendingAdd(true);
      const insertedData = await programService.AddExerciseToProgram(programExercise);
  
      if (insertedData != undefined) {
        dispatch(addProgramExercise(insertedData));
        
        setProgramExercise(insertedData);
      }
    }
    finally {
      setIsPendingAdd(false);
    }
  };
  //#endregion

  // ----------- Send Changes Procesess -----------
  //#region
  const SendChanges = async (): Promise<void> => {
    try {
      if (programExercise == null || programExercise.id == null) 
        return;

      setIsPendingUpdate(true);

      const dataToUpdate: UpdateExerciseOfProgramRequest = {
        programExerciseId: programExercise.id ?? '',
        numberOfSets: programExercise.numberOfSets ?? 0,
        numberOfRepetition: programExercise.numberOfRepetition ?? 0,
        time: programExercise.time ?? 0,
      };

      const updatedResponse = await programService.UpdateExerciseOfProgram(dataToUpdate);

      if (updatedResponse != undefined) {
        dispatch(updateProgramExercise(updatedResponse));
        
        setProgramExercise(updatedResponse);
      }
    }
    finally {
      setIsPendingUpdate(false);
    }
  };
  //#endregion

  // ----------- Remove Procesess -----------
  //#region
  const RemoveExerciseFromProgram = async (): Promise<void> => {
    try {
      if (programExercise == null || programExercise.id == null)
        return;

      setIsPendingRemove(true);

      await programService.RemoveExerciseFromProgram(programExercise.id);
 
      dispatch(removeProgramExercise({exerciseId: exercise.id, programExerciseId: programExercise.id}));
    }
    finally {
      setIsPendingRemove(false);
    }
  };
  //#endregion

  // ---------------- VALUE ONCHANGE HANDLERS (Set, Repetition, Time) ----------------
  //#region

  function ChangeNumberOfSets(value: number): void {
    if (programExercise == null || programExercise.id == null) return;
    
    const newInfo = programExercise.numberOfSets! + value;
    const _value = newInfo > 0 ? newInfo : 0;

    dispatch(setNumberOfSets({
      exerciseId: exercise.id,
      programExerciseId: programExercise.id,
      value: _value
    }));
     
    setProgramExercise(prev => 
      {
        if (prev == undefined) return prev;
        return {
          ...prev,
          numberOfSets: _value
        }
      }
    )
  }

  function ChangeNumberOfRepetition(value: number): void {
    if (programExercise == null || programExercise.id == null) return;
    
    const newInfo = programExercise.numberOfRepetition! + value;
    const _value = newInfo > 0 ? newInfo : 0;

    dispatch(setNumberOfRepetition({
      exerciseId: exercise.id,
      programExerciseId: programExercise.id,
      value: _value
    }));
        
    setProgramExercise(prev => 
      {
        if (prev == undefined) return prev;
        return {
          ...prev,
          numberOfRepetition: _value
        }
      }
    )
  }

  function ChangeNumberOfTime(value: number): void {
    if (programExercise == null || programExercise.id == null) return;
    
    const newInfo = programExercise.time! + value;
    const _value = newInfo > 0 ? newInfo : 0;
    
    dispatch(setValueOfTime({
      exerciseId: exercise.id,
      programExerciseId: programExercise.id,
      value: _value
    }));
    
    setProgramExercise(prev => 
      {
        if (prev == undefined) return prev;
        return {
          ...prev,
          time: _value
        }
      }
    )
  }
  //#endregion

  return (
    <ThemedView style={{marginHorizontal: 0}}>
      <HStack style={{justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <VStack className="w-4/6 mb-4">
          <ThemedText className="font-bold">{exercise?.name ?? 'No Info'}</ThemedText>
          <ThemedText className="font-light mb-2" type="custom" style={{fontSize: 11}}>
            {exercise.regions && exercise.regions.length > 0 && exercise.regions.map(r => r.name + ' ')}
          </ThemedText>
          <ThemedText type="custom" style={{fontWeight: "500", fontSize: 12}}>
            {exercise?.description ?? 'No Info'}
          </ThemedText>
        </VStack>
        <View className="w-24 border border-stone-200 dark:border-stone-700 rounded-xl shadow-xl p-0">
          <Image
            source={exerciseImageMap[exercise.id] || exerciseImageMap['placeholder']}
            // exercise.content ? exercise.content :
            alt="exercise"
            style={{width: '100%', height: '100%', objectFit: 'contain'}}
            borderRadius={9}
          />
        </View>
      </HStack>

      <HStack space="lg" className="content-between items-end"  style={{justifyContent: "space-between"}}>
        {programExercise != null && programExercise.id != null && 
          exercise.exerciseType == ExerciseType.Weight ?
            <HStack space='md' style={{justifyContent:"flex-end", alignSelf: "flex-end"}}>
              <TriggerInput label="Set" value={programExercise!.numberOfSets ?? 0} method={ChangeNumberOfSets} />
              <TriggerInput label='Repetition' value={programExercise!.numberOfRepetition ?? 0} method={ChangeNumberOfRepetition} />
            </HStack>:
          exercise.exerciseType == ExerciseType.Cardio ?
            <TriggerInput label='Minuthe' value={programExercise!.time ?? 0} method={ChangeNumberOfTime} /> : <></>
        }
      </HStack>

      <HStack style={{justifyContent: 'flex-end'}} space='md'>
        {isAdded && isChanged && 
          <ThemedButton 
            element={<FontAwesome6 name='pen-to-square' color={'#fff'} size={13} />}
            variant="warning"
            isPending={isPendingUpdate}
            isDisabled={isPendingUpdate}
            onPress={SendChanges}
          />
        }

        {isAdded ? 
          <ThemedButton
            element={<FontAwesome6 name='trash' iconStyle='solid' color={'#fff'} size={13} />}
            variant="danger"
            isPending={isPendingRemove}
            isDisabled={isPendingRemove}
            onPress={RemoveExerciseFromProgram}
            style={{alignSelf: 'flex-end'}}
          /> :
          programExercise != null && 
          <ThemedButton
            element={<FontAwesome6 name='circle-plus' iconStyle='solid' color={'#fff'} size={13} />}
            variant="primary"
            isPending={isPendingAdd}
            isDisabled={isPendingAdd}
            onPress={AddExerciseToProgram}
            style={{alignSelf: 'flex-end'}}
          />
        }
      </HStack>
    </ThemedView>
  );
}

export default ExerciseCard;