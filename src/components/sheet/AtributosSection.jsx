"use client"

import "./styles/AtributosSection.css"

const AtributosSection = ({ atributos, pericias, nivel, editMode, onSaveAtributos, onSavePericias }) => {
  const calcModificador = (valor) => {
    return Math.floor((valor - 10) / 2)
  }

  const formatModificador = (mod) => {
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  const calcBonusProficiencia = (nivel) => {
    return Math.floor((nivel - 1) / 4) + 2
  }

  const handleChangeAtributos = (e) => {
    if (editMode) {
      const { name, value } = e.target
      const updatedAtributos = { ...atributos, [name]: Number.parseInt(value) || 0 }
      onSaveAtributos(updatedAtributos)
    }
  }

  const handleToggleProficiencia = (pericia) => {
    if (editMode) {
      const updatedPericias = {
        ...pericias,
        [pericia]: !pericias[pericia],
      }
      onSavePericias(updatedPericias)
    }
  }

  const atributosLabels = {
    forca: { nome: "Força", abrev: "FOR" },
    destreza: { nome: "Destreza", abrev: "DES" },
    constituicao: { nome: "Constituição", abrev: "CON" },
    inteligencia: { nome: "Inteligência", abrev: "INT" },
    sabedoria: { nome: "Sabedoria", abrev: "SAB" },
    carisma: { nome: "Carisma", abrev: "CAR" },
  }

  const periciasInfo = [
    { id: "acrobacia", nome: "Acrobacia", atributo: "destreza" },
    { id: "arcanismo", nome: "Arcanismo", atributo: "inteligencia" },
    { id: "atletismo", nome: "Atletismo", atributo: "forca" },
    { id: "atuacao", nome: "Atuação", atributo: "carisma" },
    { id: "enganacao", nome: "Enganação", atributo: "carisma" },
    { id: "furtividade", nome: "Furtividade", atributo: "destreza" },
    { id: "historia", nome: "História", atributo: "inteligencia" },
    { id: "intimidacao", nome: "Intimidação", atributo: "carisma" },
    { id: "intuicao", nome: "Intuição", atributo: "sabedoria" },
    { id: "investigacao", nome: "Investigação", atributo: "inteligencia" },
    { id: "lidarComAnimais", nome: "Lidar com Animais", atributo: "sabedoria" },
    { id: "medicina", nome: "Medicina", atributo: "sabedoria" },
    { id: "natureza", nome: "Natureza", atributo: "inteligencia" },
    { id: "percepcao", nome: "Percepção", atributo: "sabedoria" },
    { id: "persuasao", nome: "Persuasão", atributo: "carisma" },
    { id: "prestidigitacao", nome: "Prestidigitação", atributo: "destreza" },
    { id: "religiao", nome: "Religião", atributo: "inteligencia" },
    { id: "sobrevivencia", nome: "Sobrevivência", atributo: "sabedoria" },
  ]

  const bonusProficiencia = calcBonusProficiencia(nivel)

  const calcBonusPericia = (pericia) => {
    const info = periciasInfo.find((p) => p.id === pericia)
    const modAtributo = calcModificador(atributos[info.atributo])

    if (pericias[pericia]) {
      return modAtributo + bonusProficiencia
    }

    return modAtributo
  }

  return (
    <div className="section-card atributos-section">
      <div className="section-header">
        <span className="section-icon">💪</span>
        <h2>Atributos</h2>
      </div>

      <div className="atributos-grid">
        {Object.entries(atributosLabels).map(([key, { nome, abrev }]) => (
          <div key={key} className="atributo-card">
            <div className="atributo-header">{abrev}</div>
            <div className="atributo-nome">{nome}</div>

            <div className="atributo-valor">
              {editMode ? (
                <input type="number" name={key} value={atributos[key]} onChange={handleChangeAtributos} min="1" max="30" />
              ) : (
                atributos[key]
              )}
            </div>

            <div className="atributo-modificador">{formatModificador(calcModificador(atributos[key]))}</div>
          </div>
        ))}
      </div>

      <div className="section-header">
        <span className="section-icon">🎯</span>
        <h2>Perícias e Proficiências</h2>
      </div>

      <div className="bonus-proficiencia">
        <span>Bônus de Proficiência: </span>
        <span className="bonus-valor">{formatModificador(bonusProficiencia)}</span>
      </div>

      <div className="pericias-list">
        {periciasInfo.map((pericia) => (
          <div
            key={pericia.id}
            className={`pericia-item ${pericias[pericia.id] ? "proficiente" : ""}`}
            onClick={() => handleToggleProficiencia(pericia.id)}
          >
            <div className="pericia-proficiente">{pericias[pericia.id] ? "●" : "○"}</div>
            <div className="pericia-bonus">{formatModificador(calcBonusPericia(pericia.id))}</div>
            <div className="pericia-nome">{pericia.nome}</div>
            <div className="pericia-atributo">
              (
              {periciasInfo
                .find((p) => p.id === pericia.id)
                .atributo.substring(0, 3)
                .toUpperCase()}
              )
            </div>
          </div>
        ))}
      </div>

      <div className="outras-proficiencias">
        <h3>Outras Proficiências e Idiomas</h3>
        <div className="proficiencias-content">
          {editMode ? (
            <textarea
              placeholder="Adicione outras proficiências e idiomas aqui..."
              defaultValue="Idiomas: Comum, Anão
Armas: Simples, Marciais
Armaduras: Todas as armaduras e escudos
Ferramentas: Ferramentas de ferreiro"
            />
          ) : (
            <div className="proficiencias-text">
              <p>
                <strong>Idiomas:</strong> Comum, Anão
              </p>
              <p>
                <strong>Armas:</strong> Simples, Marciais
              </p>
              <p>
                <strong>Armaduras:</strong> Todas as armaduras e escudos
              </p>
              <p>
                <strong>Ferramentas:</strong> Ferramentas de ferreiro
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AtributosSection
