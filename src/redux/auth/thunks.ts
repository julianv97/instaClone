import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../../helpers/firebase';
import {setRegisterUser, setCurrentUser, setLoginUser} from './actions';
import {ILoginData, IRegisterData} from '../../interfaces';
import {Action} from '../../types/redux';

export const registerUser = (data: IRegisterData, navigation: any) => {
  return (dispatch: (action: Action) => void) => {
    return createUserWithEmailAndPassword(auth, data.email, data.password)
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
            console.log('user registered');
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

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
        dispatch(setLoginUser());
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
      });
  };
};
