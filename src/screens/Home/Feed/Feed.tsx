import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@redux/index';

import {getPosts} from '@redux/posts/thunks';

const Feed = () => {
  const dispatch = useDispatch();
  const posts = useSelector<RootState>(state => state.posts.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({item}) => <Text>{item.caption}</Text>}
      />
    </View>
  );
};

export default Feed;
