//#region imports
import AppLayout from '../layouts/AppLayout';
import Stepper from '../components/programs/create/Stepper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/App';
import {RouteEnums} from '../constants/RouteNames';
import {useEffect} from 'react';
import {VStack} from '@/components/ui/vstack';
import {Heading} from '@/components/ui/heading';
import {Divider} from '@/components/ui/divider';
import TargetRegion from '../components/programs/create/TargetRegion';
import programService from '../database/services/programService';
import regionService from '../database/services/regionService';
import FormProgramCreate from '../components/programs/create/FormProgramCreate';
import ExerciseCard from '../components/programs/create/ExerciseCard';
import {ThemedAlert} from '../components/global';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import {resetStates, setExerciseList, setRegionList} from '../redux/reducers/StatesCreateProgram';
import {RootState} from '../redux/Store';
import DayPreview from '../components/programs/create/DayPreview';
//#endregion

type SectionProps = NativeStackScreenProps<RootStackParamList, RouteEnums.createProgram>;

export default function CreateProgramScreen(props: SectionProps) {
  const dispatch = useAppDispatch();

  const createdProgram = useAppSelector((state: RootState) => state.statesCreateProgram.createdProgram);
  const exerciseList = useAppSelector((state: RootState) => state.statesCreateProgram.exerciseList);
  const steps = useAppSelector((state: RootState) => state.statesCreateProgram.stepps);
  const selectedRegionList = useAppSelector((state: RootState) => state.statesCreateProgram.selectedRegionList);

  //#region Get Region List & Exist Exercises of Program
  useEffect(() => {
    dispatch(resetStates());
    fetchRegionList();
  }, []);

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
      createdProgram!.id,
      selectedRegionList.map(r => r.id),
    );
    dispatch(setExerciseList(response));
  };
  //#endregion

  return (
    <AppLayout returnHomeEnable={true} returnbackEnable={true}>
      <Stepper data={steps} />
      {steps[0].isActive ? (
        <FormProgramCreate />
      ) : (
        <>
          <TargetRegion />
          <Heading size="sm" className="mt-5 mb-1">
            Exercises
          </Heading>
          <Divider />
          <VStack className="my-2" space="xl">
            {selectedRegionList.length <= 0 ? (
              <ThemedAlert text="You didnt select any region!" />
            ) : (
              exerciseList != null &&
              exerciseList.length > 0 &&
              createdProgram?.id != null &&
              exerciseList.map((data, key) => <ExerciseCard key={key} exerciseAddProgramModel={data} programId={createdProgram?.id} />)
            )}
          </VStack>
          <DayPreview />
        </>
      )}
    </AppLayout>
  );
}
