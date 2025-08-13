import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  Dimensions,
  ScrollView 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function RespiracoesScreen({ navigation, route }) {
  const { tipo = 'Respiração 4x4' } = route?.params || {};
  const [fase, setFase] = useState(0); // 0: preparar, 1: inspirar, 2: segurar, 3: expirar
  const [contador, setContador] = useState(4);
  const [ativo, setAtivo] = useState(false);
  const [ciclos, setCiclos] = useState(0);

  const fases = ['Prepare-se', 'Inspire', 'Segure', 'Expire'];
  const instrucoes = [
    'Encontre uma posição confortável',
    'Inspire pelo nariz',
    'Segure a respiração',
    'Expire pela boca'
  ];

  useEffect(() => {
    let interval;
    if (ativo && contador > 0) {
      interval = setInterval(() => {
        setContador(prev => prev - 1);
      }, 1000);
    } else if (ativo && contador === 0) {
      if (fase < 3) {
        setFase(prev => prev + 1);
        setContador(4);
      } else {
        setFase(1);
        setContador(4);
        setCiclos(prev => prev + 1);
      }
    }
    return () => clearInterval(interval);
  }, [ativo, contador, fase]);

  const iniciarExercicio = () => {
    setAtivo(true);
    setFase(1);
    setContador(4);
    setCiclos(0);
  };

  const pausarExercicio = () => {
    setAtivo(false);
  };

  const resetarExercicio = () => {
    setAtivo(false);
    setFase(0);
    setContador(4);
    setCiclos(0);
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

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.cardsRow}>
          <TouchableOpacity style={styles.cardRespiracao} onPress={() => navigation.navigate('Respiracoes')}>
            <View style={styles.iconContainer}>
              <Icon name="wind" size={64} color="#ba72d4" />
            </View>
            <Text style={styles.cardLabel}>Respirações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardAlongamento} onPress={() => navigation.navigate('Alongamentos')}>
            <View style={styles.iconContainer}>
              <Icon name="info" size={64} color="#ba72d4" />
            </View>
            <Text style={styles.cardLabel}>Alongamentos</Text>
          </TouchableOpacity>
        </View>

        {/* Círculos de respiração (mantido para exercício) */}
        <View style={styles.circleContainer}>
          <View style={[styles.circle, styles.circle1, { 
            opacity: fase === 0 ? 0.8 : 1,
            transform: [{ scale: fase === 1 ? 1.1 : 1 }]
          }]}>
            <Icon name="book-open" size={30} color="#fff" />
          </View>
          <View style={styles.line} />
          <View style={[styles.circle, styles.circle2, { 
            opacity: fase === 0 ? 0.6 : 1,
            transform: [{ scale: fase === 2 ? 1.1 : 1 }]
          }]}>
            <Text style={styles.circleText}>+</Text>
          </View>
          <View style={styles.line} />
          <View style={[styles.circle, styles.circle3, { 
            opacity: fase === 0 ? 0.4 : 1,
            transform: [{ scale: fase === 3 ? 1.1 : 1 }]
          }]}>
            <Icon name="wind" size={30} color="#fff" />
          </View>
        </View>

        {/* Instrução atual */}
        <View style={styles.instructionContainer}>
          <Text style={styles.phaseText}>{fases[fase]}</Text>
          <Text style={styles.instructionText}>{instrucoes[fase]}</Text>
          {ativo && fase > 0 && (
            <Text style={styles.counterText}>{contador}</Text>
          )}
          {ciclos > 0 && (
            <Text style={styles.cycleText}>Ciclos: {ciclos}</Text>
          )}
        </View>

        {/* Botão de controle */}
        <View style={styles.buttonContainer}>
          {!ativo ? (
            <TouchableOpacity style={styles.startButton} onPress={iniciarExercicio}>
              <Text style={styles.buttonText}>
                {fase === 0 ? 'Começar' : 'Continuar'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.controlButtons}>
              <TouchableOpacity style={styles.pauseButton} onPress={pausarExercicio}>
                <Text style={styles.buttonText}>Pausar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resetButton} onPress={resetarExercicio}>
                <Text style={styles.buttonText}>Reiniciar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Espaço extra para a navbar */}
        <View style={{ height: 20 }} />
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 20
  },
  scrollContent: {
    paddingBottom: 80
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40
  },
  circleContainer: {
    alignItems: 'center',
    marginVertical: 40
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  circle1: {
    backgroundColor: '#ba72d4'
  },
  circle2: {
    backgroundColor: '#c58ee6'
  },
  circle3: {
    backgroundColor: '#d1a3f0'
  },
  circleText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold'
  },
  line: {
    width: 2,
    height: 30,
    backgroundColor: '#ddd',
    marginVertical: 5
  },
  instructionContainer: {
    alignItems: 'center',
    marginVertical: 30
  },
  phaseText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ba72d4',
    marginBottom: 10
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15
  },
  counterText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ba72d4'
  },
  cycleText: {
    fontSize: 14,
    color: '#999',
    marginTop: 10
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 30
  },
  startButton: {
    backgroundColor: '#ba72d4',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 200
  },
  controlButtons: {
    flexDirection: 'row',
    gap: 20
  },
  pauseButton: {
    backgroundColor: '#ba72d4',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25
  },
  resetButton: {
    backgroundColor: '#999',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
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
