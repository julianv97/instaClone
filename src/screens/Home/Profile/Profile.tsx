import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {logoutUser} from '@redux/auth/thunks';
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <View style={styles.containerInfo}>
          <Text>{user.email}</Text>
        </View>
        <FlatList
          numColumns={3}
          horizontal={false}
          scrollEnabled={false}
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
      </ScrollView>
      <Button title="Logout" onPress={handlePress} />
    </View>
  );
};

export default Profile;
