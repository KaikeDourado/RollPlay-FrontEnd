"use client"
// FIXME: não ta funcionando o editar
import "./styles/ProficienciasSection.css"

const ARMOR_TYPES = ["Leve", "Média", "Pesada"]
const WEAPON_TYPES = ["Simples", "Marcial"]
const COMMON_TOOLS = [
  "Ferramentas de Alquimista",
  "Ferramentas de Carpinteiro",
  "Ferramentas de Cervejeiro",
  "Ferramentas de Cartógrafo",
  "Ferramentas de Culinária",
  "Ferramentas de Joalheiro",
  "Ferramentas de Investigador",
  "Ferramentas de Coureleiro",
  "Ferramentas de Maçom",
  "Ferramentas de Música",
  "Ferramentas de Pintor",
  "Ferramentas de Pocilga",
  "Ferramentas de Ferreiro",
  "Ferramentas de Tecelagem",
]

const ProficienciasSection = ({
  equipmentProficiencies = {
    armor: { light: false, medium: false, heavy: false, shields: false },
    weapons: { simple: false, martial: false },
    tools: [],
    extra: [],
  },
  languages = [],
  editMode,
  onSave,
}) => {
  const handleToggleProficiency = (category, type) => {
    if (!editMode) return

    const updated = {
      ...equipmentProficiencies,
      [category]: {
        ...equipmentProficiencies[category],
        [type]: !equipmentProficiencies[category]?.[type],
      },
    }

    onSave({ equipmentProficiencies: updated })
  }

  const handleToggleTool = (toolName) => {
    if (!editMode) return

    const tools = equipmentProficiencies.tools || []
    const updated = tools.includes(toolName)
      ? tools.filter((t) => t !== toolName)
      : [...tools, toolName]

    onSave({
      equipmentProficiencies: {
        ...equipmentProficiencies,
        tools: updated,
      },
    })
  }

  const handleToggleExtraProficiency = (proficiency) => {
    if (!editMode) return

    const extra = equipmentProficiencies.extra || []
    const updated = extra.includes(proficiency)
      ? extra.filter((item) => item !== proficiency)
      : [...extra, proficiency]

    onSave({
      equipmentProficiencies: {
        ...equipmentProficiencies,
        extra: updated,
      },
    })
  }

  const handleAddExtraProficiency = (e) => {
    if (e.key !== "Enter" || !editMode) return

    const value = e.target.value.trim()
    if (!value) return

    const extra = equipmentProficiencies.extra || []
    if (extra.includes(value)) {
      e.target.value = ""
      return
    }

    onSave({
      equipmentProficiencies: {
        ...equipmentProficiencies,
        extra: [...extra, value],
      },
    })

    e.target.value = ""
  }

  const handleLanguagesChange = (e) => {
    if (!editMode) return
    const list = e.target.value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
    onSave({ languages: list })
  }

  return (
    <div className="section-card proficiencies-section">
      <div className="section-header">
        <span className="section-icon">🛡️</span>
        <h2>Proficiências</h2>
      </div>

      <div className="ep-container">
        <div className="ep-subsection">
          <h3 className="ep-subsection-title">Idiomas</h3>
          {editMode ? (
            <input
              className="proficiency-input"
              type="text"
              placeholder="Ex: Comum, Élfico, Anão"
              value={(languages || []).join(', ')}
              onChange={handleLanguagesChange}
            />
          ) : (
            <div className="info-value">{(languages || []).join(', ') || 'Nenhum'}</div>
          )}
        </div>

        <div className="ep-subsection">
          <h3 className="ep-subsection-title">Proficiências de Armadura</h3>
          <div className="proficiency-grid">
            {ARMOR_TYPES.map((armorType) => {
              const key = armorType.toLowerCase()
              const isProficient = equipmentProficiencies.armor?.[key] || false

              return (
                <label key={key} className="proficiency-item">
                  <input
                    type="checkbox"
                    checked={isProficient}
                    onChange={() => handleToggleProficiency('armor', key)}
                    disabled={!editMode}
                  />
                  <span className={isProficient ? 'proficiente' : ''}>{armorType}</span>
                </label>
              )
            })}

            <label className="proficiency-item">
              <input
                type="checkbox"
                checked={equipmentProficiencies.armor?.shields || false}
                onChange={() => handleToggleProficiency('armor', 'shields')}
                disabled={!editMode}
              />
              <span className={equipmentProficiencies.armor?.shields ? 'proficiente' : ''}>
                Escudos
              </span>
            </label>
          </div>
        </div>

        <div className="ep-subsection">
          <h3 className="ep-subsection-title">Proficiências de Armas</h3>
          <div className="proficiency-grid">
            {WEAPON_TYPES.map((weaponType) => {
              const key = weaponType.toLowerCase()
              const isProficient = equipmentProficiencies.weapons?.[key] || false

              return (
                <label key={key} className="proficiency-item">
                  <input
                    type="checkbox"
                    checked={isProficient}
                    onChange={() => handleToggleProficiency('weapons', key)}
                    disabled={!editMode}
                  />
                  <span className={isProficient ? 'proficiente' : ''}>{weaponType}</span>
                </label>
              )
            })}
          </div>
        </div>

        <div className="ep-subsection">
          <h3 className="ep-subsection-title">Proficiências com Ferramentas</h3>
          <div className="tools-grid">
            {COMMON_TOOLS.map((tool) => (
              <label key={tool} className="proficiency-item">
                <input
                  type="checkbox"
                  checked={(equipmentProficiencies.tools || []).includes(tool)}
                  onChange={() => handleToggleTool(tool)}
                  disabled={!editMode}
                />
                <span className={(equipmentProficiencies.tools || []).includes(tool) ? 'proficiente' : ''}>
                  {tool}
                </span>
              </label>
            ))}
          </div>

          {editMode && (
            <div className="custom-tool-input">
              <label>Adicionar ferramenta customizada</label>
              <input
                type="text"
                placeholder="Ex: Ferramentas de Médico"
                onKeyDown={handleCustomToolAdd}
              />
            </div>
          )}

          {(equipmentProficiencies.tools || []).length > 0 && (
            <div className="tools-summary">
              <strong>Ferramentas conhecidas:</strong>
              <div className="tools-list">
                {(equipmentProficiencies.tools || []).map((tool) => (
                  <span key={tool} className="tool-badge">
                    {tool}
                    {editMode && (
                      <button className="tool-remove" onClick={() => handleToggleTool(tool)}>
                        ✕
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="ep-subsection">
          <h3 className="ep-subsection-title">Proficiências Extras</h3>
          <div className="extra-grid">
            {(equipmentProficiencies.extra || []).map((proficiency) => (
              <label key={proficiency} className="extra-item">
                <input
                  type="checkbox"
                  checked
                  onChange={() => handleToggleExtraProficiency(proficiency)}
                  disabled={!editMode}
                />
                <span>{proficiency}</span>
              </label>
            ))}
          </div>

          {editMode && (
            <div className="custom-tool-input">
              <label>Adicionar proficiência extra</label>
              <input
                type="text"
                placeholder="Ex: Armas exóticas"
                onKeyDown={handleAddExtraProficiency}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProficienciasSection
