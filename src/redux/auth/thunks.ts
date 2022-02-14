import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../../helpers/firebase';
import {setRegisterUser, setCurrentUser} from './actions';
import {IRegisterData} from '../../interfaces';

export const registerUser = (data: IRegisterData) => {
  return dispatch => {
    return createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        db.collection('users').add({
          email: data.email,
          name: data.name,
        });
        dispatch(setRegisterUser(data));
        console.log('user registered');
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getCurrentUser = () => {
  return dispatch => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(setCurrentUser('user.email'));
      }
    });
  };
};
