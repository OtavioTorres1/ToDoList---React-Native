import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';

import Header from './header';

const tarefas = [
  { id: '1', nome: 'Estudar', desc: "Estudar para a prova", status: "pendente", prioridade: "baixa", prazo: "25/03/2026 18:00" },
  { id: '2', nome: 'Treinar', desc: "Ir para a academia", status: "em andamento", prioridade: "média", prazo: "23/03/2026 15:00" },
  { id: '3', nome: 'Dormir', desc: "Dormir cedo", status: "pendente", prioridade: "alta", prazo: "22/03/2026 22:00" },
  { id: '4', nome: 'Ir ao Trabalho', desc: "Trabalhar na clt para não ir morar na rua", status: "realizado", prioridade: "alta", prazo: "22/03/2026 06:00" },
  { id: '5', nome: 'Ler livro', desc: "Ler 20 páginas de um livro", status: "pendente", prioridade: "média", prazo: "26/03/2026 20:00" },
  { id: '6', nome: 'Fazer mercado', desc: "Comprar alimentos da semana", status: "pendente", prioridade: "alta", prazo: "24/03/2026 10:00" },
  { id: '7', nome: 'Limpar quarto', desc: "Organizar e limpar o quarto", status: "em andamento", prioridade: "baixa", prazo: "23/03/2026 17:00" },
  { id: '8', nome: 'Estudar programação', desc: "Praticar React Native", status: "pendente", prioridade: "alta", prazo: "27/03/2026 19:00" }
];

const getCorPrioridade = (prioridade) => {
  if (prioridade === 'alta') return 'red';
  if (prioridade === 'média') return 'orange';
  if (prioridade === 'baixa') return 'green';
  return 'gray';
};

const getCorStatus = (status) => {
  if (status === 'pendente') return 'gray';
  if (status === 'em andamento') return '#3B82F6';
  if (status === 'realizado') return '#22C55E';
  return 'black';
};

export default function HomeScreen({ navigation }) {
  const [visivel, setVisivel] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

  const tarefasEmAndamento = tarefas.filter(
    tarefa => tarefa.status === 'em andamento'
  ).length;

  return (
    <View style={styles.container}>

      <Header navigation={navigation} />

      <View style={styles.main}>

        {/* Título principal */}
        <View style={styles.topo}>
          <Text style={styles.boasVindas}>
            Olá, Otavio!
          </Text>

          <Text style={styles.subtitulo}>
            Você tem {tarefasEmAndamento} tarefas em andamento.
          </Text>

          <View style={styles.linha} />

          <Text style={styles.tituloSecao}>
            Tarefas de Hoje:
          </Text>
        </View>

        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id}
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
                  item.status === 'realizado' &&
                    styles.tarefaRealizadaColuna
                ]}
              >

                <Text
                  style={[
                    styles.coluna,
                    item.status === 'realizado' &&
                      styles.tarefaRealizada
                  ]}
                >
                  {item.nome}
                </Text>

                <View style={styles.statusContainer}>

                  <Text
                    style={[
                      styles.ultimaColuna,
                      { color: getCorStatus(item.status) }
                    ]}
                  >
                    {item.status}
                  </Text>

                  <View
                    style={[
                      styles.statusBolinha,
                      {
                        backgroundColor: getCorStatus(item.status)
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

        {/* Modal */}
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
                    {tarefaSelecionada.nome}
                  </Text>

                  <Text style={{ textAlign: 'center', color: '#64748B' }}>
                    {tarefaSelecionada.desc}
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      color: getCorPrioridade(
                        tarefaSelecionada.prioridade
                      )
                    }}
                  >
                    Prioridade {tarefaSelecionada.prioridade}
                  </Text>

                  <Text
                    style={{
                      color: getCorStatus(
                        tarefaSelecionada.status
                      )
                    }}
                  >
                    Sua tarefa está {tarefaSelecionada.status}
                  </Text>

                  <Text>
                    Faça sua tarefa até:
                    {' '}
                    {tarefaSelecionada.prazo}
                  </Text>
                </View>

              <View style={styles.botoesModal}>

                <TouchableOpacity
                  style={styles.botaoExcluir}
                >
                  <Text style={styles.textoBotaoAcao}>
                    Excluir
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.botaoEditar}
                >
                  <Text style={styles.textoBotaoAcao}>
                    Editar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.botaoFechar}
                  onPress={() => setVisivel(false)}
                >
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    Fechar
                  </Text>
                </TouchableOpacity>

              </View>

              </View>
            )}

          </View>
        </Modal>

      </View>

      {/* Botão adicionar */}
      <TouchableOpacity style={styles.botaoAdicionar}>
        <Text style={styles.mais}>+</Text>
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
    gap: 10,

    justifyContent: 'center',
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

  textoBotao: {
    color: 'black',
    fontWeight: 'bold',
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

  botaoFechar: {
    marginTop: 15,
    backgroundColor: '#e5f0fc',
    padding: 10,
    borderRadius: 8,
  },

  botaoAdicionar: {
    position: 'absolute',
    bottom: 25,
    right: 25,

    marginBottom: 25,
    marginTop: 25,

    width: 65,
    height: 65,

    borderRadius: 100,

    backgroundColor: '#ff8c00',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,

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
  color: 'black',
  paddingVertical: 10,
  paddingHorizontal: 18,
  borderRadius: 8,
},

textoBotaoAcao: {
  color: 'white',
  fontWeight: 'bold',
},
});