import React, { useState } from "react";
import { fetchSecure } from "@/lib/fetchSecure";
import "./styles/EnterSessionModal.css";

export default function EnterSessionModal({ isOpen, onClose }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!code) {
      setError("Informe o código da sessão.");
      return;
    }

    try {
      const res = await fetchSecure(
        "http://localhost:5000/campaigns/user/enter",
        {
          method: "PATCH",
          body: JSON.stringify({
            campaignUid: code.trim(),
          }),
        }
      );

      const data = await res.json();

      if (res.ok && data.message) {
        onClose();
      } else {
        setError(data.message || "Falha ao entrar na sessão.");
      }
    } catch (err) {
      console.error("Erro ao entrar na sessão:", err);
      setError(
        err.message ||
        "Não foi possível conectar. Tente novamente."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="enter-session-modal-overlay">
      <div className="enter-session-modal">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Entrar em uma Sessão</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite o código da sessão"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          {error && <p className="enter-session-error">{error}</p>}

          <button type="submit" className="enter-session-btn-primary">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
