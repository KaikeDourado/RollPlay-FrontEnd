"use client"

import { useState } from "react"
import "./styles/InventarioSection.css"

const InventarioSection = ({ inventario, editMode, onSave }) => {

  const equipment = inventario?.equipment || []
  const coins = inventario?.coins || {
    cp: 0,
    sp: 0,
    ep: 0,
    gp: 0,
    pp: 0,
  }

  const [novoItem, setNovoItem] = useState({
    name: "",
    quantity: 1,
    weight: 0,
    description: "",
  })

  const calcularPesoTotal = () => {
    return equipment.reduce(
      (total, item) =>
        total + (item.weight || 0) * (item.quantity || 0),
      0
    )
  }

  const handleAddItem = () => {
    if (novoItem.name.trim() !== "") {

      const updatedInventory = {
        ...inventario,

        equipment: [
          ...equipment,
          {
            ...novoItem,
            quantity: Number.parseInt(novoItem.quantity) || 1,
            weight: Number.parseFloat(novoItem.weight) || 0,
          },
        ],
      }

      onSave(updatedInventory)

      setNovoItem({
        name: "",
        quantity: 1,
        weight: 0,
        description: "",
      })
    }
  }

  const handleRemoveItem = (index) => {

    const updatedInventory = {
      ...inventario,

      equipment: equipment.filter((_, i) => i !== index),
    }

    onSave(updatedInventory)
  }

  const handleItemChange = (e) => {
    const { name, value } = e.target

    setNovoItem({
      ...novoItem,
      [name]: value,
    })
  }

  const handleQuantidadeChange = (index, newQuantidade) => {

    if (!editMode) return

    const updatedEquipment = [...equipment]

    updatedEquipment[index].quantity =
      Number.parseInt(newQuantidade) || 1

    const updatedInventory = {
      ...inventario,
      equipment: updatedEquipment,
    }

    onSave(updatedInventory)
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

          <span className="peso-valor">
            {calcularPesoTotal().toFixed(1)} kg
          </span>
        </div>

        <div className="moedas">

          <div className="moeda">
            <span className="moeda-icon">🥇</span>
            <span className="moeda-label">PP: </span>
            <span className="moeda-valor">{coins.pp}</span>
          </div>

          <div className="moeda">
            <span className="moeda-icon">🟡</span>
            <span className="moeda-label">PO: </span>
            <span className="moeda-valor">{coins.gp}</span>
          </div>

          <div className="moeda">
            <span className="moeda-icon">⚪</span>
            <span className="moeda-label">PE: </span>
            <span className="moeda-valor">{coins.ep}</span>
          </div>

          <div className="moeda">
            <span className="moeda-icon">🥈</span>
            <span className="moeda-label">PP: </span>
            <span className="moeda-valor">{coins.sp}</span>
          </div>

          <div className="moeda">
            <span className="moeda-icon">🥉</span>
            <span className="moeda-label">PC: </span>
            <span className="moeda-valor">{coins.cp}</span>
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

            {equipment.length === 0 ? (
              <tr>
                <td colSpan={editMode ? 4 : 3}>
                  Nenhum item no inventário.
                </td>
              </tr>
            ) : (
              equipment.map((item, index) => (
                <tr key={index}>

                  <td>{item?.name}</td>

                  <td>
                    {editMode ? (
                      <input
                        type="number"
                        value={item?.quantity || 1}
                        min="1"
                        onChange={(e) =>
                          handleQuantidadeChange(
                            index,
                            e.target.value
                          )
                        }
                        className="quantidade-input"
                      />
                    ) : (
                      item?.quantity
                    )}
                  </td>

                  <td>{item?.weight || 0} kg</td>

                  {editMode && (
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveItem(index)}
                      >
                        ✕
                      </button>
                    </td>
                  )}

                </tr>
              ))
            )}

          </tbody>
        </table>
      </div>

      {editMode && (
        <div className="add-item-form">

          <h3>Adicionar Item</h3>

          <div className="form-row">

            <input
              type="text"
              name="name"
              placeholder="Nome do Item"
              value={novoItem.name}
              onChange={handleItemChange}
            />

            <input
              type="number"
              name="quantity"
              placeholder="Qtd"
              value={novoItem.quantity}
              onChange={handleItemChange}
              min="1"
            />

            <input
              type="number"
              name="weight"
              placeholder="Peso (kg)"
              value={novoItem.weight}
              onChange={handleItemChange}
              step="0.1"
              min="0"
            />

            <input
              type="text"
              name="description"
              placeholder="Descrição"
              value={novoItem.description}
              onChange={handleItemChange}
            />

            <button
              className="add-btn"
              onClick={handleAddItem}
            >
              Adicionar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default InventarioSection