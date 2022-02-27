import React from 'react';
import {TextInput, Text} from 'react-native';
import {Controller} from 'react-hook-form';
import styles from './styles';

interface Props {
  control: any;
  name: string;
  rules?: {};
  placeholder: string;
  error?: any;
  errorMessage?: string;
  textContentType?: any;
  secureTextEntry?: boolean;
}

const Field: React.FC<Props> = ({
  control,
  name,
  rules,
  placeholder,
  error,
  errorMessage,
  textContentType,
  secureTextEntry,
}) => {
  return (
    <>
      <Controller
        control={control}
        rules={rules}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={error ? [styles.input, styles.error] : styles.input}
            textContentType={textContentType}
            secureTextEntry={secureTextEntry}
          />
        )}
        name={name}
      />
      {error && <Text>{errorMessage}</Text>}
    </>
  );
};

export default Field;
