import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CadastroScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleCadastro = async () => {
    setError("");
    if (!nome || !email || !senha) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erro ao cadastrar");
        return;
      }

      // Login automático após cadastro
      const loginResponse = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });
      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        setError(loginData.message || "Erro ao logar automaticamente");
        return;
      }

      await AsyncStorage.setItem('token', loginData.token);
      await AsyncStorage.setItem('user', JSON.stringify(loginData.user));

      navigation.replace('Splash');

    } catch (err) {
      console.error(err);
      setError("Erro de conexão com o servidor");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Moodly</Text>
      <Text style={styles.headerText}>CADASTRAR</Text>

      <Text style={styles.label}>NOME</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} autoCapitalize="words" />

      <Text style={styles.label}>EMAIL</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />

      <Text style={styles.label}>SENHA</Text>
      <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Já tem uma conta? Entrar</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7F4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 25,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#A78BFA',
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#E1C6F7',
    borderRadius: 10,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  linkText: {
    color: '#3B82F6',
    marginBottom: 10,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default CadastroScreen;
