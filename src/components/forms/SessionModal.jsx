import { useState } from 'react';
import './styles/SessionModal.css';

const SessionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    sessionName: '',
    system: 'D&D 5e',
    description: '',
    maxPlayers: 4, // valor padrão
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxPlayers' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Session Data:', formData);
    // lógica de envio…
    onClose();
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
              max={20}       // ajuste o máximo que fizer sentido
              required
            />
          </div>

          <button type="submit">Criar Sessão</button>
        </form>
      </div>
    </div>
  );
};

export default SessionModal;
