import React, {useEffect, useState} from 'react';
import {Input, InputField} from '@/components/ui/input';
import {Divider} from '@/components/ui/divider';
import {Button, ButtonIcon, ButtonText} from '@/components/ui/button';
import {HStack} from '@/components/ui/hstack';
import {Image} from '@/components/ui/image';
import {Spinner} from '@/components/ui/spinner';
import {Icon, CheckIcon, ChevronDownIcon} from '@/components/ui/icon';
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
import {NavigationProp, ParamListBase, useNavigation} from '@react-navigation/native';
import UpdateExerciseOfProgramRequest from '../../../models/Program/UpdateExerciseOfProgramRequest';
import AddExerciseToProgramRequest from '../../../models/Program/AddExerciseToProgramRequest';
import ProgramExerciseResponseDto from '../../../models/Program/ProgramExerciseResponseDto';
import {addOne, removeByProgramExerciseId, updateOne} from '../../../redux/reducers/ExercisesOnCreateProgram';
import ExerciseResponseDto from '../../../models/Exercise/ExerciseResponseDto';
import {RegionResponseDto} from '../../../models/Region/RegionResponseDto';
import {useAppDispatch} from '@/src/redux/hook';
import {ThemedText, ThemedView} from '../../global';
import {ExerciseType} from '@/src/constants/ExerciseTypes';
import {Pressable} from '@/components/ui/pressable';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {useColors} from '@/src/hooks';
import programService from '@/src/database/services/programService';
import { exerciseImageMap } from '@/assets/images/exercises';
import { View } from 'react-native';

type SectionProps = {
  exercise: ExerciseResponseDto;
  programExercises?: ProgramExerciseResponseDto[];
  regions?: RegionResponseDto[];
  programId: string;
  fetchExercisesOfProgram: () => void;
};

function ExerciseCard({exercise, programExercises, regions, programId, fetchExercisesOfProgram}: SectionProps): React.JSX.Element {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const dispatch = useAppDispatch();

  // -------- input change handle & is exercise exist in program state -------
  const [isChangedAnyValue, setIsChangedAnyValue] = React.useState<boolean>(false);
  const [isAdded, setIsAdded] = React.useState<boolean>(false);
  useEffect(() => {
    setIsChangedAnyValue(false);
    setIsAdded(false);
    setSelectedDay(0);
  }, []);

  // -------- Day change handle & temp programExercise data -------
  const [selectedDay, setSelectedDay] = useState(0);
  const [tempProgramExercise, setTempProgramExercise] = useState<ProgramExerciseResponseDto>();
  useEffect(() => {
    if (selectedDay >= 1 && selectedDay <= 7) {
      setIsChangedAnyValue(false);

      // this exercise is already exist on selected day
      if (programExercises != null && programExercises.some(pe => pe.day == selectedDay && pe.exerciseId == exercise.id)) {
        setTempProgramExercise(programExercises.find(pe => pe.day == selectedDay && pe.exerciseId == exercise.id));
        setIsAdded(true);
      } else {
        setIsAdded(false);
        setTempProgramExercise({
          id: '',
          day: selectedDay,
          programId: programId,
          exerciseId: exercise.id,
          addedDate: new Date(),
          numberOfSets: 0,
          numberOfRepetition: 0,
          time: 0,
        });
      }
    }
  }, [selectedDay]);

  // ----------- Add Procesess -----------
  const [isPendingAddProcess, setIsPendingAddProcess] = useState<boolean>(false);

  const AddExerciseToProgram = async (): Promise<void> => {
    try {
      setIsPendingAddProcess(true);
      const dataToInsert: AddExerciseToProgramRequest = {
        programId: programId,
        exerciseId: exercise.id,
        day: selectedDay,
        exerciseType: exercise.exerciseType,
        numberOfSets: tempProgramExercise?.numberOfSets ?? 0,
        numberOfRepetition: tempProgramExercise?.numberOfRepetition ?? 0,
        time: tempProgramExercise?.time ?? 0,
      };

      const insertedResponse = await programService.AddExerciseToProgram(dataToInsert);

      fetchExercisesOfProgram();

      if (insertedResponse != undefined) {
        dispatch(addOne(insertedResponse));
        setTempProgramExercise(insertedResponse);
      }

      setIsChangedAnyValue(false);
      setIsAdded(true);
    } finally {
      setIsPendingAddProcess(false);
    }
  };

  // ----------- Send Changes Procesess -----------
  const [isPendingSendChangesProcess, setIsPendingSendChangesProcess] = useState<boolean>(false);

  const SendChanges = async (): Promise<void> => {
    try {
      if (tempProgramExercise?.id == null) {
        return;
      }
      setIsPendingSendChangesProcess(true);

      const dataToUpdate: UpdateExerciseOfProgramRequest = {
        programExerciseId: tempProgramExercise?.id ?? '',
        exerciseType: exercise.exerciseType,
        numberOfSets: tempProgramExercise?.numberOfSets ?? 0,
        numberOfRepetition: tempProgramExercise?.numberOfRepetition ?? 0,
        time: tempProgramExercise?.time ?? 0,
      };

      const updatedResponse = await programService.UpdateExerciseOfProgram(dataToUpdate);
      fetchExercisesOfProgram();

      if (updatedResponse != undefined) {
        dispatch(updateOne(updatedResponse));
        setTempProgramExercise(updatedResponse);
      }
      setIsChangedAnyValue(false);
    } finally {
      setIsPendingSendChangesProcess(false);
    }
  };

  // ----------- Remove Procesess -----------
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isPendingRemoveProcess, setIsPendingRemoveProcess] = useState<boolean>(false);

  const RemoveExerciseFromProgram = async (): Promise<void> => {
    try {
      if (tempProgramExercise?.id == null) {
        return;
      }

      setIsPendingRemoveProcess(true);

      await programService.RemoveExerciseFromProgram(tempProgramExercise?.id);

      fetchExercisesOfProgram();

      dispatch(removeByProgramExerciseId(tempProgramExercise?.id));

      setIsAdded(false);
    } finally {
      setIsPendingRemoveProcess(false);
      setShowDeleteModal(false);
    }
  };

  // ---------------- VALUE ONCHANGE HANDLERS (Set, Repetition, Time) ----------------
  function ChangeNumberOfSets(value: number, textInput: boolean): void {
    let newInfo = textInput ? value : tempProgramExercise?.numberOfSets! + value;
    newInfo = newInfo >= 0 ? newInfo : 0;
    setIsChangedAnyValue(true);

    setTempProgramExercise(prev => {
      return prev != null ? {...prev, numberOfSets: newInfo} : undefined;
    });
  }

  function ChangeNumberOfRepetition(value: number, textInput: boolean): void {
    let newInfo = textInput ? value : tempProgramExercise?.numberOfRepetition! + value;
    newInfo = newInfo >= 0 ? newInfo : 0;
    setIsChangedAnyValue(true);

    setTempProgramExercise(prev => {
      return prev != null ? {...prev, numberOfRepetition: newInfo} : undefined;
    });
  }

  function ChangeNumberOfTime(value: number): void {
    let newInfo = value >= 0 ? value : 0;
    setIsChangedAnyValue(true);

    setTempProgramExercise(prev => {
      return prev != null ? {...prev, time: newInfo} : undefined;
    });
  }

  return (
    <>
      <ThemedView style={{marginHorizontal:0}}>
        <HStack style={{justifyContent: "space-between", alignItems: "flex-start"}}>
          <VStack className="w-4/6 mb-4">
            <ThemedText className="font-bold">{exercise?.name ?? 'No Info'}</ThemedText>
            <ThemedText className="text-10 font-light mb-1" type="custom">
              {regions && regions.length > 0 && regions.map(r => r.name + ' ')}
            </ThemedText>
            <ThemedText className="text-11 font-bold" type="custom">
              {exercise?.description ?? 'No Info'}
            </ThemedText>
          </VStack>
          <View className="w-24 border rounded-xl shadow-xl p-0">
            <Image
              source={exerciseImageMap[exercise.id] || exerciseImageMap["placeholder"]}
              // exercise.content ? exercise.content :
              alt="exercise"
              style={{width: '100%', height: '100%', objectFit: 'contain'}}
              borderRadius={9}
            />
          </View>
        </HStack>

        <Divider className="mb-2" />

        <HStack className="content-between items-end">
          <HStack space="lg" className="items-end">
            <VStack>
              <ThemedText className="text-xs font-bold ml-1 min-w-12" type="custom">
                Day
              </ThemedText>
              <Select onValueChange={e => setSelectedDay(parseInt(e))} className="w-32">
                <SelectTrigger variant="outline" className="bg-white dark:bg-stone-700" size="sm">
                  <SelectInput placeholder="Select day" size='sm' />
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
                    <SelectItem label="Monday" value="1" isDisabled={selectedDay == 1} />
                    <SelectItem label="Tuesday" value="2" isDisabled={selectedDay == 2} />
                    <SelectItem label="Wednesday" value="3" isDisabled={selectedDay == 3} />
                    <SelectItem label="Thurseday" value="4" isDisabled={selectedDay == 4} />
                    <SelectItem label="Friday" value="5" isDisabled={selectedDay == 5} />
                    <SelectItem label="Saturday" value="6" isDisabled={selectedDay == 6} />
                    <SelectItem label="Sunday" value="7" isDisabled={selectedDay == 7} />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </VStack>

            {exercise.exerciseType == ExerciseType.Weight && (
              <HStack space="lg" className="items-end">
                {/* Set Cahnge Field */}
                <VStack>
                  <ThemedText className="text-2xs font-light min-w-12 ml-2" type="custom">
                    Set
                  </ThemedText>
                  {isAdded ? (
                    <TrigerInput
                      method={ChangeNumberOfSets}
                      data={tempProgramExercise?.numberOfSets!}
                      key={`setSetCountTriger_${tempProgramExercise?.id}`}
                    />
                  ) : (
                    <Input
                      isDisabled={selectedDay < 1 || selectedDay > 7}
                      variant="outline"
                      size="sm"
                      className="rounded-lg bg-white dark:bg-stone-700">
                      <InputField
                        keyboardType="number-pad"
                        textAlign="center"
                        size="xs"
                        value={tempProgramExercise?.numberOfSets?.toString()}
                        onChangeText={e => ChangeNumberOfSets(parseInt(e), true)}
                      />
                    </Input>
                  )}
                </VStack>

                {/* Repetition Cahnge Field  */}
                <VStack>
                  <ThemedText className="text-2xs font-light ml-2" type="custom">
                    Repetition
                  </ThemedText>
                  {isAdded ? (
                    <TrigerInput
                      method={ChangeNumberOfRepetition}
                      data={tempProgramExercise?.numberOfRepetition!}
                      key={`setRepCountTriger_${tempProgramExercise?.id}`}
                    />
                  ) : (
                    <Input
                      isDisabled={selectedDay < 1 || selectedDay > 7}
                      variant="outline"
                      size="sm"
                      className="rounded-lg bg-white dark:bg-stone-700">
                      <InputField
                        keyboardType="number-pad"
                        textAlign="center"
                        size="xs"
                        value={tempProgramExercise?.numberOfRepetition?.toString()}
                        onChangeText={e => ChangeNumberOfRepetition(parseInt(e), true)}
                      />
                    </Input>
                  )}
                </VStack>
              </HStack>
            )}

            {/* Time Cahnge Field */}
            {exercise.exerciseType == ExerciseType.Cardio && (
              <VStack>
                <ThemedText className="text-2xs font-light min-w-12" type="custom">
                  Minuthe
                </ThemedText>
                <Input variant="outline" size="sm" className="rounded-lg">
                  <InputField
                    keyboardType="number-pad"
                    textAlign="center"
                    size="xs"
                    value={((tempProgramExercise?.time ?? 0) / 60).toString()}
                    onChangeText={e => ChangeNumberOfTime(parseFloat(e) * 60)}
                  />
                </Input>
              </VStack>
            )}

            {/* Button Save Changes */}
            {isAdded && isChangedAnyValue && (
              <Pressable onPress={SendChanges} $active-opacity="$50" className="rounded-lg p-2 bg-amber-500">
                {isPendingSendChangesProcess ? <Spinner color="white" size={'small'} /> : <ButtonIcon as={CheckIcon} color="$white" size="sm" />}
              </Pressable>
            )}
          </HStack>
        </HStack>

        <Divider className="my-2" />

        {/* Button Add & Remove */}
        {isAdded ? (
          <Button className="rounded-lg self-end" size="xs" variant="solid" action="negative" onPress={RemoveExerciseFromProgram}>
            {isPendingRemoveProcess ? (
              <Spinner color="white" size={'small'} />
            ) : (
              // <ButtonIcon as={TrashIcon} />
              <ButtonText>Remove</ButtonText>
            )}
          </Button>
        ) : (
          tempProgramExercise != null && (
            <Button className="rounded-lg self-end" size="xs" variant="solid" action="primary" onPress={AddExerciseToProgram}>
              {isPendingAddProcess ? (
                <Spinner color="white" size={'small'} />
              ) : (
                // <ButtonIcon as={PlusCircle} />
                <ButtonText>Add</ButtonText>
              )}
            </Button>
          )
        )}
      </ThemedView>
    </>
  );
}

export default ExerciseCard;

type TrigerInputProps = {
  data: number | string;
  method: (value: number, textInput: boolean) => void;
};

function TrigerInput({data, method}: TrigerInputProps) {
  const colors = useColors();
  return (
    <HStack className="rounded-xl items-center gap-2 p-1 bg-stone-200 dark:bg-stone-800">
      <Pressable className="rounded-lg p-1 bg-stone-200 dark:bg-stone-800" onPress={() => method(-1, false)}>
        <FontAwesome6 name="minus" iconStyle="solid" color={colors.background} size={14} />
      </Pressable>
      <ThemedText className="text-xs font-bold" type="custom">
        {data}
      </ThemedText>
      <Pressable className="rounded-lg p-1 bg-stone-200 dark:bg-stone-800" onPress={() => method(1, false)}>
        <FontAwesome6 name="plus" iconStyle="solid" color={colors.background} size={14} />
      </Pressable>
    </HStack>
  );
}
