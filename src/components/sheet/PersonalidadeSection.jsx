"use client"

import "./styles/PersonalidadeSection.css"

const PersonalidadeSection = ({ backstoryPersonality, ideals, bonds, flaws, history, editMode, onSave }) => {
  const handleChange = (field, value) => {
    if (editMode) {
      onSave({ [field]: value })
    }
  }

  return (
    <div className="section-card personalidade-section">
      <div className="section-header">
        <span className="section-icon">🎭</span>
        <h2>Traços & Origem</h2>
      </div>

      <div className="personalidade-content">
        {/* Bloco: Traços de Personalidade */}
        <div className="personalidade-block">
          <h3>Traços de Personalidade</h3>
          {editMode ? (
            <textarea
              className="personalidade-textarea"
              value={backstoryPersonality || ""}
              onChange={(e) => handleChange("backstoryPersonality", e.target.value)}
              placeholder="Adicione os traços de personalidade do seu personagem..."
            />
          ) : (
            <div className="personalidade-text">{backstoryPersonality}</div>
          )}
        </div>

        {/* Bloco: Ideais */}
        <div className="personalidade-block">
          <h3>Ideais</h3>
          {editMode ? (
            <textarea
              className="personalidade-textarea"
              value={ideals || ""}
              onChange={(e) => handleChange("ideals", e.target.value)}
              placeholder="Adicione os ideais do seu personagem..."
            />
          ) : (
            <div className="personalidade-text">{ideals}</div>
          )}
        </div>

        {/* Bloco: Ligações */}
        <div className="personalidade-block">
          <h3>Ligações</h3>
          {editMode ? (
            <textarea
              className="personalidade-textarea"
              value={bonds || ""}
              onChange={(e) => handleChange("bonds", e.target.value)}
              placeholder="Adicione as ligações do seu personagem..."
            />
          ) : (
            <div className="personalidade-text">{bonds}</div>
          )}
        </div>

        {/* Bloco: Defeitos */}
        <div className="personalidade-block">
          <h3>Defeitos</h3>
          {editMode ? (
            <textarea
              className="personalidade-textarea"
              value={flaws || ""}
              onChange={(e) => handleChange("flaws", e.target.value)}
              placeholder="Adicione os defeitos do seu personagem..."
            />
          ) : (
            <div className="personalidade-text">{flaws}</div>
          )}
        </div>
      </div>

      {/* Bloco: História */}
      <div className="personalidade-block historia-block">
        <h3>História</h3>
        {editMode ? (
          <textarea
            className="personalidade-textarea historia-textarea"
            value={history || ""}
            onChange={(e) => handleChange("history", e.target.value)}
            placeholder="Adicione a história do seu personagem..."
          />
        ) : (
          <div className="personalidade-text">{history}</div>
        )}
      </div>

    </div>
  )
}

export default PersonalidadeSection
