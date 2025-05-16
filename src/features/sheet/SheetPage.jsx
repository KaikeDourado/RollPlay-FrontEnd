import { useState } from "react"
import FichaHeader from "@/components/sheet/FichaHeader"
import VisaoGeralSection from "@/components/sheet/VisaoGeralSection"
import AtributosSection from "@/components/sheet/AtributosSection"
import PericiasProficienciasSection from "@/components/sheet/PericiasProficienciasSection"
import AtaquesMagiasSection from "@/components/sheet/AtaquesMagiasSection"
import InventarioSection from "@/components/sheet/InventarioSection"
import HabilidadesSection from "@/components/sheet/HabilidadesSection"
import PersonalidadeSection from "@/components/sheet/PersonalidadeSection"
import AnotacoesSection from "@/components/sheet/AnotacoesSection"
import Navbar from "@/components/global/Navbar";
import "./styles/SheetPage.css"

const FichaPage = () => {
  const [editMode, setEditMode] = useState(false)
  const [activeTab, setActiveTab] = useState("visao-geral")
  const [mobileTabsOpen, setMobileTabsOpen] = useState(false)

  // Dados do personagem (em uma aplicação real, viriam de uma API ou estado global)
  const [characterData, setCharacterData] = useState({
    nome: "Thorin Escudo de Carvalho",
    raca: "Anão da Montanha",
    classe: "Guerreiro",
    nivel: 5,
    alinhamento: "Leal e Bom",
    experiencia: 6500,
    antecedente: "Soldado",
    inspiration: true,
    pvTotal: 45,
    pvAtual: 45,
    pvTemp: 0,
    atributos: {
      forca: 16,
      destreza: 12,
      constituicao: 18,
      inteligencia: 10,
      sabedoria: 14,
      carisma: 8,
    },
    pericias: {
      acrobacia: false,
      arcanismo: false,
      atletismo: true,
      atuacao: false,
      enganacao: false,
      furtividade: false,
      historia: true,
      intimidacao: true,
      intuicao: false,
      investigacao: false,
      lidarComAnimais: false,
      medicina: false,
      natureza: false,
      percepcao: true,
      persuasao: false,
      prestidigitacao: false,
      religiao: false,
      sobrevivencia: true,
    },
    ataques: [
      { nome: "Machado de Batalha", bonus: "+6", dano: "1d8+3", tipo: "Cortante" },
      { nome: "Besta Leve", bonus: "+4", dano: "1d8+1", tipo: "Perfurante" },
    ],
    magias: [],
    inventario: [
      { nome: "Machado de Batalha", quantidade: 1, peso: 4 },
      { nome: "Besta Leve", quantidade: 1, peso: 5 },
      { nome: "Virotes", quantidade: 20, peso: 1.5 },
      { nome: "Cota de Malha", quantidade: 1, peso: 55 },
      { nome: "Mochila", quantidade: 1, peso: 5 },
      { nome: "Rações", quantidade: 10, peso: 20 },
      { nome: "Cantil", quantidade: 1, peso: 5 },
      { nome: "Pederneira", quantidade: 1, peso: 0 },
      { nome: "Tocha", quantidade: 10, peso: 10 },
      { nome: "Poções de Cura", quantidade: 3, peso: 1.5 },
    ],
    habilidades: [
      {
        nome: "Resistência Anã",
        descricao: "Vantagem em salvaguardas contra veneno e resistência contra dano de veneno.",
      },
      { nome: "Visão no Escuro", descricao: "Você pode ver na escuridão até 18 metros." },
      { nome: "Treinamento em Combate", descricao: "Você tem proficiência com armas marciais." },
      { nome: "Segunda Investida", descricao: "Você pode atacar duas vezes quando usa a ação Atacar no seu turno." },
    ],
    personalidade: {
      tracos: "Humilde e determinado, Thorin é um líder natural que inspira seus companheiros.",
      ideais: "Querer recuperar o tesouro de sua família e restaurar a honra dos anões.",
      ligacoes: "Meu irmão, Fili, é meu maior aliado e amigo. Juntos, enfrentamos qualquer desafio.",
      defeitos: "Sou teimoso e muitas vezes não confio em estranhos. Isso pode me levar a problemas.",
      historia: "Nasci em uma pequena aldeia anã nas Montanhas Sombrias. Desde jovem, fui ensinado a lutar e a valorizar a honra da minha família. Após o ataque do dragão Smaug, minha vida mudou para sempre. Agora, busco recuperar o tesouro perdido e restaurar a glória dos anões.",
    },
    anotacoes:
      "Thorin é um guerreiro anão que busca recuperar o tesouro de sua família que foi roubado por um dragão. Ele é teimoso e desconfiado de estranhos, mas extremamente leal aos seus companheiros.",
  })

  const handleEditToggle = () => {
    setEditMode(!editMode)
  }

  const handleSaveCharacter = (updatedData) => {
    setCharacterData({ ...characterData, ...updatedData })
  }

  const tabs = [
    { id: "visao-geral", label: "Visão Geral", icon: "📋" },
    { id: "atributos", label: "Atributos", icon: "💪" },
    { id: "pericias", label: "Perícias", icon: "🎯" },
    { id: "ataques-magias", label: "Ataques & Magias", icon: "⚔️" },
    { id: "inventario", label: "Inventário", icon: "🎒" },
    { id: "habilidades", label: "Habilidades", icon: "✨" },
    { id: "personalidade", label: "Traços & Origem", icon: "🎭" },
    { id: "anotacoes", label: "Anotações", icon: "📝" },
  ]

  return (
    <div className="ficha-page">
      <Navbar />

      <FichaHeader
        characterName={characterData.nome}
        characterClass={`${characterData.raca} ${characterData.classe} ${characterData.nivel}`}
        pvAtual={characterData.pvAtual}
        pvTotal={characterData.pvTotal}
        pvTemp={characterData.pvTemp}
        onEditToggle={handleEditToggle}
        editMode={editMode}
      />

      {/* Tabs Desktop */}
      <div className="ficha-tabs desktop-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* FAB Menu (Mobile Only) */}
      <div className={`fab-container ${mobileTabsOpen ? "open" : ""}`}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className="fab-item"
            style={{ transitionDelay: `${index * 50}ms` }}
            onClick={() => {
              setActiveTab(tab.id)
              setMobileTabsOpen(false)
            }}
          >
            <span className="fab-icon">{tab.icon}</span>
            <span className="fab-label">{tab.label}</span>
          </button>
        ))}

        <button
          className="fab-toggle"
          onClick={() => setMobileTabsOpen(!mobileTabsOpen)}
        >
          ☰
        </button>
      </div>

      <div className="ficha-content">
        {activeTab === "visao-geral" && (
          <VisaoGeralSection data={characterData} editMode={editMode} onSave={handleSaveCharacter} />
        )}

        {activeTab === "atributos" && (
          <AtributosSection
            atributos={characterData.atributos}
            pericias={characterData.pericias}
            nivel={characterData.nivel}
            editMode={editMode}
            onSaveAtributos={(atributos) => handleSaveCharacter({ atributos })}
            onSavePericias={(pericias) => handleSaveCharacter({ pericias })}
          />
        )}

        {activeTab === "pericias" && (
          <PericiasProficienciasSection
            pericias={characterData.pericias}
            atributos={characterData.atributos}
            nivel={characterData.nivel}
            editMode={editMode}
            onSave={(pericias) => handleSaveCharacter({ pericias })}
          />
        )}

        {activeTab === "ataques-magias" && (
          <AtaquesMagiasSection
            ataques={characterData.ataques}
            magias={characterData.magias}
            editMode={editMode}
            onSave={(data) => handleSaveCharacter(data)}
          />
        )}

        {activeTab === "inventario" && (
          <InventarioSection
            inventario={characterData.inventario}
            editMode={editMode}
            onSave={(inventario) => handleSaveCharacter({ inventario })}
          />
        )}

        {activeTab === "habilidades" && (
          <HabilidadesSection
            habilidades={characterData.habilidades}
            editMode={editMode}
            onSave={(habilidades) => handleSaveCharacter({ habilidades })}
          />
        )}

        {activeTab === "personalidade" && (
          <PersonalidadeSection
            personalidade={characterData.personalidade}
            editMode={editMode}
            onSave={(personalidade) => handleSaveCharacter({ personalidade })}
          />
        )}

        {activeTab === "anotacoes" && (
          <AnotacoesSection
            anotacoes={characterData.anotacoes}
            editMode={editMode}
            onSave={(anotacoes) => handleSaveCharacter({ anotacoes })}
          />
        )}
      </div>
    </div>
  )
}

export default FichaPage
