import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

import api from './src/services/api';

export default function App() {

  const [posts, setPosts] = useState([]);

  const getDados = async () => {
    const response = await api.get("/posts");
    setPosts(response.data);
  }

  const setDados = async () => {
    await api.post("/posts", { "id": posts.length + 1, "title": "Nome do Item", "author": "IFRN" });
    getDados()
  }

  const removerDado = async (id) => {
    await api.delete(`/posts/${id}`);
    getDados()
  }


  useEffect(() => {
    getDados();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Dados que estão vindo da API (GET):</Text>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.containerItem}>
            <Text style={styles.item}>{item.id}</Text>
            <Text style={styles.item}>{item.title}</Text>
            <TouchableOpacity onPress={()=>removerDado(item.id)}>
              <Text>del</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.bt} onPress={setDados}>
          <Text style={styles.btText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 64,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: "#000000"
  },
  containerItem: {
    backgroundColor: "#78B3B4",
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  item: {
    paddingRight: 12,
    color: '#FFF',
    fontSize: 14
  },
  footer: {
    backgroundColor: "#2f9e41",
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  bt: {
    padding: 24,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  btText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
