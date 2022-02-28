import React, {useEffect} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {logoutUser} from '@redux/auth/thunks';
import {RootStackParamList} from '@customTypes/navigation';
import {getPosts} from '@redux/posts/thunks';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
}

// TODO: crear un refresh para la vista

const Profile: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  //@ts-ignore
  const posts: IPost[] = useSelector<RootState>(state => state.posts.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handlePress = () => {
    dispatch(logoutUser());
    navigation.navigate('Landing');
  };
  return (
    <View>
      <Text>Profile</Text>
      <FlatList
        data={posts}
        renderItem={({item}) => <Text>{item.caption}</Text>}
        keyExtractor={item => item.id}
      />
      <Button title="Logout" onPress={handlePress} />
    </View>
  );
};

export default Profile;
