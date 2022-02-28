import {IPost} from '@interfaces/index';
import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import PostGallery from '@components/PostGalley/PostGallery';
import styles from './styles';

interface Props {
  posts: IPost[];
  handleRefresh: () => void;
  refreshing: boolean;
}

const GalleryProfile: React.FC<Props> = ({
  posts,
  handleRefresh,
  refreshing,
}) => {
  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      numColumns={3}
      data={posts}
      renderItem={({item}) => <PostGallery image={item.image} />}
      keyExtractor={item => item.id}
      style={styles.list}
    />
  );
};

export default GalleryProfile;
