import {ThemedAlert, ThemedText} from '@/src/components/global';
import AppLayout from '../layouts/AppLayout';
import { ImageBackground, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { RouteEnums } from '../constants/RouteNames';
import { HStack } from '@/components/ui/hstack';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useColors } from '../hooks';
import { Spinner } from '@/components/ui/spinner';
import userService from '../database/services/userService';
import programService from '../database/services/programService';
import ProgramAccordion from '../components/programs/home/ProgramAccordion';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { RootState } from '../redux/Store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import { setUserPrograms } from '../redux/reducers/StatesProgramList';

type SectionProps = NativeStackScreenProps<RootStackParamList, RouteEnums.programs>;

export default function ProgramsScreen({navigation}: SectionProps) {

  const dispatch = useAppDispatch();

  const colors = useColors();

  const [isPending, setIsPending] = useState<boolean>(false);
  const userPrograms = useAppSelector((state: RootState) => state.statesProgramList.userPrograms);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsPending(true);
        const user = await userService.GetUser();
        const response = await programService.GetUserPrograms(user.id);
        dispatch(setUserPrograms(response));
      }
      catch (error) {

      }
      finally {
        setIsPending(false);
      }
    }
    fetchData();
  }, [])
  
  return (
    <AppLayout returnHomeEnable={true} returnbackEnable={true}>
      <Pressable className='m-3 opacity-80' onPress={() => navigation.navigate(RouteEnums.createProgram)}>
        <ImageBackground className='py-6' imageStyle={{ borderRadius: 8 }} source={require('@/assets/images/bacgrounds/gym-background.jpg')} >
          <HStack className='self-center items-center' space={2} >
            <ThemedText className='text-center font-thin me-2' style={{color: "#fff"}}>
              Create Program
            </ThemedText>
            <FontAwesome6 name='circle-plus' iconStyle='solid' color={"#fff"} size={18} />
          </HStack>
        </ImageBackground>
      </Pressable>
      
      {isPending ?
        <Spinner color={colors.icon} size={"large"} /> :
          userPrograms && userPrograms.length > 0 ?
            userPrograms.map((program, index) =>
              <ProgramAccordion key={index} programDetail={program} />
            ) :
          <ThemedAlert text="There are no program, create them if you don't have any yet." />
      }
    </AppLayout>
  );
}
