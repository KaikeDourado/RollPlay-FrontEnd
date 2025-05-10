"use client"

import { useState } from "react"
import "./styles/InventarioSection.css"

const InventarioSection = ({ inventario, editMode, onSave }) => {
  const [novoItem, setNovoItem] = useState({ nome: "", quantidade: 1, peso: 0 })

  const calcularPesoTotal = () => {
    return inventario.reduce((total, item) => total + item.peso * item.quantidade, 0)
  }

  const handleAddItem = () => {
    if (novoItem.nome) {
      const updatedInventario = [
        ...inventario,
        {
          ...novoItem,
          quantidade: Number.parseInt(novoItem.quantidade) || 1,
          peso: Number.parseFloat(novoItem.peso) || 0,
        },
      ]
      onSave(updatedInventario)
      setNovoItem({ nome: "", quantidade: 1, peso: 0 })
    }
  }

  const handleRemoveItem = (index) => {
    const updatedInventario = inventario.filter((_, i) => i !== index)
    onSave(updatedInventario)
  }

  const handleItemChange = (e) => {
    const { name, value } = e.target
    setNovoItem({ ...novoItem, [name]: value })
  }

  const handleQuantidadeChange = (index, newQuantidade) => {
    if (editMode) {
      const updatedInventario = [...inventario]
      updatedInventario[index].quantidade = Number.parseInt(newQuantidade) || 1
      onSave(updatedInventario)
    }
  }

  return (
    <div className="section-card inventario-section">
      <div className="section-header">
        <span className="section-icon">🎒</span>
        <h2>Inventário</h2>
      </div>

      <div className="inventario-summary">
        <div className="peso-total">
          <span>Peso Total: </span>
          <span className="peso-valor">{calcularPesoTotal().toFixed(1)} kg</span>
        </div>
        <div className="moedas">
          <div className="moeda">
            <span className="moeda-icon">🥇</span>
            <span className="moeda-label">PO: </span>
            <span className="moeda-valor">75</span>
          </div>
          <div className="moeda">
            <span className="moeda-icon">🥈</span>
            <span className="moeda-label">PP: </span>
            <span className="moeda-valor">32</span>
          </div>
          <div className="moeda">
            <span className="moeda-icon">🥉</span>
            <span className="moeda-label">PC: </span>
            <span className="moeda-valor">15</span>
          </div>
        </div>
      </div>

      <div className="inventario-list">
        <table className="inventario-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qtd</th>
              <th>Peso</th>
              {editMode && <th>Ações</th>}
            </tr>
          </thead>
          <tbody>
            {inventario.map((item, index) => (
              <tr key={index}>
                <td>{item.nome}</td>
                <td>
                  {editMode ? (
                    <input
                      type="number"
                      value={item.quantidade}
                      min="1"
                      onChange={(e) => handleQuantidadeChange(index, e.target.value)}
                      className="quantidade-input"
                    />
                  ) : (
                    item.quantidade
                  )}
                </td>
                <td>{item.peso} kg</td>
                {editMode && (
                  <td>
                    <button className="remove-btn" onClick={() => handleRemoveItem(index)}>
                      ✕
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editMode && (
        <div className="add-item-form">
          <h3>Adicionar Item</h3>
          <div className="form-row">
            <input
              type="text"
              name="nome"
              placeholder="Nome do Item"
              value={novoItem.nome}
              onChange={handleItemChange}
            />
            <input
              type="number"
              name="quantidade"
              placeholder="Qtd"
              value={novoItem.quantidade}
              onChange={handleItemChange}
              min="1"
            />
            <input
              type="number"
              name="peso"
              placeholder="Peso (kg)"
              value={novoItem.peso}
              onChange={handleItemChange}
              step="0.1"
              min="0"
            />
            <button className="add-btn" onClick={handleAddItem}>
              Adicionar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default InventarioSection
