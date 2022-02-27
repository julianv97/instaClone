import React from 'react';
import {View, Button} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootStackParamList} from '@customTypes/navigation';
import {RootState} from '@redux/index';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Landing'>;
}

const Landing: React.FC<Props> = ({navigation}) => {
  const user = useSelector<RootState>(state => state.auth.currentUser);
  console.log(user);
  return (
    <View>
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate('Register');
        }}
      />
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};

export default Landing;
