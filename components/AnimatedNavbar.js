import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function AnimatedNavbar({ navigation, activeScreen }) {
  
  const isActive = (screen) => {
    if (screen === 'atividades') {
      return activeScreen === 'Atividades' || activeScreen === 'Alongamentos';
    }
    return activeScreen === screen;
  };

  return (
    <View style={styles.navbar}>
      {/* Ícone Atividades */}
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Atividades')}
      >
        <View style={[styles.iconContainer, isActive('atividades') && styles.activeIconContainer]}>
          <Icon 
            name="activity" 
            size={24} 
            color={isActive('atividades') ? "#ba72d4" : "#fff"} 
          />
        </View>
      </TouchableOpacity>
      
      {/* Ícone Home */}
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Home')}
      >
        <View style={[styles.iconContainer, isActive('Home') && styles.activeIconContainer]}>
          <Icon 
            name="home" 
            size={24} 
            color={isActive('Home') ? "#ba72d4" : "#fff"} 
          />
        </View>
      </TouchableOpacity>
      
      {/* Ícone Perfil */}
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Perfil')}
      >
        <View style={[styles.iconContainer, isActive('Perfil') && styles.activeIconContainer]}>
          <Icon 
            name="user" 
            size={24} 
            color={isActive('Perfil') ? "#ba72d4" : "#fff"} 
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ba72d4',
    paddingVertical: 15,
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
    paddingVertical: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
