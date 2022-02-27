import React from 'react';
import {Button} from 'react-native';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@customTypes/navigation';
import {registerUser} from '@redux/auth/thunks';
import {IRegisterData} from '@interfaces/index';
import FormLayout from '@components/FormLayout/FormLayout';
import Field from '@components/Field/Field';

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
    <FormLayout>
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
    </FormLayout>
  );
};

export default Register;
