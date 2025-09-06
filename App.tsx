import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useColors, useColorScheme} from './src/hooks';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GluestackUIProvider} from './components/ui/gluestack-ui-provider';
import {RouteEnums} from './src/constants/RouteNames';
import SeedDatabase from './src/database/seed';
import {Provider} from 'react-redux';
import {store} from './src/redux/Store';
import './global.css';

// import LoginScreen from './src/screens/Login/Login';
import HomeScreen from '@/src/views/Home';
import ExercisesScreen from '@/src/views/Exercises';
import ProgramsScreen from '@/src/views/Programs';
import CreateProgramScreen from '@/src/views/CreateProgram';
import EditProgramScreen from '@/src/views/EditProgram';
import MyInformationScreen from '@/src/views/MyInformations';
import OptionsScreen from '@/src/views/Options';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Exercises: undefined;
  Programs: undefined;
  MyInformations: undefined;
  Options: undefined;
  CreateProgram: undefined;
  EditProgram: {programId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const [checkedDatabase, setCheckDatabase] = useState(false);
  useEffect(() => {
    seedManage();
  }, []);
  const seedManage = async () => {
    try {
      await SeedDatabase();
      setCheckDatabase(true);
    } catch (error) {}
  };

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar backgroundColor={colors.headerBackground} barStyle={colorScheme == 'dark' ? 'light-content' : 'dark-content'} />
        <Provider store={store}>
          <GluestackUIProvider>
            {checkedDatabase && (
              <Stack.Navigator
                initialRouteName={RouteEnums.home}
                screenOptions={{
                  // tabBarShowLabel: false,
                  headerShown: false,
                  animation: 'none',
                }}>
                {/* <Stack.Screen name={RouteEnums.login} component={LoginScreen} /> */}

                <Stack.Screen name={RouteEnums.home} component={HomeScreen} />
                <Stack.Screen name={RouteEnums.exercises} component={ExercisesScreen} />
                <Stack.Screen name={RouteEnums.programs} component={ProgramsScreen} />
                <Stack.Screen name={RouteEnums.createProgram} component={CreateProgramScreen} />
                <Stack.Screen name={RouteEnums.editProgram} component={EditProgramScreen} />
                <Stack.Screen name={RouteEnums.myInfo} component={MyInformationScreen} />
                <Stack.Screen name={RouteEnums.options} component={OptionsScreen} />
              </Stack.Navigator>
            )}
          </GluestackUIProvider>
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
