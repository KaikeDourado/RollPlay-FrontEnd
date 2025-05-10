import React from 'react';
import './styles/NotesTab.css';

const NotesTab = () => {
  // Dados de exemplo das notas
  const notes = [
    { 
      id: 1, 
      title: 'Pistas sobre o tesouro', 
      content: 'O tesouro está escondido atrás da cachoeira na caverna principal.',
      createdAt: '15/09/2023'
    },
    { 
      id: 2, 
      title: 'Informações sobre o vilão', 
      content: 'O vilão principal é na verdade o prefeito da cidade que está possuído por um demônio antigo.',
      createdAt: '22/09/2023'
    },
    // Adicione mais notas conforme necessário
  ];

  return (
    <div className="notes-tab-profileSession">
      <div className="tab-header-profileSession">
        <h2 className="tab-title-profileSession">NOTAS</h2>
        <button className="add-note-button-profileSession">
          <i className="plus-icon-profileSession">+</i> NOVA NOTA
        </button>
      </div>
      
      <div className="notes-grid-profileSession">
        {notes.map(note => (
          <div key={note.id} className="note-card-profileSession">
            <h3 className="note-title-profileSession">{note.title}</h3>
            <div className="note-content-profileSession">{note.content}</div>
            <div className="note-footer-profileSession">
              <span className="note-date-profileSession">{note.createdAt}</span>
              <div className="note-actions-profileSession">
                <button className="edit-note-button-profileSession">Editar</button>
                <button className="delete-note-button-profileSession">Excluir</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesTab;