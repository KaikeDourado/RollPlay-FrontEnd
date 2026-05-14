// SessionModal.jsx
import { useState } from 'react';
import { fetchSecure } from "@/lib/fetchSecure";
import './styles/SessionModal.css';

const SessionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    sessionName: '',
    description: '',
    system: 'D&D 5e',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    console.log('Enviando dados para criar campanha:', formData);

    try {
      // 1) Envia para o API Gateway
      const res = await fetchSecure(
        'http://localhost:5000/campaigns/',
        {
          method: 'POST',
          body: JSON.stringify({
            name: formData.sessionName,
            description: formData.description,
            system: formData.system,
          })
        }
      );

      // 2) Verifica resposta
      const data = await res.json();

      if (res.ok && data.campaign) {
        console.log('Campanha criada:', data.campaign);
        setSuccess('✓ Sessão criada com sucesso!');
        setFormData({ sessionName: '', description: '', system: 'D&D 5e' });

        // Fecha o modal após 2 segundos
        setTimeout(() => {
          onClose();
          setSuccess('');
        }, 2000);
      } else {
        setError(data.message || 'Erro ao criar campanha.');
      }
    } catch (err) {
      console.error('Erro no request:', err);
      setError(
        err.message ||
        'Falha na conexão ao criar campanha.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose} disabled={loading}>&times;</button>
        <form onSubmit={handleSubmit} className="session-form">

          <div>
            <label htmlFor="sessionName">Nome da Sessão:</label>
            <input
              type="text"
              id="sessionName"
              name="sessionName"
              value={formData.sessionName}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="system">Sistema de RPG:</label>
            <select
              id="system"
              name="system"
              value={formData.system}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="D&D 5e">D&D 5e</option>
              <option value="D&D 5.5e">D&D 5.5e</option>
            </select>
          </div>

          {error && <p className="session-error">{error}</p>}
          {success && <p className="session-success">{success}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Criando...' : 'Criar Sessão'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SessionModal;
