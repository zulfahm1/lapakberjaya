import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Home, Splash, Notif} from '../screen'

const Stack = createNativeStackNavigator();

function Navigator() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Splash} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  export default Navigator;