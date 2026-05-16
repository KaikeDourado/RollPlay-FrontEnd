import React, { useState, useEffect } from 'react';
import { fetchSecure } from "@/lib/fetchSecure";
import { useAuth } from "@/contexts/AuthContext";
import './styles/MapsTab.css';

const MapsTab = ({ campaignUid }) => {
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingMap, setEditingMap] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: ''
  });

  const { user } = useAuth();

  // Buscar mapas da campanha
  const fetchMaps = async () => {
    try {
      const res = await fetchSecure(
        `http://localhost:5000/campaigns/${campaignUid}`
      );

      if (res.ok) {
        const data = await res.json();
        setMaps(data.campaign?.mapas || []);
      } else {
        setError("Erro ao carregar mapas");
      }
    } catch (err) {
      console.error("Erro ao buscar mapas:", err);
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  // Salvar mapa (criar ou atualizar)
  const saveMap = async () => {
    if (!formData.title.trim()) return;

    try {
      const updatedMaps = editingMap
        ? maps.map(map =>
            map.id === editingMap.id
              ? { ...map, ...formData, updatedAt: new Date() }
              : map
          )
        : [
            ...maps,
            {
              id: Date.now().toString(),
              ...formData,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ];

      const res = await fetchSecure(
        `http://localhost:5000/campaigns/${campaignUid}`,
        {
          method: 'PUT',
          body: JSON.stringify({ mapas: updatedMaps })
        }
      );

      if (res.ok) {
        setMaps(updatedMaps);
        setFormData({ title: '', description: '', imageUrl: '' });
        setEditingMap(null);
        setShowAddForm(false);
      } else {
        setError("Erro ao salvar mapa");
      }
    } catch (err) {
      console.error("Erro ao salvar mapa:", err);
      setError("Erro de conexão");
    }
  };

  // Excluir mapa
  const deleteMap = async (mapId) => {
    if (!confirm('Tem certeza que deseja excluir este mapa?')) return;

    try {
      const updatedMaps = maps.filter(map => map.id !== mapId);

      const res = await fetchSecure(
        `http://localhost:5000/campaigns/${campaignUid}`,
        {
          method: 'PUT',
          body: JSON.stringify({ mapas: updatedMaps })
        }
      );

      if (res.ok) {
        setMaps(updatedMaps);
      } else {
        setError("Erro ao excluir mapa");
      }
    } catch (err) {
      console.error("Erro ao excluir mapa:", err);
      setError("Erro de conexão");
    }
  };

  // Editar mapa
  const editMap = (map) => {
    setEditingMap(map);
    setFormData({
      title: map.title || '',
      description: map.description || '',
      imageUrl: map.imageUrl || ''
    });
    setShowAddForm(true);
  };

  // Cancelar edição
  const cancelEdit = () => {
    setEditingMap(null);
    setFormData({ title: '', description: '', imageUrl: '' });
    setShowAddForm(false);
  };

  // Buscar mapas ao montar componente
  useEffect(() => {
    if (campaignUid) {
      fetchMaps();
    }
  }, [campaignUid]);

  if (loading) {
    return <div className="maps-loading">Carregando mapas...</div>;
  }

  return (
    <div className="maps-tab-profileSession">
      <div className="tab-header-profileSession">
        <h2 className="tab-title-profileSession">MAPAS</h2>
        <button
          className="add-map-button-profileSession"
          onClick={() => setShowAddForm(true)}
        >
          <i className="plus-icon-profileSession">+</i> NOVO MAPA
        </button>
      </div>

      {error && <div className="maps-error">{error}</div>}

      {/* Formulário de adicionar/editar mapa */}
      {showAddForm && (
        <div className="map-form-overlay">
          <div className="map-form">
            <h3>{editingMap ? 'Editar Mapa' : 'Novo Mapa'}</h3>
            <input
              type="text"
              placeholder="Título do mapa"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
            <textarea
              placeholder="Descrição do mapa"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
            <input
              type="text"
              placeholder="URL da imagem do mapa"
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
            />
            <div className="form-actions">
              <button onClick={saveMap}>
                {editingMap ? 'Salvar' : 'Criar'}
              </button>
              <button onClick={cancelEdit}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <div className="maps-grid-profileSession">
        {maps.length === 0 ? (
          <div className="no-maps">
            <p>Nenhum mapa criado ainda.</p>
          </div>
        ) : (
          maps.map(map => (
            <div key={map.id} className="map-card-profileSession">
              <div className="map-image-container-profileSession">
                <img
                  src={map.imageUrl || "/placeholder.svg"}
                  alt={map.title}
                  className="map-thumbnail-profileSession"
                />
                <button
                  className="edit-map-button-profileSession"
                  onClick={() => editMap(map)}
                >
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
                <button
                  className="delete-map-button-profileSession"
                  onClick={() => deleteMap(map.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MapsTab;