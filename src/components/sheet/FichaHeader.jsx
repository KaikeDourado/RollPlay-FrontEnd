"use client"

import "./styles/FichaHeader.css"

const FichaHeader = ({ characterImage, characterName, characterClass, pvAtual, pvTotal, pvTemp, onEditToggle, editMode, onHeal, onDamage }) => {
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
          <h2>{characterClass}</h2>
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

        {/* Coluna direita: PV Atual, PV Total e PV Temporário */}
        <div className="pv-values">
          <div className="pv-item">
            <span className="pv-label">PV Atual: </span>
            <span className="pv-value">{pvAtual}</span>
          </div>
          <div className="pv-item">
            <span className="pv-label">PV Total: </span>
            <span className="pv-value">{pvTotal}</span>
          </div>
          <div className="pv-item">
            <span className="pv-label">PV Temporário: </span>
            <span className="pv-value">{pvTemp}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FichaHeader