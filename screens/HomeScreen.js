import React, { useState, useEffect } from 'react';
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
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedMood, setSelectedMood] = useState('😉');
    const [diaryText, setDiaryText] = useState('');
    const [entries, setEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);

    useEffect(() => {
        const fetchHumores = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await fetch('http://localhost:3000/humor', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    // Adapta os dados do banco para o formato usado na tela
                    const humores = data.map(h => ({
                        id: h.id.toString(),
                        date: new Date(h.data_registro).toLocaleDateString('pt-BR'),
                        emoji: h.emoji,
                        text: h.texto_dia
                    }));
                    setEntries(humores);
                }
            } catch (err) {
                // Se der erro, mantém vazio
                setEntries([]);
            }
        };
        fetchHumores();
    }, []);

    const handleSave = async () => {
        const today = new Date();
        const dateStr = today.toLocaleDateString('pt-BR');
        const newEntry = {
            id: Date.now().toString(),
            date: dateStr,
            emoji: selectedMood,
            text: diaryText
        };
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('http://localhost:3000/humor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ emoji: selectedMood, texto_dia: diaryText })
            });
            const data = await response.json();
            if (response.ok) {
                setEntries(prev => [newEntry, ...prev]);
                setDiaryText('');
                setModalVisible(false);
            } else {
                alert(data.message || 'Erro ao salvar humor');
            }
        } catch (err) {
            alert('Erro de conexão com o servidor');
        }
    };

    const openDetails = (entry) => {
        setSelectedEntry(entry);
        setDetailModalVisible(true);
    };

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

            {/* Card principal */}
            <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
                <Text style={styles.emoji}>{selectedMood}</Text>
                <Text style={styles.cardLabel}>Dia</Text>
            </TouchableOpacity>

            {/* Lista de dias salvos */}
            <FlatList
                data={entries}
                keyExtractor={item => item.id}
                style={{ marginTop: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.entryCard}>
                        <View style={styles.entryHeader}>
                            <Text style={styles.entryDate}>Dia {item.date}</Text>
                        </View>
                        <View style={styles.entryContent}>
                            <Text style={styles.entryEmoji}>{item.emoji}</Text>
                            <TouchableOpacity
                                style={styles.entryButton}
                                onPress={() => openDetails(item)}
                            >
                                <Icon name="file-text" size={28} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            {/* Modal de registro */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalBox}>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.closeText}>×</Text>
                                </TouchableOpacity>

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

                                <TextInput
                                    style={styles.input}
                                    placeholder="Registrar meu dia"
                                    placeholderTextColor="#999"
                                    value={diaryText}
                                    onChangeText={setDiaryText}
                                    multiline
                                    selectionColor="#ba72d4"
                                />

                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={handleSave}
                                >
                                    <Text style={styles.saveText}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Modal de detalhes */}
            <Modal
                visible={detailModalVisible}
                animationType="fade"
                transparent
                onRequestClose={() => setDetailModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalBox, { alignItems: 'center' }]}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setDetailModalVisible(false)}
                        >
                            <Text style={styles.closeText}>×</Text>
                        </TouchableOpacity>
                        {selectedEntry && (
                            <>
                                <Text style={styles.entryDate}>Dia {selectedEntry.date}</Text>
                                <Text style={styles.entryEmoji}>{selectedEntry.emoji}</Text>
                                <Text style={{ textAlign: 'center', marginTop: 10 }}>
                                    {selectedEntry.text}
                                </Text>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {/* Barra de navegação */}
            <View style={styles.navbar}>
                <TouchableOpacity>
                    <Icon name="activity" size={28} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.homeButton}>
                    <Icon name="home" size={32} color="#ba72d4" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="user" size={28} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fef6f3', padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    logo: { width: 80, height: 80, resizeMode: 'contain' },
    title: { fontSize: 28, fontWeight: '600', color: '#4d4d4d', marginTop: 20, marginBottom: 30 },
    card: {
        backgroundColor: '#fff', borderColor: '#c58ee6', borderWidth: 2,
        borderRadius: 20, paddingVertical: 40, paddingHorizontal: 50, alignItems: 'center', alignSelf: 'center',
    },
    emoji: { fontSize: 48 },
    cardLabel: { fontSize: 20, fontWeight: 'bold', color: '#ba72d4', marginTop: 10 },
    entryCard: {
        backgroundColor: '#fff', borderRadius: 12, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#ccc'
    },
    entryHeader: { backgroundColor: '#dadaff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start' },
    entryDate: { fontWeight: 'bold', fontSize: 14 },
    entryContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    entryEmoji: { fontSize: 32 },
    entryButton: { padding: 6, backgroundColor: '#eee', borderRadius: 8 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', padding: 20 },
    modalBox: { width: SCREEN_WIDTH * 0.9, backgroundColor: '#fefefe', borderRadius: 20, padding: 20 },
    closeButton: { position: 'absolute', top: 12, right: 12, zIndex: 1 },
    closeText: { fontSize: 24, color: '#555' },
    moodsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: 10, marginBottom: 15 },
    moodButton: { alignItems: 'center', marginVertical: 8, width: '30%' },
    emojiOption: { fontSize: 36 },
    moodLabel: { fontSize: 12, marginTop: 4, color: '#333', textAlign: 'center' },
    input: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 2, height: 100, padding: 10, marginBottom: 15, textAlignVertical: 'top' },
    saveButton: { backgroundColor: '#ba72d4', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
    saveText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    navbar: {
        flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
        backgroundColor: '#ba72d4', paddingVertical: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20,
        position: 'absolute', bottom: 0, left: 0, right: 0,
    },
    homeButton: {
        backgroundColor: '#fff', padding: 12, borderRadius: 50,
        marginTop: -30, // destaca o botão
    },
});
