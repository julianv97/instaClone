import {View, Text, TextInput, Button} from 'react-native';
import React from 'react';

import {useForm, Controller} from 'react-hook-form';

import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

interface RegisterData {
  email: string;
  password: string;
}

const Register = () => {
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

  const auth = getAuth();

  const onSubmit: (data: RegisterData) => void = data => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        console.log('usuario creado');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View>
      <Text>Register</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="name"
            textContentType="name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />

      {errors.name && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="email"
            textContentType="emailAddress"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />

      {errors.email && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="password"
            textContentType="password"
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />

      {errors.password && <Text>This is required.</Text>}

      <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default Register;
