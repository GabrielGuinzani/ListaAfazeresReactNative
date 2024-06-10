import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from "../colors";


interface Todos {
    title: string,
    completed: boolean,
}


interface TodoModalProps {
  list: {
    id: number;
    name: string;
    todos: Todos[];
    color: string;
  };
  closeModal: () => void;
}


function TodoModalObject({ list, closeModal }: TodoModalProps) {
    const [ listName, setListName ] = React.useState(list.name);
    const [ listColor, setListColor ] = React.useState(list.color);
    const [ todos, setTodos ] = React.useState(list.todos);
    const taskCount = todos.length;
    const completedCount = todos.filter((todo: { completed: boolean; }) => todo.completed).length;
    function renderTodo ({item} : {item: Todos}) {
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity>
                    <Ionicons 
                    name={item.completed ? "square": "square-outline"} 
                    size={24} 
                    color={colors.gray} 
                    style={{width: 32}}/>
                </TouchableOpacity>
                <Text style= {[styles.todo, {textDecorationLine:item.completed ? "line-through":"none", color: item.completed ? colors.gray:colors.black}]}> {item.title}</Text>
            </View>
        );
    }

    const insets = useSafeAreaInsets();
    return (
        <View style = { [styles.container, {    
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right}]}>


            <TouchableOpacity style = {{position:"absolute", top:64, right: 32, zIndex: 10}} 
            onPress={closeModal}>

                <AntDesign name="close" size={24} color= {colors.black}/>

            </TouchableOpacity>


            <View style={[styles.section, styles.header, {borderBottomColor: listColor}]}>
                <View>
                    <Text style={styles.title}>{listName}</Text>
                    <Text style={styles.taskCount}>{completedCount} of {taskCount}
                    
                    </Text>
                </View>
            </View>

            <View style={[styles.section, {flex: 3}]}>
                <FlatList
                    data={todos} 
                    renderItem={({item}) => renderTodo({item})} 
                    keyExtractor={(item) => item.title} 
                    contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <KeyboardAvoidingView style={[styles.section, styles.footer]} behavior="padding">
                    <TextInput style ={[styles.input, {borderColor: listColor}]} />
                        <TouchableOpacity style={[styles.addTodo, {backgroundColor: listColor}]}>
                            <AntDesign name="plus" size={16} color={colors.white}/>
                        </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}


export default function TodoModal({ list, closeModal }: TodoModalProps) {
    
    return (
        <SafeAreaProvider >
            <TodoModalObject list={list} closeModal={closeModal} />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        flex: 1,
        alignSelf: 'stretch',
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 3,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: colors.black,
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.blue,
        fontWeight: '600',
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    todo: {
        color: colors.black,
        fontWeight: '700',
        fontSize: 16,
    },

});