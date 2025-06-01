// SessionModal.jsx
import { useState } from 'react';
import axios from 'axios';
import './styles/SessionModal.css';

const SessionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    sessionName: '',
    system: 'D&D 5e',
    description: '',
    maxPlayers: 4,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxPlayers' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      if (!token) {
        setError('Você precisa estar logado para criar uma campanha.');
        return;
      }

      // 1) Envia para o API Gateway
      const res = await axios.post(
        'http://localhost:5000/api/campaign/create',
        {
          sessionName:  formData.sessionName,
          system:       formData.system,
          description:  formData.description,
          maxPlayers:   formData.maxPlayers
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // 2) Verifica resposta
      if (res.data.success) {
        // opcional: redirecionar para a página da nova campanha
        console.log('Campanha criada:', res.data.data);
        onClose();
      } else {
        setError(res.data.message || 'Erro ao criar campanha.');
      }
    } catch (err) {
      console.error('Erro no request:', err);
      setError(
        err.response?.data?.message ||
        'Falha na conexão ao criar campanha.'
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <form onSubmit={handleSubmit} className="session-form">
          {/* … inputs iguais ao que você já tinha … */}
          <div>
            <label htmlFor="sessionName">Nome da Sessão:</label>
            <input
              type="text"
              id="sessionName"
              name="sessionName"
              value={formData.sessionName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="system">Sistema:</label>
            <select
              id="system"
              name="system"
              value={formData.system}
              onChange={handleChange}
            >
              <option value="D&D 5e">D&D 5e</option>
              <option value="D&D 5.5e">D&D 5.5e</option>
            </select>
          </div>

          <div>
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="maxPlayers">Máximo de Jogadores:</label>
            <input
              type="number"
              id="maxPlayers"
              name="maxPlayers"
              value={formData.maxPlayers}
              onChange={handleChange}
              min={1}
              max={20}
              required
            />
          </div>

          {error && <p className="session-error">{error}</p>}

          <button type="submit">Criar Sessão</button>
        </form>
      </div>
    </div>
  );
};

export default SessionModal;
