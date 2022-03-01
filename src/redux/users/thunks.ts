import {db} from '@helpers/firebase';
import {Action} from '@customTypes/redux';
import {
  searchUsersFullFill,
  searchUsersPending,
  searchUsersRejected,
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
