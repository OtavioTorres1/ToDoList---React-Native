import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';

import axios from 'axios';

export default function EnderecoScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState('');

  const buscarEndereco = async () => {
   
    try {      
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setErro('CEP não encontrado.');
        setEndereco(null);
      } else {
        setEndereco(response.data);
        setErro('');
      }
    } catch (error) {
      setErro('Ocorreu um erro na consulta.');
      setEndereco(null);
    }
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
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.tituloInput}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.tituloInput}>Data de nascimento</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          value={dataNascimento}
          onChangeText={setDataNascimento}
        />

        <Text style={styles.tituloInput}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={senha}
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
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.botaoSecundario} onPress={buscarEndereco}>
          <Text style={styles.textoBotao}>
            Buscar CEP
          </Text>
        </TouchableOpacity>

        {erro && <Text style={styles.error}>{erro}</Text>}

{endereco && (
  <>
    <Text style={styles.tituloInput}>Logradouro</Text>
    <TextInput
      style={styles.input}
      value={endereco.logradouro}
      editable={false}
    />

    <Text style={styles.tituloInput}>Número</Text>
    <TextInput style={styles.input} />

    <Text style={styles.tituloInput}>Complemento</Text>
    <TextInput style={styles.input} />

    <Text style={styles.tituloInput}>Bairro</Text>
    <TextInput
      style={styles.input}
      value={endereco.bairro}
      editable={false}
    />

    <Text style={styles.tituloInput}>Cidade</Text>
    <TextInput
      style={styles.input}
      value={endereco.localidade}
      editable={false}
    />

    <Text style={styles.tituloInput}>Estado</Text>
    <TextInput
      style={styles.input}
      value={endereco.uf}
      editable={false}
    />
  </>
)}

        {/* Botão cadastrar */}
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Login')}
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