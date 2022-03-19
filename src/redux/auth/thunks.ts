import {auth, db} from '@helpers/firebase';
import {
  registerUserFullFill,
  registerUserPending,
  registerUserRejected,
  setCurrentUser,
  setLoginUserFullfill,
  setLoginUserPending,
  setLoginUserRejected,
  setLogoutUserFullfill,
  setLogoutUserPending,
  setLogoutUserRejected,
} from './actions';
import {logoutFullfill as logoutPosts} from '@redux/posts/actions';
import {logoutFullFill as logoutUsers} from '@redux/users/actions';
import {ILoginData, IRegisterData} from '@interfaces/index';
import {Action} from '@customTypes/redux';
import {NavigationType} from '@customTypes/navigation';

export const registerUser = (data: IRegisterData, navigation: any) => {
  return async (dispatch: (action: Action) => void) => {
    dispatch(registerUserPending());
    try {
      await auth.createUserWithEmailAndPassword(data.email, data.password);
      db.collection('users')
        .doc(auth.currentUser?.uid)
        .set({
          name: data.name,
          email: data.email,
        })
        .then(() => {
          dispatch(registerUserFullFill(data));
          navigation.navigate('Home');
        });
    } catch (error) {
      dispatch(registerUserRejected());
      console.log(error);
    }
  };
};

// Método para traer ususarios de la base de datos
export const getCurrentUser = (uid: string) => {
  return (dispatch: (action: Action) => void) => {
    db.collection('users')
      .doc(uid)
      .get()
      .then(doc => {
        dispatch(setCurrentUser(doc.data()));
      });
  };
};

export const loginUser = (data: ILoginData, navigation: NavigationType) => {
  return (dispatch: (action: Action) => void) => {
    dispatch(setLoginUserPending());
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        dispatch(setLoginUserFullfill(data));
        navigation.navigate('Home');
      })
      .catch(error => {
        dispatch(setLoginUserRejected());
        console.log(error);
      });
  };
};

export const logoutUser = (navigation: NavigationType) => {
  return (dispatch: (action: Action) => void) => {
    dispatch(setLogoutUserPending());
    auth
      .signOut()
      .then(() => {
        dispatch(setLogoutUserFullfill());
        dispatch(logoutPosts());
        dispatch(logoutUsers());
        navigation.navigate('Landing');
      })
      .catch(error => {
        console.log(error);
        dispatch(setLogoutUserRejected());
      });
  };
};
