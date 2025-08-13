import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function RespiracoesMenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#ba72d4" />
        </TouchableOpacity>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <View style={{ width: 24 }} />
      </View>
      
      <Text style={styles.title}>Respirações</Text>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cards de exercícios */}
        <TouchableOpacity 
          style={[styles.card, styles.card4x4]} 
          onPress={() => navigation.navigate('Respiracoes')}
        >
          <Icon name="wind" size={48} color="#ba72d4" style={{ alignSelf: 'center', marginBottom: 10 }} />
          <Text style={styles.cardTitle}>Respiração 4x4</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, styles.card333, styles.selectedCard]} 
          onPress={() => navigation.navigate('Respiracao333')}
        >
          <Icon name="circle" size={48} color="#ba72d4" style={{ alignSelf: 'center', marginBottom: 10 }} />
          <Text style={styles.cardTitle}>Respiração 3-3-3</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, styles.cardRapido]} 
          onPress={() => navigation.navigate('ControleRapido')}
        >
          <Icon name="zap" size={48} color="#ba72d4" style={{ alignSelf: 'center', marginBottom: 10 }} />
          <Text style={styles.cardTitle}>Controle Rápido</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, styles.cardRapido]} 
          onPress={() => navigation.navigate('ControleRapido')}
        >
          <Text style={styles.cardTitle}>Controle Rápido</Text>
          <View style={styles.arrowContainer}>
            <View style={styles.playIcon}>
              <View style={styles.playTriangle} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Espaço extra para a navbar */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Atividades')}
        >
          <View style={styles.navIconContainer}>
            <Icon name="activity" size={28} color="#fff" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name="home" size={32} color="#ba72d4" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Perfil')}
        >
          <View style={styles.navIconContainer}>
            <Icon name="user" size={28} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fef6f3'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    marginBottom: 20
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    paddingHorizontal: 20
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20
  },
  scrollContent: {
    paddingBottom: 80
  },
  card: {
    height: 70,
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  card4x4: {
    backgroundColor: '#d4c5f9'
  },
  card333: {
    backgroundColor: '#d4c5f9'
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#ba72d4'
  },
  cardRapido: {
    backgroundColor: '#d4c5f9'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333'
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  playIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 0,
    borderBottomWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: '#ba72d4',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ba72d4',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    paddingHorizontal: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  navIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  homeButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 50,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
