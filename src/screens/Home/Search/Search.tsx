import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {db} from '@helpers/firebase';
import {useForm} from 'react-hook-form';
import Field from '@components/Field/Field';

const Search = () => {
  const [usersSearch, setUsersSeach] = useState<any[]>([]);
  const {control} = useForm();

  // TODO: esto debería ir en thunks
  // TODO: ver como mejorar la busqueda
  const handleSearch = (text: string) => {
    if (text.length > 0) {
      db.collection('users')
        .where('name', '>=', text)
        .get()
        .then(snapshot => {
          let users = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data};
          });
          setUsersSeach(users);
        });
    } else {
      setUsersSeach([]);
    }
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
