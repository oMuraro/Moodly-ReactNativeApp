import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView,
  Dimensions,
  Animated 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AnimatedNavbar from '../components/AnimatedNavbar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const alongamentos = [
  { id: 1, nome: 'Desperta Corpo' },
  { id: 2, nome: 'Toque de Flexibilidade' },
  { id: 3, nome: 'Alonga e Solta' },
  { id: 4, nome: 'Movimentos Suaves' },
];

export default function AlongamentosScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#4d4d4d" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
          <Text style={styles.logoText}>Moodly</Text>
        </View>
        <Text style={styles.title}>Alongamentos</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {alongamentos.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.alongamentoButton}
            onPress={() => {
              if (item.nome === 'Desperta Corpo') {
                navigation.navigate('DespertaCorpo');
              } else if (item.nome === 'Toque de Flexibilidade') {
                navigation.navigate('ToqueFlexibilidade');
              } else if (item.nome === 'Alonga e Solta') {
                navigation.navigate('AlongaSolta');
              } else if (item.nome === 'Movimentos Suaves') {
                navigation.navigate('MovimentosSuaves');
              }
            }}
          >
            <Text style={styles.buttonText}>{item.nome}</Text>
            <View style={styles.arrowContainer}>
              <Icon name="chevron-right" size={36} color="#ba72d4" style={{ transform: [{ rotate: '5deg' }] }} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      
      <AnimatedNavbar navigation={navigation} activeScreen="Alongamentos" />
    </View>
  );
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef6f3',
    paddingHorizontal: 0,
    paddingTop: 0,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingLeft: 20,
    marginBottom: 30,
  },
  backButton: {
    marginRight: 15,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(77, 77, 77, 0.1)',
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 2,
  },
  logoText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  title: {
    fontSize: 32,
    fontWeight: '400',
    color: '#4d4d4d',
    marginLeft: 10,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 80,
  },
  alongamentoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d4c5f9',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 18,
    width: '90%',
    justifyContent: 'space-between',
    shadowColor: '#ba72d4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 22,
    color: '#4d4d4d',
    fontWeight: '400',
    letterSpacing: 1,
  },
  arrowContainer: {
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
});
