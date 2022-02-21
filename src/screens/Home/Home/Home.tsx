import React from 'react';
import {RootState} from '../../../redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import Feed from '../Feed/Feed';
import Settings from '../Settings/Settings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const Home = () => {
  const user = useSelector<RootState>(state => state.auth.currentUser);
  console.log(user);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default Home;
