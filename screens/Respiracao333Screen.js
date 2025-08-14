import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  Dimensions,
  ScrollView // Adicionado ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AnimatedNavbar from '../components/AnimatedNavbar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Respiracao333Screen({ navigation }) {
  const [fase, setFase] = useState(0); // 0: preparar, 1: inspirar, 2: segurar, 3: expirar
  const [contador, setContador] = useState(3);
  const [ativo, setAtivo] = useState(false);
  const [ciclos, setCiclos] = useState(0);

  const fases = ['Prepare-se', 'Inspire', 'Segure', 'Expire'];
  const instrucoes = [
    'Relaxe e prepare-se para o exercício',
    'Inspire profundamente por 3 segundos',
    'Segure a respiração por 3 segundos',
    'Expire lentamente por 3 segundos'
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
        setContador(3);
      } else {
        setFase(1);
        setContador(3);
        setCiclos(prev => prev + 1);
      }
    }
    return () => clearInterval(interval);
  }, [ativo, contador, fase]);

  const iniciarExercicio = () => {
    setAtivo(true);
    setFase(1);
    setContador(3);
    setCiclos(0);
  };

  const pausarExercicio = () => {
    setAtivo(false);
  };

  const resetarExercicio = () => {
    setAtivo(false);
    setFase(0);
    setContador(3);
    setCiclos(0);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#ba72d4" />
          </TouchableOpacity>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
          <View style={{ width: 24 }} />
        </View>
        <Text style={styles.title}>Respiração 3-3-3</Text>
        {/* Círculos de respiração */}
        <View style={styles.circleContainer}>
          <View style={[styles.circle, styles.circle1, { 
            opacity: fase === 0 ? 0.8 : 1,
            transform: [{ scale: fase === 1 ? 1.2 : 1 }]
          }]}>
            <Icon name="arrow-down" size={30} color="#fff" />
          </View>
          <View style={styles.line} />
          <View style={[styles.circle, styles.circle2, { 
            opacity: fase === 0 ? 0.6 : 1,
            transform: [{ scale: fase === 2 ? 1.2 : 1 }]
          }]}>
            <Icon name="pause" size={30} color="#fff" />
          </View>
          <View style={styles.line} />
          <View style={[styles.circle, styles.circle3, { 
            opacity: fase === 0 ? 0.4 : 1,
            transform: [{ scale: fase === 3 ? 1.2 : 1 }]
          }]}>
            <Icon name="arrow-up" size={30} color="#fff" />
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
      </ScrollView>
      
      <AnimatedNavbar navigation={navigation} activeScreen="Atividades" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fef6f3', 
    paddingHorizontal: 20,
    paddingTop: 40
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
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
    backgroundColor: '#7c4dff'
  },
  circle2: {
    backgroundColor: '#9575ff'
  },
  circle3: {
    backgroundColor: '#b39dff'
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
    color: '#7c4dff',
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
    color: '#7c4dff'
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
    backgroundColor: '#7c4dff',
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
    backgroundColor: '#7c4dff',
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
});
