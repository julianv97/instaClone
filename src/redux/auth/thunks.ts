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
import {ILoginData, IRegisterData} from '@interfaces/index';
import {Action} from '@customTypes/redux';

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
export const getCurrentUser = () => {
  return (dispatch: (action: Action) => void) => {
    db.collection('users')
      .doc(auth.currentUser?.uid)
      .get()
      .then(doc => {
        dispatch(setCurrentUser(doc.data()));
      });
  };
};

export const loginUser = (data: ILoginData, navigation: any) => {
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

export const logoutUser = () => {
  return (dispatch: (action: Action) => void) => {
    dispatch(setLogoutUserPending());
    auth
      .signOut()
      .then(() => {
        dispatch(setLogoutUserFullfill());
      })
      .catch(error => {
        console.log(error);
        dispatch(setLogoutUserRejected());
      });
  };
};
