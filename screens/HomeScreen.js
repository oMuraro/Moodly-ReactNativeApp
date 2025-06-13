import React, { useState } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const moods = [
    { emoji: '😭', label: 'Muito triste' },
    { emoji: '😔', label: 'Triste' },
    { emoji: '😐', label: 'Neutro' },
    { emoji: '😊', label: 'Feliz' },
    { emoji: '😁', label: 'Muito feliz' },
];

export default function HomeScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMood, setSelectedMood] = useState('😉');
    const [diaryText, setDiaryText] = useState('');

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image style={styles.logo} source={require("../assets/logo-name.png")} />
                <TouchableOpacity onPress={() => navigation.navigate('ChatBot')}>
                    <Icon
                        name="message-square"
                        size={40}
                        color="#ba72d4"
                        style={{ transform: [{ scaleX: -1 }] }}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Como você está hoje?</Text>

            {/* Card */}
            <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
                <Text style={styles.emoji}>{selectedMood}</Text>
                <Text style={styles.cardLabel}>Dia</Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                {/* Overlay clicável */}
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        {/* Impede que clique interno feche */}
                        <TouchableWithoutFeedback>
                            <View style={styles.modalBox}>
                                {/* Botão X */}
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.closeText}>×</Text>
                                </TouchableOpacity>

                                {/* Emojis */}
                                <View style={styles.moodsRow}>
                                    {moods.map(m => (
                                        <TouchableOpacity
                                            key={m.label}
                                            style={styles.moodButton}
                                            onPress={() => setSelectedMood(m.emoji)}
                                        >
                                            <Text style={styles.emojiOption}>{m.emoji}</Text>
                                            <Text style={styles.moodLabel}>{m.label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                {/* TextInput */}
                                <TextInput
                                    style={styles.input}
                                    placeholder="Registrar meu dia"
                                    placeholderTextColor="#999"
                                    value={diaryText}
                                    onChangeText={setDiaryText}
                                    multiline
                                    underlineColorAndroid="transparent"
                                    selectionColor="#ba72d4"
                                />

                                {/* Save */}
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.saveText}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fef6f3',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#4d4d4d',
        marginTop: 20,
        marginBottom: 30,
    },
    card: {
        backgroundColor: '#fff',
        borderColor: '#c58ee6',
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 40,
        paddingHorizontal: 50,
        alignItems: 'center',
        alignSelf: 'center',
    },
    emoji: { fontSize: 48 },
    cardLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ba72d4',
        marginTop: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalBox: {
        width: SCREEN_WIDTH * 0.9,
        maxHeight: SCREEN_HEIGHT * 0.8,
        backgroundColor: '#dadaff',
        borderRadius: 20,
        padding: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 1,
    },
    closeText: {
        fontSize: 24,
        color: '#555',
    },
    moodsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 15,
    },
    moodButton: {
        alignItems: 'center',
        marginVertical: 8,
        width: '30%',
    },
    emojiOption: { fontSize: 36 },
    moodLabel: {
        fontSize: 12,
        marginTop: 4,
        color: '#333',
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 2,
        outline: 'none',
        height: 100,
        padding: 10,
        marginBottom: 15,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#ba72d4',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
    },
    saveText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});