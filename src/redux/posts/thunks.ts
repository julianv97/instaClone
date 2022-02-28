import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Action} from 'redux';
import {storage, db, auth} from '@helpers/firebase';
import {RootStackParamList} from '@customTypes/navigation';
import {
  savePostPending,
  savePostFullFill,
  savePostRejected,
  getPostFullfill,
  getPostPending,
  getPostRejected,
} from './actions';

export const savePost = (
  imageToUpload: string,
  caption: string,
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddPost'>,
) => {
  return async (dispatch: (action: Action) => void) => {
    dispatch(savePostPending());
    const childPath = `posts/${auth.currentUser?.uid}/${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    const response = await fetch(imageToUpload);
    const blob = await response.blob();
    const task = storage.ref().child(childPath).put(blob);

    const taskProgress = (snapshot: {bytesTransferred: any}) => {
      console.log('transferred: ', snapshot.bytesTransferred);
    };

    const taskComplete = () => {
      task.snapshot.ref.getDownloadURL().then(downloadURL => {
        db.collection('posts')
          .doc(auth.currentUser?.uid)
          .collection('userPosts')
          .add({
            image: downloadURL,
            caption: caption,
            createdAt: new Date(),
          })
          .then(() => {
            dispatch(savePostFullFill());
            console.log('downloadURL: ', downloadURL);
            navigation.navigate('Home');
          })
          .catch(error => {
            dispatch(savePostRejected());
            console.log(error);
          });
      });
    };

    const taskError = (error: any) => {
      console.log(error);
      dispatch(savePostRejected());
    };

    task.on('state_changed', taskProgress, taskError, taskComplete);
  };
};

export const getPosts = () => {
  return (dispatch: (action: Action) => void) => {
    dispatch(getPostPending());
    try {
      db.collection('posts')
        .doc(auth.currentUser?.uid)
        .collection('userPosts')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          const posts: {
            id: string;
            image: any;
            caption: any;
            createdAt: any;
          }[] = [];
          snapshot.forEach(doc => {
            posts.push({
              id: doc.id,
              image: doc.data().image,
              caption: doc.data().caption,
              createdAt: doc.data().createdAt,
            });
          });
          dispatch(getPostFullfill(posts));
        });
    } catch (error) {
      dispatch(getPostRejected());
      console.log(error);
    }
  };
};
