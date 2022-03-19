export interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ICurrentUser {
  email: string;
}

export interface IUser {
  name: string;
  email: string;
}

export interface IInitialStateAuth {
  authenticated: boolean;
  currentUser: {
    email: string;
  };
  isLoading: boolean;
  isError: boolean;
}
export interface IPost {
  id: string;
  caption: string;
  createdAt: Date;
  image: string;
}

export interface IInitialStatePosts {
  isLoading: boolean;
  isError: boolean;
  imageToUpload: string;
  posts: IPost[];
}

export interface IInitialStateUsers {
  isLoading: boolean;
  isError: boolean;
  usersSearch: [];
  followedUser: string;
  unfollowUser: string;
  userFollows: [];
}
