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

const PAGE_SIZE = 50;

const ChatTab = ({ campaignUid }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const scrollToBottomAfterUpdateRef = useRef(false);

    const { user } = useAuth();

    const rollDice = (sides) => {
        const result = Math.floor(Math.random() * sides) + 1;
        const message = `${user?.displayName || user?.email || 'Jogador'} rolou d${sides}: ${result}`;
        sendMessage(message);
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

    const fetchMessages = async ({ before } = {}) => {
        const params = new URLSearchParams();
        params.set('limit', PAGE_SIZE.toString());

        if (before) {
            params.set('before', before.toISOString());
        }

        const res = await fetchSecure(
            `http://localhost:5000/campaigns/${campaignUid}/chat?${params.toString()}`
        );

        if (!res.ok) {
            throw new Error('Erro ao carregar mensagens');
        }

        const data = await res.json();
        const orderedMessages = (data.messages || []).slice().reverse();
        return orderedMessages;
    };

    const loadInitialMessages = async () => {
        setLoading(true);
        setError("");

        try {
            const recentMessages = await fetchMessages();
            setMessages(recentMessages);
            setHasMore(recentMessages.length === PAGE_SIZE);
            scrollToBottomAfterUpdateRef.current = true;
        } catch (err) {
            console.error("Erro ao buscar mensagens:", err);
            setError("Erro ao carregar mensagens");
        } finally {
            setLoading(false);
        }
    };

    const loadOlderMessages = async () => {
        if (!hasMore || loadingMore || !messages.length) return;

        const oldestMessage = messages[0];
        const beforeDate = parseTimestamp(oldestMessage.createdAt);
        if (!beforeDate) return;

        setLoadingMore(true);
        setError("");

        const container = messagesContainerRef.current;
        const previousScrollHeight = container?.scrollHeight || 0;
        const previousScrollTop = container?.scrollTop || 0;

        try {
            const olderMessages = await fetchMessages({ before: beforeDate });
            if (olderMessages.length === 0) {
                setHasMore(false);
                return;
            }

            setMessages((prev) => [...olderMessages, ...prev]);
            setHasMore(olderMessages.length === PAGE_SIZE);

            setTimeout(() => {
                if (!messagesContainerRef.current) return;
                messagesContainerRef.current.scrollTop =
                    messagesContainerRef.current.scrollHeight - previousScrollHeight + previousScrollTop;
            }, 0);
        } catch (err) {
            console.error("Erro ao carregar mensagens antigas:", err);
            setError("Erro ao carregar mensagens antigas");
        } finally {
            setLoadingMore(false);
        }
    };

    const sendMessage = async (messageText = newMessage) => {
        if (!messageText.trim() || sending) return;

        setSending(true);
        setError("");

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
                setMessages((prev) => [...prev, data]);
                setNewMessage("");
                scrollToBottomAfterUpdateRef.current = true;
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

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };

    const handleScroll = () => {
        const container = messagesContainerRef.current;
        if (!container || loadingMore || !hasMore) return;

        if (container.scrollTop < 120) {
            loadOlderMessages();
        }
    };

    useEffect(() => {
        if (campaignUid) {
            loadInitialMessages();
        }
    }, [campaignUid]);

    useEffect(() => {
        if (scrollToBottomAfterUpdateRef.current) {
            scrollToBottom();
            scrollToBottomAfterUpdateRef.current = false;
        }
    }, [messages]);

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
            <div className="chat-messages" ref={messagesContainerRef} onScroll={handleScroll}>
                {loadingMore && (
                    <div className="loading-more-messages">Carregando mensagens antigas...</div>
                )}
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
