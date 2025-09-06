//#region imports
import AppLayout from '../layouts/AppLayout';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/App';
import {RouteEnums} from '../constants/RouteNames';
import {useEffect, useState} from 'react';
import {VStack} from '@/components/ui/vstack';
import {Heading} from '@/components/ui/heading';
import {Divider} from '@/components/ui/divider';
import programService from '../database/services/programService';
import regionService from '../database/services/regionService';
import {ThemedAlert, ThemedView} from '../components/global';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import {resetStates, setExerciseList, setProgram, setRegionList, setSelectedDay} from '../redux/reducers/StatesEditProgram';
import {RootState} from '../redux/Store';
import TargetRegion from '../components/programs/edit/TargetRegion';
import { HStack } from '@/components/ui/hstack';
import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import ExerciseCard from '../components/programs/edit/ExerciseCard';
import { useColors, useColorScheme } from '../hooks';
//#endregion

type SectionProps = NativeStackScreenProps<RootStackParamList, RouteEnums.editProgram>;

export default function EditProgramScreen(props: SectionProps) {
  const dispatch = useAppDispatch();

  const program = useAppSelector((state: RootState) => state.statesEditProgram.program);
  const exerciseList = useAppSelector((state: RootState) => state.statesEditProgram.exerciseList);
  const selectedRegionList = useAppSelector((state: RootState) => state.statesEditProgram.selectedRegionList);

  //#region Get Region List & Exist Exercises of Program
  useEffect(() => {
    // dispatch(resetStates());
    fetchProgram();
    fetchRegionList();
  }, []);

  const fetchProgram = async () => {
    const response = await programService.Get(props.route.params.programId);
    dispatch(setProgram(response));
  };

  const fetchRegionList = async () => {
    const response = await regionService.GetAll();
    dispatch(setRegionList(response));
  };
  //#endregion

  //#region  Handle region selection on change
  useEffect(() => {
    if (selectedRegionList.length > 0) {
      fetchExerciseData();
    }
  }, [selectedRegionList]);

  const fetchExerciseData = async () => {
    const response = await programService.GetProgramExercisesCreateModels(
      program!.id,
      selectedRegionList.map(r => r.id),
    );
    dispatch(setExerciseList(response));
  };
  //#endregion

  return (
    <AppLayout returnHomeEnable={true} returnbackEnable={true}>
      <TargetRegion />
      <DaySelector />
      <VStack className="my-2" space="xl">
        {selectedRegionList.length <= 0 ? (
          <ThemedAlert text="You didnt select any region!" />
        ) : (
          exerciseList != null && exerciseList.length > 0 && program?.id != null &&
          exerciseList.map((data, key) => <ExerciseCard key={key} exerciseAddProgramModel={data} programId={program?.id} />)
        )}
      </VStack>
    </AppLayout>
  );
}



function DaySelector() {
 
  const dispatch = useAppDispatch(); 
  const colors = useColors();
  const dayList = useAppSelector((state: RootState) => state.statesEditProgram.dayList);
  const selectedDay = useAppSelector((state: RootState) => state.statesEditProgram.selectedDay);

  const selectDay = (value: number) => {
    dispatch(setSelectedDay(value));
  };

  return (
    <View
      style={[
        {backgroundColor: colors.bodyBackground},
        {borderBottomLeftRadius: 8, borderBottomRightRadius: 8, marginTop: 0, padding: 12, borderWidth: 1, borderTopWidth:0, borderColor: colors.border},
      ]}
    >
      <HStack space={0} style={{justifyContent: 'center'}}>
        {dayList.map((data, i) => (
          <Pressable key={i} onPress={() => selectDay(data.index)} className={'text-center w-12'}>
            <Text className={data.index == selectedDay ? 'text-center text-orange-400 font-bold' : 'text-center text:stone-700 dark:text-white'}>
              {data.text}
            </Text>
            <View className={data.index == selectedDay ? 'border-t border-orange-400 my-2' : 'border-t border-zinc-400 opacity-50 my-2'} />
          </Pressable>
        ))}
      </HStack>
    </View>
  );
}
