import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {logoutUser, getCurrentUser} from '@redux/auth/thunks';
import {RootStackParamList} from '@customTypes/navigation';
import {getPosts} from '@redux/posts/thunks';
import {IUser} from '@interfaces/index';
import {RootState} from '@redux/index';
import styles from './styles';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
}

// TODO: necesito un loader para la vista

const Profile: React.FC<Props> = ({navigation}) => {
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const dispatch = useDispatch();
  //@ts-ignore
  const posts: IPost[] = useSelector<RootState>(state => state.posts.posts);
  //@ts-ignore
  const user: IUser = useSelector<RootState>(state => state.auth.currentUser);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getPosts(setRefreshing));
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getPosts(setRefreshing));
  };

  const handlePress = () => {
    dispatch(logoutUser());
    navigation.navigate('Landing');
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user.name}</Text>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        numColumns={3}
        data={posts}
        renderItem={({item}) => (
          <View style={styles.containerImage}>
            <Image
              style={styles.image}
              source={{
                uri: item.image,
              }}
            />
          </View>
        )}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <Button title="Logout" onPress={handlePress} />
    </View>
  );
};

export default Profile;
