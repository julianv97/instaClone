import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface Props {
  name: string;
  onPress: () => void;
}

const ProfileSearch: React.FC<Props> = ({name, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

export default ProfileSearch;
