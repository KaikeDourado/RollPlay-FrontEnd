import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FichaHeader from "@/components/sheet/FichaHeader";
import VisaoGeralSection from "@/components/sheet/VisaoGeralSection";
import AtributosSection from "@/components/sheet/AtributosSection";
import PericiasProficienciasSection from "@/components/sheet/PericiasProficienciasSection";
import AtaquesMagiasSection from "@/components/sheet/AtaquesMagiasSection";
import InventarioSection from "@/components/sheet/InventarioSection";
import HabilidadesSection from "@/components/sheet/HabilidadesSection";
import PersonalidadeSection from "@/components/sheet/PersonalidadeSection";
import AnotacoesSection from "@/components/sheet/AnotacoesSection";
import Navbar from "@/components/global/Navbar";
import "./styles/SheetPage.css";

const FichaPage = () => {
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("visao-geral");
  const [mobileTabsOpen, setMobileTabsOpen] = useState(false);
  const [characterData, setCharacterData] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const token =
          localStorage.getItem("authToken") ||
          sessionStorage.getItem("authToken");
        if (!token) return;

        const res = await axios.get(
          `http://localhost:5000/api/character/sheet/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.status === 200 && res.data.result) {
          setCharacterData(res.data.result);
        } else {
          console.error("Erro ao carregar ficha.");
        }
      } catch (err) {
        console.error("Erro na requisição da ficha:", err);
      }
    };

    fetchCharacter();
  }, [id]);

  const handleEditToggle = () => {
    if (editMode) {
      updateCharacterOnServer(characterData);
    }
    setEditMode(!editMode);
  };

  const handleLocalUpdate = (updatedData) => {
    setCharacterData((prev) => ({ ...prev, ...updatedData }));
  };

  const updateCharacterOnServer = async (dataToSend) => {
    try {
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      if (!token) return;

      const payload = {
        id: characterData.id,
        ...dataToSend,
      };

      const res = await axios.put(
        "http://localhost:5000/api/character/update",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200 || res.status === 204) {
        console.log("Ficha atualizada com sucesso.");
        setEditMode(false);
      } else {
        console.warn("Falha ao atualizar ficha.");
      }
    } catch (err) {
      console.error("Erro ao atualizar ficha:", err);
    }
  };

  const tabs = [
    { id: "visao-geral", label: "Visão Geral", icon: "📋" },
    { id: "atributos", label: "Atributos", icon: "💪" },
    { id: "pericias", label: "Perícias", icon: "🎯" },
    { id: "ataques-magias", label: "Ataques & Magias", icon: "⚔️" },
    { id: "inventario", label: "Inventário", icon: "🎒" },
    { id: "habilidades", label: "Habilidades", icon: "✨" },
    { id: "personalidade", label: "Traços & Origem", icon: "🎭" },
    { id: "anotacoes", label: "Anotações", icon: "📝" },
  ];

  if (!characterData) {
    return <div className="ficha-loading">Carregando ficha...</div>;
  }

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

      <div className={`fab-container ${mobileTabsOpen ? "open" : ""}`}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className="fab-item"
            style={{ transitionDelay: `${index * 50}ms` }}
            onClick={() => {
              setActiveTab(tab.id);
              setMobileTabsOpen(false);
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
          <VisaoGeralSection
            data={characterData}
            editMode={editMode}
            onSave={handleLocalUpdate}
          />
        )}

        {activeTab === "atributos" && (
          <AtributosSection
            atributos={characterData.atributos}
            pericias={characterData.pericias}
            nivel={characterData.nivel}
            editMode={editMode}
            onSaveAtributos={(atributos) =>
              handleLocalUpdate({ atributos })
            }
            onSavePericias={(pericias) =>
              handleLocalUpdate({ pericias })
            }
          />
        )}

        {activeTab === "pericias" && (
          <PericiasProficienciasSection
            pericias={characterData.pericias}
            atributos={characterData.atributos}
            nivel={characterData.nivel}
            editMode={editMode}
            onSave={(pericias) => handleLocalUpdate({ pericias })}
          />
        )}

        {activeTab === "ataques-magias" && (
          <AtaquesMagiasSection
            ataques={characterData.ataques}
            magias={characterData.magias}
            editMode={editMode}
            onSave={(data) => handleLocalUpdate(data)}
          />
        )}

        {activeTab === "inventario" && (
          <InventarioSection
            inventario={characterData.inventario}
            editMode={editMode}
            onSave={(inventario) => handleLocalUpdate({ inventario })}
          />
        )}

        {activeTab === "habilidades" && (
          <HabilidadesSection
            habilidades={characterData.habilidades}
            editMode={editMode}
            onSave={(habilidades) => handleLocalUpdate({ habilidades })}
          />
        )}

        {activeTab === "personalidade" && (
          <PersonalidadeSection
            personalidade={characterData.personalidade}
            editMode={editMode}
            onSave={(personalidade) =>
              handleLocalUpdate({ personalidade })
            }
          />
        )}

        {activeTab === "anotacoes" && (
          <AnotacoesSection
            anotacoes={characterData.anotacoes}
            editMode={editMode}
            onSave={(anotacoes) => handleLocalUpdate({ anotacoes })}
          />
        )}
      </div>
    </div>
  );
};

export default FichaPage;
