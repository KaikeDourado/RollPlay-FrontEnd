// SessionModal.jsx
import { useState } from 'react';
import { fetchSecure } from "@/lib/fetchSecure";
import './styles/SessionModal.css';

const SessionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    sessionName: '',
    description: '',
  });
  const [error, setError] = useState('');

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
          })
        }
      );

      // 2) Verifica resposta
      const data = await res.json();
      
      if (res.ok && data.campaign) {
        console.log('Campanha criada:', data.campaign);
        // Redireciona para a página da campanha criada
        // window.location.href = `/campaigns/${data.campaign.uid}`;
        onClose();
      } else {
        setError(data.message || 'Erro ao criar campanha.');
      }
    } catch (err) {
      console.error('Erro no request:', err);
      setError(
        err.message ||
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
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
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
