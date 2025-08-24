//#region imports
import AppLayout from '../layouts/AppLayout';
import Stepper, {StepperProps} from '../components/programs/createNewProgram/Stepper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/App';
import {RouteEnums} from '../constants/RouteNames';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import {RootState} from '../redux/Store';
import {RegionResponseDto} from '../models/Region/RegionResponseDto';
import {setAll} from '../redux/reducers/ExercisesOnCreateProgram';
import ProgramExerciseResponseModel from '../models/exercise/ProgramExerciseResponseModel';
import {VStack} from '@/components/ui/vstack';
import {Card} from '@/components/ui/card';
import {Heading} from '@/components/ui/heading';
import {Divider} from '@/components/ui/divider';
import TargetRegion from '../components/general/TargetRegion';
import programService from '../database/services/programService';
import regionService from '../database/services/regionService';
import exerciseService from '../database/services/exerciseService';
import FormProgramCreate from '../components/programs/createNewProgram/FormProgramCreate';
import ProgramResponseDto from '../models/program/ProgramResponseDto';
import ExerciseCard from '../components/programs/createNewProgram/ExerciseCard';
import {ThemedAlert} from '../components/global/ThemedAlert';
//#endregion

const defaultStepps: StepperProps[] = [
  {title: 'Create Program', step: 1, isActive: true},
  {title: 'Add Exercises', step: 2, isActive: false},
];

type SectionProps = NativeStackScreenProps<RootStackParamList, RouteEnums.createNewProgram>;

export default function CreateNewProgramScreen({navigation, route}: SectionProps) {
  // ******************* TAB 1 PROPERTIES *****************
  const [steps, setSteps] = useState<StepperProps[]>(defaultStepps);
  const [createdProgram, setCreatedProgram] = useState<ProgramResponseDto>();

  const SwipeToStep = (nextStep: number) => {
    setSteps(prev =>
      prev.map(step => {
        if (step.isActive && step.step != nextStep) {
          return {...step, isActive: false};
        }
        if (step.step == nextStep) {
          return {...step, isActive: true};
        }
        return step;
      }),
    );
  };

  // ******************* TAB 2 PROPERTIES *****************
  const dispatch = useAppDispatch();
  const exerciseList = useAppSelector((state: RootState) => state.exercisesOnCreateProgram.exerciseList);

  const [regionList, setRegionList] = useState<RegionResponseDto[]>([]);
  const [selectedRegionIDList, setSelectedRegionIDList] = useState<string[]>([]);

  // ---------- Get Region List & Exist Exercises of Program ----------
  useEffect(() => {
    const fetchRegionList = async () => {
      const response = await regionService.GetAll();
      setRegionList(response);
    };

    fetchRegionList();
  }, []);

  // ---------- Handle region selection on change ----------
  useEffect(() => {
    if (selectedRegionIDList.length == 0) {
      dispatch(setAll([]));
    } else {
      fetchExerciseData();
    }
  }, [selectedRegionIDList]);

  const fetchExerciseData = async () => {
    const response = await programService.GetProgramExercisesInteractionByRegion(createdProgram!.id, selectedRegionIDList);
    dispatch(setAll(response));
  };

  // ---------- Fetch Exist Exercises of Program ----------
  const [currentExercisesOfProgram, setCurrentExercisesOfProgram] = useState<ProgramExerciseResponseModel[]>([]);

  const fetchExercisesOfProgram = async () => {
    const response = await exerciseService.GetAllByProgram(createdProgram!.id);
    setCurrentExercisesOfProgram(response);
  };

  return (
    <AppLayout returnHomeEnable={true} returnbackEnable={true}>
      <Stepper data={steps} />
      {steps[0].isActive ? (
        <FormProgramCreate stepps={defaultStepps} swipeToStep={SwipeToStep} setCreatedProgram={setCreatedProgram} />
      ) : (
        <>
          <TargetRegion regionList={regionList} selectedRegionIDList={selectedRegionIDList} setSelectedRegionIDList={setSelectedRegionIDList} />
 
          <Heading size="sm" className='mt-5 mb-1'>Exercises</Heading>
          
          <Divider /> 

          <VStack className='mt-2' space='xl'>
            {selectedRegionIDList.length <= 0 ? (
              <ThemedAlert text="You didnt select any region!" />
            ) : (
              exerciseList != null &&
              exerciseList.length > 0 &&
              createdProgram?.id != null &&
              exerciseList.map((data, key) => (
                <ExerciseCard
                  key={key}
                  exercise={data.exercise}
                  programExercises={data.programExercises}
                  regions={data.regions}
                  programId={createdProgram?.id}
                  fetchExercisesOfProgram={fetchExercisesOfProgram}
                />
              ))
            )}
          </VStack> 
        </>
      )}
    </AppLayout>
  );
}
