import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import ChatbotScreen from './screens/chatbot';
import LoginScreen from './screens/LoginScreen';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;