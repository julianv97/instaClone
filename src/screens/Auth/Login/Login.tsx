import React from 'react';
import {View, Text, Button} from 'react-native';
import {useForm} from 'react-hook-form';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../customTypes/navigation';
import {ILoginData} from '../../../interfaces';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../redux/auth/thunks';
import Field from '../../../components/Field/Field';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Landing'>;
}

const Login: React.FC<Props> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch();

  const onSubmit: (data: ILoginData) => void = data => {
    dispatch(loginUser(data, navigation));
  };

  return (
    <View>
      <Text>Login</Text>

      <Field
        control={control}
        name="email"
        placeholder="email"
        error={errors.email}
        errorMessage="Email is required"
        rules={{
          required: true,
        }}
      />

      <Field
        control={control}
        name="password"
        placeholder="password"
        textContentType="password"
        secureTextEntry={true}
        rules={{
          required: true,
        }}
        error={errors.password}
        errorMessage="Password is required"
      />

      <Button title="Sign in" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default Login;
