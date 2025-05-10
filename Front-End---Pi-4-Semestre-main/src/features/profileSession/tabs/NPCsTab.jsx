import React from 'react';
import './styles/NPCsTab.css';

const NPCsTab = () => {
  // Dados de exemplo dos NPCs
  const npcs = [
    { 
      id: 3, 
      name: 'Grommash', 
      role: 'Ferreiro',
      description: 'Um anão ferreiro especializado em armas lendárias',
      avatar: '../../../../public/imagens/ferreiro.jpg'
    },
    // Adicione mais NPCs conforme necessário
  ];

  return (
    <div className="npcs-tab-profileSession">
      <div className="tab-header-profileSession">
        <h2 className="tab-title-profileSession">NPCS</h2>
        <button className="add-npc-button-profileSession">
          <i className="plus-icon-profileSession">+</i> NOVO NPC
        </button>
      </div>
      
      <div className="npcs-grid-profileSession">
        {npcs.map(npc => (
          <div key={npc.id} className="npc-card-profileSession">
            <div className="npc-avatar-profileSession">
              <img src={npc.avatar || "/placeholder.svg"} alt={npc.name} />
            </div>
            <div className="npc-info-profileSession">
              <h3 className="npc-name-profileSession">{npc.name}</h3>
              <div className="npc-role-profileSession">{npc.role}</div>
              <p className="npc-description-profileSession">{npc.description}</p>
            </div>
            <div className="npc-actions-profileSession">
              <button className="view-npc-button-profileSession">Ver Detalhes</button>
              <button className="edit-npc-button-profileSession">Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NPCsTab;