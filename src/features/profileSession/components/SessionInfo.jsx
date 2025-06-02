import React from 'react';
import React, { useState } from 'react';
import './styles/SessionInfo.css';

const SessionInfo = ({ sessionData }) => {
    return (
      <div className="session-info-profileSession">
        <div className="map-container-profileSession">
            <img 
            src="../../../../public/imagens/mapaPerfil-profileSession.jpeg" 
            alt="Mapa da campanha" 
            className="map-image-profileSession" 
            />
            <button className="edit-map-button-profileSession">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                <span>Editar</span>
            </button>
        </div>
        
        <h1 className="session-title-profileSession">{sessionData.title}</h1>
        <div className="system-info-profileSession">SISTEMA: {sessionData.system}</div>
        <div className="stats-profileSession">
          <div className="stat-item-profileSession">
            <i className="stat-icon-profileSession">👥</i>
            <span>{sessionData.playerCount} JOGADORES</span>
          </div>
          <div className="stat-item-profileSession">
            <i className="stat-icon-profileSession">📅</i>
            <span>{sessionData.sessionCount} SESSÕES REALIZADAS</span>
          </div>
          <div className="stat-item-profileSession">
            <i className="stat-icon-profileSession">🗓️</i>
            <span>CRIADA EM {sessionData.createdAt}</span>
          </div>
        </div>
        
        <div className="description-section-profileSession">
          <h2 className="description-title-profileSession">DESCRIÇÃO</h2>
          <div className="description-content-profileSession">
            {sessionData.description}
          </div>
        </div>
        
        <button className="edit-campaign-button-profileSession">
          <i className="edit-icon-profileSession">📝</i> EDITAR CAMPANHA
        </button>
      </div>
    );
  };
  
  export default SessionInfo;