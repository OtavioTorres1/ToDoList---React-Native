import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

export default function EditarTarefaScreen({ route, navigation }) {

  // PEGA A TAREFA
  const { tarefa } = route.params;

  // STATES
  const [tituloTarefa, setTituloTarefa] = useState('');
  const [descTarefa, setDescTarefa] = useState('');
  const [statusTarefa, setStatusTarefa] = useState(tarefa.statusTarefa);
  const [prioridadeTarefa, setPrioridadeTarefa] = useState(tarefa.prioridadeTarefa);
  const [prazoTarefa, setPrazoTarefa] = useState('');

  // EDITAR
  async function editarTarefa() {

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/api/tarefas/${tarefa.id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({

            tituloTarefa:
              tituloTarefa || tarefa.tituloTarefa,

            descTarefa:
              descTarefa || tarefa.descTarefa,

            statusTarefa,

            prioridadeTarefa,

            prazoTarefa:
              prazoTarefa || tarefa.prazoTarefa,
          }),
        }
      );

      const data = await response.json();

      Alert.alert(
        'Sucesso',
        data.mensagem
      );

      navigation.goBack();

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível editar a tarefa'
      );
    }
  }

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >

      {/* HEADER */}
      <View style={styles.header}>

        <Text style={styles.titulo}>
          Editar Tarefa
        </Text>

        <Text style={styles.subtitulo}>
          Atualize as informações da sua tarefa
        </Text>

      </View>

      {/* FORM */}
      <View style={styles.form}>

        {/* TITULO */}
        <View style={styles.campo}>

          <Text style={styles.label}>
            Título da tarefa
          </Text>

          <TextInput
            style={styles.input}
            placeholder={tarefa.tituloTarefa}
            value={tituloTarefa}
            onChangeText={setTituloTarefa}
          />

        </View>

        {/* DESCRIÇÃO */}
        <View style={styles.campo}>

          <Text style={styles.label}>
            Descrição
          </Text>

          <TextInput
            style={styles.input}
            placeholder={tarefa.descTarefa}
            value={descTarefa}
            onChangeText={setDescTarefa}
          />

        </View>

        {/* STATUS */}
        <View style={styles.campo}>

        <Text style={styles.label}>
            Status
        </Text>

        <TouchableOpacity
            style={styles.input}
            onPress={() => {

            if (statusTarefa === 'Pendente') {
                setStatusTarefa('Em andamento');

            } else if (statusTarefa === 'Em andamento') {
                setStatusTarefa('Concluido');

            } else {
                setStatusTarefa('Pendente');
            }
            }}
        >

            <Text style={{ fontSize: 15 }}>
            {statusTarefa}
            </Text>

        </TouchableOpacity>

        </View>

        {/* PRIORIDADE */}
        <View style={styles.campo}>

        <Text style={styles.label}>
            Prioridade
        </Text>

        <TouchableOpacity
            style={styles.input}
            onPress={() => {

            if (prioridadeTarefa === 'Baixa') {
                setPrioridadeTarefa('Média');

            } else if (prioridadeTarefa === 'Média') {
                setPrioridadeTarefa('Alta');

            } else {
                setPrioridadeTarefa('Baixa');
            }
            }}
        >

            <Text style={{ fontSize: 15 }}>
            {prioridadeTarefa}
            </Text>

        </TouchableOpacity>

        </View>

        {/* PRAZO */}
        <View style={styles.campo}>

          <Text style={styles.label}>
            Prazo
          </Text>

          <TextInput
            style={styles.input}
            placeholder={tarefa.prazoTarefa}
            value={prazoTarefa}
            onChangeText={setPrazoTarefa}
          />

        </View>

        {/* BOTÃO */}
        <TouchableOpacity
          style={styles.botao}
          onPress={editarTarefa}
        >

          <Text style={styles.textoBotao}>
            Salvar Alterações
          </Text>

        </TouchableOpacity>

        {/* VOLTAR */}
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >

          <Text style={styles.textoBotao}>
            Voltar
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },

  header: {

    backgroundColor: '#3B82F6',

    paddingTop: 70,
    paddingBottom: 45,
    paddingHorizontal: 25,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  titulo: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitulo: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },

  form: {
    padding: 22,
    gap: 18,
  },

  campo: {
    gap: 8,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },

  input: {

    backgroundColor: 'white',

    borderWidth: 2,
    borderColor: '#E2E8F0',

    borderRadius: 14,

    padding: 15,

    fontSize: 15,
  },

  botao: {

    marginTop: 15,

    backgroundColor: '#F97316',

    padding: 17,

    borderRadius: 14,

    alignItems: 'center',
  },

  botaoVoltar: {

    backgroundColor: '#3B82F6',

    padding: 17,

    borderRadius: 14,

    alignItems: 'center',
  },

  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});