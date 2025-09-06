//#region imports
import React, {useState} from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionIcon,
} from '@/components/ui/accordion';
import {ChevronDownIcon, ChevronUpIcon} from '@/components/ui/icon';
import ProgramDetailModel from '@/src/models/program/ProgramDetailModel';
import ProgramExerciseDetailModel from '@/src/models/programExercise/ProgramExerciseDetailModel';
import {ThemedButton, ThemedText, ThemedView} from '../../global';
import {HStack} from '@/components/ui/hstack';
import {VStack} from '@/components/ui/vstack';
import {ImageBackground, Pressable, View} from 'react-native';
import {Image} from '@/components/ui/image';
import {exerciseImageMap} from '@/assets/images/exercises';
import {ExerciseType} from '@/src/constants/ExerciseTypes';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {useColors} from '@/src/hooks';
import programService from '@/src/database/services/programService';
import UpdateExerciseOfProgramRequest from '@/src/models/programExercise/ProgramExerciseUpdateRequest';
import {useAppDispatch} from '@/src/redux/hook';
import {
  removeProgramExercise,
  setNumberOfRepetition,
  setNumberOfSets,
  setValueOfTime,
  updateProgramExercise,
} from '@/src/redux/reducers/StatesProgramList';
import {NavigationProp, ParamListBase, useNavigation} from '@react-navigation/native';
import {Text} from '@/components/ui/text';
import {RouteEnums} from '@/src/constants/RouteNames';
//#endregion

type dayUI = {
  text: string;
  isSelected: boolean;
  index: number;
};

const defaultDayList: dayUI[] = [
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
];

export default function ProgramAccordion({programDetail}: {programDetail: ProgramDetailModel}) {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [dayList, setDayList] = useState<dayUI[]>(defaultDayList);
  const [expendedState, setExpendedState] = useState(false);

  return (
    <Accordion
      size="md"
      variant="unfilled"
      type="single"
      isCollapsible={true}
      isDisabled={false}
      onValueChange={acrodionItem => setExpendedState(acrodionItem.length > 0)}
      className="my-2 p-0 w-full border border-zinc-300 rounded-xl bg-white dark:bg-zinc-700">
      <AccordionItem value="a">
        <AccordionHeader className={expendedState ? 'rounded-t-xl bg-zinc-100 dark:bg-zinc-300' : 'rounded-xl bg-zinc-100 dark:bg-zinc-300'}>
          <AccordionTrigger>
            {({isExpanded}: {isExpanded: boolean}) => {
              return (
                <>
                  <AccordionTitleText className="text-zinc-600 dark:text-white">{programDetail.program.name}</AccordionTitleText>
                  {isExpanded ? <AccordionIcon as={ChevronUpIcon} className="ml-3" /> : <AccordionIcon as={ChevronDownIcon} className="ml-3" />}
                </>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent className="p-0">
          <DaySelector dayList={dayList} setDayList={setDayList} />
          <Pressable className="m-3 opacity-80" onPress={() => navigation.navigate(RouteEnums.editProgram, {programId: programDetail.program.id})}>
            <ImageBackground className="py-4" imageStyle={{borderRadius: 8}} source={require('@/assets/images/bacgrounds/gym-background.jpg')}>
              <HStack className="self-center items-center" space={2}>
                <ThemedText className="text-center font-thin me-2" style={{color: '#fff'}}>
                  Add Exercises
                </ThemedText>
                <FontAwesome6 name="circle-plus" iconStyle="solid" color={'#fff'} size={16} />
              </HStack>
            </ImageBackground>
          </Pressable>

          {programDetail.programExercises
            .filter(f => f.day === dayList.find(x => x.isSelected)?.index)
            .map((pe, index) => (
              <ExerciseRow key={index} programExerciseDetail={pe} programId={programDetail.program.id} />
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function ExerciseRow({programExerciseDetail, programId}: {programExerciseDetail: ProgramExerciseDetailModel; programId: string}) {
  const dispatch = useAppDispatch();

  const [isChanged, setIsChanged] = useState(false);
  const [isPendingUpdate, setIsPendingUpdate] = useState(false);
  const [isPendingRemove, setIsPendingRemove] = useState(false);

  // ----------- Send Update Request -----------
  //#region
  const SendUpdateRequest = async (): Promise<void> => {
    try {
      setIsPendingUpdate(true);

      const dataToUpdate: UpdateExerciseOfProgramRequest = {
        programExerciseId: programExerciseDetail.programExerciseId ?? '',
        numberOfSets: programExerciseDetail.numberOfSets ?? 0,
        numberOfRepetition: programExerciseDetail.numberOfRepetition ?? 0,
        time: programExerciseDetail.time ?? 0,
      };

      const updatedResponse = await programService.UpdateExerciseOfProgram(dataToUpdate);

      if (updatedResponse != undefined) {
        dispatch(updateProgramExercise(updatedResponse));
      }
      setIsChanged(false);
    } finally {
      setIsPendingUpdate(false);
    }
  };
  //#endregion

  // ----------- Remove Procesess -----------
  //#region
  const SendRemoveRequest = async (): Promise<void> => {
    try {
      setIsPendingRemove(true);

      await programService.RemoveExerciseFromProgram(programExerciseDetail.programExerciseId);

      dispatch(removeProgramExercise({programId: programId, programExerciseId: programExerciseDetail.programExerciseId}));
    } finally {
      setIsPendingRemove(false);
    }
  };
  //#endregion

  // ---------------- VALUE ONCHANGE HANDLERS (Set, Repetition, Time) ----------------
  //#region
  function ChangeNumberOfSets(value: number): void {
    const newInfo = programExerciseDetail.numberOfSets! + value;
    const _value = newInfo > 0 ? newInfo : 0;

    dispatch(
      setNumberOfSets({
        programId: programId,
        programExerciseId: programExerciseDetail.programExerciseId,
        value: _value,
      }),
    );

    setIsChanged(true);
  }

  function ChangeNumberOfRepetition(value: number): void {
    const newInfo = programExerciseDetail.numberOfRepetition! + value;
    const _value = newInfo > 0 ? newInfo : 0;

    dispatch(
      setNumberOfRepetition({
        programId: programId,
        programExerciseId: programExerciseDetail.programExerciseId,
        value: _value,
      }),
    );

    setIsChanged(true);
  }

  function ChangeNumberOfTime(value: number): void {
    const newInfo = programExerciseDetail.time! + value;
    const _value = newInfo > 0 ? newInfo : 0;

    dispatch(
      setValueOfTime({
        programId: programId,
        programExerciseId: programExerciseDetail.programExerciseId,
        value: _value,
      }),
    );

    setIsChanged(true);
  }
  //#endregion

  return (
    <ThemedView style={{marginBottom: 4, borderRadius: 0, borderBottomWidth: 0}}>
      <HStack style={{justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <VStack className="w-4/6 mb-4">
          <ThemedText className="font-bold">{programExerciseDetail.name ?? 'No Info'}</ThemedText>
          <ThemedText className="font-light mb-1" type="custom" style={{fontSize: 10}}>
            {programExerciseDetail.regions && programExerciseDetail.regions.map(r => r.name + ' ')}
          </ThemedText>
          <ThemedText className="font-medium" type="custom" style={{fontSize: 12}}>
            {programExerciseDetail.description ?? 'No Info'}
          </ThemedText>
        </VStack>
        <View className="border border-stone-200 dark:border-stone-700 rounded-xl shadow-xl p-0">
          <Image
            source={exerciseImageMap[programExerciseDetail.exerciseId] || exerciseImageMap['placeholder']}
            alt="exercise"
            style={{width: '100%', height: '100%', objectFit: 'contain'}}
            borderRadius={9}
          />
        </View>
      </HStack>

      <HStack
        space="lg"
        className="content-between items-end mt-1 pt-2 border-t border-stone-200 dark:border-stone-700"
        style={{justifyContent: 'space-between'}}>
        {programExerciseDetail.exerciseType == ExerciseType.Weight && (
          <HStack space="md" style={{justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
            <TriggerInput label="Set" value={programExerciseDetail!.numberOfSets ?? 0} method={ChangeNumberOfSets} />
            <TriggerInput label="Reps" value={programExerciseDetail!.numberOfRepetition ?? 0} method={ChangeNumberOfRepetition} />
          </HStack>
        )}
        {programExerciseDetail.exerciseType == ExerciseType.Cardio && (
          <TriggerInput label="Minuthe" value={programExerciseDetail!.time ?? 0} method={ChangeNumberOfTime} />
        )}
        <HStack style={{justifyContent: 'flex-end'}} space="md">
          {isChanged && (
            <ThemedButton
              element={<FontAwesome6 name="pen-to-square" color={'#fff'} size={14} />}
              variant="warning"
              size="sm"
              isPending={isPendingUpdate}
              isDisabled={isPendingUpdate}
              onPress={SendUpdateRequest}
            />
          )}
          <ThemedButton
            element={<FontAwesome6 name="trash" iconStyle="solid" color={'#fff'} size={14} />}
            variant="danger"
            size="sm"
            isPending={isPendingRemove}
            isDisabled={isPendingRemove}
            onPress={SendRemoveRequest}
            style={{alignSelf: 'flex-end'}}
          />
        </HStack>
      </HStack>
    </ThemedView>
  );
}

function TriggerInput(props: {label: string; value: number; method: (value: number) => void}) {
  const colors = useColors();

  return (
    <VStack>
      <ThemedText className="text-xs font-bold ml-1 mb-1" type="custom">
        {props.label}
      </ThemedText>
      <HStack className="rounded-xl items-center gap-2 p-1 bg-stone-200 dark:bg-stone-800">
        <Pressable className="rounded-lg p-2 bg-stone-50 dark:bg-stone-500" onLongPress={() => props.method(0)} onPress={() => props.method(-1)}>
          <FontAwesome6 name="minus" iconStyle="solid" color={colors.text} size={10} />
        </Pressable>
        <ThemedText className="mx-2 font-bold" type="custom">
          {props.value}
        </ThemedText>
        <Pressable className="rounded-lg p-2 bg-stone-50 dark:bg-stone-500" onLongPress={() => props.method(15)} onPress={() => props.method(1)}>
          <FontAwesome6 name="plus" iconStyle="solid" color={colors.text} size={10} />
        </Pressable>
      </HStack>
    </VStack>
  );
}

function DaySelector({dayList, setDayList}: {dayList: dayUI[]; setDayList: React.Dispatch<React.SetStateAction<dayUI[]>>}) {
  const selectDay = (value: number) => {
    setDayList(prev =>
      dayList.map(d => {
        return {
          ...d,
          isSelected: d.index == value,
        };
      }),
    );
  };

  return (
    <HStack space={0} className="py-2 m-0 border-b border-zinc-300 bg-zinc-100 dark:bg-zinc-500" style={{justifyContent: 'center'}}>
      {dayList.map((data, i) => (
        <Pressable key={i} onPress={() => selectDay(data.index)} className={'text-center w-12'}>
          <Text className={data.isSelected ? 'text-center text-orange-400 font-bold' : 'text-center text:stone-700 dark:text-white'}>
            {data.text}
          </Text>
          <View className={data.isSelected ? 'border-t border-orange-400 my-2' : 'border-t border-zinc-400 opacity-50 my-2'} />
        </Pressable>
      ))}
    </HStack>
  );
}
