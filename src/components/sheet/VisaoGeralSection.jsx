"use client"

import "./styles/VisaoGeralSection.css"

const VisaoGeralSection = ({ data, editMode, onSave }) => {
  const handleChange = (e) => {
    if (editMode) {
      const { name, value } = e.target
      const updatedData = { ...data, [name]: value }
      onSave(updatedData)
    }
  }

  return (
    <div className="section-card visao-geral-section">
      <div className="section-header">
        <span className="section-icon">📋</span>
        <h2>Visão Geral</h2>
      </div>

      <div className="visao-geral-content"> {/* NOVO container com grid */}
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
        </div>
      </div>
    </div>
  )
}

export default VisaoGeralSection
