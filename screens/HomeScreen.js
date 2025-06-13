import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.logo} source={require("../assets/logo-name.png")} />

                <TouchableOpacity onPress={() => navigation.navigate('OutraTela')}>
                    <Icon
                        name="message-square"
                        size={50}
                        color="#ba72d4"
                        style={{
                            transform: [{ scaleX: -1 }],
                            marginRight: 10,  // número, não string
                        }}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.text}>Como você está hoje?</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fef6f3',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    text: {
        fontSize: 30,
        fontWeight: '600',
        marginLeft: '15px',
        color: '#4d4d4d',
        width: '100%'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logo: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
        marginBottom: 20,
    }
});

export default HomeScreen;
