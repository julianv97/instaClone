import {View} from 'react-native';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FormLayout: React.FC<Props> = ({children}) => {
  return <View>{children}</View>;
};

export default FormLayout;
