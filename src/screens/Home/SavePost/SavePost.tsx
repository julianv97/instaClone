import React from 'react';
import {View, Image, Button} from 'react-native';
import Field from '../../../components/Field/Field';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../customTypes/navigation';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {savePost} from '../../../redux/posts/thunks';
import styles from './styles';

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
      <Field
        control={control}
        name="caption"
        placeholder="Write a caption..."
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
