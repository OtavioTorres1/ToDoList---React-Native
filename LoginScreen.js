import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.card}>

        <View style={{ alignItems:'center' }}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.img}
          />
        </View>

        <Text style={styles.titulo}>
          Faça seu Login
        </Text>

        <Text style={styles.tituloInput}>
          Email
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
        />

        <Text style={styles.tituloInput}>
          Senha
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Drawer')}
        >
          <Text style={styles.textoBotao}>
            Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.link}>
            Ainda não tem uma conta? Cadastre-se.
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#F4F6FA'
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
    fontSize: 35,
    fontWeight: 'bold',
    color:'#1E293B',
    marginBottom: 30,
    textAlign: 'center'
  },

  tituloInput: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#1E293B',
    marginBottom: 5,
  },

  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    color:'#060341',
    fontSize: 16,
  },

  botao: {
    backgroundColor: '#3B78E7',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
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
    width: 300,
    marginBottom: 10,
  },
});