import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView,
  Dimensions 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const exercicios = [
  {
    id: 1,
    nome: 'Pescoço',
    duracao: 30,
    instrucoes: [
      'Incline a cabeça para a direita',
      'Segure por 15 segundos',
      'Incline para a esquerda',
      'Segure por 15 segundos'
    ]
  },
  {
    id: 2,
    nome: 'Ombros',
    duracao: 45,
    instrucoes: [
      'Eleve os ombros até as orelhas',
      'Segure por 5 segundos',
      'Relaxe lentamente',
      'Repita 5 vezes'
    ]
  },
  {
    id: 3,
    nome: 'Braços',
    duracao: 60,
    instrucoes: [
      'Estenda um braço à frente',
      'Puxe suavemente com a outra mão',
      'Segure por 30 segundos',
      'Repita com o outro braço'
    ]
  }
];

export default function AlongamentosScreen({ navigation }) {
  const [exercicioAtual, setExercicioAtual] = useState(0);
  const [passoAtual, setPassoAtual] = useState(0);
  const [contador, setContador] = useState(0);
  const [ativo, setAtivo] = useState(false);
  const [exercicioSelecionado, setExercicioSelecionado] = useState(null);

  useEffect(() => {
    let interval;
    if (ativo && contador > 0) {
      interval = setInterval(() => {
        setContador(prev => prev - 1);
      }, 1000);
    } else if (ativo && contador === 0 && exercicioSelecionado) {
      if (passoAtual < exercicioSelecionado.instrucoes.length - 1) {
        setPassoAtual(prev => prev + 1);
        setContador(Math.floor(exercicioSelecionado.duracao / exercicioSelecionado.instrucoes.length));
      } else {
        setAtivo(false);
        alert('Exercício concluído!');
      }
    }
    return () => clearInterval(interval);
  }, [ativo, contador, passoAtual, exercicioSelecionado]);

  const iniciarExercicio = (exercicio) => {
    setExercicioSelecionado(exercicio);
    setPassoAtual(0);
    setContador(Math.floor(exercicio.duracao / exercicio.instrucoes.length));
    setAtivo(true);
  };

  const pausarExercicio = () => {
    setAtivo(false);
  };

  const resetarExercicio = () => {
    setAtivo(false);
    setPassoAtual(0);
    setContador(0);
    setExercicioSelecionado(null);
  };

  if (exercicioSelecionado) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={resetarExercicio}>
            <Icon name="arrow-left" size={24} color="#ba72d4" />
          </TouchableOpacity>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.title}>Alongamento - {exercicioSelecionado.nome}</Text>

        {/* Círculo principal */}
        <View style={styles.circleContainer}>
          <View style={[styles.circle, styles.mainCircle, { 
            transform: [{ scale: ativo ? 1.1 : 1 }]
          }]}>
            <Icon name="user" size={40} color="#fff" />
          </View>
        </View>

        {/* Instrução atual */}
        <View style={styles.instructionContainer}>
          <Text style={styles.stepText}>Passo {passoAtual + 1} de {exercicioSelecionado.instrucoes.length}</Text>
          <Text style={styles.instructionText}>{exercicioSelecionado.instrucoes[passoAtual]}</Text>
          {ativo && (
            <Text style={styles.counterText}>{contador}s</Text>
          )}
        </View>

        {/* Botão de controle */}
        <View style={styles.buttonContainer}>
          {!ativo ? (
            <TouchableOpacity style={styles.startButton} onPress={() => {
              setAtivo(true);
              if (contador === 0) {
                setContador(Math.floor(exercicioSelecionado.duracao / exercicioSelecionado.instrucoes.length));
              }
            }}>
              <Text style={styles.buttonText}>
                {passoAtual === 0 && contador === 0 ? 'Começar' : 'Continuar'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.pauseButton} onPress={pausarExercicio}>
              <Text style={styles.buttonText}>Pausar</Text>
            </TouchableOpacity>
          )}
        </View>

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

      <Text style={styles.title}>Exercícios de Alongamento</Text>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {exercicios.map((exercicio) => (
          <TouchableOpacity 
            key={exercicio.id}
            style={styles.exerciseCard}
            onPress={() => iniciarExercicio(exercicio)}
          >
            <View style={styles.exerciseContent}>
              <View style={styles.exerciseIcon}>
                <Icon 
                  name={exercicio.nome === 'Pescoço' ? 'user' : exercicio.nome === 'Ombros' ? 'users' : 'move'} 
                  size={30} 
                  color="#fff" 
                />
              </View>
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercicio.nome}</Text>
                <Text style={styles.exerciseDuration}>{exercicio.duracao}s</Text>
              </View>
              <Icon name="play" size={24} color="#4CAF50" />
            </View>
          </TouchableOpacity>
        ))}
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
    marginBottom: 30
  },
  scrollView: {
    flex: 1,
    marginBottom: 80
  },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  exerciseContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  exerciseIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center'
  },
  exerciseInfo: {
    flex: 1,
    marginLeft: 15
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5
  },
  exerciseDuration: {
    fontSize: 14,
    color: '#666'
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
    alignItems: 'center'
  },
  mainCircle: {
    backgroundColor: '#4CAF50',
    width: 120,
    height: 120,
    borderRadius: 60
  },
  instructionContainer: {
    alignItems: 'center',
    marginVertical: 30
  },
  stepText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 10
  },
  instructionText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '500'
  },
  counterText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50'
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 30
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 200
  },
  pauseButton: {
    backgroundColor: '#ff9800',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 200
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
