import React from 'react';
import PlayerCard from '../components/PlayerCard';
import './styles/PlayersTab.css';

const PlayersTab = () => {
  // Dados de exemplo dos jogadores
  const players = [
    {
      id: 1,
      name: 'LADY BUG',
      race: 'HUMANA',
      class: 'DRUIDA',
      level: 7,
      avatar: '../../../../public/imagens/ladybug.jpg'
    },
  ];

  return (
    <div className="players-tab-profileSession">
      <div className="tab-header-profileSession">
        <h2 className="tab-title-profileSession">JOGADORES</h2>
        <button className="invite-button-profileSession">
          <i className="plus-icon-profileSession">+</i> CONVIDAR
        </button>
      </div>
      
      <div className="players-grid-profileSession">
        {players.map(player => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default PlayersTab;