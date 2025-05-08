"use client"

import "./styles/FichaHeader.css"

const FichaHeader = ({ characterImage, characterName, characterClass, onEditToggle, editMode }) => {
  return (
    <div className="ficha-header">
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

      <button className="edit-button" onClick={onEditToggle}>
        <span className="edit-icon">📝</span>
        {editMode ? "SALVAR FICHA" : "EDITAR FICHA"}
      </button>
    </div>
  )
}

export default FichaHeader
