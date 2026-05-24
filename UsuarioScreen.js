import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import Header from './header';

export default function UsuarioScreen({ navigation }) {

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {

  fetch('http://127.0.0.1:8000/api/usuarios')
    .then((response) => response.json())
    .then((data) => {

      console.log(data);

      setUsuario(data);

    })
    .catch((error) => {
      console.log(error);
    });

    }, []);

  return (

    <View style={styles.container}>

      <Header navigation={navigation} />

{usuario && (

<View style={styles.main}>

  <View style={styles.item}>

    <View style={styles.partefoto}>

      <Image
        source={require('./assets/Perfil2.jpeg')}
        style={styles.foto}
      />

      <Text style={styles.alterarFoto}>
        Alterar
      </Text>

      <Text style={styles.textFoto}>
        Foto de perfil
      </Text>

    </View>

    <View style={styles.infosUsuario}>

      <Text style={styles.tituloInfo}>
        Nome:
      </Text>

      <Text style={styles.textUsuario}>
        {usuario.nomeUsuario}
      </Text>

    </View>

    <View style={styles.infosUsuario}>

      <Text style={styles.tituloInfo}>
        Email:
      </Text>

      <Text style={styles.textUsuario}>
        {usuario.emailUsuario}
      </Text>

    </View>

    <View style={styles.infosUsuario}>

      <Text style={styles.tituloInfo}>
        Nascimento:
      </Text>

      <Text style={styles.textUsuario}>
        {usuario.datanascUsuario}
      </Text>

    </View>

  </View>

</View>

)}

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },

  foto: {
    width: 144,
    height: 160,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 100,
    opacity: 0.5
  },

  main: {
    flex: 1,
    display: 'flex',
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    alignItems: 'stretch',
  },

  textUsuario: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  partefoto: {
    backgroundColor: '#060341',
    width: '100%',
    padding: 30,
    display: 'flex',
    gap: 70,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },

  infosUsuario: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#F4F6FA',
  },

  tituloInfo: {
    fontSize: 20,
    color: '#555',
    marginBottom: 5
  },

  alterarFoto: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: -160
  },

  textFoto: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },

  areaBotoes: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginTop: 30,
    marginBottom: 40,
  },

  botaoEditar: {
    backgroundColor: '#ff8c00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  botaoExcluir: {
    backgroundColor: '#c1121f',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

});