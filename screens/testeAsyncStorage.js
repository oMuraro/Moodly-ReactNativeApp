import AsyncStorage from '@react-native-async-storage/async-storage';

const testarStorage = async () => {
  try {
    await AsyncStorage.setItem('teste', 'funcionando');
    const valor = await AsyncStorage.getItem('teste');
    console.log('AsyncStorage está:', valor);
  } catch (e) {
    console.error('Erro no AsyncStorage:', e);
  }
};

testarStorage();