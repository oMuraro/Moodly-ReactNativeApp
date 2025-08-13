import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CadastroScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const [error, setError] = useState('');

  const handleCadastro = async () => {
    setError("");
    if (nome && email && senha) {
      try {
        const response = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email, senha })
        });
        const data = await response.json();
        if (response.ok) {
          navigation.replace('Splash');
        } else {
          setError(data.message || "Erro ao cadastrar");
        }
      } catch (err) {
        setError("Erro de conexão com o servidor");
      }
    } else {
      setError('Preencha todos os campos');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Moodly</Text>
      <Text style={styles.cadastrar}>CADASTRAR</Text>
      <Text style={styles.label}>NOME:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        autoCapitalize="words"
      />
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
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.login}>Já tem uma conta? Entrar...</Text>
      </TouchableOpacity>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setLembrar(!lembrar)} style={styles.checkbox}>
          {lembrar ? <Text>✔</Text> : null}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Lembrar de mim</Text>
      </View>
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
    padding: 20,
  },
  logo: {
    width: 80,
    top: 10,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 12,
    color: '#333',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  cadastrar: {
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
    height: 60,
    backgroundColor: '#EAEAEA',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 24,
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
  login: {
    color: '#3B82F6',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#A78BFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
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
    bottom: 5,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#333',
    fontSize: 13,
  },
});

export default CadastroScreen;
