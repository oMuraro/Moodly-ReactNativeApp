import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import ChatbotScreen from './screens/chatbot';
import LoginScreen from './screens/LoginScreen';
import AtividadesScreen from './screens/AtividadesScreen';
import RespiracoesMenuScreen from './screens/RespiracoesMenuScreen';
import RespiracoesScreen from './screens/RespiracoesScreen';
import AlongamentosScreen from './screens/AlongamentosScreen';
import Respiracao333Screen from './screens/Respiracao333Screen';
import ControleRapidoScreen from './screens/ControleRapidoScreen';
import PerfilScreen from './screens/PerfilScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={require('./screens/CadastroScreen').default} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ChatBot" component={ChatbotScreen} />
        <Stack.Screen name="Atividades" component={AtividadesScreen} />
        <Stack.Screen name="RespiracoesMenu" component={RespiracoesMenuScreen} />
        <Stack.Screen name="Respiracoes" component={RespiracoesScreen} />
        <Stack.Screen name="Respiracao333" component={Respiracao333Screen} />
        <Stack.Screen name="ControleRapido" component={ControleRapidoScreen} />
        <Stack.Screen name="Alongamentos" component={AlongamentosScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;