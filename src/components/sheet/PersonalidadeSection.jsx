"use client"

import "./styles/PersonalidadeSection.css"

const PersonalidadeSection = ({ personalidade, editMode, onSave }) => {
  const handleChange = (e) => {
    if (editMode) {
      onSave(e.target.value)
    }
  }

  return (
    <div className="section-card personalidade-section">
      <div className="section-header">
        <span className="section-icon">🎭</span>
        <h2>Traços & Origem</h2>
      </div>

      <div className="personalidade-content">
        {editMode ? (
          <textarea
            className="personalidade-textarea"
            value={personalidade}
            onChange={handleChange}
            placeholder="Adicione os traços do seu personagem aqui..."
          />
        ) : (
          <div className="personalidade-text">{personalidade}</div>
        )}
      </div>
    </div>
  )
}

export default PersonalidadeSection
