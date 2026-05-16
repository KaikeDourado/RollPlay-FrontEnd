import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSecure } from "@/lib/fetchSecure";
import { useAuth } from "@/contexts/AuthContext";

import FichaHeader from "@/components/sheet/FichaHeader";
import VisaoGeralSection from "@/components/sheet/VisaoGeralSection";
import AtributosPericiasResistenciasSection from "@/components/sheet/AtributosPericiasResistenciasSection";
import AtaquesMagiasSection from "@/components/sheet/AtaquesMagiasSection";
import InventarioSection from "@/components/sheet/InventarioSection";
import HabilidadesSection from "@/components/sheet/HabilidadesSection";
import ProficienciasSection from "@/components/sheet/ProficienciasSection";
import AnotacoesSection from "@/components/sheet/AnotacoesSection";
import Navbar from "@/components/global/Navbar";

import "./styles/SheetPage.css";

const normalizeSheet = (rawSheet) => {
  if (!rawSheet) return null;

  return {
    ...rawSheet,
    ...(rawSheet.sheetData || {}),
    uid: rawSheet.uid || rawSheet.id || rawSheet.sheetData?.uid || id,
  };
};

const FichaPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("visao-geral");
  const [mobileTabsOpen, setMobileTabsOpen] = useState(false);
  const [characterData, setCharacterData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setError("");

        if (authLoading) return;

        if (!user) {
          navigate("/entrar");
          return;
        }

        setPageLoading(true);

        const sheetRes = await fetchSecure(`http://localhost:5000/sheets/${id}`, {
          method: "GET",
        });

        const sheetData = await sheetRes.json();

        if (!sheetRes.ok || !sheetData.sheet) {
          throw new Error(sheetData.message || "Erro ao carregar ficha.");
        }

        setCharacterData(normalizeSheet(sheetData.sheet));
      } catch (err) {
        console.error("Erro na requisição da ficha:", err);
        setError(err.message || "Erro ao carregar ficha.");
      } finally {
        setPageLoading(false);
      }
    };

    fetchCharacter();
  }, [id, user, authLoading, navigate]);

  const handleLocalUpdate = (updatedData) => {
    setCharacterData((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  const updateCharacterOnServer = async () => {
    try {
      if (!characterData) return false;

      setSaving(true);

      const payload = {
        ...characterData,
        uid: characterData.uid || id,
      };

      const res = await fetchSecure(`http://localhost:5000/sheets/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      const responseData = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(responseData?.message || "Falha ao atualizar ficha.");
      }

      return true;
    } catch (err) {
      console.error("Erro ao atualizar ficha:", err);
      alert(err.message || "Erro ao salvar ficha.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleEditToggle = async () => {
    if (editMode) {
      const saved = await updateCharacterOnServer();

      if (!saved) return;
    }

    setEditMode((prev) => !prev);
  };

  const tabs = [
    { id: "visao-geral", label: "Visão Geral", icon: "📋" },
    { id: "atributos-pericias", label: "Atributos & Perícias", icon: "💪" },
    { id: "ataques-magias", label: "Ataques & Magias", icon: "⚔️" },
    { id: "inventario", label: "Inventário", icon: "🎒" },
    { id: "proficiencias", label: "Proficiências", icon: "🛡️" },
    { id: "tracos-origem", label: "Traços & Origem", icon: "🎭" },
    { id: "anotacoes", label: "Anotações", icon: "📝" },
  ];

  if (pageLoading || authLoading) {
    return <div className="ficha-loading">Carregando ficha...</div>;
  }

  if (error) {
    return (
      <div className="ficha-loading">
        <p>{error}</p>
        <button onClick={() => navigate("/fichas")}>Voltar</button>
      </div>
    );
  }

  if (!characterData) {
    return <div className="ficha-loading">Ficha não encontrada.</div>;
  }

  return (
    <div className="ficha-page">
      <Navbar />

      <FichaHeader
        characterName={characterData.name || "Personagem sem nome"}
        characterBasic={`${characterData.race || ""} ${characterData.characterClass || ""} ${characterData.level || 1}`}
        hp={{
          current: characterData.hp?.current || 0,
          max: characterData.hp?.max || 0,
          temp: characterData.hp?.temp || 0,
        }}
        deathSaves={characterData.deathSaves}
        onEditToggle={handleEditToggle}
        editMode={editMode}
        saving={saving}
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

        {activeTab === "atributos-pericias" && (
          <AtributosPericiasResistenciasSection
            attributes={characterData.attributes}
            skills={characterData.skills}
            deathSaves={characterData.deathSaves}
            resistances={characterData.resistances || { damage: [], condition: [] }}
            vulnerabilities={characterData.vulnerabilities || { damage: [], condition: [] }}
            immunities={characterData.immunities || { damage: [], condition: [] }}
            level={characterData.level}
            editMode={editMode}
            onSave={handleLocalUpdate}
          />
        )}

        {activeTab === "ataques-magias" && (
          <AtaquesMagiasSection
            ataques={characterData.weapons}
            magias={characterData.spellcasting}
            editMode={editMode}
            onSave={handleLocalUpdate}
          />
        )}

        {activeTab === "inventario" && (
          <InventarioSection
            inventario={characterData.inventory}
            editMode={editMode}
            onSave={(inventory) => handleLocalUpdate({ inventory })}
          />
        )}

        {activeTab === "proficiencias" && (
          <ProficienciasSection
            equipmentProficiencies={characterData.equipmentProficiencies}
            languages={characterData.languages}
            editMode={editMode}
            onSave={handleLocalUpdate}
          />
        )}

        {activeTab === "tracos-origem" && (
          <HabilidadesSection
            features={characterData.features}
            backstoryPersonality={characterData.backstoryPersonality}
            ideals={characterData.ideals}
            bonds={characterData.bonds}
            flaws={characterData.flaws}
            history={characterData.history}
            editMode={editMode}
            onSave={handleLocalUpdate}
          />
        )}

        {activeTab === "anotacoes" && (
          <AnotacoesSection
            notes={characterData.notes}
            editMode={editMode}
            onSave={(notes) => handleLocalUpdate({ notes })}
          />
        )}
      </div>
    </div>
  );
};

export default FichaPage;