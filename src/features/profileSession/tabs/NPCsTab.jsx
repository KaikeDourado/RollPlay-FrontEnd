import React, { useState, useEffect } from 'react';
import { fetchSecure } from "@/lib/fetchSecure";
import { useAuth } from "@/contexts/AuthContext";
import './styles/NPCsTab.css';

const NPCsTab = ({ campaignUid }) => {
  const [npcs, setNpcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingNpc, setEditingNpc] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    avatar: ''
  });

  const { user } = useAuth();

  // Buscar NPCs da campanha
  const fetchNpcs = async () => {
    try {
      const res = await fetchSecure(
        `http://localhost:5000/campaigns/${campaignUid}`
      );

      if (res.ok) {
        const data = await res.json();
        setNpcs(data.campaign?.npcs || []);
      } else {
        setError("Erro ao carregar NPCs");
      }
    } catch (err) {
      console.error("Erro ao buscar NPCs:", err);
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  // Salvar NPC (criar ou atualizar)
  const saveNpc = async () => {
    if (!formData.name.trim()) return;

    try {
      const updatedNpcs = editingNpc
        ? npcs.map(npc =>
            npc.id === editingNpc.id
              ? { ...npc, ...formData, updatedAt: new Date() }
              : npc
          )
        : [
            ...npcs,
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
          body: JSON.stringify({ npcs: updatedNpcs })
        }
      );

      if (res.ok) {
        setNpcs(updatedNpcs);
        setFormData({ name: '', role: '', description: '', avatar: '' });
        setEditingNpc(null);
        setShowAddForm(false);
      } else {
        setError("Erro ao salvar NPC");
      }
    } catch (err) {
      console.error("Erro ao salvar NPC:", err);
      setError("Erro de conexão");
    }
  };

  // Excluir NPC
  const deleteNpc = async (npcId) => {
    if (!confirm('Tem certeza que deseja excluir este NPC?')) return;

    try {
      const updatedNpcs = npcs.filter(npc => npc.id !== npcId);

      const res = await fetchSecure(
        `http://localhost:5000/campaigns/${campaignUid}`,
        {
          method: 'PUT',
          body: JSON.stringify({ npcs: updatedNpcs })
        }
      );

      if (res.ok) {
        setNpcs(updatedNpcs);
      } else {
        setError("Erro ao excluir NPC");
      }
    } catch (err) {
      console.error("Erro ao excluir NPC:", err);
      setError("Erro de conexão");
    }
  };

  // Editar NPC
  const editNpc = (npc) => {
    setEditingNpc(npc);
    setFormData({
      name: npc.name || '',
      role: npc.role || '',
      description: npc.description || '',
      avatar: npc.avatar || ''
    });
    setShowAddForm(true);
  };

  // Cancelar edição
  const cancelEdit = () => {
    setEditingNpc(null);
    setFormData({ name: '', role: '', description: '', avatar: '' });
    setShowAddForm(false);
  };

  // Buscar NPCs ao montar componente
  useEffect(() => {
    if (campaignUid) {
      fetchNpcs();
    }
  }, [campaignUid]);

  if (loading) {
    return <div className="npcs-loading">Carregando NPCs...</div>;
  }

  return (
    <div className="npcs-tab-profileSession">
      <div className="tab-header-profileSession">
        <h2 className="tab-title-profileSession">NPCS</h2>
        <button
          className="add-npc-button-profileSession"
          onClick={() => setShowAddForm(true)}
        >
          <i className="plus-icon-profileSession">+</i> NOVO NPC
        </button>
      </div>

      {error && <div className="npcs-error">{error}</div>}

      {/* Formulário de adicionar/editar NPC */}
      {showAddForm && (
        <div className="npc-form-overlay">
          <div className="npc-form">
            <h3>{editingNpc ? 'Editar NPC' : 'Novo NPC'}</h3>
            <input
              type="text"
              placeholder="Nome do NPC"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Função/Papel"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
            />
            <textarea
              placeholder="Descrição do NPC"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
            />
            <input
              type="text"
              placeholder="URL do avatar (opcional)"
              value={formData.avatar}
              onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
            />
            <div className="form-actions">
              <button onClick={saveNpc}>
                {editingNpc ? 'Salvar' : 'Criar'}
              </button>
              <button onClick={cancelEdit}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <div className="npcs-grid-profileSession">
        {npcs.length === 0 ? (
          <div className="no-npcs">
            <p>Nenhum NPC criado ainda.</p>
          </div>
        ) : (
          npcs.map(npc => (
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
                <button
                  className="edit-npc-button-profileSession"
                  onClick={() => editNpc(npc)}
                >
                  Editar
                </button>
                <button
                  className="delete-npc-button-profileSession"
                  onClick={() => deleteNpc(npc.id)}
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

export default NPCsTab;