"use client"

import { useState } from "react"
import "./styles/AtaquesMagiasSection.css"

const DEFAULT_SPELLCASTING = {
  hasSpellcasting: false,
  spellcastingAbility: "",
  spellSaveDC: "",
  spellAttackBonus: "",
  spellcastingMod: "",
  preparedCount: "",
  cantrips: [],
  spellsByLevel: {
    "0": { slots: { total: 0, expended: 0 }, spells: [] },
    "1": { slots: { total: 0, expended: 0 }, spells: [] },
    "2": { slots: { total: 0, expended: 0 }, spells: [] },
    "3": { slots: { total: 0, expended: 0 }, spells: [] },
    "4": { slots: { total: 0, expended: 0 }, spells: [] },
    "5": { slots: { total: 0, expended: 0 }, spells: [] },
    "6": { slots: { total: 0, expended: 0 }, spells: [] },
    "7": { slots: { total: 0, expended: 0 }, spells: [] },
    "8": { slots: { total: 0, expended: 0 }, spells: [] },
    "9": { slots: { total: 0, expended: 0 }, spells: [] },
  },
  spellNotes: "",
}

const EMPTY_WEAPON = {
  name: "",
  bonusAtk: "",
  damage: "",
  damageType: "",
  notes: "",
}

const EMPTY_SPELL = {
  name: "",
  level: "0",
  school: "",
  castingTime: "",
  range: "",
  duration: "",
  concentration: false,
  ritual: false,
  components: {
    verbal: false,
    somatic: false,
    material: false,
    materialDescription: "",
  },
  damage: "",
  damageType: "",
  savingThrow: "",
  attackRoll: false,
  description: "",
  higherLevels: "",
  notes: "",
  prepared: false,
}

const SPELL_LEVEL_LABELS = {
  "0": "Truques",
  "1": "1º Nível",
  "2": "2º Nível",
  "3": "3º Nível",
  "4": "4º Nível",
  "5": "5º Nível",
  "6": "6º Nível",
  "7": "7º Nível",
  "8": "8º Nível",
  "9": "9º Nível",
}

const ABILITY_LABELS = {
  int: "Inteligência",
  wis: "Sabedoria",
  cha: "Carisma",
}

const AtaquesMagiasSection = ({ ataques = [], magias = {}, editMode, onSave }) => {
  const [activeTab, setActiveTab] = useState("ataques")
  const [novoAtaque, setNovoAtaque] = useState(EMPTY_WEAPON)
  const [modalAberto, setModalAberto] = useState(false)
  const [spellDraft, setSpellDraft] = useState(EMPTY_SPELL)
  const [spellEditInfo, setSpellEditInfo] = useState(null)

  const safeWeapons = ataques || []

  const safeSpellcasting = {
    ...DEFAULT_SPELLCASTING,
    ...magias,
    spellsByLevel: {
      ...DEFAULT_SPELLCASTING.spellsByLevel,
      ...(magias?.spellsByLevel || {}),
    },
  }

  const updateWeapons = (weapons) => {
    onSave({ weapons })
  }

  const updateSpellcasting = (spellcasting) => {
    onSave({ spellcasting })
  }

  const handleAtaqueChange = (e) => {
    const { name, value } = e.target
    setNovoAtaque((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddAtaque = () => {
    if (!novoAtaque.name.trim()) return

    updateWeapons([
      ...safeWeapons,
      {
        name: novoAtaque.name,
        bonusAtk: novoAtaque.bonusAtk,
        damage: novoAtaque.damage,
        damageType: novoAtaque.damageType,
        notes: novoAtaque.notes,
      },
    ])

    setNovoAtaque(EMPTY_WEAPON)
  }

  const handleRemoveAtaque = (index) => {
    updateWeapons(safeWeapons.filter((_, i) => i !== index))
  }

  const handleEditAtaque = (index, field, value) => {
    const updatedWeapons = safeWeapons.map((weapon, i) => {
      if (i !== index) return weapon
      return { ...weapon, [field]: value }
    })

    updateWeapons(updatedWeapons)
  }

  const handleSpellcastingChange = (field, value) => {
    updateSpellcasting({
      ...safeSpellcasting,
      [field]: value,
    })
  }

  const handleSlotsChange = (level, field, value) => {
    updateSpellcasting({
      ...safeSpellcasting,
      spellsByLevel: {
        ...safeSpellcasting.spellsByLevel,
        [level]: {
          ...safeSpellcasting.spellsByLevel[level],
          slots: {
            ...safeSpellcasting.spellsByLevel[level].slots,
            [field]: Number(value) || 0,
          },
        },
      },
    })
  }

  const abrirModalNovaMagia = (level = "0") => {
    setSpellDraft({ ...EMPTY_SPELL, level })
    setSpellEditInfo(null)
    setModalAberto(true)
  }

  const abrirModalEditarMagia = (spell, level, index) => {
    setSpellDraft({
      ...EMPTY_SPELL,
      ...spell,
      level,
      components: {
        ...EMPTY_SPELL.components,
        ...(spell.components || {}),
      },
    })

    setSpellEditInfo({ level, index })
    setModalAberto(true)
  }

  const fecharModal = () => {
    setModalAberto(false)
    setSpellDraft(EMPTY_SPELL)
    setSpellEditInfo(null)
  }

  const handleSpellDraftChange = (field, value) => {
    setSpellDraft((prev) => ({ ...prev, [field]: value }))
  }

  const handleSpellComponentChange = (field, value) => {
    setSpellDraft((prev) => ({
      ...prev,
      components: {
        ...prev.components,
        [field]: value,
      },
    }))
  }

  const salvarMagia = () => {
    if (!spellDraft.name.trim()) return

    const newLevel = spellDraft.level
    const updatedSpellsByLevel = { ...safeSpellcasting.spellsByLevel }

    if (spellEditInfo) {
      const oldLevel = spellEditInfo.level

      updatedSpellsByLevel[oldLevel] = {
        ...updatedSpellsByLevel[oldLevel],
        spells: updatedSpellsByLevel[oldLevel].spells.filter(
          (_, index) => index !== spellEditInfo.index
        ),
      }
    }

    updatedSpellsByLevel[newLevel] = {
      ...updatedSpellsByLevel[newLevel],
      spells: [...(updatedSpellsByLevel[newLevel]?.spells || []), spellDraft],
    }

    updateSpellcasting({
      ...safeSpellcasting,
      hasSpellcasting: true,
      spellsByLevel: updatedSpellsByLevel,
    })

    fecharModal()
  }

  const removerMagia = (level, index) => {
    updateSpellcasting({
      ...safeSpellcasting,
      spellsByLevel: {
        ...safeSpellcasting.spellsByLevel,
        [level]: {
          ...safeSpellcasting.spellsByLevel[level],
          spells: safeSpellcasting.spellsByLevel[level].spells.filter(
            (_, i) => i !== index
          ),
        },
      },
    })
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
          <div className="ataques-list">
            {safeWeapons.length === 0 ? (
              <div className="empty-card">Nenhuma arma cadastrada.</div>
            ) : (
              safeWeapons.map((arma, index) => (
                <div key={index} className="ataque-card">
                  <div className="ataque-card-header">
                    {editMode ? (
                      <input
                        value={arma.name || ""}
                        onChange={(e) =>
                          handleEditAtaque(index, "name", e.target.value)
                        }
                        placeholder="Nome da arma"
                      />
                    ) : (
                      <h3>{arma.name || "Arma sem nome"}</h3>
                    )}

                    {editMode && (
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveAtaque(index)}
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="ataque-grid">
                    <label>
                      Bônus de Ataque
                      {editMode ? (
                        <input
                          value={arma.bonusAtk || ""}
                          onChange={(e) =>
                            handleEditAtaque(index, "bonusAtk", e.target.value)
                          }
                          placeholder="+5"
                        />
                      ) : (
                        <span>{arma.bonusAtk || "-"}</span>
                      )}
                    </label>

                    <label>
                      Dano
                      {editMode ? (
                        <input
                          value={arma.damage || ""}
                          onChange={(e) =>
                            handleEditAtaque(index, "damage", e.target.value)
                          }
                          placeholder="1d8+3"
                        />
                      ) : (
                        <span>{arma.damage || "-"}</span>
                      )}
                    </label>

                    <label>
                      Tipo
                      {editMode ? (
                        <input
                          value={arma.damageType || ""}
                          onChange={(e) =>
                            handleEditAtaque(index, "damageType", e.target.value)
                          }
                          placeholder="Cortante"
                        />
                      ) : (
                        <span>{arma.damageType || "-"}</span>
                      )}
                    </label>
                  </div>

                  {(editMode || arma.notes) && (
                    <label className="ataque-notes">
                      Nota curta
                      {editMode ? (
                        <input
                          value={arma.notes || ""}
                          onChange={(e) =>
                            handleEditAtaque(index, "notes", e.target.value)
                          }
                          placeholder="Ex: Versátil, alcance, mágico..."
                        />
                      ) : (
                        <span>{arma.notes}</span>
                      )}
                    </label>
                  )}
                </div>
              ))
            )}
          </div>

          {editMode && (
            <div className="add-ataque-form">
              <h3>Adicionar Arma</h3>

              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={novoAtaque.name}
                  onChange={handleAtaqueChange}
                />

                <input
                  type="text"
                  name="bonusAtk"
                  placeholder="Bônus Atk"
                  value={novoAtaque.bonusAtk}
                  onChange={handleAtaqueChange}
                />

                <input
                  type="text"
                  name="damage"
                  placeholder="Dano"
                  value={novoAtaque.damage}
                  onChange={handleAtaqueChange}
                />

                <input
                  type="text"
                  name="damageType"
                  placeholder="Tipo de dano"
                  value={novoAtaque.damageType}
                  onChange={handleAtaqueChange}
                />

                <input
                  type="text"
                  name="notes"
                  placeholder="Nota curta"
                  value={novoAtaque.notes}
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
          <div className="spellcasting-panel">
            <div className="spellcasting-header">
              <div>
                <h3>Conjuração</h3>
                <p>Configure CD, bônus de ataque, habilidade e magias.</p>
              </div>

              {editMode && (
                <label className="switch-row">
                  <input
                    type="checkbox"
                    checked={!!safeSpellcasting.hasSpellcasting}
                    onChange={(e) =>
                      handleSpellcastingChange("hasSpellcasting", e.target.checked)
                    }
                  />
                  Possui magias
                </label>
              )}
            </div>

            <div className="magias-info">
              <label className="magia-stat">
                Habilidade
                {editMode ? (
                  <select
                    value={safeSpellcasting.spellcastingAbility || ""}
                    onChange={(e) =>
                      handleSpellcastingChange("spellcastingAbility", e.target.value)
                    }
                  >
                    <option value="">Nenhuma</option>
                    <option value="int">Inteligência</option>
                    <option value="wis">Sabedoria</option>
                    <option value="cha">Carisma</option>
                  </select>
                ) : (
                  <span>
                    {ABILITY_LABELS[safeSpellcasting.spellcastingAbility] || "-"}
                  </span>
                )}
              </label>

              <label className="magia-stat">
                CD para Resistir
                {editMode ? (
                  <input
                    type="number"
                    value={safeSpellcasting.spellSaveDC || ""}
                    onChange={(e) =>
                      handleSpellcastingChange("spellSaveDC", e.target.value)
                    }
                  />
                ) : (
                  <span>{safeSpellcasting.spellSaveDC || "-"}</span>
                )}
              </label>

              <label className="magia-stat">
                Bônus de Ataque
                {editMode ? (
                  <input
                    value={safeSpellcasting.spellAttackBonus || ""}
                    onChange={(e) =>
                      handleSpellcastingChange("spellAttackBonus", e.target.value)
                    }
                    placeholder="+5"
                  />
                ) : (
                  <span>{safeSpellcasting.spellAttackBonus || "-"}</span>
                )}
              </label>

              <label className="magia-stat">
                Mod. Conjuração
                {editMode ? (
                  <input
                    value={safeSpellcasting.spellcastingMod || ""}
                    onChange={(e) =>
                      handleSpellcastingChange("spellcastingMod", e.target.value)
                    }
                    placeholder="+3"
                  />
                ) : (
                  <span>{safeSpellcasting.spellcastingMod || "-"}</span>
                )}
              </label>

              <label className="magia-stat">
                Preparadas
                {editMode ? (
                  <input
                    type="number"
                    value={safeSpellcasting.preparedCount || ""}
                    onChange={(e) =>
                      handleSpellcastingChange("preparedCount", e.target.value)
                    }
                  />
                ) : (
                  <span>{safeSpellcasting.preparedCount || "-"}</span>
                )}
              </label>
            </div>
          </div>

          <div className="spell-levels">
            {Object.entries(SPELL_LEVEL_LABELS).map(([level, label]) => {
              const levelData = safeSpellcasting.spellsByLevel[level] || {
                slots: { total: 0, expended: 0 },
                spells: [],
              }

              return (
                <div key={level} className="spell-level-card">
                  <div className="spell-level-header">
                    <div>
                      <h3>{label}</h3>

                      {level !== "0" && (
                        <div className="slots-row">
                          <span>Espaços:</span>

                          {editMode ? (
                            <>
                              <input
                                type="number"
                                min="0"
                                value={levelData.slots?.expended || 0}
                                onChange={(e) =>
                                  handleSlotsChange(level, "expended", e.target.value)
                                }
                              />
                              <span>/</span>
                              <input
                                type="number"
                                min="0"
                                value={levelData.slots?.total || 0}
                                onChange={(e) =>
                                  handleSlotsChange(level, "total", e.target.value)
                                }
                              />
                            </>
                          ) : (
                            <strong>
                              {levelData.slots?.expended || 0}/
                              {levelData.slots?.total || 0}
                            </strong>
                          )}
                        </div>
                      )}
                    </div>

                    {editMode && (
                      <button
                        className="add-magia-btn"
                        onClick={() => abrirModalNovaMagia(level)}
                      >
                        + Magia
                      </button>
                    )}
                  </div>

                  {levelData.spells.length === 0 ? (
                    <div className="magias-empty-small">
                      Nenhuma magia nesse nível.
                    </div>
                  ) : (
                    <div className="spells-grid">
                      {levelData.spells.map((spell, index) => (
                        <button
                          key={`${spell.name}-${index}`}
                          className="spell-card"
                          onClick={() => abrirModalEditarMagia(spell, level, index)}
                        >
                          <div className="spell-card-top">
                            <h4>{spell.name}</h4>
                            {spell.prepared && <span>Preparada</span>}
                          </div>

                          <p>{spell.school || "Escola não informada"}</p>

                          <div className="spell-tags">
                            {spell.damage && <small>{spell.damage}</small>}
                            {spell.damageType && <small>{spell.damageType}</small>}
                            {spell.concentration && <small>Concentração</small>}
                            {spell.ritual && <small>Ritual</small>}
                          </div>

                          {editMode && (
                            <button
                              className="spell-remove-btn"
                              onClick={(e) => {
                                e.stopPropagation()
                                removerMagia(level, index)
                              }}
                            >
                              Remover
                            </button>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {(editMode || safeSpellcasting.spellNotes) && (
            <label className="spell-notes">
              Notas de Conjuração
              {editMode ? (
                <textarea
                  value={safeSpellcasting.spellNotes || ""}
                  onChange={(e) =>
                    handleSpellcastingChange("spellNotes", e.target.value)
                  }
                  placeholder="Regras especiais, foco arcano, grimório, preparação..."
                />
              ) : (
                <p>{safeSpellcasting.spellNotes}</p>
              )}
            </label>
          )}
        </div>
      )}

      {modalAberto && (
        <div className="spell-modal-backdrop" onClick={fecharModal}>
          <div className="spell-modal" onClick={(e) => e.stopPropagation()}>
            <div className="spell-modal-header">
              <div>
                <h3>{spellEditInfo ? "Editar Magia" : "Nova Magia"}</h3>
                <p>Preencha os detalhes completos da magia.</p>
              </div>

              <button className="modal-close-btn" onClick={fecharModal}>
                ✕
              </button>
            </div>

            <div className="spell-form-grid">
              <label>
                Nome
                <input
                  value={spellDraft.name}
                  onChange={(e) => handleSpellDraftChange("name", e.target.value)}
                  placeholder="Ex: Raio de Fogo"
                />
              </label>

              <label>
                Nível
                <select
                  value={spellDraft.level}
                  onChange={(e) => handleSpellDraftChange("level", e.target.value)}
                >
                  {Object.entries(SPELL_LEVEL_LABELS).map(([level, label]) => (
                    <option key={level} value={level}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Escola
                <input
                  value={spellDraft.school}
                  onChange={(e) => handleSpellDraftChange("school", e.target.value)}
                  placeholder="Evocação, Abjuração..."
                />
              </label>

              <label>
                Tempo de Conjuração
                <input
                  value={spellDraft.castingTime}
                  onChange={(e) =>
                    handleSpellDraftChange("castingTime", e.target.value)
                  }
                  placeholder="1 ação"
                />
              </label>

              <label>
                Alcance
                <input
                  value={spellDraft.range}
                  onChange={(e) => handleSpellDraftChange("range", e.target.value)}
                  placeholder="18 metros"
                />
              </label>

              <label>
                Duração
                <input
                  value={spellDraft.duration}
                  onChange={(e) =>
                    handleSpellDraftChange("duration", e.target.value)
                  }
                  placeholder="Instantânea"
                />
              </label>

              <label>
                Dano
                <input
                  value={spellDraft.damage}
                  onChange={(e) => handleSpellDraftChange("damage", e.target.value)}
                  placeholder="2d6"
                />
              </label>

              <label>
                Tipo de Dano
                <input
                  value={spellDraft.damageType}
                  onChange={(e) =>
                    handleSpellDraftChange("damageType", e.target.value)
                  }
                  placeholder="Fogo, Gelo, Necrótico..."
                />
              </label>

              <label>
                Teste de Resistência
                <input
                  value={spellDraft.savingThrow}
                  onChange={(e) =>
                    handleSpellDraftChange("savingThrow", e.target.value)
                  }
                  placeholder="DES, CON, SAB..."
                />
              </label>
            </div>

            <div className="checkbox-grid">
              <label>
                <input
                  type="checkbox"
                  checked={!!spellDraft.attackRoll}
                  onChange={(e) =>
                    handleSpellDraftChange("attackRoll", e.target.checked)
                  }
                />
                Usa jogada de ataque
              </label>

              {/* TODO: Implementar a caixinha de magia de resistência */}

              <label>
                <input
                  type="checkbox"
                  checked={!!spellDraft.concentration}
                  onChange={(e) =>
                    handleSpellDraftChange("concentration", e.target.checked)
                  }
                />
                Concentração
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={!!spellDraft.ritual}
                  onChange={(e) => handleSpellDraftChange("ritual", e.target.checked)}
                />
                Ritual
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={!!spellDraft.prepared}
                  onChange={(e) =>
                    handleSpellDraftChange("prepared", e.target.checked)
                  }
                />
                Preparada
              </label>
            </div>

            <div className="components-box">
              <h4>Componentes</h4>

              <div className="checkbox-grid">
                <label>
                  <input
                    type="checkbox"
                    checked={!!spellDraft.components.verbal}
                    onChange={(e) =>
                      handleSpellComponentChange("verbal", e.target.checked)
                    }
                  />
                  Verbal
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={!!spellDraft.components.somatic}
                    onChange={(e) =>
                      handleSpellComponentChange("somatic", e.target.checked)
                    }
                  />
                  Somático
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={!!spellDraft.components.material}
                    onChange={(e) =>
                      handleSpellComponentChange("material", e.target.checked)
                    }
                  />
                  Material
                </label>
              </div>

              <input
                value={spellDraft.components.materialDescription}
                onChange={(e) =>
                  handleSpellComponentChange("materialDescription", e.target.value)
                }
                placeholder="Descrição do componente material"
              />
            </div>

            <label className="full-field">
              Descrição
              <textarea
                value={spellDraft.description}
                onChange={(e) =>
                  handleSpellDraftChange("description", e.target.value)
                }
                placeholder="Descrição completa da magia..."
              />
            </label>

            <label className="full-field">
              Em Níveis Superiores
              <textarea
                value={spellDraft.higherLevels}
                onChange={(e) =>
                  handleSpellDraftChange("higherLevels", e.target.value)
                }
                placeholder="O que muda quando conjurada com espaço maior..."
              />
            </label>

            <label className="full-field">
              Notas
              <textarea
                value={spellDraft.notes}
                onChange={(e) => handleSpellDraftChange("notes", e.target.value)}
                placeholder="Observações rápidas..."
              />
            </label>

            <div className="modal-actions">
              <button className="secondary-btn" onClick={fecharModal}>
                Cancelar
              </button>

              {editMode && (
                <button className="add-btn" onClick={salvarMagia}>
                  Salvar Magia
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AtaquesMagiasSection