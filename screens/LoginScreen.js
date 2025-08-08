import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        navigation.replace('Splash');
      }
    };
    checkLogin();
  }, []);

  const handleLogin = async () => {
    // Simulação de login/cadastro
    if (email && senha) {
      if (lembrar) {
        await AsyncStorage.setItem('user', JSON.stringify({ email }));
      }
      navigation.replace('Splash');
    } else {
      setError('Preencha todos os campos');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Moodly</Text>
      <Text style={styles.login}>LOGIN</Text>
      <Text style={styles.label}>EMAIL:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Text style={styles.label}>SENHA:</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setLembrar(!lembrar)} style={styles.checkbox}>
          {lembrar ? <Text>✔</Text> : null}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Lembrar de mim</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.cadastro}>Não tem uma conta? Cadastre-se....</Text>
      </TouchableOpacity>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Text style={styles.footer}>Este aplicativo NÃO deve substituir consultas médicas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7F4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  login: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 40,
    fontSize: 16,
    color: '#A78BFA',
    marginBottom: 5,
  },
  input: {
    width: 250,
    height: 40,
    backgroundColor: '#EAEAEA',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#E1C6F7',
    borderRadius: 8,
    paddingVertical: 10,
    width: 180,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 20,
  },
  cadastro: {
    color: '#3B82F6',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'left',
    marginBottom: 10,
    
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#A78BFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#333',
    fontSize: 13,
  },
});

export default LoginScreen;
