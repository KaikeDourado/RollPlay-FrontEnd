import React, { useState, useEffect, useRef } from "react";
import { fetchSecure } from "@/lib/fetchSecure";
import { useAuth } from "@/contexts/AuthContext";
import "./styles/ChatTab.css";

// imports dos dados do chat
import {
    GiD4,
    GiDiceSixFacesSix,
    GiDiceEightFacesEight,
    GiD10,
    GiD12,
    GiDiceTwentyFacesTwenty,
    GiAbstract100
} from "react-icons/gi";

const ChatTab = ({ campaignUid }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);

    const { user } = useAuth();

    // Rolar dados
    const rollDice = (sides) => {
        const result = Math.floor(Math.random() * sides) + 1;
        const message = `${user?.displayName || user?.email || 'Jogador'} rolou d${sides}: ${result}`;
        sendMessage(message);
    };

    // Buscar mensagens
    const fetchMessages = async () => {
        try {
            const res = await fetchSecure(
                `http://localhost:5000/campaigns/${campaignUid}/chat`
            );

            if (res.ok) {
                const data = await res.json();
                setMessages(data.messages || []);
            } else {
                setError("Erro ao carregar mensagens");
            }
        } catch (err) {
            console.error("Erro ao buscar mensagens:", err);
            setError("Erro de conexão");
        } finally {
            setLoading(false);
        }
    };

    // Enviar mensagem
    const sendMessage = async (messageText = newMessage) => {
        if (!messageText.trim() || sending) return;

        setSending(true);
        try {
            const res = await fetchSecure(
                `http://localhost:5000/campaigns/${campaignUid}/chat`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        content: messageText.trim(),
                        senderId: user.uid,
                        senderName: user.displayName || user.email || 'Jogador'
                    })
                }
            );

            if (res.ok) {
                const data = await res.json();
                setMessages(prev => [...prev, data]);
                setNewMessage("");
                scrollToBottom();
            } else {
                setError("Erro ao enviar mensagem");
            }
        } catch (err) {
            console.error("Erro ao enviar mensagem:", err);
            setError("Erro de conexão");
        } finally {
            setSending(false);
        }
    };

    const parseTimestamp = (createdAt) => {
        if (!createdAt) return null;

        if (typeof createdAt === 'object') {
            if (typeof createdAt.seconds === 'number') {
                return new Date(createdAt.seconds * 1000 + Math.floor((createdAt.nanoseconds || 0) / 1e6));
            }
            if (typeof createdAt._seconds === 'number') {
                return new Date(createdAt._seconds * 1000 + Math.floor((createdAt._nanoseconds || 0) / 1e6));
            }
            if (typeof createdAt.toDate === 'function') {
                return createdAt.toDate();
            }
        }

        if (typeof createdAt === 'number') {
            return new Date(createdAt);
        }

        if (typeof createdAt === 'string') {
            return new Date(createdAt);
        }

        return null;
    };

    const formatMessageTime = (createdAt) => {
        const date = parseTimestamp(createdAt);
        if (!date || Number.isNaN(date.getTime())) return '';

        const formattedDate = date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const formattedTime = date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        return `${formattedDate} - ${formattedTime}`;
    };

    // Scroll para o final das mensagens
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Buscar mensagens ao montar componente
    useEffect(() => {
        if (campaignUid) {
            fetchMessages();
        }
    }, [campaignUid]);

    // Scroll automático quando novas mensagens chegam
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Enviar mensagem ao pressionar Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (loading) {
        return <div className="chat-loading">Carregando chat...</div>;
    }

    return (
        <div className="chat-tab-container">
            {/* Área de mensagens */}
            <div className="chat-messages">
                {messages.length === 0 ? (
                    <div className="no-messages">
                        <p>Nenhuma mensagem ainda. Comece a conversa!</p>
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <div key={message.uid || index} className="message">
                            <div className="message-body">
                                <span className="player-name">
                                    {message.senderName || 'Anônimo'}:
                                </span>
                                <span className="message-content">{message.content}</span>
                            </div>
                            {message.createdAt && (
                                <span className="message-time">
                                    {formatMessageTime(message.createdAt)}
                                </span>
                            )}
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {error && <div className="chat-error">{error}</div>}

            {/* Área de botões de dados */}
            <div className="dice-buttons">
                <div className="dice-button" onClick={() => rollDice(4)}>
                    <GiD4 className="dice-icon" />
                    <span className="dice-label">d4</span>
                </div>
                <div className="dice-button" onClick={() => rollDice(6)}>
                    <GiDiceSixFacesSix className="dice-icon" />
                    <span className="dice-label">d6</span>
                </div>
                <div className="dice-button" onClick={() => rollDice(8)}>
                    <GiDiceEightFacesEight className="dice-icon" />
                    <span className="dice-label">d8</span>
                </div>
                <div className="dice-button" onClick={() => rollDice(10)}>
                    <GiD10 className="dice-icon" />
                    <span className="dice-label">d10</span>
                </div>
                <div className="dice-button" onClick={() => rollDice(12)}>
                    <GiD12 className="dice-icon" />
                    <span className="dice-label">d12</span>
                </div>
                <div className="dice-button" onClick={() => rollDice(20)}>
                    <GiDiceTwentyFacesTwenty className="dice-icon" />
                    <span className="dice-label">d20</span>
                </div>
                <div className="dice-button" onClick={() => rollDice(100)}>
                    <GiAbstract100 className="dice-icon" />
                    <span className="dice-label">d100</span>
                </div>
            </div>

            {/* Área de envio de mensagens */}
            <div className="chat-input-container">
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={sending}
                />
                <button
                    className="send-button"
                    onClick={() => sendMessage()}
                    disabled={sending || !newMessage.trim()}
                >
                    {sending ? '...' : 'Enviar'}
                </button>
            </div>
        </div>
    );
};

export default ChatTab;