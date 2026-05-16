"use client"

import { useState } from "react"
import "./styles/HabilidadesSection.css"

const FEATURE_GROUPS = {
  classFeatures: "Habilidades de Classe",
  speciesTraits: "Traços de Espécie",
  feats: "Talentos",
}

const HabilidadesSection = ({ features = {}, backstoryPersonality, ideals, bonds, flaws, history, editMode, onSave }) => {
  const safeFeatures = {
    classFeatures: features?.classFeatures || [],
    speciesTraits: features?.speciesTraits || [],
    feats: features?.feats || [],
  }

  const [novaHabilidade, setNovaHabilidade] = useState({
    name: "",
    description: "",
    type: "classFeatures",
  })
  const [modalAberto, setModalAberto] = useState(false)

  const saveFeatures = (updatedFeatures) => {
    onSave({ features: updatedFeatures })
  }

  const handleAddHabilidade = () => {
    if (!novaHabilidade.name.trim() || !novaHabilidade.description.trim()) return

    const updatedFeatures = {
      ...safeFeatures,
      [novaHabilidade.type]: [
        ...safeFeatures[novaHabilidade.type],
        {
          name: novaHabilidade.name,
          description: novaHabilidade.description,
        },
      ],
    }

    saveFeatures(updatedFeatures)
    setModalAberto(false)
    setNovaHabilidade({
      name: "",
      description: "",
      type: "classFeatures",
    })
  }

  const handleRemoveHabilidade = (type, index) => {
    const updatedFeatures = {
      ...safeFeatures,
      [type]: safeFeatures[type].filter((_, i) => i !== index),
    }

    saveFeatures(updatedFeatures)
  }

  const handleHabilidadeChange = (e) => {
    const { name, value } = e.target

    setNovaHabilidade({
      ...novaHabilidade,
      [name]: value,
    })
  }

  const handlePersonalidadeChange = (field, value) => {
    if (!editMode) return
    onSave({ [field]: value })
  }

  const traits = [
    { title: "Traços de Personalidade", value: backstoryPersonality, field: "backstoryPersonality" },
    { title: "Ideais", value: ideals, field: "ideals" },
    { title: "Ligações", value: bonds, field: "bonds" },
    { title: "Defeitos", value: flaws, field: "flaws" },
  ]

  return (
    <div className="section-card habilidades-section">
      <div className="section-header">
        <span className="section-icon">🎭</span>
        <h2>Traços & Origem</h2>
      </div>

      {editMode && (
        <div className="habilidades-actions">
          <button className="habilidades-add-button" onClick={() => setModalAberto(true)}>
            + Adicionar Habilidade
          </button>
        </div>
      )}

      <div className="habilidades-body">
        <div className="habilidades-grid">
          {Object.entries(FEATURE_GROUPS).map(([type, label]) => (
            <div key={type} className="habilidades-group">
              <div className="group-title">
                <h3>{label}</h3>
                <span>{safeFeatures[type].length} itens</span>
              </div>

              {safeFeatures[type].length === 0 ? (
                <p className="empty-message">Nenhuma habilidade adicionada ainda.</p>
              ) : (
                safeFeatures[type].map((habilidade, index) => (
                  <div key={index} className="habilidade-card">
                    <div className="habilidade-header">
                      <h3>{habilidade?.name || "Sem nome"}</h3>

                      {editMode && (
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveHabilidade(type, index)}
                          title="Remover habilidade"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div className="habilidade-descricao">
                      {habilidade?.description || "Sem descrição."}
                    </div>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>

        <div className="personalidade-body">
          <div className="traits-grid">
            {traits.map(({ title, value, field }) => (
              <div key={field} className="personalidade-card">
                <h3>{title}</h3>
                {editMode ? (
                  <textarea
                    className="personalidade-textarea"
                    value={value || ""}
                    onChange={(e) => handlePersonalidadeChange(field, e.target.value)}
                    placeholder={`Adicione ${title.toLowerCase()} do seu personagem...`}
                  />
                ) : (
                  <div className="personalidade-text">{value || "Nenhuma informação disponível."}</div>
                )}
              </div>
            ))}
          </div>

          <div className="historia-card">
            <h3>História</h3>
            {editMode ? (
              <textarea
                className="personalidade-textarea historia-textarea"
                value={history || ""}
                onChange={(e) => handlePersonalidadeChange("history", e.target.value)}
                placeholder="Escreva a história completa do seu personagem..."
              />
            ) : (
              <div className="personalidade-text">{history || "Nenhuma história registrada."}</div>
            )}
          </div>
        </div>
      </div>

      {modalAberto && (
        <div className="habilidades-modal-backdrop" onClick={() => setModalAberto(false)}>
          <div className="habilidades-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>Nova Habilidade</h3>
                <p>Escolha o tipo e descreva a nova habilidade.</p>
              </div>
              <button className="modal-close" onClick={() => setModalAberto(false)}>
                ✕
              </button>
            </div>

            <div className="modal-grid">
              <label className="modal-label">
                Categoria
                <select
                  name="type"
                  value={novaHabilidade.type}
                  onChange={handleHabilidadeChange}
                  className="modal-field"
                >
                  <option value="classFeatures">Habilidade de Classe</option>
                  <option value="speciesTraits">Traço de Espécie</option>
                  <option value="feats">Talento</option>
                </select>
              </label>

              <label className="modal-label">
                Nome
                <input
                  type="text"
                  name="name"
                  value={novaHabilidade.name}
                  onChange={handleHabilidadeChange}
                  placeholder="Nome da habilidade"
                  className="modal-field"
                />
              </label>

              <label className="modal-label large">
                Descrição
                <textarea
                  name="description"
                  value={novaHabilidade.description}
                  onChange={handleHabilidadeChange}
                  placeholder="Descreva a habilidade..."
                  className="modal-field modal-textarea"
                />
              </label>
            </div>

            <div className="modal-actions">
              <button className="cancel-button" onClick={() => setModalAberto(false)}>
                Cancelar
              </button>
              <button className="add-btn" onClick={handleAddHabilidade}>
                Salvar habilidade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HabilidadesSection