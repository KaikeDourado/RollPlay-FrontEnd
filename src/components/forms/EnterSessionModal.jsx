import React, { useState } from "react";
import axios from "axios";
import "./styles/EnterSessionModal.css";

export default function EnterSessionModal({ isOpen, onClose }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1) Recupera token salvo no storage
      const token =
        localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      if (!token) {
        setError("Você precisa estar logado para entrar em uma sessão.");
        return;
      }

      // 2) Chama a rota /api/campaign/join via API Gateway
      const res = await axios.post(
        "http://localhost:5000/api/campaign/join",
        { code }, // corpo com o código informado
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 3) Verifica resposta do servidor
      if (res.data.success) {
        // por exemplo, pode querer armazenar algum dado retornado ou redirecionar
        console.log("Entrou na sessão:", res.data.data);
        // limpa e fecha o modal
        setCode("");
        onClose();
      } else {
        setError(res.data.message || "Falha ao entrar na sessão.");
      }
    } catch (err) {
      console.error("Erro ao entrar na sessão:", err);
      // exibe mensagem de erro que veio do servidor ou genérica
      setError(
        err.response?.data?.message ||
        "Não foi possível conectar. Tente novamente."
      );
    }
  };

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

          {/* Dropdown de fichas */}
          <label htmlFor="characterSheet">Escolha sua ficha:</label>
          <select id="characterSheet" name="characterSheet">
            <option value="">Selecione uma ficha</option>
            <option value="ficha1">Ficha 1</option>
            <option value="ficha2">Ficha 2</option>
            <option value="ficha3">Ficha 3</option>
          </select>
          
          {error && <p className="enter-session-error">{error}</p>}
          <button type="submit" className="enter-session-btn-primary">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
