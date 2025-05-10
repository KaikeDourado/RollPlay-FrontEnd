import React from 'react';
import './styles/SessionsTab.css';

const SessionsTab = () => {
  // Dados de exemplo das sessões
  const sessions = [
    { id: 1, title: 'Sessão 1: O Início da Jornada', date: '10/09/2023', duration: '4h' },
    { id: 2, title: 'Sessão 2: Encontro com o Dragão', date: '17/09/2023', duration: '5h' },
    { id: 3, title: 'Sessão 3: A Caverna Misteriosa', date: '24/09/2023', duration: '3h' },
    // Adicione mais sessões conforme necessário
  ];

  return (
    <div className="sessions-tab-profileSession">
      <div className="tab-header-profileSession">
        <h2 className="tab-title-profileSession">SESSÕES</h2>
        <button className="add-session-button-profileSession">
          <i className="plus-icon-profileSession">+</i> NOVA SESSÃO
        </button>
      </div>
      
      <div className="sessions-list-profileSession">
        {sessions.map(session => (
          <div key={session.id} className="session-item-profileSession">
            <div className="session-info-container-profileSession">
              <h3 className="session-item-title-profileSession">{session.title}</h3>
              <div className="session-item-details-profileSession">
                <span className="session-date-profileSession">Data: {session.date}</span>
                <span className="session-duration-profileSession">Duração: {session.duration}</span>
              </div>
            </div>
            <div className="session-actions-profileSession">
              <button className="view-session-button-profileSession">Ver Detalhes</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionsTab;