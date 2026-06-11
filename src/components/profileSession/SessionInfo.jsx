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
  const [imageUrl, setImageUrl] = useState(sessionData?.imageUrl || "");

  const { user } = useAuth();

  // Quando sessionData mudar (por exemplo, após salvar), atualiza os campos locais
  useEffect(() => {
    setTitle(sessionData?.name || sessionData?.title || "");
    setDescription(sessionData?.description || "");
    setSystem(sessionData?.system || "D&D 5e");
    setImageUrl(sessionData?.imageUrl || "");
  }, [sessionData]);

  const getCampaignId = () => sessionData?.uid || sessionData?.id || localStorage.getItem('campaignUid');

  const handleCopy = () => {
    navigator.clipboard.writeText(getCampaignId());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setIsEditing(false);
    setTitle(sessionData?.name || sessionData?.title || "");
    setDescription(sessionData?.description || "");
    setSystem(sessionData?.system || "D&D 5e");
    setImageUrl(sessionData?.imageUrl || "");
  };

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
        imageUrl,
      };

      const res = await fetchSecure(
        `https://rollplayapi-fbb4e7a9hqa3ehds.eastus-01.azurewebsites.net/campaigns/${campaignId}`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedData)
        }
      );

      const data = await res.json();

      if (res.ok && data.campaign) {
        if (onUpdateSessionData) {
          onUpdateSessionData({ name: title, description, system, imageUrl });
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

  const handleDeleteCampaign = async () => {
    if (!user) {
      alert('Você precisa estar logado para excluir a campanha.');
      return;
    }

    if (!window.confirm('Tem certeza que deseja excluir esta campanha? Essa ação não pode ser desfeita.')) {
      return;
    }

    try {
      const campaignId = getCampaignId();
      const res = await fetchSecure(
        `https://rollplayapi-fbb4e7a9hqa3ehds.eastus-01.azurewebsites.net/campaigns/${campaignId}`,
        {
          method: 'DELETE'
        }
      );

      if (res.ok) {
        alert('Campanha excluída com sucesso.');
        window.location.href = '/perfil';
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Falha ao excluir campanha.');
      }
    } catch (err) {
      console.error('Erro ao excluir campanha:', err);
      alert(err.message || 'Erro ao excluir campanha. Tente novamente.');
    }
  };

  const campaignOwner = sessionData?.ownerName || "Não informado";
  const isCampaignOwner = user?.uid === sessionData?.userUid;

  return (
    <div className="session-info-profileSession">
      {/* 1) Imagem de mapa */}
      <div className="map-container-profileSession">
        <img
          src={imageUrl || "/imagens/default-campaign-img.png"}
          alt="Mapa da campanha"
          className="map-image-profileSession"
        />
      </div>

      {/* 2) Título */}
      {isEditing ? (
        <>
          <label htmlFor="campaign-title" style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '700', color: '#fff' }}>
            Nome da campanha
          </label>
          <input
            id="campaign-title"
            className="session-title-profileSession"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 24,
              marginBottom: 15,
              textTransform: "uppercase",
            }}
          />
          <label htmlFor="campaign-image-url" style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '700', color: '#fff' }}>
            URL da imagem da campanha
          </label>
          <input
            id="campaign-image-url"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #60A5FA',
              backgroundColor: '#131525',
              color: '#fff',
              fontSize: '14px',
              boxSizing: 'border-box',
              marginBottom: 15
            }}
          />
        </>
      ) : (
        <h1 className="session-title-profileSession">{sessionData.name || sessionData.title}</h1>
      )}

      {/* 3) Sistema */}
      <div className="system-info-profileSession">
        {isEditing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="system-edit" style={{ fontWeight: '700', color: '#fff' }}>
              Sistema da campanha
            </label>
            <select
              id="system-edit"
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '14px',
                backgroundColor: '#131525',
                color: '#fff'
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
        </div>

        <div className="stat-item-profileSession">
          <i className="stat-icon-profileSession">👑</i>
          <span>MESTRE: {campaignOwner}</span>
        </div>

        <div className="stat-item-profileSession">
          <i className="stat-icon-profileSession">👥</i>
          <span>{sessionData.players?.length ?? 0} JOGADOR(ES)</span>
        </div>
        {/* TODO: implementar depois */}
        {/* <div className="stat-item-profileSession">
          <i className="stat-icon-profileSession">📅</i>
          <span>{sessionData.sessoes?.length ?? 0} SESSÕES</span>
        </div> */}
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
          <>
            <label htmlFor="session-description" style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '700', color: '#fff' }}>
              Texto descritivo da campanha
            </label>
            <textarea
              id="session-description"
              className="description-content-profileSession"
              style={{ width: "100%", minHeight: 130, resize: "vertical" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </>
        ) : (
          <div className="description-content-profileSession">
            {sessionData.description}
          </div>
        )}
      </div>

      {/* 6) Botões editar/salvar/cancelar */}
      {isCampaignOwner && (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            className="edit-campaign-button-profileSession"
            onClick={isEditing ? handleSaveClick : handleEditClick}
            style={{ flex: isEditing ? 1 : 'unset' }}
          >
            <span className="edit-icon-profileSession">
              {isEditing ? "💾" : "📝"}
            </span>
            {isEditing ? "SALVAR" : "EDITAR CAMPANHA"}
          </button>

          {isEditing && (
            <button
              className="edit-campaign-button-profileSession"
              onClick={handleCancelClick}
              style={{ backgroundColor: '#b22222', borderColor: '#8b0000' }}
            >
              <span className="edit-icon-profileSession">✖</span>
              CANCELAR
            </button>
          )}

          {!isEditing && (
            <button
              className="delete-campaign-button-profileSession"
              onClick={handleDeleteCampaign}
              style={{ backgroundColor: '#b22222', borderColor: '#8b0000' }}
            >
              <span className="edit-icon-profileSession">🗑️</span>
              EXCLUIR CAMPANHA
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SessionInfo;
