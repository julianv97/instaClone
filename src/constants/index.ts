import {auth} from '@helpers/firebase';

export const currentUser = auth.currentUser?.uid;
