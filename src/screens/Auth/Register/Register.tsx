import {View, Text, Button} from 'react-native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {registerUser} from '../../../redux/auth/thunks';
import {useDispatch} from 'react-redux';
import {IRegisterData} from '../../../interfaces';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../customTypes/navigation';
import Field from 'src/components/Field/Field';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
}

const Register: React.FC<Props> = ({navigation}) => {
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

  const onSubmit: (data: IRegisterData) => void = data => {
    dispatch(registerUser(data, navigation));
  };

  return (
    <View>
      <Text>Register</Text>

      <Field
        control={control}
        name="name"
        placeholder="name"
        rules={{
          required: true,
        }}
        error={errors.name}
        errorMessage="Name is required"
      />

      <Field
        control={control}
        name="email"
        placeholder="email"
        rules={{
          required: true,
        }}
        error={errors.email}
        errorMessage="Email is required"
        textContentType={'emailAddress'}
      />

      <Field
        control={control}
        name="password"
        placeholder="password"
        rules={{
          required: true,
        }}
        error={errors.password}
        errorMessage="Password is required"
        textContentType={'password'}
        secureTextEntry={true}
      />

      <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default Register;
