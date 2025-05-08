"use client"

import { useState } from "react"
import "./styles/HabilidadesSection.css"

const HabilidadesSection = ({ habilidades, editMode, onSave }) => {
  const [novaHabilidade, setNovaHabilidade] = useState({ nome: "", descricao: "" })

  const handleAddHabilidade = () => {
    if (novaHabilidade.nome && novaHabilidade.descricao) {
      const updatedHabilidades = [...habilidades, novaHabilidade]
      onSave(updatedHabilidades)
      setNovaHabilidade({ nome: "", descricao: "" })
    }
  }

  const handleRemoveHabilidade = (index) => {
    const updatedHabilidades = habilidades.filter((_, i) => i !== index)
    onSave(updatedHabilidades)
  }

  const handleHabilidadeChange = (e) => {
    const { name, value } = e.target
    setNovaHabilidade({ ...novaHabilidade, [name]: value })
  }

  return (
    <div className="section-card habilidades-section">
      <div className="section-header">
        <span className="section-icon">✨</span>
        <h2>Habilidades e Traços</h2>
      </div>

      <div className="habilidades-list">
        {habilidades.map((habilidade, index) => (
          <div key={index} className="habilidade-card">
            <div className="habilidade-header">
              <h3>{habilidade.nome}</h3>
              {editMode && (
                <button className="remove-btn" onClick={() => handleRemoveHabilidade(index)}>
                  ✕
                </button>
              )}
            </div>
            <div className="habilidade-descricao">{habilidade.descricao}</div>
          </div>
        ))}
      </div>

      {editMode && (
        <div className="add-habilidade-form">
          <h3>Adicionar Habilidade</h3>
          <div className="form-group">
            <input
              type="text"
              name="nome"
              placeholder="Nome da Habilidade"
              value={novaHabilidade.nome}
              onChange={handleHabilidadeChange}
            />
          </div>
          <div className="form-group">
            <textarea
              name="descricao"
              placeholder="Descrição da Habilidade"
              value={novaHabilidade.descricao}
              onChange={handleHabilidadeChange}
            />
          </div>
          <button className="add-btn" onClick={handleAddHabilidade}>
            Adicionar
          </button>
        </div>
      )}
    </div>
  )
}

export default HabilidadesSection
