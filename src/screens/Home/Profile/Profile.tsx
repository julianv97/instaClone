import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser, getCurrentUser} from '@redux/auth/thunks';
import {NavigationType} from '@customTypes/navigation';
import {getPosts} from '@redux/posts/thunks';
import {followUser, getUserFollows, unfollowUser} from '@redux/users/thunks';
import {IUser} from '@interfaces/index';
import {RootState} from '@redux/index';
import FollowButton from '@components/FollowButton/FollowButton';
import GalleryProfile from '@components/GalleryPofile/GalleryProfile';
import styles from './styles';
import {auth} from '@helpers/firebase';

interface Props {
  navigation: NavigationType;
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
  //@ts-ignore
  const userFollows: string[] = useSelector<RootState>(
    //@ts-ignore
    state => state.users.userFollows,
  );

  useEffect(() => {
    dispatch(getPosts(route.params.uid, setRefreshing));
    dispatch(getCurrentUser(route.params.uid));
    dispatch(getUserFollows());
  }, [dispatch, route.params.uid]);

  useEffect(() => {
    userFollows.includes(route.params.uid)
      ? setIsFollowing(true)
      : setIsFollowing(false);
  }, [userFollows, route.params.uid]);

  const handleRefresh = () => {
    dispatch(getPosts(route.params.uid, setRefreshing));
  };

  const handlePress = () => {
    dispatch(logoutUser(navigation));
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(route.params.uid, setIsFollowing));
  };

  const handleFollow = () => {
    dispatch(followUser(route.params.uid, setIsFollowing));
  };

  console.log('currentUser', auth.currentUser?.uid);
  console.log('params uid', route.params.uid);
  console.log(userFollows);

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
