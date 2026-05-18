import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';

export default function Header({ navigation }) {
  return (
    <View style={styles.header}>

      {/* Menu hamburguer */}
<TouchableOpacity
  style={styles.menu}
  onPress={() => navigation.openDrawer()}
>
  <Text style={styles.menuText}>☰</Text>
</TouchableOpacity>

      {/* Logo */}
      <TouchableOpacity onPress={() => navigation.navigate('drawer')}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
        />
      </TouchableOpacity>

      {/* Espaço vazio para centralizar */}
      <View style={styles.menu} />

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },

  menu: {
    width: 40,
    alignItems: 'center'
  },

  menuText: {
    fontSize: 28,
    color: '#3B78E7'
  }
});