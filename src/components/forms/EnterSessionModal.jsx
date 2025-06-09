import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/EnterSessionModal.css";

export default function EnterSessionModal({ isOpen, onClose }) {
  const [code, setCode] = useState("");
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const fetchCharacters = async () => {
      try {
        const token =
          localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/character/userSheets", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.result) {
          setCharacters(res.data.result);
        }
      } catch (err) {
        console.error("Erro ao carregar personagens:", err);
      }
    };

    fetchCharacters();
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!code || !selectedCharacter) {
      setError("Informe o código da sessão e selecione uma ficha.");
      return;
    }

    try {
      const token =
        localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      if (!token) {
        setError("Você precisa estar logado para entrar em uma sessão.");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/campaign/join",
        {
          code,
          characterId: selectedCharacter,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        onClose(); // Agora sim, fecha só depois do sucesso
      } else {
        setError(res.data.message || "Falha ao entrar na sessão.");
      }
    } catch (err) {
      console.error("Erro ao entrar na sessão:", err);
      setError(
        err.response?.data?.message || "Não foi possível conectar. Tente novamente."
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

          <label htmlFor="characterSheet">Escolha sua ficha:</label>
          <select
            id="characterSheet"
            name="characterSheet"
            value={selectedCharacter}
            onChange={(e) => setSelectedCharacter(e.target.value)}
            required
          >
            <option value="">Selecione uma ficha</option>
            {characters.map((char) => (
              <option key={char.id } value={char.id }>
                {char.nome || "Sem Nome"}
              </option>
            ))}
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
