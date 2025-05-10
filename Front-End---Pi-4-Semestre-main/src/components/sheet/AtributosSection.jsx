"use client"

import "./styles/AtributosSection.css"

const AtributosSection = ({ atributos, editMode, onSave }) => {
  const calcModificador = (valor) => {
    return Math.floor((valor - 10) / 2)
  }

  const formatModificador = (mod) => {
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  const handleChange = (e) => {
    if (editMode) {
      const { name, value } = e.target
      const updatedAtributos = { ...atributos, [name]: Number.parseInt(value) || 0 }
      onSave(updatedAtributos)
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
                <input type="number" name={key} value={atributos[key]} onChange={handleChange} min="1" max="30" />
              ) : (
                atributos[key]
              )}
            </div>

            <div className="atributo-modificador">{formatModificador(calcModificador(atributos[key]))}</div>
          </div>
        ))}
      </div>

      <div className="atributos-derivados">
        <div className="derivado-card">
          <div className="derivado-label">Classe de Armadura</div>
          <div className="derivado-valor">{10 + calcModificador(atributos.destreza)}</div>
        </div>

        <div className="derivado-card">
          <div className="derivado-label">Iniciativa</div>
          <div className="derivado-valor">{formatModificador(calcModificador(atributos.destreza))}</div>
        </div>

        <div className="derivado-card">
          <div className="derivado-label">Deslocamento</div>
          <div className="derivado-valor">9m</div>
        </div>
      </div>
    </div>
  )
}

export default AtributosSection
