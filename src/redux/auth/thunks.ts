import {auth, db} from '@helpers/firebase';
import {setRegisterUser, setCurrentUser, setLoginUser} from './actions';
import {ILoginData, IRegisterData} from '@interfaces/index';
import {Action} from '@customTypes/redux';

export const registerUser = (data: IRegisterData, navigation: any) => {
  return (dispatch: (action: Action) => void) => {
    return auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        db.collection('users')
          .doc(auth.currentUser?.uid)
          .set({
            name: data.name,
            email: data.email,
          })
          .then(() => {
            dispatch(setRegisterUser(data));
            navigation.navigate('Home');
          });
      })
      .catch(error => {
        console.log(error);
      });
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
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        dispatch(setLoginUser(data));
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const logoutUser = () => {
  return (dispatch: (action: Action) => void) => {
    auth
      .signOut()
      .then(() => {
        dispatch(setCurrentUser({}));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
