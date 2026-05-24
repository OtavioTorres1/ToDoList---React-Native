import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';

import Header from './header';

export default function HomeScreen({ navigation }) {

  const [tarefas, setTarefas] = useState([]);
  const [visivel, setVisivel] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

  useEffect(() => {

    fetch('http://127.0.0.1:8000/api/tarefas')
      .then((response) => response.json())
      .then((data) => {

        console.log(data);

        setTarefas(data);

      })
      .catch((error) => {
        console.log('ERRO API:', error);
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

  const tarefasEmAndamento = tarefas.filter(
    tarefa => tarefa.statusTarefa === 'Em andamento'
  ).length;

  return (
    <View style={styles.container}>

      <Header navigation={navigation} />

      <View style={styles.main}>

        <View style={styles.topo}>

          <Text style={styles.boasVindas}>
            Olá!
          </Text>

          <Text style={styles.subtitulo}>
            Você tem {tarefasEmAndamento} tarefas em andamento.
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

            <TouchableOpacity
              onPress={() => {

                setTarefaSelecionada(item);

                setVisivel(true);

              }}
            >

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
                      styles.statusBolinha,
                      {
                        backgroundColor: getCorStatus(
                          item.statusTarefa
                        )
                      }
                    ]}
                  />

                </View>

              </View>

            </TouchableOpacity>

          )}

          contentContainerStyle={{
            paddingBottom: 120
          }}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={visivel}
          onRequestClose={() => setVisivel(false)}
        >

          <View style={styles.overlay}>

            {tarefaSelecionada && (

              <View style={styles.modalBox}>

                <View>

                  <Text style={styles.titulo}>

                    {tarefaSelecionada.tituloTarefa}

                  </Text>

                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#64748B'
                    }}
                  >

                    {tarefaSelecionada.descTarefa}

                  </Text>

                </View>

                <View>

                  <Text
                    style={{
                      color: getCorPrioridade(
                        tarefaSelecionada.prioridadeTarefa
                      )
                    }}
                  >

                    Prioridade {tarefaSelecionada.prioridadeTarefa}

                  </Text>

                  <Text
                    style={{
                      color: getCorStatus(
                        tarefaSelecionada.statusTarefa
                      )
                    }}
                  >

                    Sua tarefa está {tarefaSelecionada.statusTarefa}

                  </Text>

                  <Text>

                    Faça sua tarefa até:{' '}

                    {tarefaSelecionada.prazoTarefa}

                  </Text>

                </View>

                <View style={styles.botoesModal}>

                <TouchableOpacity
                  style={styles.botaoExcluir}

                  onPress={async () => {

                    try {

                      await fetch(
                        `http://127.0.0.1:8000/api/tarefas/${tarefaSelecionada.id}`,
                        {
                          method: 'DELETE',
                        }
                      );

                      const novaLista = tarefas.filter(
                        (tarefa) =>
                          tarefa.id !== tarefaSelecionada.id
                      );

                      setTarefas(novaLista);

                      setVisivel(false);

                    } catch (error) {

                      console.log(error);

                    }

                  }}
                >

                  <Text style={styles.textoBotaoAcao}>
                    Excluir
                  </Text>

                </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.botaoEditar}
                    onPress={() => navigation.navigate('EditarTarefa', {tarefa: tarefaSelecionada})}
                  >

                    <Text style={styles.textoBotaoAcao}>
                      Editar
                    </Text>

                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.botaoFechar}
                    onPress={() => setVisivel(false)}
                  >

                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold'
                      }}
                    >
                      Fechar
                    </Text>

                  </TouchableOpacity>

                </View>

              </View>

            )}

          </View>

        </Modal>

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
});