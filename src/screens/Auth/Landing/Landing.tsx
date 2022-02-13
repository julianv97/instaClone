import {View, Button} from 'react-native';
import React from 'react';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Landing'>;
}

const Landing: React.FC<Props> = ({navigation}) => {
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
