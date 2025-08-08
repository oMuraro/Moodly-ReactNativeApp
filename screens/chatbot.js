// Importe sua chave de API do arquivo .env
import { GEMINI_API_KEY } from '@env';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  FlatList,
  Modal,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import keywordData from './chatbotkeywords.json';

// JSON com palavras-chave e respostas empáticas
const keywordResponses = keywordData.emotions;

// Respostas genéricas para manter a conversa
const genericResponses = {
  continuacao: [
    "Entendo. Me conta mais sobre isso.",
    "Como isso afeta você no dia a dia?",
    "E como você tem lidado com essa situação?",
    "Compreendo. O que mais você gostaria de compartilhar?",
    "Estou aqui para te ouvir. Continue, por favor."
  ],
  apoio: [
    "Você não está sozinho(a) nisso.",
    "Agradeço por compartilhar isso comigo.",
    "Suas emoções são válidas e importantes.",
    "É corajoso da sua parte falar sobre isso.",
    "Estou aqui sempre que precisar conversar."
  ],
  sugestoes: [
    "Já pensou em praticar alguns exercícios de respiração? Temos alguns no app que podem ajudar.",
    "Que tal tentar registrar essas emoções no diário do app? Pode ajudar a processar melhor.",
    "Lembre-se de que cuidar de si mesmo(a) é importante. Já fez alguma pausa hoje?",
    "Às vezes, pequenas mudanças na rotina podem fazer grande diferença. O que você acha?",
    "Os exercícios de relaxamento do app podem ser úteis nesses momentos. Já experimentou?"
  ]
};

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Olá! Sou seu assistente de bem-estar. Como você está se sentindo hoje? 😊',
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [showConversationList, setShowConversationList] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef();

  // Carregar conversas salvas ao iniciar
  useEffect(() => {
    loadConversations();
  }, []);

  // Salvar mensagens quando houver mudanças
  useEffect(() => {
    if (currentConversationId && messages.length > 0) {
      saveCurrentConversation();
    }
  }, [messages]);

  // Função para carregar conversas do AsyncStorage
  const loadConversations = async () => {
    try {
      const savedConversations = await AsyncStorage.getItem('chatbot_conversations');
      if (savedConversations) {
        const parsed = JSON.parse(savedConversations);
        setConversations(parsed);
        
        // Se não há conversa atual, criar uma nova
        if (!currentConversationId && parsed.length === 0) {
          createNewConversation();
        }
      } else {
        createNewConversation();
      }
    } catch (error) {
      console.error('Erro ao carregar conversas:', error);
      createNewConversation();
    }
  };

  // Criar nova conversa
  const createNewConversation = () => {
    const newId = Date.now().toString();
    const newConversation = {
      id: newId,
      title: `Conversa ${new Date().toLocaleDateString('pt-BR')}`,
      messages: [{
        id: '1',
        text: 'Olá! Sou seu assistente de bem-estar. Como você está se sentindo hoje? 😊',
        sender: 'bot',
        timestamp: new Date().toISOString()
      }],
      createdAt: new Date().toISOString(),
      lastMessage: new Date().toISOString()
    };

    setCurrentConversationId(newId);
    setConversations(prev => [...prev, newConversation]);
    setMessages(newConversation.messages);
  };

  // Salvar conversa atual
  const saveCurrentConversation = async () => {
    try {
      const updatedConversations = conversations.map(conv => {
        if (conv.id === currentConversationId) {
          return {
            ...conv,
            messages: messages,
            lastMessage: new Date().toISOString(),
            title: messages.length > 1 ? `Conversa ${new Date(conv.createdAt).toLocaleDateString('pt-BR')}` : conv.title
          };
        }
        return conv;
      });

      setConversations(updatedConversations);
      await AsyncStorage.setItem('chatbot_conversations', JSON.stringify(updatedConversations));
    } catch (error) {
      console.error('Erro ao salvar conversa:', error);
    }
  };

  // Mudar para uma conversa existente
  const switchConversation = (conversationId) => {
    const conversation = conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      setCurrentConversationId(conversationId);
      setMessages(conversation.messages || []);
      setShowConversationList(false);
    }
  };

  // Deletar uma conversa
  const deleteConversation = (conversationId) => {
    Alert.alert(
      'Deletar Conversa',
      'Tem certeza que deseja deletar esta conversa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            const filtered = conversations.filter(conv => conv.id !== conversationId);
            setConversations(filtered);
            await AsyncStorage.setItem('chatbot_conversations', JSON.stringify(filtered));
            
            if (conversationId === currentConversationId) {
              if (filtered.length > 0) {
                switchConversation(filtered[0].id);
              } else {
                createNewConversation();
              }
            }
          }
        }
      ]
    );
  };

  // Analisar mensagem e encontrar categoria de emoção
  const analyzeMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    
    for (const [emotion, data] of Object.entries(keywordResponses)) {
      for (const keyword of data.keywords) {
        if (lowerMessage.includes(keyword)) {
          return { emotion, data };
        }
      }
    }
    
    return null;
  };

  // Esta é a nova função que vai gerar respostas usando a IA
  const generateBotResponseWithGemini = async (userMessage, conversationHistory) => {
    // 1. CORREÇÃO: Mudei para a versão v1 da API, que é mais estável.
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=${GEMINI_API_KEY}`;
  
    const systemInstruction = `
      Você é um assistente de bem-estar virtual, empático e acolhedor. Seu nome é Serenamente.
      Sua função é oferecer um espaço seguro para o usuário desabafar, validar seus sentimentos e oferecer sugestões gentis.
      **Você NÃO é um psicólogo e NUNCA deve fornecer diagnósticos ou conselhos médicos.**
      Se o usuário mencionar algo grave como intenção de suicídio ou automutilação, responda de forma acolhedora mas direcione-o IMEDIATAMENTE para ajuda profissional, sugerindo o CVV (Centro de Valorização da Vida) no Brasil, ligando para o número 188.
  
      Seu tom deve ser sempre calmo e positivo. Use emojis sutis para parecer mais amigável. 😊
  
      Para te guiar, aqui estão exemplos de como responder a algumas emoções (use o estilo, não copie a resposta):
      - Se o usuário parecer triste (palavras como 'triste', 'chorando'): "Sinto muito que esteja se sentindo assim. Seus sentimentos são válidos e estou aqui para ouvir, se quiser compartilhar."
      - Se parecer ansioso (palavras como 'ansioso', 'preocupado'): "Entendo perfeitamente essa sensação. A ansiedade pode ser avassaladora. Vamos respirar fundo. O que está passando pela sua mente agora?"
      - Se parecer estressado (palavras como 'estressado', 'sobrecarregado'): "Parece que você está carregando um peso grande. Lembre-se de ser gentil consigo mesmo. O que tem pesado mais em seus ombros?"
  
      O aplicativo onde você está rodando tem ferramentas. Se for apropriado e o usuário parecer receptivo, você pode sugerir:
      - "Se sentir que ajuda, temos alguns exercícios de respiração no app que podem acalmar a mente."
      - "Às vezes, colocar os pensamentos em palavras ajuda. Que tal tentar usar o diário de emoções do nosso app?"
    `;
  
    const formattedHistory = conversationHistory
      .filter(msg => msg.id !== '1')
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));
  
    const contents = [
      ...formattedHistory,
      {
        role: 'user',
        parts: [{ text: userMessage }],
      },
    ];
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // A CORREÇÃO FINAL É ESTA LINHA:
          system_instruction: {
            parts: [{ text: systemInstruction }],
          },
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
          },  
        }),
      });
  
      if (!response.ok) {
          const errorBody = await response.json();
          console.error('Erro da API:', errorBody);
          return "Desculpe, estou com um pouco de dificuldade para me conectar agora. Tente novamente em alguns instantes.";
      }
  
      const data = await response.json();
      const botResponse = data.candidates[0].content.parts[0].text;
      return botResponse.trim();
  
    } catch (error) {
      console.error('Erro ao chamar a API do Gemini:', error);
      return 'Ops, parece que tivemos um problema de conexão. Poderia tentar de novo?';
    }
  };

  // Enviar mensagem (versão modificada para usar a IA)
  const sendMessage = async () => { // A função agora é async
    if (inputText.trim() === '') return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    // Cria uma cópia do estado atual para enviar para a API
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    const messageToSend = inputText; // Guarda o texto antes de limpar
    setInputText('');
    setIsTyping(true);

    // Chama a nova função com IA, passando a mensagem do usuário e o histórico
    const botResponseText = await generateBotResponseWithGemini(messageToSend, currentMessages);

    const botMessage = {
      id: (Date.now() + 1).toString(),
      text: botResponseText, // A resposta vem da IA!
      sender: 'bot',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);

    // Você pode manter a lógica de sugestões se quiser, ou deixar a IA decidir quando sugerir.
    // Por exemplo, você pode instruir a IA no prompt para, a cada 3 ou 4 interações, sugerir um exercício.
  };

  // Renderizar item de mensagem
  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';
    
    return (
      <View style={[
        styles.messageContainer,
        isUser ? styles.userMessageContainer : styles.botMessageContainer
      ]}>
        <View style={[
          styles.messageBubble,
          isUser ? styles.userMessage : styles.botMessage
        ]}>
          <Text style={[
            styles.messageText,
            isUser ? styles.userMessageText : styles.botMessageText
          ]}>
            {item.text}
          </Text>
          <Text style={styles.timestamp}>
            {new Date(item.timestamp).toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Text>
        </View>
      </View>
    );
  };

  // Renderizar item da lista de conversas
  const renderConversationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => switchConversation(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.conversationInfo}>
        <Text style={styles.conversationTitle}>{item.title}</Text>
        <Text style={styles.conversationDate}>
          {new Date(item.lastMessage).toLocaleDateString('pt-BR')}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteConversation(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#ff4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setShowConversationList(true)}
        >
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assistente de Bem-Estar</Text>
        <TouchableOpacity
          style={styles.newChatButton}
          onPress={createNewConversation}
        >
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Lista de Mensagens */}
      <FlatList
        ref={scrollViewRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Indicador de digitação */}
      {isTyping && (
        <View style={styles.typingIndicator}>
          <Text style={styles.typingText}>Assistente está digitando...</Text>
        </View>
      )}

      {/* Input de Mensagem */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxHeight={100}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={inputText.trim() === ''}
        >
          <Ionicons 
            name="send" 
            size={24} 
            color={inputText.trim() === '' ? '#ccc' : '#007AFF'} 
          />
        </TouchableOpacity>
      </View>

      {/* Modal de Lista de Conversas */}
      <Modal
        visible={showConversationList}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowConversationList(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Conversas Salvas</Text>
              <TouchableOpacity
                onPress={() => setShowConversationList(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={conversations}
              keyExtractor={item => item.id}
              renderItem={renderConversationItem}
              contentContainerStyle={styles.conversationsList}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Nenhuma conversa salva</Text>
              }
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 5,
  },
  newChatButton: {
    padding: 5,
  },
  messagesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  messageContainer: {
    marginVertical: 5,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  botMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  userMessage: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 5,
  },
  botMessage: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#fff',
  },
  botMessageText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 5,
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typingIndicator: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  typingText: {
    color: '#666',
    fontStyle: 'italic',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%',
    maxHeight: '80%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  conversationsList: {
    paddingVertical: 10,
  },
  conversationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  conversationDate: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    padding: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 50,
    fontSize: 16,
  },
  
});