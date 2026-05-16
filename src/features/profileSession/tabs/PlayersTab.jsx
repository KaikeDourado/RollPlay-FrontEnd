import React, { useEffect, useState } from 'react';
import { fetchSecure } from '@/lib/fetchSecure';
import { useAuth } from '@/contexts/AuthContext';
import './styles/PlayersTab.css';

const PlayersTab = ({ campaignUid, sessionData, onSheetCreated }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creatingFor, setCreatingFor] = useState(null);
  const { user } = useAuth();

  const isMaster = sessionData?.userUid === user?.uid;

  useEffect(() => {
    if (sessionData?.players) {
      setPlayers(sessionData.players);
      setLoading(false);
    }
  }, [sessionData]);

  const handleCreateSheet = async (playerUserUid, playerName) => {
    setCreatingFor(playerUserUid);
    
    try {
      const response = await fetchSecure(
        `http://localhost:5000/sheets`,
        {
          method: 'POST',
          body: JSON.stringify({
            userUid: playerUserUid,
            campaignUid: campaignUid,
            name: `Ficha de ${playerName}`,
            level: 1,
            characterClass: "Classe",
            race: "Raça",
            alignment: "Neutro",
            background: "Histórico"
          })
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao criar ficha');
      }

      // Chamar callback para recarregar fichas em SheetsTab
      if (onSheetCreated) {
        onSheetCreated();
      }

      alert('Ficha criada com sucesso para ' + playerName);
    } catch (err) {
      console.error('Erro ao criar ficha:', err);
      alert('Erro ao criar ficha: ' + err.message);
    } finally {
      setCreatingFor(null);
    }
  };

  return (
    <div className="players-tab-profileSession">
      <div className="tab-header-profileSession">
        <h2 className="tab-title-profileSession">JOGADORES</h2>
      </div>

      {loading ? (
        <p>Carregando jogadores...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : players.length === 0 ? (
        <p>Nenhum jogador nesta campanha ainda.</p>
      ) : (
        <div className="players-list-profileSession">
          {players.map(player => (
            <div key={player.userUid} className="player-item-profileSession">
              <div className="player-details-profileSession">
                <div className="player-name-profileSession">{player.userName}</div>
                <div className="player-role-profileSession">{player.role === 'player' ? '🎲 Jogador' : '👑 Mestre'}</div>
              </div>
              {isMaster && player.role === 'player' && (
                <button 
                  className="create-sheet-button-profileSession"
                  onClick={() => handleCreateSheet(player.userUid, player.userName)}
                  disabled={creatingFor === player.userUid}
                >
                  {creatingFor === player.userUid ? 'Criando...' : '➕ Criar Ficha'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayersTab;
