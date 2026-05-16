"use client"

import "./styles/AnotacoesSection.css"

const AnotacoesSection = ({ notes, editMode, onSave }) => {
  const handleChange = (e) => {
    if (editMode) {
      onSave(e.target.value)
    }
  }

  return (
    <div className="section-card anotacoes-section">
      <div className="section-header">
        <span className="section-icon">📝</span>
        <h2>Anotações</h2>
      </div>

      <div className="anotacoes-content">
        {editMode ? (
          <textarea
            className="anotacoes-textarea"
            value={notes}
            onChange={handleChange}
            placeholder="Adicione anotações sobre seu personagem aqui..."
          />
        ) : (
          <div className="anotacoes-text">{notes}</div>
        )}
      </div>
    </div>
  )
}

export default AnotacoesSection
