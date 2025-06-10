import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerCard from '@/components/profileSession/PlayerCard';
import './styles/PlayersTab.css';

const PlayersTab = ({ campaignUid }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!campaignUid) return;

    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

        const res = await axios.get(`http://localhost:5000/api/campaign/players/${campaignUid}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.success) {
          const formatted = res.data.data.map((p) => ({
            id: p.uid,
            name: p.nome,
            race: p.raca || "Raça desconhecida",
            class: "Classe não definida",
            level: p.nivel || 0,
            avatar: "/imagens/default-character-img.png"
          }));
          setPlayers(formatted);
        } else {
          setError(res.data.message || "Erro ao buscar jogadores");
        }
      } catch (err) {
        console.error("Erro ao carregar jogadores:", err);
        setError("Erro ao buscar jogadores");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [campaignUid]);

  return (
    <div className="players-tab-profileSession">
      <div className="tab-header-profileSession">
        <h2 className="tab-title-profileSession">JOGADORES</h2>
        <button className="invite-button-profileSession">
          <i className="plus-icon-profileSession">+</i> CONVIDAR
        </button>
      </div>

      {loading ? (
        <p>Carregando jogadores...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="players-grid-profileSession">
          {players.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayersTab;
