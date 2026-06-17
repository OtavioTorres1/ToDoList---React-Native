import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';

import Header from './header';

// para dar certo, iniciar com php artisan serve --host=0.0.0.0
const API_URL = 'http://192.168.1.2:8000/api/tarefasApi'; 

export default function HomeScreen({ navigation }) {

  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

      axios.get(API_URL)
      .then((response) => {
        setTarefas(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro na requisição Axios:", err);
        setError('Não foi possível carregar suas tarefas.');
        setLoading(false);
      });

  }, []);

  const getCorPrioridade = (prioridade) => {

    if (prioridade === 'Alta') return 'red';

    if (prioridade === 'Média') return 'orange';

    if (prioridade === 'Baixa') return 'green';

    return 'gray';
  };

  const getCorStatus = (status) => {

    if (status === 'Pendente') return 'gray';

    if (status === 'Em andamento') return '#3B82F6';

    if (status === 'Concluido') return '#22C55E';

    return 'black';
  };


  if (loading) {
    return (
      <View style={styles.centerLoading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando tarefas...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
          <View style={styles.container}>

      <Header navigation={navigation} />

      <View style={styles.main}>

        <View style={styles.topo}>

          <Text style={styles.boasVindas}>
            Olá, o que planeja para hoje?
          </Text>

          <Text style={styles.subtitulo}>
            Você tem tarefas em andamento.
          </Text>

          <View style={styles.linha} />

          <Text style={styles.tituloSecao}>
            Tarefas:
          </Text>
        
        </View>
        </View>
    
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Header navigation={navigation} />

      <View style={styles.main}>

        <View style={styles.topo}>

          <Text style={styles.boasVindas}>
            Olá, o que planeja para hoje?
          </Text>

          <Text style={styles.subtitulo}>
            Você tem tarefas em andamento.
          </Text>

          <View style={styles.linha} />

          <Text style={styles.tituloSecao}>
            Tarefas:
          </Text>

        </View>

        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}

          renderItem={({ item }) => (



              <View
                style={[
                  styles.item,

                  item.statusTarefa === 'Concluido' &&
                  styles.tarefaRealizadaColuna
                ]}
              >

                <Text
                  style={[
                    styles.coluna,

                    item.statusTarefa === 'Concluido' &&
                    styles.tarefaRealizada
                  ]}
                >

                  {item.tituloTarefa}

                </Text>

                <View style={styles.statusContainer}>

                  <Text
                    style={[
                      styles.ultimaColuna,
                      {
                        color: getCorStatus(
                          item.statusTarefa
                        )
                      }
                    ]}
                  >

                    {item.statusTarefa}

                  </Text>

                  <View
                    style={[
                      styles.ultimaColuna,
                      {
                        backgroundColor: getCorStatus(
                          item.statusTarefa
                        )
                      }
                    ]}
                  />

                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Comentar')}>
                  {/* <Image
                    source={require('./assets/comentar.png')}
                    style={styles.img}
                  />*/}
                  <Text style={{}}>
                    💬
                  </Text>
                </TouchableOpacity> 

                

              </View>

          )}

          contentContainerStyle={{
            paddingBottom: 120
          }}
        />
      </View>

      <TouchableOpacity style={styles.botaoAdicionar} onPress={() => navigation.navigate('NovaTarefa')}>

        <Text style={styles.mais}>
          +
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },

  img: {
    height: 250,
    width: 350,
    marginBottom: 10,
  },

  main: {
    flex: 1,
    marginTop: 10,
  },

  topo: {
    paddingHorizontal: 20,
    marginBottom: 18,
  },

  boasVindas: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },

  subtitulo: {
    fontSize: 18,
    color: '#64748B',
    marginBottom: 20,
  },

  linha: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
  },

  tituloSecao: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  titulo: {
    fontSize: 25,
    color: '#1E293B',
    textAlign: 'center'
  },

  item: {
    padding: 18,
    marginBottom: 14,
    marginHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,

    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  statusBolinha: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },

  coluna: {
    flex: 1,
    paddingHorizontal: 5,
    fontSize: 16,
  },

  ultimaColuna: {
    paddingHorizontal: 5,
    fontWeight: '600',
  },

  tarefaRealizada: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },

  tarefaRealizadaColuna: {
    backgroundColor: '#f1f1f1',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    gap: 20,
  },

  botaoAdicionar: {
    position: 'absolute',
    bottom: 25,
    right: 25,

    width: 65,
    height: 65,

    borderRadius: 100,

    backgroundColor: '#ff8c00',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 6,
  },

  mais: {
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
    marginTop: -3,
  },

  botoesModal: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },

  botaoExcluir: {
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  botaoEditar: {
    backgroundColor: '#F59E0B',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  botaoFechar: {
    backgroundColor: '#E2E8F0',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  textoBotaoAcao: {
    color: 'white',
    fontWeight: 'bold',
  },

  center: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F4F6FA',
    flexDirection: 'column'
  },

    centerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6FA',
    flexDirection: 'column'
  },

  loadingText: {
    marginTop: 10,
    color: '#666',
  },

  errorText: {
    color: '#d9534f',
    fontSize: 16,
    fontWeight: 'bold',
  },
});