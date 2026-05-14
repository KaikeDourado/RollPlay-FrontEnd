import React, { useEffect, useState } from 'react';
import PlayerCard from '@/components/profileSession/PlayerCard';
import './styles/PlayersTab.css';

const PlayersTab = ({ campaignUid, players: initialPlayers = [] }) => {
  const [players, setPlayers] = useState(initialPlayers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setPlayers(initialPlayers);
  }, [initialPlayers]);

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
