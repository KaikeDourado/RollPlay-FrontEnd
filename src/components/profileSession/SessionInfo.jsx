import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/SessionInfo.css";

const SessionInfo = ({ sessionData, onUpdateSessionData }) => {
  const [showCode, setShowCode] = useState(true);
  const [copied, setCopied] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(sessionData.title);
  const [description, setDescription] = useState(sessionData.description);

  // Quando sessionData mudar (por exemplo, após salvar), atualiza os campos locais
  useEffect(() => {
    setTitle(sessionData.title);
    setDescription(sessionData.description);
  }, [sessionData.title, sessionData.description]);

  const handleCopy = () => {
    navigator.clipboard.writeText(sessionData.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleEditClick = () => setIsEditing(true);

  // Salva local e no back-end
  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      if (!token) {
        alert("Você precisa estar logado para editar a campanha.");
        return;
      }

      // Certificando-se de que o 'uid' da campanha está sendo enviado junto com os dados
      const updatedData = {
        uid: localStorage.getItem('campaignUid'),
        title,
        description,
      };


      // Envia para o back-end (ajuste a URL para o seu endpoint real)
      const res = await axios.put(
        `http://localhost:5000/api/campaign/update`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        // 2) Atualiza estado em ProfileSession para refletir as mudanças 
        if (onUpdateSessionData) {
          onUpdateSessionData({ title, description });
        }
        setIsEditing(false);
      } else {
        alert(res.data.message || "Falha ao salvar campanha.");
      }
    } catch (err) {
      console.error("Erro ao salvar campanha:", err);
      alert(
        err.response?.data?.message ||
        "Erro ao conectar ao servidor. Tente novamente."
      );
    }
  };

  return (
    <div className="session-info-profileSession">
      {/* 1) Imagem de mapa */}
      <div className="map-container-profileSession">
        <img
          src="/imagens/mapaPerfil-profileSession.jpeg"
          alt="Mapa da campanha"
          className="map-image-profileSession"
        />
        <button className="edit-map-button-profileSession">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          <span>Editar Mapa</span>
        </button>
      </div>

      {/* 2) Título */}
      {isEditing ? (
        <input
          className="session-title-profileSession"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 24,
            marginBottom: 5,
            textTransform: "uppercase",
          }}
        />
      ) : (
        <h1 className="session-title-profileSession">{sessionData.title}</h1>
      )}

      {/* 3) Sistema */}
      <div className="system-info-profileSession">
        SISTEMA: {sessionData.system}
      </div>

      {/* 4) Estatísticas: código da sala, jogadores, sessões e data */}
      <div className="stats-profileSession">
        <div className="room-code-section-profileSession">
          <span className="room-code-label-profileSession">CÓDIGO:</span>
          <span className="room-code-value-profileSession">
            {showCode ? sessionData.id : "************"}
          </span>
          <button
            className="room-code-btn-profileSession"
            onClick={() => setShowCode((prev) => !prev)}
            title={showCode ? "Ocultar código" : "Mostrar código"}
          >
            <img
              src={
                showCode
                  ? "/imagens/olho-fechado.png"
                  : "/imagens/olho-aberto.png"
              }
              alt={showCode ? "Ocultar código" : "Mostrar código"}
            />
          </button>
          <button
            className="room-code-btn-profileSession"
            onClick={handleCopy}
            title="Copiar código"
          >
            <img
              src={copied ? "/imagens/copiado.png" : "/imagens/copiar.png"}
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
          <span>{sessionData.sessionCount} SESSÕES</span>
        </div>
        <div className="stat-item-profileSession">
          <i className="stat-icon-profileSession">🗓️</i>
          <span>
            CRIADA EM{" "}
            {isNaN(new Date(sessionData.createdAt.seconds * 1000))
              ? "Data inválida"
              : new Date(sessionData.createdAt.seconds * 1000).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).toUpperCase()}
          </span>
        </div>
      </div>

      {/* 5) Descrição */}
      <div className="description-section-profileSession">
        <h2 className="description-title-profileSession">DESCRIÇÃO</h2>
        {isEditing ? (
          <textarea
            className="description-content-profileSession"
            style={{ width: "100%", minHeight: 130, resize: "vertical" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <div className="description-content-profileSession">
            {sessionData.description}
          </div>
        )}
      </div>

      {/* 6) Botão editar/salvar */}
      <button
        className="edit-campaign-button-profileSession"
        onClick={isEditing ? handleSaveClick : handleEditClick}
      >
        <span className="edit-icon-profileSession">
          {isEditing ? "💾" : "📝"}
        </span>
        {isEditing ? "SALVAR" : "EDITAR CAMPANHA"}
      </button>
    </div>
  );
};

export default SessionInfo;
