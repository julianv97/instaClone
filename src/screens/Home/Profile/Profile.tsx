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
import {auth, db} from '@helpers/firebase';
import FollowButton from '@components/FollowButton/FollowButton';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
  route: {
    params: {
      uid: string;
    };
  };
}

const Profile: React.FC<Props> = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useDispatch();
  //@ts-ignore
  const posts: IPost[] = useSelector<RootState>(state => state.posts.posts);
  //@ts-ignore
  const user: IUser = useSelector<RootState>(state => state.auth.currentUser);

  useEffect(() => {
    dispatch(getPosts(route.params.uid, setRefreshing));
    dispatch(getCurrentUser(route.params.uid));
  }, [dispatch, route.params.uid]);

  const handleRefresh = () => {
    dispatch(getPosts(route.params.uid, setRefreshing));
  };

  const handlePress = () => {
    dispatch(logoutUser());
    navigation.navigate('Landing');
  };

  const handleUnfollow = () => {
    const uid = auth.currentUser?.uid;
    const {uid: userUid} = route.params;
    db.collection('following')
      .doc(uid)
      .collection('usersFollowing')
      .doc(userUid)
      .delete()
      .then(() => {
        console.log('unfollowed');
        setIsFollowing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleFollow = () => {
    db.collection('following')
      .doc(auth.currentUser?.uid)
      .collection('usersFollowing')
      .doc(route.params.uid)
      .set({})
      .then(() => {
        console.log('follow');
        setIsFollowing(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user.name}</Text>
        {route.params.uid !== auth.currentUser?.uid &&
          (isFollowing ? (
            <FollowButton title={'Following'} onPress={handleUnfollow} />
          ) : (
            <FollowButton title={'Follow'} onPress={handleFollow} />
          ))}
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
