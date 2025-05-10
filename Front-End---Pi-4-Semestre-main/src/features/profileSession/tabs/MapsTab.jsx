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
            </div>
            <div className="map-info-profileSession">
              <h3 className="map-title-profileSession">{map.title}</h3>
              <p className="map-description-profileSession">{map.description}</p>
            </div>
            <div className="map-actions-profileSession">
              <button className="view-map-button-profileSession">Ver Mapa</button>
              <button className="edit-map-button-profileSession">Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapsTab;