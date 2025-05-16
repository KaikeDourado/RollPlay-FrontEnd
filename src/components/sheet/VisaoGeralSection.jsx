"use client"

import "./styles/VisaoGeralSection.css"

const VisaoGeralSection = ({ data, atributos, editMode, onSave }) => {
  const handleChange = (e) => {
    if (editMode) {
      const { name, value } = e.target
      const updatedData = { ...data, [name]: value }
      onSave(updatedData)
    }
  }

  const toggleInspiracao = () => {
    const updatedData = { ...data, inspiracao: !data.inspiracao }
    onSave(updatedData)
  }

  const calcModificador = (valor) => {
    return Math.floor((valor - 10) / 2)
  }

  const formatModificador = (mod) => {
    return mod >= 0 ? `+${mod}` : `${mod}`
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
              <input type="text" name="nome" value={data.nome} onChange={handleChange} />
            ) : (
              <div className="info-value">{data.nome}</div>
            )}
          </div>

          <div className="info-group">
            <label>Raça</label>
            {editMode ? (
              <input type="text" name="raca" value={data.raca} onChange={handleChange} />
            ) : (
              <div className="info-value">{data.raca}</div>
            )}
          </div>

          <div className="info-group">
            <label>Classe</label>
            {editMode ? (
              <input type="text" name="classe" value={data.classe} onChange={handleChange} />
            ) : (
              <div className="info-value">{data.classe}</div>
            )}
          </div>

          <div className="info-group">
            <label>Nível</label>
            {editMode ? (
              <input type="number" name="nivel" value={data.nivel} onChange={handleChange} />
            ) : (
              <div className="info-value">{data.nivel}</div>
            )}
          </div>

          <div className="info-group">
            <label>Alinhamento</label>
            {editMode ? (
              <input type="text" name="alinhamento" value={data.alinhamento} onChange={handleChange} />
            ) : (
              <div className="info-value">{data.alinhamento}</div>
            )}
          </div>

          <div className="info-group">
            <label>Experiência</label>
            {editMode ? (
              <input type="number" name="experiencia" value={data.experiencia} onChange={handleChange} />
            ) : (
              <div className="info-value">{data.experiencia}</div>
            )}
          </div>

          <div className="info-group">
            <label>Antecedente</label>
            {editMode ? (
              <input type="text" name="antecedente" value={data.antecedente} onChange={handleChange} />
            ) : (
              <div className="info-value">{data.antecedente}</div>
            )}
          </div>
        </div>

        {/* Checkbox de Inspiração */}
        <div className="inspiracao-container">
          <label>Inspiração</label>
          <button
            className={`inspiracao-button ${data.inspiracao ? "inspirado" : ""}`}
            onClick={toggleInspiracao}
          >
            {data.inspiracao ? "☀️" : ""}
          </button>
        </div>

        <div className="atributos-derivados">
          <div className="derivado-card">
            <div className="derivado-label">Classe de Armadura</div>
            <div className="derivado-valor">{10 + calcModificador(data.atributos.destreza)}</div>
          </div>

          <div className="derivado-card">
            <div className="derivado-label">Iniciativa</div>
            <div className="derivado-valor">{formatModificador(calcModificador(data.atributos.destreza))}</div>
          </div>

          <div className="derivado-card">
            <div className="derivado-label">Deslocamento</div>
            <div className="derivado-valor">9m</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisaoGeralSection
