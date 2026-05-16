"use client"

import "./styles/AtributosPericiasResistenciasSection.css"

const ATTRIBUTES_INFO = {
  str: { nome: "Força", abrev: "FOR" },
  dex: { nome: "Destreza", abrev: "DES" },
  con: { nome: "Constituição", abrev: "CON" },
  int: { nome: "Inteligência", abrev: "INT" },
  wis: { nome: "Sabedoria", abrev: "SAB" },
  cha: { nome: "Carisma", abrev: "CAR" },
}

const ATTRIBUTE_SHORT_LABELS = {
  str: "FOR",
  dex: "DES",
  con: "CON",
  int: "INT",
  wis: "SAB",
  cha: "CAR",
}

const SKILLS_INFO = [
  { id: "acrobatics", name: "Acrobacia" },
  { id: "animalHandling", name: "Lidar com Animais" },
  { id: "arcana", name: "Arcanismo" },
  { id: "athletics", name: "Atletismo" },
  { id: "deception", name: "Enganação" },
  { id: "history", name: "História" },
  { id: "insight", name: "Intuição" },
  { id: "intimidation", name: "Intimidação" },
  { id: "investigation", name: "Investigação" },
  { id: "medicine", name: "Medicina" },
  { id: "nature", name: "Natureza" },
  { id: "perception", name: "Percepção" },
  { id: "performance", name: "Atuação" },
  { id: "persuasion", name: "Persuasão" },
  { id: "religion", name: "Religião" },
  { id: "sleightOfHand", name: "Prestidigitação" },
  { id: "stealth", name: "Furtividade" },
  { id: "survival", name: "Sobrevivência" },
]

const DAMAGE_TYPES = [
  "ácido", "fogo", "frio", "elétrico", "força", "necrótica", 
  "perfuração", "veneno", "psíquica", "radiação", "corte", "trovão"
]

const AtributosPericiasResistenciasSection = ({
  attributes = {},
  skills = {},
  deathSaves = { successes: 0, failures: 0 },
  resistances = { damage: [], condition: [] },
  vulnerabilities = { damage: [], condition: [] },
  immunities = { damage: [], condition: [] },
  level = 1,
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

  const formatBonus = (value) => {
    const number = Number(value) || 0
    return number >= 0 ? `+${number}` : `${number}`
  }

  const calcBonusProficiencia = () => {
    return Math.floor(((Number(level) || 1) - 1) / 4) + 2
  }

  const getAttributeMod = (ability) => {
    const attribute = attributes?.[ability]
    if (!attribute) return 0
    if (typeof attribute.mod === "number") {
      return attribute.mod
    }
    return Math.floor(((Number(attribute.score) || 10) - 10) / 2)
  }

  const calcBonusPericia = (skillId) => {
    const skill = skills?.[skillId]
    if (!skill) return 0
    const attributeMod = getAttributeMod(skill.ability)
    const proficiencyBonus = skill.proficient ? calcBonusProficiencia() : 0
    const extraBonus = Number(skill.bonus) || 0
    return attributeMod + proficiencyBonus + extraBonus
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

  const handleToggleSaveProficiency = (attributeKey) => {
    if (!editMode) return
    const updatedAttributes = {
      ...attributes,
      [attributeKey]: {
        ...attributes?.[attributeKey],
        saveProficient: !attributes?.[attributeKey]?.saveProficient,
      },
    }
    onSave({ attributes: updatedAttributes })
  }

  const handleToggleProficiencia = (skillId) => {
    if (!editMode) return
    const currentSkill = skills?.[skillId]
    const updatedSkills = {
      ...skills,
      [skillId]: {
        ...currentSkill,
        proficient: !currentSkill?.proficient,
      },
    }
    onSave({ skills: updatedSkills })
  }

  const bonusProficiencia = calcBonusProficiencia()

  return (
    <div className="section-card atributos-pericias-resistencias-section">
      <div className="section-header">
        <span className="section-icon">💪</span>
        <h2>Atributos, Perícias e Resistências</h2>
      </div>

      <div className="aprs-container">
        {/* SEÇÃO DE ATRIBUTOS */}
        <div className="aprs-subsection">
          <h3 className="subsection-title">Atributos e Saves</h3>
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
              const saveBonus = formatModificador(
                mod + (attribute.saveProficient ? bonusProficiencia : 0)
              )

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

                  <div className="atributo-modificador">{formatModificador(mod)}</div>

                  <div
                    className={`atributo-save ${attribute.saveProficient ? "proficiente" : ""}`}
                    onClick={() => handleToggleSaveProficiency(key)}
                    style={{ cursor: editMode ? "pointer" : "default" }}
                  >
                    <span className="save-proficiente">{attribute.saveProficient ? "●" : "○"}</span>
                    <span className="save-label">Save</span>
                    <span className="save-bonus">{saveBonus}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* SEÇÃO DE PERÍCIAS */}
        <div className="aprs-subsection">
          <h3 className="subsection-title">
            Perícias (Bônus de Proficiência: {formatBonus(bonusProficiencia)})
          </h3>
          <div className="pericias-list">
            {SKILLS_INFO.map((skillInfo) => {
              const skill = skills?.[skillInfo.id]
              const ability = skill?.ability

              return (
                <div
                  key={skillInfo.id}
                  className={`pericia-item ${skill?.proficient ? "proficiente" : ""}`}
                  onClick={() => handleToggleProficiencia(skillInfo.id)}
                  style={{ cursor: editMode ? "pointer" : "default" }}
                >
                  <div className="pericia-proficiente">{skill?.proficient ? "●" : "○"}</div>
                  <div className="pericia-bonus">{formatBonus(calcBonusPericia(skillInfo.id))}</div>
                  <div className="pericia-nome">{skillInfo.name}</div>
                  <div className="pericia-atributo">
                    ({ATTRIBUTE_SHORT_LABELS[ability] || "---"})
                  </div>
                </div>
              )
            })}
          </div>
        </div>


        {/* SEÇÃO DE RESISTÊNCIAS, VULNERABILIDADES E IMUNIDADES */}
        <div className="aprs-subsection">
          <h3 className="subsection-title">Resistências, Vulnerabilidades e Imunidades</h3>

          <div className="resistances-container">
            {/* Resistências */}
            <div className="resistance-group">
              <h4>Resistências de Dano</h4>
              <div className="resistance-list">
                {DAMAGE_TYPES.map((damageType) => (
                  <label key={`res-${damageType}`} className="resistance-item">
                    <input
                      type="checkbox"
                      checked={(resistances?.damage || []).includes(damageType)}
                      onChange={(e) => {
                        if (!editMode) return
                        const resList = resistances?.damage || []
                        let updated
                        if (e.target.checked) {
                          updated = [...resList, damageType]
                        } else {
                          updated = resList.filter((d) => d !== damageType)
                        }
                        onSave({ resistances: { ...resistances, damage: updated } })
                      }}
                      disabled={!editMode}
                    />
                    <span>{damageType}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Vulnerabilidades */}
            <div className="resistance-group">
              <h4>Vulnerabilidades de Dano</h4>
              <div className="resistance-list">
                {DAMAGE_TYPES.map((damageType) => (
                  <label key={`vuln-${damageType}`} className="resistance-item">
                    <input
                      type="checkbox"
                      checked={(vulnerabilities?.damage || []).includes(damageType)}
                      onChange={(e) => {
                        if (!editMode) return
                        const vulnList = vulnerabilities?.damage || []
                        let updated
                        if (e.target.checked) {
                          updated = [...vulnList, damageType]
                        } else {
                          updated = vulnList.filter((d) => d !== damageType)
                        }
                        onSave({ vulnerabilities: { ...vulnerabilities, damage: updated } })
                      }}
                      disabled={!editMode}
                    />
                    <span>{damageType}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Imunidades */}
            <div className="resistance-group">
              <h4>Imunidades de Dano</h4>
              <div className="resistance-list">
                {DAMAGE_TYPES.map((damageType) => (
                  <label key={`imun-${damageType}`} className="resistance-item">
                    <input
                      type="checkbox"
                      checked={(immunities?.damage || []).includes(damageType)}
                      onChange={(e) => {
                        if (!editMode) return
                        const imunList = immunities?.damage || []
                        let updated
                        if (e.target.checked) {
                          updated = [...imunList, damageType]
                        } else {
                          updated = imunList.filter((d) => d !== damageType)
                        }
                        onSave({ immunities: { ...immunities, damage: updated } })
                      }}
                      disabled={!editMode}
                    />
                    <span>{damageType}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AtributosPericiasResistenciasSection
