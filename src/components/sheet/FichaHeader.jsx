"use client"

import "./styles/FichaHeader.css"

const FichaHeader = ({ characterImage, characterName, characterBasic, hp: { current: hpCurrent, max: hpMax, temp: hpTemp }, deathSaves = { successes: 0, failures: 0 }, onEditToggle, editMode, onHeal, onDamage }) => {
  return (
    <div className="ficha-header">
      {/* Botão de Editar Ficha no canto superior direito */}
      <button className="edit-button" onClick={onEditToggle}>
        <span className="edit-icon">📝</span>
        {editMode ? "Salvar" : "Editar"}
      </button>

      <div className="ficha-title">
        <div className="character-portrait">
          <div className="portrait-placeholder">
            <span className="portrait-icon">👤</span>
          </div>
          {editMode && <button className="upload-portrait-btn">Alterar Imagem</button>}
        </div>
        <div>
          <h1>{characterName}</h1>
          <h2>{characterBasic}</h2>
        </div>
      </div>

      {/* Bloco de Pontos de Vida */}
      <div className="pv-block">
        {/* Coluna esquerda: Botões e input */}
        <div className="pv-controls">
          <button className="pv-button heal-button" onClick={() => onHeal(document.getElementById("pv-input").value)}>Curar</button>
          <input id="pv-input" type="number" className="pv-input" placeholder="Valor" />
          <button className="pv-button damage-button" onClick={() => onDamage(document.getElementById("pv-input").value)}>Dano</button>
        </div>

        {/* FIXME: pv ta errado, ta puxando sempre 1 */}
        {/* Coluna direita: PV Atual, PV Total e PV Temporário */}
        <div className="pv-values">
          <div className="pv-item">
            <span className="pv-label">PV Atual: </span>
            <span className="pv-value">{hpCurrent}</span>
          </div>
          <div className="pv-item">
            <span className="pv-label">PV Total: </span>
            <span className="pv-value">{hpMax}</span>
          </div>
          <div className="pv-item">
            <span className="pv-label">PV Temporário: </span>
            <span className="pv-value">{hpTemp}</span>
          </div>
        </div>

        <div className="death-saves-header">
          <div className="death-saves-label">Testes de Morte</div>
          <div className="death-saves-line">
            {[0, 1, 2].map((index) => (
              <span
                key={`success-header-${index}`}
                className={`death-save-dot success ${index < (deathSaves.successes || 0) ? 'filled' : ''}`}
              />
            ))}
            {[0, 1, 2].map((index) => (
              <span
                key={`failure-header-${index}`}
                className={`death-save-dot failure ${index < (deathSaves.failures || 0) ? 'filled' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FichaHeader