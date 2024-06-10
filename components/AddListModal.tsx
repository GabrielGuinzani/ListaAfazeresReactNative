import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import colors from '../colors';
import { AntDesign } from '@expo/vector-icons';
import { tempData } from '../tempData';

interface AddListModalProps {
  closeModal: () => void;
}

export default function AddListModal({ closeModal }: AddListModalProps) {
  const backgroundColors = ['#5CD859', '#24A6D9', '#595BD9', '#8022D9', '#D159D8', '#D85963', '#D88559'];
  const [nome, setNome] = React.useState('');
  const [corDeFundo, setCorDeFundo] = React.useState(backgroundColors[0]);

  function renderColors() {
    return backgroundColors.map(color => {
      return (
        <TouchableOpacity key={color} style={[styles.colorSelect, { backgroundColor: color }]} onPress={() => setCorDeFundo(color)} />
      );
    });
  }


  const createTodo = () => {
    const newTodo = { id: tempData.length + 1, name: nome, color: corDeFundo, todos: [] };
    tempData.push(newTodo);
  
    setNome('');
    closeModal();
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity style={{ position: 'absolute', top: 64, right: 32 }} onPress={() => closeModal()}>
        <AntDesign name="close" size={24} color={colors.black} />
      </TouchableOpacity>

      <View style={{ alignSelf: 'stretch', marginHorizontal: 32 }}>
        <Text style={styles.title}>Criar Lista de Afazeres</Text>
        <TextInput style={styles.input} placeholder="Nome da Lista?" onChangeText={text => setNome(text)}/>
            <View style= {{flexDirection : "row", justifyContent: 'space-between', marginTop:12 }}>
              {renderColors()}
            </View>
        <TouchableOpacity style={[styles.create, { backgroundColor: corDeFundo }]} onPress={createTodo}>
          <Text style={{ color: colors.white, fontWeight: '600' }}>Criar!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.black,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4,

    },
});