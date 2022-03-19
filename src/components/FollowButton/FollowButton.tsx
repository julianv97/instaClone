import {Button} from 'react-native';
import React from 'react';

interface Props {
  title: string;
  onPress?: () => void;
}

const FollowButton: React.FC<Props> = ({title, onPress = () => {}}) => {
  return <Button title={title} onPress={onPress} />;
};

export default FollowButton;
