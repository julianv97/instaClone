import {db} from '@helpers/firebase';
import {Action} from '@customTypes/redux';
import {currentUser} from 'src/constants';
import {
  searchUsersFullFill,
  searchUsersPending,
  searchUsersRejected,
  followUsersFullFill,
  followUsersPending,
  followUsersRejected,
  unfollowUsersFullFill,
  unfollowUsersPending,
  unfollowUsersRejected,
  getUserFollowsFullFill,
  getUserFollowsPending,
  getUserFollowsRejected,
} from './actions';

export const searchUsers = (text: string) => {
  return (dispatch: (action: Action) => void) => {
    dispatch(searchUsersPending());
    try {
      if (text.length > 0) {
        db.collection('users')
          .where('name', '>=', text)
          .get()
          .then(snapshot => {
            let users = snapshot.docs.map(doc => {
              const data = doc.data();
              const id = doc.id;
              return {id, ...data};
            });
            dispatch(searchUsersFullFill(users));
          });
      } else {
        dispatch(searchUsersFullFill([]));
      }
    } catch (error) {
      dispatch(searchUsersRejected());
    }
  };
};

export const followUser = (
  followId: string,
  setIsFollowing: (bool: boolean) => void,
) => {
  return (dispatch: (action: Action) => void) => {
    dispatch(followUsersPending());
    db.collection('following')
      .doc(currentUser)
      .collection('usersFollowing')
      .doc(followId)
      .set({})
      .then(() => {
        console.log('follow');
        setIsFollowing(true);
        dispatch(followUsersFullFill(followId));
      })
      .catch(error => {
        console.log(error);
        dispatch(followUsersRejected());
      });
  };
};

export const unfollowUser = (
  unfollowId: string,
  setIsFollowing: (bool: boolean) => void,
) => {
  return (dispatch: (action: Action) => void) => {
    dispatch(unfollowUsersPending());
    db.collection('following')
      .doc(currentUser)
      .collection('usersFollowing')
      .doc(unfollowId)
      .delete()
      .then(() => {
        console.log('unfollowed');
        setIsFollowing(false);
        dispatch(unfollowUsersFullFill(unfollowId));
      })
      .catch(error => {
        console.log(error);
        dispatch(unfollowUsersRejected());
      });
  };
};

export const getUserFollows = () => {
  return (dispatch: (action: Action) => void) => {
    dispatch(getUserFollowsPending());
    try {
      db.collection('following')
        .doc(currentUser)
        .collection('usersFollowing')
        .onSnapshot(snapshot => {
          const follows: string[] = snapshot.docs.map(doc => {
            return doc.id;
          });
          dispatch(getUserFollowsFullFill(follows));
        });
    } catch {
      dispatch(getUserFollowsRejected());
    }
  };
};
