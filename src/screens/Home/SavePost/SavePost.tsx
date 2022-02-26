import {View, TextInput, Image, Button} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import {useForm, Controller} from 'react-hook-form';
import styles from './styles';

import {storage, auth} from '../../../helpers/firebase';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddPost'>;
  route: {
    params: {
      image: string;
    };
  };
}

const SavePost: React.FC<Props> = ({route}) => {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      caption: '',
    },
  });
  // TODO: implementar uuid
  const onSubmit = async () => {
    const uri = route.params.image;
    const childPath = `posts/${auth.currentUser?.uid}/${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    const response = await fetch(uri);
    const blob = await response.blob();

    const task = storage.ref().child(childPath).put(blob);

    const taskProgress = (snapshot: {bytesTransferred: any}) => {
      console.log('transferred: ', snapshot.bytesTransferred);
    };

    const taskComplete = () => {
      task.snapshot.ref.getDownloadURL().then(downloadURL => {
        console.log('downloadURL: ', downloadURL);
      });
    };

    const taskError = (error: any) => {
      console.log('error: ', error);
    };

    task.on('state_changed', taskProgress, taskError, taskComplete);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Write a caption..."
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="caption"
      />
      <Image
        source={{
          uri: route.params.image,
        }}
        style={styles.image}
      />
      <Button title="Save" onPress={handleSubmit(() => onSubmit())} />
    </View>
  );
};

export default SavePost;
