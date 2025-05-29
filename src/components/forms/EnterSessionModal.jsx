import React, { useState } from "react";
import "./styles/EnterSessionModal.css";

export default function EnterSessionModal({ isOpen, onClose, onSubmit }) {
  const [code, setCode] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(code);
    setCode("");
    onClose();
  };

  return (
    <div className="enter-session-modal-overlay">
      <div className="enter-session-modal">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Entrar em uma Sessão</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite o código da sessão"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button type="submit" className="enter-session-btn-primary">Entrar</button>
        </form>
      </div>
    </div>
  );
}