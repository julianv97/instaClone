import {View, TextInput, Image, Button} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import {useForm, Controller} from 'react-hook-form';
import styles from './styles';

import {useDispatch} from 'react-redux';
import {savePost} from '../../../redux/posts/thunks';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddPost'>;
  route: {
    params: {
      image: string;
    };
  };
}

const SavePost: React.FC<Props> = ({route, navigation}) => {
  const {control, handleSubmit, getValues} = useForm({
    defaultValues: {
      caption: '',
    },
  });
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(savePost(route.params.image, getValues().caption, navigation));
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
