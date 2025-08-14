import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedNavbar from '../components/AnimatedNavbar';

export default function PerfilScreen({ navigation }) {
  const [usuario, setUsuario] = useState({ nome: '', email: '' });
  const [modalSobreVisible, setModalSobreVisible] = useState(false);
  const [modalAjudaVisible, setModalAjudaVisible] = useState(false);

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const dados = await AsyncStorage.getItem('user');
        if (dados) {
          setUsuario(JSON.parse(dados));
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    };

    carregarUsuario();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
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
          <Text style={styles.userName}>{usuario.nome || 'Usuário'}</Text>
          <Text style={styles.userEmail}>{usuario.email || 'usuario@email.com'}</Text>
        </View>

        <View style={styles.menuSection}>

          {/* Botão Ajuda */}
          <TouchableOpacity style={styles.menuItem} onPress={() => setModalAjudaVisible(true)}>
            <Icon name="help-circle" size={24} color="#666" />
            <Text style={styles.menuText}>Ajuda</Text>
            <Icon name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>

          {/* Botão Sobre */}
          <TouchableOpacity style={styles.menuItem} onPress={() => setModalSobreVisible(true)}>
            <Icon name="info" size={24} color="#666" />
            <Text style={styles.menuText}>Sobre</Text>
            <Icon name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>


        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out" size={20} color="#fff" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>

      <AnimatedNavbar navigation={navigation} activeScreen="Perfil" />

      {/* Modal Sobre */}
      <Modal
        visible={modalSobreVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalSobreVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sobre</Text>
            <ScrollView>
              <Text style={styles.modalText}>
                Um aplicativo focado no bem-estar emocional e alívio da ansiedade por meio de 
                exercícios guiados de respiração, diário de humor e apoio com chatbot. Nosso objetivo 
                é ajudar pessoas que não têm fácil acesso a psicólogos, sempre reforçando que o sistema 
                NÃO deve substituir acompanhamento profissional. Incentivamos o autocuidado mental 
                diário, de forma prática e acessível.
              </Text>
            </ScrollView>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalSobreVisible(false)}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Ajuda */}
      <Modal
        visible={modalAjudaVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalAjudaVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajuda</Text>
            <ScrollView>
              <Text style={styles.modalText}>
                Nosso aplicativo conta com:
                {"\n\n"}• Sessão de registro do humor diário, para acompanhar seu bem-estar emocional.
                {"\n"}• Chatbot de suporte emocional, com acesso ao histórico de conversas.
                {"\n"}• Atividades de relaxamento, como respirações guiadas e alongamentos, para serem 
                realizadas quando desejar.
              </Text>
            </ScrollView>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalAjudaVisible(false)}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '85%',
    maxHeight: '80%'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#ba72d4'
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22
  },
  modalButton: {
    backgroundColor: '#ba72d4',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center'
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16
  }
});
