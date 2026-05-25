import 'react-native-gesture-handler';

import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createDrawerNavigator } from '@react-navigation/drawer';

import * as SplashScreen from 'expo-splash-screen';


import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import UsuarioScreen from './UsuarioScreen';
import CadastroScreen from './Cadastro';
import NovaTarefaScreen from './NovaTarefaScreen';
import EditarTarefaScreen from './EditarTarefaScreen';
import EditarUsuarioScreen from './EditarUsuarioScreen';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Perfil" component={UsuarioScreen} />
    </Drawer.Navigator>
  );
}

SplashScreen.preventAutoHideAsync();


export default function App() {

  useEffect(() => {

    async function prepare() {

      // delay de 3 segundos
      await new Promise(resolve => setTimeout(resolve, 3000));

      // fecha splash
      await SplashScreen.hideAsync();
    }

    prepare();

      }, []);

  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="NovaTarefa" component={NovaTarefaScreen} />

        <Stack.Screen name="EditarTarefa" component={EditarTarefaScreen} />

        <Stack.Screen name="EditarUsuario" component={EditarUsuarioScreen} />

        <Stack.Screen
          name="Drawer"
          component={DrawerRoutes}
        />

        <Stack.Screen name="Cadastro" component={CadastroScreen} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}