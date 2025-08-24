import {ThemedText, ThemedView} from '@/src/components/global';
import AppLayout from '../layouts/AppLayout';
import { Pressable } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { RouteEnums } from '../constants/RouteNames';

export default function ProgramsScreen() {
  
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [isPending, setIsPending] = useState<boolean>(false);

  return (
    <AppLayout returnHomeEnable={true} returnbackEnable={true}>
      <Pressable onPress={() => navigation.navigate(RouteEnums.createNewProgram)}>
        <ThemedText>
          Program Oluştur
        </ThemedText>
      </Pressable>
    </AppLayout>
  );
}
