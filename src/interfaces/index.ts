export interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
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
}

export interface IInitialStatePosts {
  isLoading: boolean;
  isError: boolean;
  imageToUpload: string;
}
