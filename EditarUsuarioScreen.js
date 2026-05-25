import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

export default function EditarUsuarioScreen({
  navigation,
}) {

  const [usuario, setUsuario] = useState(null);

  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const [datanascUsuario, setDatanascUsuario] = useState('');

  const [cepUsuario, setCepUsuario] = useState('');
  const [logradouroUsuario, setLogradouroUsuario] = useState('');
  const [numlogradouroUsuario, setNumlogradouroUsuario] = useState('');
  const [complementoUsuario, setComplementoUsuario] = useState('');
  const [bairroUsuario, setBairroUsuario] = useState('');
  const [cidadeUsuario, setCidadeUsuario] = useState('');
  const [estadoUsuario, setEstadoUsuario] = useState('');

  useEffect(() => {

    fetch('http://127.0.0.1:8000/api/usuarios')
      .then((response) => response.json())
      .then((data) => {

        setUsuario(data);

        setNomeUsuario(data.nomeUsuario);
        setEmailUsuario(data.emailUsuario);
        setDatanascUsuario(data.datanascUsuario);

        setCepUsuario(data.cepUsuario);
        setLogradouroUsuario(data.logradouroUsuario);
        setNumlogradouroUsuario(data.numlogradouroUsuario);
        setComplementoUsuario(data.complementoUsuario);
        setBairroUsuario(data.bairroUsuario);
        setCidadeUsuario(data.cidadeUsuario);
        setEstadoUsuario(data.estadoUsuario);

      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  async function editarUsuario() {

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/api/usuarios/${usuario.id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({

            nomeUsuario,
            emailUsuario,
            senhaUsuario,
            datanascUsuario,

            cepUsuario,
            logradouroUsuario,
            numlogradouroUsuario,
            complementoUsuario,
            bairroUsuario,
            cidadeUsuario,
            estadoUsuario,

          }),

        }
      );

      const data = await response.json();

      console.log(data);

      Alert.alert(
        'Sucesso',
        'Usuário atualizado com sucesso!'
      );

      navigation.navigate('Drawer');

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Erro ao atualizar usuário'
      );

    }

  }

  if (!usuario) {

    return (

      <View style={styles.loading}>

        <Text>Carregando...</Text>

      </View>

    );

  }

  return (

    <View style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>

          <Text style={styles.titulo}>
            Editar Usuário
          </Text>

          <Text style={styles.subtitulo}>
            Atualize os dados do usuário
          </Text>

        </View>

        {/* FORM */}
        <View style={styles.formulario}>

          {/* NOME */}
          <View style={styles.campo}>

            <Text style={styles.label}>
              Nome
            </Text>

            <TextInput
              style={styles.input}
              placeholder={usuario.nomeUsuario}
              value={nomeUsuario}
              onChangeText={setNomeUsuario}
            />

          </View>

          {/* EMAIL */}
          <View style={styles.campo}>

            <Text style={styles.label}>
              Email
            </Text>

            <TextInput
              style={styles.input}
              placeholder={usuario.emailUsuario}
              value={emailUsuario}
              onChangeText={setEmailUsuario}
            />

          </View>

          {/* SENHA */}
          <View style={styles.campo}>

            <Text style={styles.label}>
              Senha
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite nova senha"
              secureTextEntry={true}
              value={senhaUsuario}
              onChangeText={setSenhaUsuario}
            />

          </View>

          {/* NASCIMENTO */}
          <View style={styles.campo}>

            <Text style={styles.label}>
              Data de nascimento
            </Text>

            <TextInput
              style={styles.input}
              placeholder={usuario.datanascUsuario}
              value={datanascUsuario}
              onChangeText={setDatanascUsuario}
            />

          </View>

          {/* CEP */}
          <View style={styles.campo}>

            <Text style={styles.label}>
              CEP
            </Text>

            <TextInput
              style={styles.input}
              placeholder={usuario.cepUsuario}
              value={cepUsuario}
              onChangeText={setCepUsuario}
            />

          </View>

          {/* LOGRADOURO */}
          <View style={styles.campo}>

            <Text style={styles.label}>
              Logradouro
            </Text>

            <TextInput
              style={styles.input}
              placeholder={usuario.logradouroUsuario}
              value={logradouroUsuario}
              onChangeText={setLogradouroUsuario}
            />

          </View>

          {/* NÚMERO */}
          <View style={styles.campo}>

            <Text style={styles.label}>
              Número
            </Text>

            <TextInput
              style={styles.input}
              placeholder={usuario.numlogradouroUsuario?.toString()}
              value={numlogradouroUsuario}
              onChangeText={setNumlogradouroUsuario}
            />

          </View>

          {/* COMPLEMENTO */}
          <View style={styles.campo}>

            <Text style={styles.label}>
              Complemento
            </Text>

            <TextInput
              style={styles.input}
              placeholder={usuario.complementoUsuario}
              value={complementoUsuario}
              onChangeText={setComplementoUsuario}
            />

          </View>

          {/* BAIRRO */}
          <View style={styles.campo}>

            <Text style={styles.label}>
              Bairro
            </Text>

            <TextInput
              style={styles.input}
              placeholder={usuario.bairroUsuario}
              value={bairroUsuario}
              onChangeText={setBairroUsuario}
            />

          </View>

          {/* CIDADE */}
          <View style={styles.campo}>

            <Text style={styles.label}>
              Cidade
            </Text>

            <TextInput
              style={styles.input}
              placeholder={usuario.cidadeUsuario}
              value={cidadeUsuario}
              onChangeText={setCidadeUsuario}
            />

          </View>

          {/* ESTADO */}
          <View style={styles.campo}>

            <Text style={styles.label}>
              Estado
            </Text>

            <TextInput
              style={styles.input}
              placeholder={usuario.estadoUsuario}
              value={estadoUsuario}
              onChangeText={setEstadoUsuario}
            />

          </View>

          {/* BOTÃO SALVAR */}
          <TouchableOpacity
            style={styles.botao}
            onPress={editarUsuario}
          >

            <Text style={styles.textoBotao}>
              Salvar alterações
            </Text>

          </TouchableOpacity>

          {/* BOTÃO VOLTAR */}
          <TouchableOpacity
            style={styles.botaoVoltar}
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

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scroll: {
    paddingBottom: 50,
  },

  header: {

    backgroundColor: '#3B78E7',

    paddingTop: 70,
    paddingBottom: 40,

    alignItems: 'center',
  },

  titulo: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },

  subtitulo: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginTop: 8,
  },

  formulario: {
    padding: 20,
    gap: 18,
  },

  campo: {
    gap: 8,
  },

  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#475569',
  },

  input: {

    backgroundColor: 'white',

    borderWidth: 2,
    borderColor: '#E2E8F0',

    borderRadius: 12,

    padding: 15,

    fontSize: 15,
  },

  botao: {

    backgroundColor: '#F97316',

    paddingVertical: 16,

    borderRadius: 12,

    alignItems: 'center',

    marginTop: 10,
  },

  botaoVoltar: {

    backgroundColor: '#3B82F6',

    paddingVertical: 16,

    borderRadius: 12,

    alignItems: 'center',
  },

  textoBotao: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});