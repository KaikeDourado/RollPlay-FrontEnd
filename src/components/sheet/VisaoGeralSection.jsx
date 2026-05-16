"use client"

import "./styles/VisaoGeralSection.css"

const VisaoGeralSection = ({ data, attributes, editMode, onSave }) => {
  const handleChange = (e) => {
    if (editMode) {
      const { name, value } = e.target
      const updatedData = { ...data, [name]: value }
      onSave(updatedData)
    }
  }

  const handleChangeLanguages = (e) => {
    if (editMode) {
      const languages = e.target.value.split(",").map((lang) => lang.trim())
      onSave({ languages })
    }
  }

  const toggleInspiracao = () => {
    if (!editMode) return
    const updatedData = { ...data, inspirationHeroica: !data.inspirationHeroica }
    onSave(updatedData)
  }

  const calcModificador = (valor) => {
    return Math.floor((valor - 10) / 2)
  }

  const formatModificador = (mod) => {
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  const calcProficiencyBonus = () => {
    return Math.floor(((Number(data.level) || 1) - 1) / 4) + 2
  }

  const calcPassivePerception = () => {
    const wisdomMod = calcModificador(data.attributes?.wis?.score || 10)
    return 10 + wisdomMod
  }

  return (
    <div className="section-card visao-geral-section">
      <div className="section-header">
        <span className="section-icon">📋</span>
        <h2>Visão Geral</h2>
      </div>

      <div className="visao-geral-content">
        <div className="visao-geral-grid">
          <div className="info-group">
            <label>Nome</label>
            {editMode ? (
              <input type="text" name="name" value={data.name} onChange={handleChange} />
            ) : (
              <div className="info-value">{data.name}</div>
            )}
          </div>

          <div className="info-group">
            <label>Raça</label>
            {editMode ? (
              <input type="text" name="race" value={data.race} onChange={handleChange} />
            ) : (
              <div className="info-value">{data.race}</div>
            )}
          </div>

          <div className="info-group">
            <label>Classe</label>
            {editMode ? (
              <input type="text" name="characterClass" value={data.characterClass} onChange={handleChange} />
            ) : (
              <div className="info-value">{data.characterClass}</div>
            )}
          </div>

          <div className="info-group">
            <label>Nível</label>
            {editMode ? (
              <input type="number" name="level" value={data.level} onChange={handleChange} />
            ) : (
              <div className="info-value">{data.level}</div>
            )}
          </div>

          <div className="info-group">
            <label>Alinhamento</label>
            {editMode ? (
              <input type="text" name="alignment" value={data.alignment} onChange={handleChange} />
            ) : (
              <div className="info-value">{data.alignment}</div>
            )}
          </div>

          <div className="info-group">
            <label>Experiência</label>
            {editMode ? (
              <input type="number" name="xp" value={data.xp} onChange={handleChange} />
            ) : (
              <div className="info-value">{data.xp}</div>
            )}
          </div>

          <div className="info-group">
            <label>Antecedente</label>
            {editMode ? (
              <input type="text" name="background" value={data.background} onChange={handleChange} />
            ) : (
              <div className="info-value">{data.background}</div>
            )}
          </div>
        </div>

        {/* Checkbox de Inspiração */}
        <div className="inspiracao-container">
          <label>Inspiração</label>
          <button
            className={`inspiracao-button ${data.inspirationHeroica ? "inspirado" : ""}`}
            onClick={toggleInspiracao}
          >
            {data.inspirationHeroica ? "☀️" : ""}
          </button>
        </div>

        <div className="atributos-derivados">
          <div className="derivado-card">
            <div className="derivado-label">Classe de Armadura</div>
            <div className="derivado-valor">{data.ac?.value || 10}</div>
          </div>

          <div className="derivado-card">
            <div className="derivado-label">Iniciativa</div>
            <div className="derivado-valor">{formatModificador(calcModificador(data.attributes?.dex?.score || 10))}</div>
          </div>

          <div className="derivado-card">
            <div className="derivado-label">Percepção Passiva</div>
            <div className="derivado-valor">{calcPassivePerception()}</div>
          </div>

          <div className="derivado-card">
            <div className="derivado-label">Bônus de Proficiência</div>
            <div className="derivado-valor">{formatModificador(calcProficiencyBonus())}</div>
          </div>

          <div className="derivado-card">
            <div className="derivado-label">Tamanho</div>
            <div className="derivado-valor">{data.size || "Médio"}</div>
          </div>

          <div className="derivado-card">
            <div className="derivado-label">Deslocamento</div>
            <div className="derivado-valor">{data.speed?.walk || 9}m</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisaoGeralSection
