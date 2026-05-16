import React, { useState, useEffect } from "react";
import { fetchSecure } from "@/lib/fetchSecure";
import { useAuth } from "@/contexts/AuthContext";
import "./styles/SessionInfo.css";

const SessionInfo = ({ sessionData, onUpdateSessionData }) => {
  const [showCode, setShowCode] = useState(true);
  const [copied, setCopied] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(sessionData?.name || sessionData?.title || "");
  const [description, setDescription] = useState(sessionData?.description || "");
  const [system, setSystem] = useState(sessionData?.system || "D&D 5e");

  const { user } = useAuth();

  // Quando sessionData mudar (por exemplo, após salvar), atualiza os campos locais
  useEffect(() => {
    setTitle(sessionData?.name || sessionData?.title || "");
    setDescription(sessionData?.description || "");
    setSystem(sessionData?.system || "D&D 5e");
  }, [sessionData]);

  const getCampaignId = () => sessionData?.uid || sessionData?.id || localStorage.getItem('campaignUid');

  const handleCopy = () => {
    navigator.clipboard.writeText(getCampaignId());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleEditClick = () => setIsEditing(true);

  // Salva local e no back-end
  const handleSaveClick = async () => {
    if (!user) {
      alert("Você precisa estar logado para editar a campanha.");
      return;
    }

    try {
      const campaignId = getCampaignId();
      const updatedData = {
        name: title,
        description,
        system,
      };

      const res = await fetchSecure(
        `http://localhost:5000/campaigns/${campaignId}`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedData)
        }
      );

      const data = await res.json();

      if (res.ok && data.campaign) {
        if (onUpdateSessionData) {
          onUpdateSessionData({ name: title, description, system });
        }
        setIsEditing(false);
      } else {
        alert(data.message || "Falha ao salvar campanha.");
      }
    } catch (err) {
      console.error("Erro ao salvar campanha:", err);
      alert(
        err.message ||
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
        <h1 className="session-title-profileSession">{sessionData.name || sessionData.title}</h1>
      )}

      {/* 3) Sistema */}
      <div className="system-info-profileSession">
        {isEditing ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label htmlFor="system-edit" style={{ fontWeight: 'bold' }}>SISTEMA:</label>
            <select
              id="system-edit"
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              style={{
                padding: '5px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '14px'
              }}
            >
              <option value="D&D 5e">D&D 5e</option>
              <option value="D&D 5.5e">D&D 5.5e</option>
            </select>
          </div>
        ) : (
          <>SISTEMA: {sessionData.system || "N/D"}</>
        )}
      </div>

      {/* 4) Estatísticas: código da sala, jogadores, sessões e data */}
      <div className="stats-profileSession">
        <div className="room-code-section-profileSession">
          <span className="room-code-label-profileSession">CÓDIGO:</span>
          <span className="room-code-value-profileSession">
            {showCode ? getCampaignId() : "************"}
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
          <span>{sessionData.players?.length ?? 0} JOGADORES</span>
        </div>
        <div className="stat-item-profileSession">
          <i className="stat-icon-profileSession">📅</i>
          <span>{sessionData.sessoes?.length ?? 0} SESSÕES</span>
        </div>
        <div className="stat-item-profileSession">
          <i className="stat-icon-profileSession">🗓️</i>
          <span>
            CRIADA EM{" "}
            {(() => {
              const createdAt = sessionData.createdAt;
              if (typeof createdAt === 'string') {
                // Tenta parsear o formato brasileiro: "13 de maio de 2026 às 19:14:50 UTC-3"
                const match = createdAt.match(/(\d{1,2}) de (\w+) de (\d{4}) às (\d{1,2}):(\d{2}):(\d{2}) UTC-(\d)/);
                if (match) {
                  const [, day, monthName, year, hour, minute, second, timezoneOffset] = match;
                  const monthNames = {
                    janeiro: 0, fevereiro: 1, março: 2, abril: 3, maio: 4, junho: 5,
                    julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11
                  };
                  const month = monthNames[monthName.toLowerCase()];
                  if (month !== undefined) {
                    const date = new Date(year, month, day, hour, minute, second);
                    return date.toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }).toUpperCase();
                  }
                }
                // Fallback para tentar parsear como data normal
                const date = new Date(createdAt);
                if (!isNaN(date.getTime())) {
                  return date.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }).toUpperCase();
                }
              } else if (createdAt?.seconds) {
                // Timestamp do Firestore
                const date = new Date(createdAt.seconds * 1000);
                return date.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).toUpperCase();
              }
              return "Data inválida";
            })()}
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
