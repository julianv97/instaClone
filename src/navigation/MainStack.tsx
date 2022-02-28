import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '@customTypes/navigation';
import {getDataAsyncStorage} from '@helpers/asyncStorage';
import Landing from '@screens/Auth/Landing/Landing';
import Register from '@screens/Auth/Register/Register';
import Login from '@screens/Auth/Login/Login';
import Home from '@screens/Home/Home/Home';
import AddPost from '@screens/Home/AddPost/AddPost';
import SavePost from '@screens/Home/SavePost/SavePost';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack: React.FC = () => {
  const [firstScreen, setFirstScreen] = useState<any>('Landing');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataAsyncStorage('user').then(user => {
      if (user) {
        setFirstScreen('Home');
        setLoading(false);
      } else {
        setFirstScreen('Landing');
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={firstScreen}>
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
