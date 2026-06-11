import React, { useEffect, useState } from 'react';
import { fetchSecure } from '@/lib/fetchSecure';
import { useAuth } from '@/contexts/AuthContext';
import './styles/PlayersTab.css';

const PlayersTab = ({ campaignUid, sessionData, onSheetCreated }) => {
  const [players, setPlayers] = useState([]);
  const [master, setMaster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState("");
  const [creatingFor, setCreatingFor] = useState(null);

  const { user } = useAuth();

  const isMaster = sessionData?.userUid === user?.uid;

  useEffect(() => {
    if (!sessionData) return;

    const masterUid = sessionData.userUid;

    setMaster({
      userUid: masterUid,
      userName: sessionData.ownerName || sessionData.masterName || 'Mestre',
      role: 'master',
    });

    const normalizedPlayers = Array.isArray(sessionData.players)
      ? sessionData.players
        .map((player) => ({
          ...player,
          userUid: player.userUid || player.uid,
          userName: player.userName || player.name || player.displayName || 'Jogador',
          role: 'player',
        }))
        .filter((player) => player.userUid !== masterUid)
      : [];

    setPlayers(normalizedPlayers);
    setLoading(false);
  }, [sessionData]);

  const handleCreateSheet = async (playerUserUid, playerName) => {
    setCreatingFor(playerUserUid);

    try {
      const response = await fetchSecure(
        `https://rollplayapi-fbb4e7a9hqa3ehds.eastus-01.azurewebsites.net/sheets`,
        {
          method: 'POST',
          body: JSON.stringify({
            userUid: playerUserUid,
            campaignUid,
            name: `Ficha de ${playerName}`,
            level: 1,
            characterClass: "Classe",
            race: "Raça",
            alignment: "Neutro",
            background: "Histórico",
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao criar ficha');
      }

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

  const renderPlayerCard = (player, isHighlightedMaster = false) => (
    <div
      key={player.userUid}
      className={
        isHighlightedMaster
          ? "player-item-profileSession master-highlight-profileSession"
          : "player-item-profileSession"
      }
    >
      <div className="player-details-profileSession">
        <div className="player-name-profileSession">
          {player.userName} {isHighlightedMaster ? '👑' : ''}
        </div>

        <div className="player-role-profileSession">
          {isHighlightedMaster ? '👑 Mestre da mesa' : '🎲 Jogador'}
        </div>
      </div>

      {isMaster && (
        <button
          className="create-sheet-button-profileSession"
          onClick={() => handleCreateSheet(player.userUid, player.userName)}
          disabled={creatingFor === player.userUid}
        >
          {creatingFor === player.userUid ? 'Criando...' : '➕ Criar Ficha'}
        </button>
      )}
    </div>
  );

  return (
    <div className="players-tab-profileSession">
      <div className="tab-header-profileSession">
        <h2 className="tab-title-profileSession">JOGADORES</h2>
        <p className="players-count-profileSession">
          {players.length} {players.length === 1 ? 'jogador' : 'jogadores'}
        </p>
      </div>

      {loading ? (
        <p>Carregando jogadores...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="players-list-profileSession">
          {master && renderPlayerCard(master, true)}

          {players.length > 0 ? (
            players.map((player) => renderPlayerCard(player))
          ) : (
            <p className="empty-players-profileSession">
              Nenhum jogador entrou nesta campanha ainda.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayersTab;