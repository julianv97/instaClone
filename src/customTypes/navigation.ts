import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Settings: undefined;
  Feed: undefined;
  Profile: undefined;
  AddPost: undefined;
  SavePost: {
    image: string | undefined;
  };
};

export type NavigationType = NativeStackNavigationProp<RootStackParamList>;
