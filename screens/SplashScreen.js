import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Aguarda 2 segundos e faz fade out
    const timeout = setTimeout(async () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(async () => {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          navigation.replace('Home');
        } else {
          navigation.replace('Login');
        }
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [fadeAnim, navigation]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Moodly</Text>
      <Text style={styles.subtitle}>Respire fundo.</Text>
      <Text style={styles.subtitle}>Um novo dia é uma nova chance.</Text>
      <Text style={styles.footer}>
        Este aplicativo NÃO deve substituir consultas médicas
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef6f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
    marginVertical: 4,
    paddingHorizontal: 20,
  },
  footer: {
    fontSize: 12,
    color: '#444',
    position: 'absolute',
    bottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default SplashScreen;
