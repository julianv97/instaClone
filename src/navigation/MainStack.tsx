import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '@customTypes/navigation';
import Landing from '@screens/Auth/Landing/Landing';
import Register from '@screens/Auth/Register/Register';
import Login from '@screens/Auth/Login/Login';
import Home from '@screens/Home/Home/Home';
import AddPost from '@screens/Home/AddPost/AddPost';
import SavePost from '@screens/Home/SavePost/SavePost';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Landing'}>
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
