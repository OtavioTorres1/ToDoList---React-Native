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

export default function EnderecoScreen({ navigation }) {
  const [cep, setCep] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <View style={{ display:'flex', alignItems:'center'}}>
        <Image source={require('./assets/logo.png')}style={styles.img}/>
      </View>
    </TouchableOpacity>

      <Text style={styles.title}>Consulta por CEP</Text>

  
      <Text style={styles.label}>CEP:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Logradouro:</Text>
      <TextInput style={styles.input} editable={false} />

      <Text style={styles.label}>Número:</Text>
      <TextInput style={styles.input} editable={false} />

      <Text style={styles.label}>Complemento:</Text>
      <TextInput style={styles.input} editable={false} />

      <Text style={styles.label}>Bairro:</Text>
      <TextInput style={styles.input} editable={false} />

      <Text style={styles.label}>Cidade:</Text>
      <TextInput style={styles.input} editable={false} />

      <Text style={styles.label}>Estado:</Text>
      <TextInput style={styles.input} editable={false} />

            <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center'
  },
  logo: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0a0a5c',
    marginBottom: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0a0a5c',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 22,
  },
  label: {
    fontSize: 16,
    color: '#0a0a5c',
    marginBottom: 5,
    marginTop: 10
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 12,
    marginBottom: 5
  },
  button: {
    backgroundColor: '#0a0a5c',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },

    img: {
    height:150,
    width:150,
  },
});