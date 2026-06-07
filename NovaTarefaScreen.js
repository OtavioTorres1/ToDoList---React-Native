import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/addTarefa'; 

export default function NovaTarefaScreen({ navigation }) {

  const [tituloTarefa, setTituloTarefa] = useState('');
  const [descTarefa, setDescTarefa] = useState('');
  const [statusTarefa, setStatusTarefa] = useState('Pendente');
  const [prioridadeTarefa, setPrioridadeTarefa] = useState('Baixa');
  const [prazoTarefa, setPrazoTarefa] = useState('');
  const [tb_usuario_id, setTbUsuarioId] = useState('');

   const handleEnviar = () => {
     // Validação simples
     if (!tituloTarefa || !descTarefa || !statusTarefa || !prioridadeTarefa|| !prazoTarefa ||!tb_usuario_id ) {
       Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
       return;
     }
     const dadosTarefa = {
     tituloTarefa: tituloTarefa,
     descTarefa: descTarefa,
     statusTarefa: statusTarefa,
     prioridadeTarefa: prioridadeTarefa,
     prazoTarefa: prazoTarefa,
     tb_usuario_id: tb_usuario_id
   };
     axios.post(API_URL, dadosTarefa)
       .then((response) => {
         Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
   //limpa o form
         setTituloTarefa('');
         setDescTarefa('');
         setPrazoTarefa('');
         setPrioridadeTarefa('');
         setStatusTarefa('');
         setTbUsuarioId('');
       })
       .catch((err) => {
         console.error("Erro na requisição POST Axios:", err);
         Alert.alert('Erro' ,"Não foi possível realizar o cadastro.");
       })
       .finally(() => {
         setLoading(false);
       });
     };

  return (

    <View style={styles.container}>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>

          <Text style={styles.titulo}>
            Nova Tarefa
          </Text>

          <Text style={styles.subtitulo}>
            Crie uma nova tarefa
          </Text>

        </View>

        {/* FORM */}
        <View style={styles.formulario}>

          {/* TITULO */}
          <View style={styles.campo}>

            <Text style={styles.label}>
              Título da tarefa
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite o título"
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
              style={[
                styles.input,
                styles.textArea
              ]}
              placeholder="Descrição da tarefa"
              multiline={true}
              numberOfLines={4}
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
              style={styles.select}
              onPress={() => {

                if (statusTarefa === 'Pendente') {
                  setStatusTarefa('Em andamento');
                }

                else if (
                  statusTarefa === 'Em andamento'
                ) {
                  setStatusTarefa('Concluido');
                }

                else {
                  setStatusTarefa('Pendente');
                }

              }}
            >

              <Text style={styles.selectTexto}>
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
              style={styles.select}
              onPress={() => {

                if (prioridadeTarefa === 'Baixa') {
                  setPrioridadeTarefa('Média');
                }

                else if (
                  prioridadeTarefa === 'Média'
                ) {
                  setPrioridadeTarefa('Alta');
                }

                else {
                  setPrioridadeTarefa('Baixa');
                }

              }}
            >

              <Text style={styles.selectTexto}>
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
              placeholder="2026-05-24"
              value={prazoTarefa}
              onChangeText={setPrazoTarefa}
            />

          </View>

          {/* ID */}
          <View style={styles.campo}>

            <Text style={styles.label}>
              Id do Usuario
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite o id"
              value={tb_usuario_id}
              onChangeText={setTbUsuarioId}
            />

          </View>

          {/* BOTÃO CRIAR */}
          <TouchableOpacity
            style={styles.botao}
            onPress={handleEnviar}
          >

            <Text style={styles.textoBotao}>
              Criar tarefa
            </Text>

          </TouchableOpacity>

          {/* BOTÃO VOLTAR */}
          <TouchableOpacity
            style={styles.botao2}
            onPress={() => navigation.navigate('Drawer')}
          >

            <Text style={styles.textoBotao}>
              Voltar
            </Text>

          </TouchableOpacity>

        </View>

      </ScrollView>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },

  scroll: {
    flex: 1,
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

  formulario: {
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
    color: '#1E293B',
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  select: {

    backgroundColor: 'white',

    borderWidth: 2,
    borderColor: '#E2E8F0',

    borderRadius: 14,

    padding: 15,
  },

  selectTexto: {
    fontSize: 15,
    color: '#1E293B',
  },

  botao: {

    marginTop: 15,

    backgroundColor: '#F97316',

    padding: 17,

    borderRadius: 14,

    alignItems: 'center',
  },

  botao2: {

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