"use client"

import { useState } from "react"
import "./styles/AtaquesMagiasSection.css"

const AtaquesMagiasSection = ({ ataques, magias, editMode, onSave }) => {
  const [activeTab, setActiveTab] = useState("ataques")
  const [novoAtaque, setNovoAtaque] = useState({ nome: "", bonus: "", dano: "", tipo: "" })

  const handleAddAtaque = () => {
    if (novoAtaque.nome && novoAtaque.bonus && novoAtaque.dano && novoAtaque.tipo) {
      const updatedAtaques = [...ataques, novoAtaque]
      onSave({ ataques: updatedAtaques })
      setNovoAtaque({ nome: "", bonus: "", dano: "", tipo: "" })
    }
  }

  const handleRemoveAtaque = (index) => {
    const updatedAtaques = ataques.filter((_, i) => i !== index)
    onSave({ ataques: updatedAtaques })
  }

  const handleAtaqueChange = (e) => {
    const { name, value } = e.target
    setNovoAtaque({ ...novoAtaque, [name]: value })
  }

  return (
    <div className="section-card ataques-magias-section">
      <div className="section-header">
        <span className="section-icon">⚔️</span>
        <h2>Ataques e Magias</h2>
      </div>

      <div className="ataques-tabs">
        <button
          className={`tab-button ${activeTab === "ataques" ? "active" : ""}`}
          onClick={() => setActiveTab("ataques")}
        >
          Ataques
        </button>
        <button
          className={`tab-button ${activeTab === "magias" ? "active" : ""}`}
          onClick={() => setActiveTab("magias")}
        >
          Magias
        </button>
      </div>

      {activeTab === "ataques" && (
        <div className="ataques-content">
          <table className="ataques-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Bônus</th>
                <th>Dano/Tipo</th>
                {editMode && <th>Ações</th>}
              </tr>
            </thead>
            <tbody>
              {ataques.map((ataque, index) => (
                <tr key={index}>
                  <td>{ataque.nome}</td>
                  <td>{ataque.bonus}</td>
                  <td>
                    {ataque.dano} {ataque.tipo}
                  </td>
                  {editMode && (
                    <td>
                      <button className="remove-btn" onClick={() => handleRemoveAtaque(index)}>
                        ✕
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {editMode && (
            <div className="add-ataque-form">
              <h3>Adicionar Ataque</h3>
              <div className="form-row">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={novoAtaque.nome}
                  onChange={handleAtaqueChange}
                />
                <input
                  type="text"
                  name="bonus"
                  placeholder="Bônus (ex: +5)"
                  value={novoAtaque.bonus}
                  onChange={handleAtaqueChange}
                />
                <input
                  type="text"
                  name="dano"
                  placeholder="Dano (ex: 1d8+3)"
                  value={novoAtaque.dano}
                  onChange={handleAtaqueChange}
                />
                <input
                  type="text"
                  name="tipo"
                  placeholder="Tipo (ex: Cortante)"
                  value={novoAtaque.tipo}
                  onChange={handleAtaqueChange}
                />
                <button className="add-btn" onClick={handleAddAtaque}>
                  Adicionar
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "magias" && (
        <div className="magias-content">
          <div className="magias-info">
            <div className="magia-stat">
              <label>Habilidade de Conjuração</label>
              <div className="stat-value">-</div>
            </div>
            <div className="magia-stat">
              <label>CD para Resistir</label>
              <div className="stat-value">-</div>
            </div>
            <div className="magia-stat">
              <label>Bônus de Ataque</label>
              <div className="stat-value">-</div>
            </div>
          </div>

          <div className="magias-empty">
            <p>Este personagem não possui magias.</p>
            {editMode && <button className="add-magia-btn">Adicionar Magias</button>}
          </div>
        </div>
      )}
    </div>
  )
}

export default AtaquesMagiasSection
