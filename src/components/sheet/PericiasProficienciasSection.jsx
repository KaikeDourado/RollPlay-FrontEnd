"use client"

import "./styles/PericiasProficienciasSection.css"

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

const PericiasProficienciasSection = ({
  skills = {},
  attributes = {},
  level = 1,
  editMode,
  onSave,
}) => {
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
    <div className="section-card pericias-section">
      <div className="section-header">
        <span className="section-icon">🎯</span>
        <h2>Perícias e Proficiências</h2>
      </div>

      <div className="bonus-proficiencia">
        <span>Bônus de Proficiência: </span>
        <span className="bonus-valor">{formatBonus(bonusProficiencia)}</span>
      </div>

      <div className="pericias-list">
        {SKILLS_INFO.map((skillInfo) => {
          const skill = skills?.[skillInfo.id]
          const ability = skill?.ability

          return (
            <div
              key={skillInfo.id}
              className={`pericia-item ${skill?.proficient ? "proficiente" : ""}`}
              onClick={() => handleToggleProficiencia(skillInfo.id)}
            >
              <div className="pericia-proficiente">
                {skill?.proficient ? "●" : "○"}
              </div>

              <div className="pericia-bonus">
                {formatBonus(calcBonusPericia(skillInfo.id))}
              </div>

              <div className="pericia-nome">
                {skillInfo.name}
              </div>

              <div className="pericia-atributo">
                ({ATTRIBUTE_SHORT_LABELS[ability] || "---"})
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PericiasProficienciasSection
