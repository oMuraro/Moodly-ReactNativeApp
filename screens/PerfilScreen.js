import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('usuario');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Icon name="user" size={60} color="#ba72d4" />
          </View>
          <Text style={styles.userName}>Usuário</Text>
          <Text style={styles.userEmail}>usuario@email.com</Text>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="settings" size={24} color="#666" />
            <Text style={styles.menuText}>Configurações</Text>
            <Icon name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="bell" size={24} color="#666" />
            <Text style={styles.menuText}>Notificações</Text>
            <Icon name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="help-circle" size={24} color="#666" />
            <Text style={styles.menuText}>Ajuda</Text>
            <Icon name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="info" size={24} color="#666" />
            <Text style={styles.menuText}>Sobre</Text>
            <Icon name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Suas Estatísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Icon name="heart" size={30} color="#ba72d4" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Humores</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="activity" size={30} color="#4CAF50" />
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Atividades</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out" size={20} color="#fff" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Atividades')}
        >
          <Icon name="activity" size={28} color="#fff" />
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
          <Icon name="user" size={28} color="#fff" />
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 80
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f3e5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5
  },
  userEmail: {
    fontSize: 16,
    color: '#666'
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333'
  },
  statsSection: {
    marginBottom: 30
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5
  },
  statLabel: {
    fontSize: 14,
    color: '#666'
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
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
