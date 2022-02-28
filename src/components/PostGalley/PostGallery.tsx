import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';

interface Props {
  image: string;
}

const PostGallery: React.FC<Props> = ({image}) => {
  return (
    <View style={styles.containerImage}>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
    </View>
  );
};

export default PostGallery;
