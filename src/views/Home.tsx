import AppLayout from '@/src/layouts/AppLayout';
import {database} from '../database/index.native';
import {SchmeaModels} from '../constants/SchemaModels';
import {useEffect, useState} from 'react';
import {NavigationProp, ParamListBase, useNavigation} from '@react-navigation/native';
import Program from '../database/models/Program';
import {Q} from '@nozbe/watermelondb';
import {RouteEnums} from '../constants/RouteNames';
import ProgramCard from '../components/home/ProgramCard';
import userService from '../database/services/userService';
import {ThemedButton} from '../components/global/ThemedButton';
import {ThemedAlert} from '../components/global/ThemedAlert';
import programService from '../database/services/programService';
import ProgramExercise from '../database/models/ProgramExercise';
import ProgramDetailCurrentDayModel from '../models/program/ProgramDetailCurrentDayModel';

export default function HomeScreen() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [isPending, setIsPending] = useState(true);

  const [programs, setData] = useState<ProgramDetailCurrentDayModel[]>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsPending(true);
    } finally {
      setIsPending(false);
    }
    const user = await userService.GetUser();
    var temp = await programService.GetCurrentDayProgramDetails();
    console.log("Current Day Programs => ", temp)
    
    setData(temp);
  };

  return (
    <AppLayout returnHomeEnable={true} returnbackEnable={true}>
      {
        programs && programs.length > 0 ? 
          programs.map((program, index) => <ProgramCard key={index} program={program} />) : 
        !isPending && 
            <ThemedAlert
              text="There are no program exercises for today, you can go to programs page with the button below to browse the programs or create them if you don't have any yet."
              button={() => <ThemedButton text="Visit Programs" onPress={() => navigation.navigate(RouteEnums.programs)} />}
            />
      }
    </AppLayout>
  );
}
