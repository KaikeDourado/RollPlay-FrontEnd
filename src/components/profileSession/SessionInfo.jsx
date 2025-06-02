import React, { useState } from 'react';
import './styles/SessionInfo.css';

const SessionInfo = ({ sessionData, onUpdateSessionData }) => {
  const [showCode, setShowCode] = useState(true);
  const [copied, setCopied] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(sessionData.title);
  const [description, setDescription] = useState(sessionData.description);

  const handleCopy = () => {
    navigator.clipboard.writeText(sessionData.roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = () => {
    if (onUpdateSessionData) {
      onUpdateSessionData({ title, description });
    }
    setIsEditing(false);
  };

  // Atualiza os campos locais se sessionData mudar (opcional, para manter sincronizado)
  React.useEffect(() => {
    setTitle(sessionData.title);
    setDescription(sessionData.description);
  }, [sessionData.title, sessionData.description]);

    return (
      <div className="session-info-profileSession">
        <div className="map-container-profileSession">
            <img 
            src="../../../../public/imagens/mapaPerfil-profileSession.jpeg" 
            alt="Mapa da campanha" 
            className="map-image-profileSession" 
            />
            <button className="edit-map-button-profileSession">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                <span>Editar</span>
            </button>
        </div>
        
      {isEditing ? (
        <input
          className="session-title-profileSession"
          style={{textAlign: "center", fontWeight: "bold", fontSize: 24, marginBottom: 5, textTransform: "uppercase"}}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      ) : (
        <h1 className="session-title-profileSession">{sessionData.title}</h1>
      )}

      <div className="system-info-profileSession">SISTEMA: {sessionData.system}</div>
      
      <div className="stats-profileSession">
        <div className="room-code-section-profileSession">
          <span className="room-code-label-profileSession">CÓDIGO:</span>
          <span className="room-code-value-profileSession">
            {showCode ? sessionData.roomCode : '************'}
          </span>
          <button
            className="room-code-btn-profileSession"
            onClick={() => setShowCode((prev) => !prev)}
            title={showCode ? "Ocultar código" : "Mostrar código"}
          >
            <img
              src={showCode ? "../../../public/imagens/olho-fechado.png" : "../../../public/imagens/olho-aberto.png"}
              alt={showCode ? "Ocultar código" : "Mostrar código"}
            />
          </button>
          <button
            className="room-code-btn-profileSession"
            onClick={handleCopy}
            title="Copiar código"
          >
            <img
              src={copied ? "../../../public/imagens/copiado.png" : "../../../public/imagens/copiar.png"}
              alt={copied ? "Código copiado" : "Copiar código"}
            />
          </button>
        </div>
        <div className="stat-item-profileSession">
          <i className="stat-icon-profileSession">👥</i>
          <span>{sessionData.playerCount} JOGADORES</span>
        </div>
        <div className="stat-item-profileSession">
          <i className="stat-icon-profileSession">📅</i>
          <span>{sessionData.sessionCount} SESSÕES REALIZADAS</span>
        </div>
        <div className="stat-item-profileSession">
          <i className="stat-icon-profileSession">🗓️</i>
          <span>CRIADA EM {sessionData.createdAt}</span>
        </div>
      </div>
      
      <div className="description-section-profileSession">
        <h2 className="description-title-profileSession">DESCRIÇÃO</h2>
        {isEditing ? (
          <textarea
            className="description-content-profileSession"
            style={{width: "100%", minHeight: 130, resize: "vertical"}}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        ) : (
          <div className="description-content-profileSession">
            {sessionData.description}
          </div>
        )}
      </div>
      
      <button
        className="edit-campaign-button-profileSession"
        onClick={isEditing ? handleSaveClick : handleEditClick}
      >
        <i className="edit-icon-profileSession">{isEditing ? "💾" : "📝"}</i>
        {isEditing ? "SALVAR" : "EDITAR CAMPANHA"}
      </button>
    </div>
  );
};

export default SessionInfo;