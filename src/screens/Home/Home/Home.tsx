import React from 'react';
import {RootState} from '../../../redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import Feed from '../Feed/Feed';
import Settings from '../Settings/Settings';

import {useSelector} from 'react-redux';

const Home = () => {
  const user = useSelector<RootState>(state => state.auth.currentUser);
  console.log(user);
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} options={{headerShown: false}} />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default Home;
