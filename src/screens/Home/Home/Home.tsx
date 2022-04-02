import React from 'react';
import {View} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {auth} from '@helpers/firebase';
import Feed from '../Feed/Feed';
import Profile from '../Profile/Profile';
import Search from '../Search/Search';
import EmptyScreen from '../EmptyScreen/EmptyScreen';
import styles from './styles';

const Tab = createMaterialBottomTabNavigator();

const Home: React.FC = () => {
  const user = useAppSelector(state => state.auth.currentUser);
  console.log(user);
  return (
    <View style={styles.container}>
      <Tab.Navigator initialRouteName="Feed" labeled={false}>
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Add"
          component={EmptyScreen}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="plus-circle"
                color={color}
                size={26}
              />
            ),
          }}
          listeners={({navigation}) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.navigate('AddPost');
            },
          })}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
          listeners={({navigation}) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.navigate('Profile', {uid: auth.currentUser?.uid});
            },
          })}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Home;
