import React from "react";
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

const ChatTab = () => {
    return (
        <div className="chat-tab-container">
            {/* Área de mensagens */}
            <div className="chat-messages">
                <div className="message">
                    <span className="player-name">Mestre:</span>
                    <span className="message-content">Bem-vindos à sessão de hoje!</span>
                </div>
                <div className="message">
                    <span className="player-name">Jogador 1:</span>
                    <span className="message-content">Estou pronto para a aventura!</span>
                </div>
                <div className="message">
                    <span className="player-name">Jogador 2:</span>
                    <span className="message-content">Vou rolar um d20 para percepção.</span>
                </div>
            </div>

            {/* Área de botões de dados */}
            <div className="dice-buttons">
                <div className="dice-button">
                    <GiD4 className="dice-icon" />
                    <span className="dice-label">d4</span>
                </div>
                <div className="dice-button">
                    <GiDiceSixFacesSix className="dice-icon" />
                    <span className="dice-label">d6</span>
                </div>
                <div className="dice-button">
                    <GiDiceEightFacesEight className="dice-icon" />
                    <span className="dice-label">d8</span>
                </div>
                <div className="dice-button">
                    <GiD10 className="dice-icon" />
                    <span className="dice-label">d10</span>
                </div>
                <div className="dice-button">
                    <GiD12 className="dice-icon" />
                    <span className="dice-label">d12</span>
                </div>
                <div className="dice-button">
                    <GiDiceTwentyFacesTwenty className="dice-icon" />
                    <span className="dice-label">d20</span>
                </div>
                <div className="dice-button">
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
                />
                <button className="send-button">Enviar</button>
            </div>
        </div>
    );
};

export default ChatTab;