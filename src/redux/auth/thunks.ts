import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import {auth, db} from '../../helpers/firebase';
import {setRegisterUser, setCurrentUser} from './actions';

export const registerUser = data => {
  return dispatch => {
    return createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        setDoc(doc(db, 'users', auth.currentUser!.uid), {
          name: data.name,
          email: data.email,
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
