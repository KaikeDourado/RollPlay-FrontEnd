import React from 'react';
import './styles/MapsTab.css';

const MapsTab = () => {
  // Dados de exemplo dos mapas
  const maps = [
    { 
      id: 1, 
      title: 'Mapa da Cidade', 
      description: 'Mapa detalhado da cidade principal da campanha',
      imageUrl: '../../../../public/imagens/cidade.jpg'
    },
    // Adicione mais mapas conforme necessário
  ];

  return (
    <div className="maps-tab-profileSession">
      <div className="tab-header-profileSession">
        <h2 className="tab-title-profileSession">MAPAS</h2>
        <button className="add-map-button-profileSession">
          <i className="plus-icon-profileSession">+</i> NOVO MAPA
        </button>
      </div>
      
      <div className="maps-grid-profileSession">
        {maps.map(map => (
          <div key={map.id} className="map-card-profileSession">
            <div className="map-image-container-profileSession">
              <img src={map.imageUrl || "/placeholder.svg"} alt={map.title} className="map-thumbnail-profileSession" />
              <button className="edit-map-button-profileSession">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Editar
              </button>
            </div>
            <div className="map-info-profileSession">
              <h3 className="map-title-profileSession">{map.title}</h3>
              <p className="map-description-profileSession">{map.description}</p>
            </div>
            <div className="map-actions-profileSession">
              <button className="view-map-button-profileSession">Ver Mapa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapsTab;