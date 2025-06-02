import * as React from 'react';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@ui-kitten/components';

import { RootStackParamList } from './navigation-types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './RootNavigation';

import CheckScreen from "screens/Authentication/CheckScreen";


enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContainer = () => {
  const themes = useTheme();

  return (
    <NavigationContainer ref={navigationRef}>
      <View
        style={{ backgroundColor: themes['background-basic-color-1'], flex: 1 }}>
        <Stack.Navigator
          initialRouteName={'CheckScreen'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="CheckScreen" component={CheckScreen} />

        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default AppContainer;
