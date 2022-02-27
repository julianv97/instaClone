import React from 'react';
import {View, Text, Button} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {logoutUser} from '@redux/auth/thunks';
import {RootStackParamList} from '@customTypes/navigation';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
}

const Settings: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(logoutUser());
    navigation.navigate('Landing');
  };
  return (
    <View>
      <Text>Settings</Text>
      <Button title="Logout" onPress={handlePress} />
    </View>
  );
};

export default Settings;
