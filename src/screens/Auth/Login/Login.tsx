import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import {ILoginData} from '../../../interfaces';

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

  const auth = getAuth();

  const onSubmit: (data: ILoginData) => void = data => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        console.log('login exitoso');
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View>
      <Text>Login</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="email"
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

      <Button title="Sign in" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default Login;
