import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {logoutUser, getCurrentUser} from '@redux/auth/thunks';
import {RootStackParamList} from '@customTypes/navigation';
import {getPosts} from '@redux/posts/thunks';
import {IUser} from '@interfaces/index';
import {RootState} from '@redux/index';
import GalleryProfile from '@components/GalleryPofile/GalleryProfile';
import styles from './styles';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
}

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

      <GalleryProfile
        posts={posts}
        handleRefresh={handleRefresh}
        refreshing={refreshing}
      />

      <Button title="Logout" onPress={handlePress} />
    </View>
  );
};

export default Profile;
