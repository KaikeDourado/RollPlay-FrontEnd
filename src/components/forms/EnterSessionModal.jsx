import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { fetchSecure } from "@/lib/fetchSecure";
import "./styles/EnterSessionModal.css";

export default function EnterSessionModal({ isOpen, onClose, onSessionJoined }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setCode("");
    setError("");
    setLoading(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const sessionCode = code.trim();

    if (!sessionCode) {
      setError("Informe o código da campanha.");
      return;
    }

    setLoading(true);

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setError("Usuário não autenticado.");
        return;
      }

      // 1. Verifica se o código existe
      const searchResponse = await fetchSecure(
        `https://rollplayapi-fbb4e7a9hqa3ehds.eastus-01.azurewebsites.net/campaigns/${sessionCode}`,
        {
          method: "GET",
        }
      );

      const searchData = await searchResponse.json().catch(() => ({}));

      if (!searchResponse.ok || !searchData.campaign) {
        setError(
          searchData.message ||
          "Código de campanha inválido. Verifique e tente novamente."
        );
        return;
      }

      const campaign = searchData.campaign;

      // 2. Verifica se o usuário é dono
      const isOwner = campaign.userUid === currentUser.uid;

      if (isOwner) {
        setError("Você já é o mestre desta campanha.");
        return;
      }

      // 3. Verifica se o usuário já participa
      const isPlayer = (campaign.players || []).some((player) => {
        if (typeof player === "string") {
          return player === currentUser.uid;
        }

        return player?.userUid === currentUser.uid || player?.uid === currentUser.uid;
      });

      if (isPlayer) {
        setError("Você já participa desta campanha.");
        return;
      }

      // 4. Se passou nas validações, entra na campanha
      const joinResponse = await fetchSecure(
        "https://rollplayapi-fbb4e7a9hqa3ehds.eastus-01.azurewebsites.net/campaigns/user/enter",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            campaignUid: campaign.uid,
          }),
        }
      );

      const joinData = await joinResponse.json().catch(() => ({}));

      if (!joinResponse.ok) {
        setError(joinData.message || "Não foi possível entrar na campanha.");
        return;
      }

      setCode("");
      setError("");

      if (onSessionJoined) {
        onSessionJoined(joinData.campaign);
      }

      onClose();
      location.reload();
    } catch (err) {
      console.error("Erro ao entrar na campanha:", err);
      setError("Não foi possível conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="enter-session-modal-overlay">
      <div className="enter-session-modal">
        <button className="close-btn" onClick={handleClose} disabled={loading}>
          &times;
        </button>

        <h2>Entrar em uma campanha</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite o código da campanha"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={loading}
            required
          />

          {error && <p className="enter-session-error">{error}</p>}

          <button
            type="submit"
            className="enter-session-btn-primary"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}