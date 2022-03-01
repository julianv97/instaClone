import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {searchUsers} from '@redux/users/thunks';
import Field from '@components/Field/Field';

const Search = () => {
  const {control} = useForm();
  const dispatch = useDispatch();
  const usersSearch = useSelector((state: any) => state.users.usersSearch);

  // TODO: ver como mejorar la busqueda
  const handleSearch = (text: string) => {
    dispatch(searchUsers(text));
  };

  return (
    <View>
      <Field
        control={control}
        name="search"
        placeholder="Search..."
        secureTextEntry={false}
        customOnChangeText={handleSearch}
      />

      <FlatList
        data={usersSearch}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default Search;
