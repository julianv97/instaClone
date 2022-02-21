import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';

import Landing from '../screens/Auth/Landing/Landing';
import Register from '../screens/Auth/Register/Register';
import Login from '../screens/Auth/Login/Login';
import Home from '../screens/Home/Home/Home';

const Stack = createNativeStackNavigator<RootStackParamList>();

// TODO: verificar cuando el usuario ya está logueado y redirigir a Home

const MainStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
