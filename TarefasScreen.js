import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

  const tarefas = [
    { id: '1', nome: 'Estudar', desc: "Estudar para a prova", status: "pendente", prioridade: "alta", prazo: "18h"  },
    { id: '2', nome: 'Treinar', desc: "Ir para a academia", status: "em andamento", prioridade: "média", prazo: "15h" },
    { id: '3', nome: 'Dormir', desc: "Dormir cedo", status: "pendente", prioridade: "alta", prazo: "22h" },
    { id: '4', nome: 'ir ao Trabalho', desc: "Trabalhar na clt para não ir morar na rua", status: "realizado", prioridade: "alta", prazo: "06h" }
  ];

export default function App() {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Image
        source={require('./assets/splash-icon.png')}
        style={styles.logo}
        />
      </View>

      {/* Conteúdo da página */}
      <View style={styles.main}>

              <Text style={styles.titulo}>Lista de Tarefas</Text>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
             <Text style={styles.id}>{item.id}-</Text>
            <Text style={styles.coluna}>{item.nome}</Text>
            <Text style={styles.coluna}>{item.desc}</Text>
            <Text style={styles.coluna}>{item.status}</Text>
            <Text style={styles.coluna}>{item.prioridade}</Text>
            <Text style={styles.ultimaColuna}>{item.prazo}</Text>
          </View>
        )}
      />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 70,
    backgroundColor: '#bad3ef',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    titulo: {
    fontSize: 22,
    marginBottom: 30,
    marginTop: 40,
    color: 'darkblue',
  },

  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomHeight: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    backgroundColor: 'aliceblue',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  id: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#507f98',
  },

    coluna: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#a0a0a0',
    paddingHorizontal: 5
  },

  ultimaColuna: {
    flex: 1,
    paddingHorizontal: 5
  }
});