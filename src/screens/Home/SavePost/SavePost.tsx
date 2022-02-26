import {View, Text, Image} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import styles from './styles';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddPost'>;
  route: {
    params: {
      image: string;
    };
  };
}

const SavePost: React.FC<Props> = ({route}) => {
  console.log(route.params.image);
  return (
    <View style={styles.container}>
      <Text>SavePost</Text>
      <Image
        source={{
          uri: route.params.image,
        }}
        style={styles.image}
      />
    </View>
  );
};

export default SavePost;
