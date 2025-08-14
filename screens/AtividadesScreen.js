import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AnimatedNavbar from '../components/AnimatedNavbar';

export default function AtividadesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../assets/logo-name.png')} />
        <TouchableOpacity onPress={() => navigation.navigate('ChatBot')}>
          <Icon name="message-square" size={32} color="#ba72d4" style={{ transform: [{ scaleX: -1 }] }} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.title}>Atividades</Text>

      {/* Cards principais */}
      <View style={styles.mainCardsContainer}>
        <TouchableOpacity 
          style={[styles.mainCard, styles.respiracaoMainCard]} 
          onPress={() => navigation.navigate('RespiracoesMenu')}
        >
          <View style={styles.cardIconContainer}>
            <Icon name="wind" size={64} color="#ba72d4" />
          </View>
          <Text style={styles.mainCardText}>Respirações</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.mainCard, styles.alongamentoMainCard]} 
          onPress={() => navigation.navigate('Alongamentos')}
        >
          <View style={styles.cardIconContainer}>
            <Icon name="move" size={64} color="#ba72d4" />
          </View>
          <Text style={styles.mainCardText}>Alongamentos</Text>
        </TouchableOpacity>
      </View>

      <AnimatedNavbar navigation={navigation} activeScreen="Atividades" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fef6f3',
    paddingHorizontal: 20
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingTop: 40,
    marginBottom: 20
  },
  logo: { 
    width: 60, 
    height: 60, 
    resizeMode: 'contain' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: '600', 
    color: '#4d4d4d', 
    marginBottom: 40
  },
  mainCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 20
  },
  mainCard: {
    width: '45%',
    height: 200,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5
  },
  respiracaoMainCard: {
    backgroundColor: '#d4c5f9'
  },
  alongamentoMainCard: {
    backgroundColor: '#d4c5f9'
  },
  cardIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  mainCardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4d4d4d',
    textAlign: 'center'
  },
  // Ícone de respiração
  respiracaoIcon: {
    width: 80,
    height: 80,
    position: 'relative'
  },
  headShape: {
    width: 50,
    height: 60,
    backgroundColor: '#ba72d4',
    borderRadius: 25,
    position: 'relative',
    left: 15
  },
  faceArea: {
    width: 30,
    height: 35,
    backgroundColor: '#fef6f3',
    borderRadius: 15,
    position: 'absolute',
    right: 5,
    top: 10
  },
  breathLines: {
    position: 'absolute',
    left: 0,
    top: 20
  },
  breathLine: {
    height: 3,
    backgroundColor: '#ba72d4',
    borderRadius: 2,
    marginVertical: 2
  },
  breathLine1: {
    width: 20
  },
  breathLine2: {
    width: 15
  },
  breathLine3: {
    width: 18
  },
  // Ícone de alongamento
  alongamentoIcon: {
    width: 80,
    height: 80,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },
  meditationPerson: {
    alignItems: 'center'
  },
  personHead: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ba72d4',
    marginBottom: 5
  },
  personBody: {
    width: 16,
    height: 25,
    backgroundColor: '#ba72d4',
    borderRadius: 8,
    marginBottom: 5
  },
  personArms: {
    width: 35,
    height: 8,
    backgroundColor: '#ba72d4',
    borderRadius: 4
  },
  meditationBorder: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: '#ba72d4',
    borderRadius: 10,
    top: 5
  },
});
