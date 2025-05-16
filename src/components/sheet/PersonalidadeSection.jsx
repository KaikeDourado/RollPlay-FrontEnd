"use client"

import "./styles/PersonalidadeSection.css"

const PersonalidadeSection = ({ personalidade, editMode, onSave }) => {
  const handleChange = (field, value) => {
    if (editMode) {
      onSave({ ...personalidade, [field]: value })
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
              value={personalidade.tracos || ""}
              onChange={(e) => handleChange("tracos", e.target.value)}
              placeholder="Adicione os traços de personalidade do seu personagem..."
            />
          ) : (
            <div className="personalidade-text">{personalidade.tracos}</div>
          )}
        </div>

        {/* Bloco: Ideais */}
        <div className="personalidade-block">
          <h3>Ideais</h3>
          {editMode ? (
            <textarea
              className="personalidade-textarea"
              value={personalidade.ideais || ""}
              onChange={(e) => handleChange("ideais", e.target.value)}
              placeholder="Adicione os ideais do seu personagem..."
            />
          ) : (
            <div className="personalidade-text">{personalidade.ideais}</div>
          )}
        </div>

        {/* Bloco: Ligações */}
        <div className="personalidade-block">
          <h3>Ligações</h3>
          {editMode ? (
            <textarea
              className="personalidade-textarea"
              value={personalidade.ligacoes || ""}
              onChange={(e) => handleChange("ligacoes", e.target.value)}
              placeholder="Adicione as ligações do seu personagem..."
            />
          ) : (
            <div className="personalidade-text">{personalidade.ligacoes}</div>
          )}
        </div>

        {/* Bloco: Defeitos */}
        <div className="personalidade-block">
          <h3>Defeitos</h3>
          {editMode ? (
            <textarea
              className="personalidade-textarea"
              value={personalidade.defeitos || ""}
              onChange={(e) => handleChange("defeitos", e.target.value)}
              placeholder="Adicione os defeitos do seu personagem..."
            />
          ) : (
            <div className="personalidade-text">{personalidade.defeitos}</div>
          )}
        </div>
      </div>

      {/* Bloco: História */}
      <div className="personalidade-block historia-block">
        <h3>História</h3>
        {editMode ? (
          <textarea
            className="personalidade-textarea historia-textarea"
            value={personalidade.historia || ""}
            onChange={(e) => handleChange("historia", e.target.value)}
            placeholder="Adicione a história do seu personagem..."
          />
        ) : (
          <div className="personalidade-text">{personalidade.historia}</div>
        )}
      </div>

    </div>
  )
}

export default PersonalidadeSection
