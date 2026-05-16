import React, { useState, useEffect } from 'react';
import { fetchSecure } from "@/lib/fetchSecure";
import { useAuth } from "@/contexts/AuthContext";
import './styles/NotesTab.css';

const NotesTab = ({ campaignUid }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });

  const { user } = useAuth();

  // Buscar notas da campanha
  const fetchNotes = async () => {
    try {
      const res = await fetchSecure(
        `http://localhost:5000/campaigns/${campaignUid}`
      );

      if (res.ok) {
        const data = await res.json();
        setNotes(data.campaign?.notas || []);
      } else {
        setError("Erro ao carregar notas");
      }
    } catch (err) {
      console.error("Erro ao buscar notas:", err);
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  // Salvar nota (criar ou atualizar)
  const saveNote = async () => {
    if (!formData.title.trim() || !formData.content.trim()) return;

    try {
      const updatedNotes = editingNote
        ? notes.map(note =>
            note.id === editingNote.id
              ? { ...note, title: formData.title, content: formData.content, updatedAt: new Date() }
              : note
          )
        : [
            ...notes,
            {
              id: Date.now().toString(),
              title: formData.title,
              content: formData.content,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ];

      const res = await fetchSecure(
        `http://localhost:5000/campaigns/${campaignUid}`,
        {
          method: 'PUT',
          body: JSON.stringify({ notas: updatedNotes })
        }
      );

      if (res.ok) {
        setNotes(updatedNotes);
        setFormData({ title: '', content: '' });
        setEditingNote(null);
        setShowAddForm(false);
      } else {
        setError("Erro ao salvar nota");
      }
    } catch (err) {
      console.error("Erro ao salvar nota:", err);
      setError("Erro de conexão");
    }
  };

  // Excluir nota
  const deleteNote = async (noteId) => {
    if (!confirm('Tem certeza que deseja excluir esta nota?')) return;

    try {
      const updatedNotes = notes.filter(note => note.id !== noteId);

      const res = await fetchSecure(
        `http://localhost:5000/campaigns/${campaignUid}`,
        {
          method: 'PUT',
          body: JSON.stringify({ notas: updatedNotes })
        }
      );

      if (res.ok) {
        setNotes(updatedNotes);
      } else {
        setError("Erro ao excluir nota");
      }
    } catch (err) {
      console.error("Erro ao excluir nota:", err);
      setError("Erro de conexão");
    }
  };

  // Editar nota
  const editNote = (note) => {
    setEditingNote(note);
    setFormData({ title: note.title, content: note.content });
    setShowAddForm(true);
  };

  // Cancelar edição
  const cancelEdit = () => {
    setEditingNote(null);
    setFormData({ title: '', content: '' });
    setShowAddForm(false);
  };

  // Buscar notas ao montar componente
  useEffect(() => {
    if (campaignUid) {
      fetchNotes();
    }
  }, [campaignUid]);

  // Formatar data
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date.seconds ? date.seconds * 1000 : date);
    return d.toLocaleDateString('pt-BR');
  };

  if (loading) {
    return <div className="notes-loading">Carregando notas...</div>;
  }

  return (
    <div className="notes-tab-profileSession">
      <div className="tab-header-profileSession">
        <h2 className="tab-title-profileSession">NOTAS</h2>
        <button
          className="add-note-button-profileSession"
          onClick={() => setShowAddForm(true)}
        >
          <i className="plus-icon-profileSession">+</i> NOVA NOTA
        </button>
      </div>

      {error && <div className="notes-error">{error}</div>}

      {/* Formulário de adicionar/editar nota */}
      {showAddForm && (
        <div className="note-form-overlay">
          <div className="note-form">
            <h3>{editingNote ? 'Editar Nota' : 'Nova Nota'}</h3>
            <input
              type="text"
              placeholder="Título da nota"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
            <textarea
              placeholder="Conteúdo da nota"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={6}
            />
            <div className="form-actions">
              <button onClick={saveNote}>
                {editingNote ? 'Salvar' : 'Criar'}
              </button>
              <button onClick={cancelEdit}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <div className="notes-grid-profileSession">
        {notes.length === 0 ? (
          <div className="no-notes">
            <p>Nenhuma nota criada ainda.</p>
          </div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="note-card-profileSession">
              <h3 className="note-title-profileSession">{note.title}</h3>
              <div className="note-content-profileSession">{note.content}</div>
              <div className="note-footer-profileSession">
                <span className="note-date-profileSession">
                  {formatDate(note.updatedAt || note.createdAt)}
                </span>
                <div className="note-actions-profileSession">
                  <button
                    className="edit-note-button-profileSession"
                    onClick={() => editNote(note)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-note-button-profileSession"
                    onClick={() => deleteNote(note.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesTab;