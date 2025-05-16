import React from 'react';
import './styles/PlayerCard.css';

const PlayerCard = ({ player }) => {
    return (
      <div className="player-card-profileSession">
        <div className="player-avatar-profileSession">
          <img src={player.avatar || "/placeholder.svg"} alt={player.name} />
        </div>
        <div className="player-info-profileSession">
          <div className="player-name-profileSession">{player.name}</div>
          <div className="player-race-class-profileSession">
            {player.race} {player.class}
          </div>
          <div className="player-level-profileSession">NÍVEL {player.level}</div>
        </div>
        <button className="view-sheet-button-profileSession">
          <i className="sheet-icon-profileSession">📄</i> VER FICHA
        </button>
      </div>
    );
  };
  
  export default PlayerCard;