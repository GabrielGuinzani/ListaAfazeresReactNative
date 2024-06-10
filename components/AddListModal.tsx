import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import colors from '../colors';
import { AntDesign } from '@expo/vector-icons';

interface AddListModalProps {
  closeModal: () => void;
}

export default function AddListModal({ closeModal }: AddListModalProps) {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity style={{ position: 'absolute', top: 64, right: 32 }} onPress={() => closeModal()}>
        <AntDesign name="close" size={24} color={colors.black} />
      </TouchableOpacity>

      <View style={{ alignSelf: 'stretch', marginHorizontal: 32 }}>
        <Text style={styles.title}>Criar Lista de Afazeres</Text>
        <TextInput style={styles.input} placeholder="Nome da Lista?" />
        <TouchableOpacity style={[styles.create, { backgroundColor: colors.blue }]} onPress={() => createTodo()}>
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
});