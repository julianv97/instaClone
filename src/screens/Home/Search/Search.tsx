import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {searchUsers} from '@redux/users/thunks';
import Field from '@components/Field/Field';

interface Props {
  navigation: any;
}

const Search: React.FC<Props> = ({navigation}) => {
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
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', {uid: item.id})}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Search;
