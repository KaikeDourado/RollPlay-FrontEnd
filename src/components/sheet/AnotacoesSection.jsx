"use client"

import "./styles/AnotacoesSection.css"

const AnotacoesSection = ({ anotacoes, editMode, onSave }) => {
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
            value={anotacoes}
            onChange={handleChange}
            placeholder="Adicione anotações sobre seu personagem aqui..."
          />
        ) : (
          <div className="anotacoes-text">{anotacoes}</div>
        )}
      </div>
    </div>
  )
}

export default AnotacoesSection
