import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal } from 'react-native';
import colors from './colors';
import {tempData} from './tempData';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';

interface List {
  id: number;
  name: string;
  color: string;
  todos: any[];
}

export default function App () {
    const [addTodoVisible, setAddTodoVisible] = React.useState(false);
    const [lists, setLists] = React.useState(tempData);

    function toggleAddTodoModal  ()  {
      setAddTodoVisible(!addTodoVisible);
    }


    const addList = (list: List) => {
      setLists([...lists, {...list, id: lists.length + 1, todos: [], }]);
    };

    const updateList = (list: List) => {
      setLists(lists.map(item => item.id === list.id ? list : item));
    }

    function renderList(lista: List) {
      return <TodoList id={lista.id}
      name={lista.name} 
      color={lista.color} 
      todos={lista.todos} 
      updateList={updateList} />;
  
    }
    return (
      <View style={styles.container}>
          <Modal animationType='slide' visible= {addTodoVisible} onRequestClose={ () => toggleAddTodoModal() }> 
              <AddListModal closeModal = {() => toggleAddTodoModal()} addList = {addList} />
          </Modal>


        <View style={{flexDirection:"row"}}>
        <View style = { styles.divider }/>
          <Text style={styles.title}>
            <Text style={{fontWeight: "800", color: colors.black}}>
            Meus<Text style={{fontWeight: "300", color: colors.blue}}> Afazeres</Text>
            </Text>
          </Text>
            <View style = { styles.divider }/>
        </View>

        <View style={{marginVertical: 48}}>
          <TouchableOpacity style={styles.addList} onPress={ () => setAddTodoVisible(!addTodoVisible)} >
            <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}> Adicionar Lista</Text>
        </View>
        

        <View style= {{height: 275, paddingLeft: 32}}>
          <FlatList
              data = {lists}
              keyExtractor = {item => item.name}
              horizontal = {true}
              showsHorizontalScrollIndicator = {false}
              renderItem = {({item}) => 
                renderList(item)
              }
              keyboardShouldPersistTaps = 'always'
          >
          </FlatList>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    flex: 1,
    backgroundColor: colors.lightBlue,
    height: 1,
    alignSelf: 'center'
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal: 64

  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8
  }
});
