import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView
} from 'react-native';

import Header from './header';

const tarefas = [
  {
    id: '1',
    foto: require('./assets/Perfil2.jpeg'),
    nome: 'Otavio Ribeiro Torres',
    email: 'otribeiro122@gmail.com',
    datanasc: '30/04/2008'
  }
];

export default function UsuarioScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <Header navigation={navigation} />

      {/* Conteúdo da página */}
      <View style={styles.main}>

        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>

              {/* Foto */}
              <View style={styles.partefoto}>

                <TouchableOpacity>
                  <Image
                    source={item.foto}
                    style={styles.foto}
                  />

                  <Text style={styles.alterarFoto}>
                    Alterar
                  </Text>
                </TouchableOpacity>

                <Text style={styles.textFoto}>
                  Foto de perfil
                </Text>

              </View>

              {/* Nome */}
              <View style={styles.infosUsuario}>
                <Text style={styles.tituloInfo}>Nome:</Text>

                <Text style={styles.textUsuario}>
                  {item.nome}
                </Text>
              </View>

              {/* Email */}
              <View style={styles.infosUsuario}>
                <Text style={styles.tituloInfo}>Email:</Text>

                <Text style={styles.textUsuario}>
                  {item.email}
                </Text>
              </View>

              {/* Nascimento */}
              <View style={styles.infosUsuario}>
                <Text style={styles.tituloInfo}>
                  Nascimento:
                </Text>

                <Text style={styles.textUsuario}>
                  {item.datanasc}
                </Text>
              </View>

            </View>
          )}
        />

        {/* Botões */}
        <View style={styles.areaBotoes}>

          <TouchableOpacity style={styles.botaoEditar}>
            <Text style={styles.textoBotao}>
              Editar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoExcluir}>
            <Text style={styles.textoBotao}>
              Excluir
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </ScrollView>
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
    gap: 80,
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
    marginTop: -90
  },

  textFoto: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },

  /* Área dos botões */
  areaBotoes: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginTop: 30,
    marginBottom: 40,
  },

  /* Botão editar */
  botaoEditar: {
    backgroundColor: '#ff8c00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  /* Botão excluir */
  botaoExcluir: {
    backgroundColor: '#c1121f',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  /* Texto dos botões */
  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});