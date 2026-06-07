import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert
} from 'react-native';

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/addUsuario'; 

export default function EnderecoScreen({ navigation }) {
  const [nomeUsuario, setNome] = useState('');
  const [emailUsuario, setEmail] = useState('');
  const [senhaUsuario, setSenha] = useState('');
  const [datanascUsuario, setDataNascimento] = useState('');
  const [cepUsuario, setCep] = useState('');
  const [logradouroUsuario, setRua] = useState('');
  const [numlogradouroUsuario, setNumEndereco] = useState('');
  const [complementoUsuario, setComplemento] = useState('');
  const [bairroUsuario, setBairro] = useState('');
  const [cidadeUsuario, setCidade] = useState('');
  const [estadoUsuario, setEstado] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleEnviar = () => {
    // Validação simples
    if (!nomeUsuario || !emailUsuario || !senhaUsuario || !datanascUsuario|| !cepUsuario ||!logradouroUsuario||!numlogradouroUsuario||!complementoUsuario||!bairroUsuario||!cidadeUsuario||!estadoUsuario ) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }
    const dadosUsuario = {
    nomeUsuario: nomeUsuario,
    emailUsuario: emailUsuario,
    senhaUsuario: senhaUsuario,
    datanascUsuario: datanascUsuario,
    cepUsuario: cepUsuario,
    logradouroUsuario: logradouroUsuario,
    numlogradouroUsuario: numlogradouroUsuario,
    complementoUsuario: complementoUsuario,
    bairroUsuario: bairroUsuario,
    cidadeUsuario: cidadeUsuario,
    estadoUsuario: estadoUsuario
  };
  axios.post(API_URL, dadosUsuario)
    .then((response) => {
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
//limpa o form
      setNome('');
      setEmail('');
      setSenha('');
      setDataNascimento('');
      setCep('');
      setRua('');
      setNumEndereco('');
      setComplemento('');
      setBairro('');
      setCidade('');
      setEstado('');
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
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.card}>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Image
              source={require('./assets/logo.png')}
              style={styles.img}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.titulo}>
          Faça seu Cadastro
        </Text>

        {/* Informações pessoais */}
        <Text style={styles.subTitle}>
          Informações pessoais
        </Text>

        <Text style={styles.tituloInput}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nomeUsuario}
          onChangeText={setNome}
        />

        <Text style={styles.tituloInput}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={emailUsuario}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.tituloInput}>Data de nascimento</Text>
        <TextInput
          style={styles.input}
          placeholder="AAAA-MM-DD"
          value={datanascUsuario}
          onChangeText={setDataNascimento}
        />

        <Text style={styles.tituloInput}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={senhaUsuario}
          onChangeText={setSenha}
          secureTextEntry
        />

        {/* Endereço */}
        <Text style={styles.subTitle}>
          Informações de endereço
        </Text>

        <Text style={styles.tituloInput}>CEP</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o CEP"
          value={cepUsuario}
          onChangeText={setCep}
          keyboardType="numeric"
        />





<Text style={styles.tituloInput}>Logradouro</Text>
<TextInput
  style={styles.input}
  value={logradouroUsuario}
  onChangeText={setRua}
/>

<Text style={styles.tituloInput}>Número</Text>
<TextInput
  style={styles.input}
  value={numlogradouroUsuario}
  onChangeText={setNumEndereco}
/>

<Text style={styles.tituloInput}>Complemento</Text>
<TextInput
  style={styles.input}
  value={complementoUsuario}
  onChangeText={setComplemento}
/>

<Text style={styles.tituloInput}>Bairro</Text>
<TextInput
  style={styles.input}
  value={bairroUsuario}
  onChangeText={setBairro}
/>

<Text style={styles.tituloInput}>Cidade</Text>
<TextInput
  style={styles.input}
  value={cidadeUsuario}
  onChangeText={setCidade}
/>

<Text style={styles.tituloInput}>Estado</Text>
<TextInput
  style={styles.input}
  value={estadoUsuario}
  onChangeText={setEstado}
/>
 

        {/* Botão cadastrar */}
        <TouchableOpacity
          style={styles.botao}
          onPress={handleEnviar}
          disabled={loading}
        >
          <Text style={styles.textoBotao}>
            Cadastrar
          </Text>
        </TouchableOpacity>

        {/* Link login */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.link}>
            Já tem uma conta? Faça seu login.
          </Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#F4F6FA',
  },

  card: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 4,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 30,
    textAlign: 'center'
  },

  subTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 15,
    marginTop: 10,
  },

  tituloInput: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    color: '#060341',
    fontSize: 16,
  },

  botao: {
    backgroundColor: '#3B78E7',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },

  botaoSecundario: {
    backgroundColor: '#060341',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#3B78E7',
    fontSize: 16,
  },

  img: {
    height: 150,
    width: 250,
    marginBottom: 10,
  },
});