//#region imports
import React, {useEffect, useState} from 'react';
import {Divider} from '@/components/ui/divider';
import {HStack} from '@/components/ui/hstack';
import {Image} from '@/components/ui/image';
import {Icon, ChevronDownIcon} from '@/components/ui/icon';
import {VStack} from '@/components/ui/vstack';
import {
  Select,
  SelectInput,
  SelectIcon,
  SelectTrigger,
  SelectPortal,
  SelectBackdrop,
  SelectDragIndicatorWrapper,
  SelectContent,
  SelectItem,
  SelectDragIndicator,
} from '@/components/ui/select';
import UpdateExerciseOfProgramRequest from '@/src/models/programExercise/ProgramExerciseUpdateRequest';
import {addProgramExercise, ExerciseAddProgramUIModel, removeProgramExercise, setNumberOfRepetition, setNumberOfSets, setSelectedDay, setValueOfTime, updateProgramExercise} from '../../../redux/reducers/StatesCreateProgram';
import {useAppDispatch} from '@/src/redux/hook';
import {ThemedButton,ThemedText, ThemedView} from '../../global';
import {ExerciseType} from '@/src/constants/ExerciseTypes';
import {Pressable} from '@/components/ui/pressable';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {useColors} from '@/src/hooks';
import programService from '@/src/database/services/programService';
import {exerciseImageMap} from '@/assets/images/exercises';
import {View} from 'react-native';
import ProgramExerciseCreateRequest from '@/src/models/programExercise/ProgramExerciseCreateRequest';
import TriggerInput from '../../general/TriggerInput';
//#endregion

type SectionProps = {
  exerciseAddProgramModel: ExerciseAddProgramUIModel;
  programId: string;
};

function ExerciseCard({exerciseAddProgramModel, programId}: SectionProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {exercise, programExercises, selectedDay, isAdded, isChanged} = exerciseAddProgramModel;
  
  const [programExercise, setProgramExercise] = useState<ProgramExerciseCreateRequest>();
  const [isPendingAdd, setIsPendingAdd] = useState(false);
  const [isPendingUpdate, setIsPendingUpdate] = useState(false);
  const [isPendingRemove, setIsPendingRemove] = useState(false);
  
  useEffect(() => {
    if (selectedDay < 1 && selectedDay > 7) return; 
    
    // this exercise is already exist on selected day
    if (isAdded) {
      const relatedProgrmaExercise = programExercises.find(pe => pe.day == selectedDay && pe.exerciseId == exercise.id);
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
  function ChangeSelectedDay(e: string): void {
    dispatch(setSelectedDay({day: parseInt(e), exerciseId: exercise.id}));
  }

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
          <ThemedText className="text-10 font-light mb-1" type="custom">
            {exercise.regions && exercise.regions.length > 0 && exercise.regions.map(r => r.name + ' ')}
          </ThemedText>
          <ThemedText className="text-11 font-bold" type="custom">
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

      <Divider className="mb-2" />

      <HStack space="lg" className="content-between items-end"  style={{justifyContent: "space-between"}}>
                
        <SelectBoxDaySelection stateSelectedDay={selectedDay} onChange={ChangeSelectedDay} />

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
      
      <HStack style={{justifyContent: 'flex-end', marginTop: 12}} space='md'>
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

export function SelectBoxDaySelection(props: { stateSelectedDay: number; onChange: (value: string) => void; }) 
{
  return (
    <VStack>
      <ThemedText className="text-xs font-bold ml-1 mb-1 min-w-12" type="custom">
        Day
      </ThemedText>
      <Select onValueChange={e => props.onChange(e)} className="w-36">
        <SelectTrigger variant="outline" className="bg-white dark:bg-stone-700" size="sm">
          <SelectInput placeholder="Select day" size="sm" />
          <SelectIcon>
            <Icon as={ChevronDownIcon} size="2xs" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            <SelectItem label="Monday" value="1" isDisabled={props.stateSelectedDay == 1} />
            <SelectItem label="Tuesday" value="2" isDisabled={props.stateSelectedDay == 2} />
            <SelectItem label="Wednesday" value="3" isDisabled={props.stateSelectedDay == 3} />
            <SelectItem label="Thurseday" value="4" isDisabled={props.stateSelectedDay == 4} />
            <SelectItem label="Friday" value="5" isDisabled={props.stateSelectedDay == 5} />
            <SelectItem label="Saturday" value="6" isDisabled={props.stateSelectedDay == 6} />
            <SelectItem label="Sunday" value="7" isDisabled={props.stateSelectedDay == 7} />
          </SelectContent>
        </SelectPortal>
      </Select>
    </VStack>
  );
}
