"use client"

import { useState, useEffect } from "react"
import "./styles/FichaHeader.css"

const FichaHeader = ({
  characterImage,
  characterName,
  characterBasic,
  hp = { current: 0, max: 0, temp: 0 },
  deathSaves = { successes: 0, failures: 0 },
  ac,
  passivePerception,
  speed,
  attributes,
  onEditToggle,
  editMode,
  saving,
  onSave,
}) => {
  const [showDamageModal, setShowDamageModal] = useState(false)
  const [damageValue, setDamageValue] = useState(0)
  const [imageUrl, setImageUrl] = useState(characterImage || "")
  const [isEditingImage, setIsEditingImage] = useState(false)
  const [hpFields, setHpFields] = useState({
    current: String(hp.current || 0),
    max: String(hp.max || 1),
    temp: String(Math.max(0, hp.temp || 0)),
  })

  const hpCurrent = hp.current || 0
  const hpMax = hp.max || 0
  const hpTemp = hp.temp || 0

  useEffect(() => {
    setHpFields({
      current: String(hpCurrent),
      max: String(hpMax || 1),
      temp: String(Math.max(0, hpTemp)),
    })
  }, [hpCurrent, hpMax, hpTemp])

  const calcModificador = (valor) => Math.floor((valor - 10) / 2)
  const calcPassivePerception = () => {
    if (!attributes?.wis?.score) return 10
    return 10 + calcModificador(attributes.wis.score)
  }

  const handleDamage = (isDamage = true) => {
    if (!editMode) return
    const value = parseInt(damageValue) || 0
    let newCurrent = hpCurrent
    let newTemp = hpTemp

    if (isDamage) {
      const damageRemaining = Math.max(0, value - newTemp)
      newTemp = Math.max(0, newTemp - value)
      newCurrent = newCurrent - damageRemaining
    } else {
      newCurrent = Math.min(hpMax, newCurrent + value)
    }

    onSave({ hp: { ...hp, current: newCurrent, temp: newTemp } })
    setDamageValue(0)
    setShowDamageModal(false)
  }

  const handleImageSave = () => {
    if (editMode && onSave) {
      onSave({ characterImage: imageUrl })
      setIsEditingImage(false)
    }
  }

  const handleHpFieldChange = (field, value) => {
    setHpFields((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveHpFields = () => {
    if (!editMode || !onSave) return

    const rawCurrent = Number(hpFields.current)
    const rawMax = Number(hpFields.max)
    const rawTemp = Number(hpFields.temp)

    const newMax = Math.max(1, Number.isNaN(rawMax) ? 1 : rawMax)
    const newTemp = Math.max(0, Number.isNaN(rawTemp) ? 0 : rawTemp)
    const newCurrent = Number.isNaN(rawCurrent) ? hpCurrent : rawCurrent

    onSave({
      hp: {
        ...hp,
        current: newCurrent,
        max: newMax,
        temp: newTemp,
      },
    })
    setShowDamageModal(false)
  }

  const toggleDeathSave = (type) => {
    if (!editMode || !onSave) return

    const currentValue = deathSaves[type] || 0
    const maxValue = 3
    const newValue = currentValue >= maxValue ? 0 : currentValue + 1

    onSave({
      deathSaves: {
        ...deathSaves,
        [type]: newValue,
      },
    })
  }

  const displayPassivePerception = passivePerception || calcPassivePerception()
  const displaySpeed = speed?.walk || 9

  return (
    <div className="ficha-header">
      <button className="edit-button" onClick={onEditToggle}>
        <span className="edit-icon">📝</span>
        {editMode ? (saving ? "Salvando..." : "Salvar") : "Editar"}
      </button>

      <div className="header-content">
        {/* Esquerda: Foto e info básica */}
        <div className="header-left">
          <div className="portrait-section">
            <div className="portrait-placeholder">
              {characterImage ? (
                <img src={characterImage} alt={characterName} />
              ) : (
                <span className="portrait-icon">👤</span>
              )}
            </div>

            {editMode && (
              <div className="portrait-edit">
                {!isEditingImage ? (
                  <button className="portrait-edit-btn" onClick={() => setIsEditingImage(true)}>
                    Alterar
                  </button>
                ) : (
                  <div className="portrait-url-input">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="URL da imagem"
                    />
                    <button onClick={handleImageSave} className="confirm-btn">
                      ✓
                    </button>
                    <button onClick={() => setIsEditingImage(false)} className="cancel-btn">
                      ✕
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="character-info">
            <h1>{characterName}</h1>
            <p className="character-basic">{characterBasic}</p>
          </div>
        </div>

        {/* Direita: PV e derivados */}
        <div className="header-right">
          <div className="pv-display">
            <button className="pv-clickable" onClick={() => editMode && setShowDamageModal(true)}>
              <div className="pv-label">PV</div>
              <div className="pv-main">
                {hpCurrent}/{hpMax}
              </div>
              {hpTemp > 0 && <div className="pv-temp">+{hpTemp}</div>}
            </button>
          </div>

          <div className="quick-stats">
            <div className="stat-box">
              <div className="stat-label">CA</div>
              <div className="stat-value">{ac || 10}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Perc.</div>
              <div className="stat-value">{displayPassivePerception}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Deloc.</div>
              <div className="stat-value">{displaySpeed}m</div>
            </div>
          </div>

          <div className="death-saves-container">
            <div className="death-saves-label">Testes de Morte</div>
            <div className="death-saves-line">
              {[0, 1, 2].map((index) => (
                <button
                  key={`success-${index}`}
                  className={`death-save-dot success ${index < (deathSaves.successes || 0) ? "filled" : ""}`}
                  onClick={() => editMode && toggleDeathSave("successes")}
                  disabled={!editMode}
                />
              ))}
              <div className="death-save-divider" />
              {[0, 1, 2].map((index) => (
                <button
                  key={`failure-${index}`}
                  className={`death-save-dot failure ${index < (deathSaves.failures || 0) ? "filled" : ""}`}
                  onClick={() => editMode && toggleDeathSave("failures")}
                  disabled={!editMode}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Dano/Cura */}
      {showDamageModal && editMode && (
        <div className="damage-modal-overlay" onClick={() => setShowDamageModal(false)}>
          <div className="damage-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Alterar Pontos de Vida</h3>
            <div className="modal-grid">
              <div className="modal-field">
                <label>PV Atual</label>
                <input
                  type="number"
                  value={hpFields.current}
                  onChange={(e) => handleHpFieldChange("current", e.target.value)}
                />
              </div>
              <div className="modal-field">
                <label>PV Máximo</label>
                <input
                  type="number"
                  min="1"
                  value={hpFields.max}
                  onChange={(e) => handleHpFieldChange("max", e.target.value)}
                />
              </div>
              <div className="modal-field">
                <label>PV Temporário</label>
                <input
                  type="number"
                  min="0"
                  value={hpFields.temp}
                  onChange={(e) => handleHpFieldChange("temp", e.target.value)}
                />
              </div>
            </div>
            <div className="modal-row">
              <label>Valor</label>
              <input
                type="number"
                value={damageValue}
                onChange={(e) => setDamageValue(e.target.value)}
                placeholder="Dano / Cura"
              />
            </div>
            <div className="modal-buttons">
              <button className="modal-heal" onClick={() => handleDamage(false)}>
                Curar
              </button>
              <button className="modal-damage" onClick={() => handleDamage(true)}>
                Dano
              </button>
            </div>
            <div className="modal-actions">
              <button className="modal-secondary" onClick={handleSaveHpFields}>
                Salvar valores
              </button>
              <button
                className="modal-secondary"
                onClick={() => onSave({ hp: { ...hp, current: 0, max: hpMax || 1, temp: hpTemp } })}
              >
                Zerar PV
              </button>
              <button
                className="modal-secondary"
                onClick={() => onSave({ hp: { ...hp, current: hpMax || 1, max: hpMax || 1, temp: hpTemp } })}
              >
                Recuperação total
              </button>
            </div>
            <button className="modal-close" onClick={() => setShowDamageModal(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FichaHeader