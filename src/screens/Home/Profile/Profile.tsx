import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser, getCurrentUser} from '@redux/auth/thunks';
import {NavigationType} from '@customTypes/navigation';
import {getPosts} from '@redux/posts/thunks';
import {followUser, getUserFollows, unfollowUser} from '@redux/users/thunks';
import {IUser} from '@interfaces/index';
import {RootState} from '@redux/index';
import {currentUser} from 'src/constants';
import FollowButton from '@components/FollowButton/FollowButton';
import GalleryProfile from '@components/GalleryPofile/GalleryProfile';
import styles from './styles';

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
  const {uid: currentUid} = route.params;
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
    dispatch(getPosts(currentUid, setRefreshing));
    dispatch(getCurrentUser(currentUid));
    dispatch(getUserFollows());
  }, [dispatch, currentUid]);

  useEffect(() => {
    userFollows.includes(currentUid)
      ? setIsFollowing(true)
      : setIsFollowing(false);
  }, [userFollows, currentUid]);

  const handleRefresh = () => {
    dispatch(getPosts(currentUid, setRefreshing));
  };

  const handlePress = () => {
    dispatch(logoutUser(navigation));
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(currentUid, setIsFollowing));
  };

  const handleFollow = () => {
    dispatch(followUser(currentUid, setIsFollowing));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user.name}</Text>
        {currentUid !== currentUser &&
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
