import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Landing from '../screens/Auth/Landing/Landing';
import Register from '../screens/Auth/Register/Register';
import Login from '../screens/Auth/Login/Login';

import {RootStackParamList} from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={Landing}
          /* options={{
            headerShown: false,
          }} */
        />
        <Stack.Screen
          name="Register"
          component={Register}
          /* options={{
            headerShown: false,
          }} */
        />
        <Stack.Screen
          name="Login"
          component={Login}
          /* options={{
            headerShown: false,
          }} */
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;