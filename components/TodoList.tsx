import React from "react";
import colors from "../colors";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal } from "react-native";
import { counterEvent } from "react-native/Libraries/Performance/Systrace";
import TodoModal from "./TodoModal";

interface Todos {
        title: string,
        completed: boolean,
}

interface TodoListType {
    id: number,
    name: string,
    color: string,
    todos: Todos[]
}

 const TodoList = ( {id, name,todos, color} : TodoListType) => {
    const [showListVisible, setShowListVisible] = React.useState(false);
    function toggleListModal() {
        setShowListVisible(!showListVisible);
    }

    const completedCount = todos.filter(todo => todo.completed).length;
    const remainingCount = todos.length - completedCount;

  return (
    <View>
        <Modal animationType='slide' visible= {showListVisible} onRequestClose={ () => toggleListModal()}>

            <TodoModal list = {{ id, name, todos, color }} closeModal = {() => toggleListModal()} />
                

                
        </Modal>
        <TouchableOpacity style = {[styles.listContainer,{backgroundColor: color}]} onPress={() => toggleListModal() }>
                <Text style={styles.listTitle} numberOfLines={1}>
                    {name}
                </Text>
                <View>
                    <View style = {{alignItems: "center"}}> 
                        <Text style = {styles.count}>{remainingCount}</Text>
                        <Text style = {styles.subtitle}>Restante</Text>
                    </View>
                    <View style = {{alignItems: "center"}}>
                        <Text style = {styles.count}>{completedCount}</Text>
                        <Text style = {styles.subtitle}>Feito</Text>
                    </View>
                </View>
            </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 200
    },
    listTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: '200',
        color: colors.white,
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.white,
    }
});


export default TodoList;