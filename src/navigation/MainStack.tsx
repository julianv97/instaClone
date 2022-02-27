import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '@customTypes/navigation';
import {useSelector} from 'react-redux';
import Landing from '@screens/Auth/Landing/Landing';
import Register from '@screens/Auth/Register/Register';
import Login from '@screens/Auth/Login/Login';
import Home from '@screens/Home/Home/Home';
import AddPost from '@screens/Home/AddPost/AddPost';
import SavePost from '@screens/Home/SavePost/SavePost';
import {RootState} from '@redux/index';

const Stack = createNativeStackNavigator<RootStackParamList>();

// TODO: verificar cuando el usuario ya está logueado y redirigir a Home

const MainStack: React.FC = () => {
  const user = useSelector<RootState>(state => state.auth.currentUser);
  const authenticated = useSelector<RootState>(
    state => state.auth.authenticated,
  );

  console.log('MainStack: user', user);
  console.log('MainStack: authenticated', authenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="SavePost" component={SavePost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
