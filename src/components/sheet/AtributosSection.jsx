"use client"

import "./styles/AtributosSection.css"

const ATTRIBUTES_INFO = {
  str: { nome: "Força", abrev: "FOR" },
  dex: { nome: "Destreza", abrev: "DES" },
  con: { nome: "Constituição", abrev: "CON" },
  int: { nome: "Inteligência", abrev: "INT" },
  wis: { nome: "Sabedoria", abrev: "SAB" },
  cha: { nome: "Carisma", abrev: "CAR" },
}

const AtributosSection = ({
  attributes = {},
  editMode,
  onSave,
}) => {
  const calcModificador = (score) => {
    return Math.floor(((Number(score) || 10) - 10) / 2)
  }

  const formatModificador = (mod) => {
    const number = Number(mod) || 0
    return number >= 0 ? `+${number}` : `${number}`
  }

  const handleChangeAttribute = (e) => {
    if (!editMode) return

    const { name, value } = e.target
    const score = Number.parseInt(value) || 1
    const mod = calcModificador(score)

    const updatedAttributes = {
      ...attributes,
      [name]: {
        ...attributes?.[name],
        score,
        mod,
      },
    }

    onSave({ attributes: updatedAttributes })
  }

  return (
    <div className="section-card atributos-section">
      <div className="section-header">
        <span className="section-icon">💪</span>
        <h2>Atributos</h2>
      </div>

      <div className="atributos-grid">
        {Object.entries(ATTRIBUTES_INFO).map(([key, { nome, abrev }]) => {
          const attribute = attributes?.[key] || {
            score: 10,
            mod: 0,
            saveProficient: false,
            saveBonus: 0,
          }

          const score = attribute.score ?? 10
          const mod = attribute.mod ?? calcModificador(score)

          return (
            <div key={key} className="atributo-card">
              <div className="atributo-header">{abrev}</div>

              <div className="atributo-nome">{nome}</div>

              <div className="atributo-valor">
                {editMode ? (
                  <input
                    type="number"
                    name={key}
                    value={score}
                    onChange={handleChangeAttribute}
                    min="1"
                    max="30"
                  />
                ) : (
                  score
                )}
              </div>

              <div className="atributo-modificador">
                {formatModificador(mod)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AtributosSection