import {TextInput} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import styles from './styles';

interface Props {
  control: any;
  name: string;
  placeholder: string;
}

const Field: React.FC<Props> = ({control, placeholder}) => {
  return (
    <Controller
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          style={styles.input}
        />
      )}
      name="caption"
    />
  );
};

export default Field;
