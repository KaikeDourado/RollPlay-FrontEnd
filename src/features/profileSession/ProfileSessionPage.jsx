import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { fetchSecure } from "@/lib/fetchSecure";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import SessionInfo from "@/components/profileSession/SessionInfo";
import TabNavigation from "@/components/profileSession/TabNavigation";
import PlayersTab from "./tabs/PlayersTab";
import SheetsTab from "./tabs/SheetsTab";
import SessionsTab from "./tabs/SessionsTab";
import NotesTab from "./tabs/NotesTab";
import MapsTab from "./tabs/MapsTab";
import NPCsTab from "./tabs/NPCsTab";
import ChatTab from "./tabs/ChatTab";
import "./ProfileSession.css";

export default function ProfileSession() {
  // 1) Lê o "uid" da campanha a partir dos params
  const { campaignUid } = useParams();
  localStorage.setItem('campaignUid', campaignUid)
  const navigate = useNavigate();

  // 2) Estado para os dados da sessão carregados do back-end
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 3) Estado para a aba ativa
  const [activeTab, setActiveTab] = useState("CHAT");

  // 4) Trigger para recarregar fichas após criar uma nova
  const [sheetsRefreshTrigger, setSheetsRefreshTrigger] = useState(0);

  const handleSheetCreated = () => {
    setSheetsRefreshTrigger(prev => prev + 1);
  };

  const { user, loading: authLoading } = useAuth();

  // 4) useEffect para buscar os dados da campanha assim que o componente montar
  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      navigate("/entrar");
      return;
    }

    const fetchSession = async () => {
      try {
        const res = await fetchSecure(
          `http://localhost:5000/campaigns/${campaignUid}`
        );

        const data = await res.json();
        if (res.ok && data.campaign) {
          setSessionData(data.campaign);
        } else {
          setError(data.message || "Falha ao carregar dados da sessão.");
        }
      } catch (err) {
        console.error("Erro ao buscar campanha:", err);
        setError(
          err.response?.data?.message ||
            "Erro de conexão. Tente novamente mais tarde."
        );
        if ([401, 403].includes(err.response?.status)) {
          navigate("/entrar");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [campaignUid, navigate, user, authLoading]);

  // 5) Enquanto carrega, exibe spinner
  if (loading) {
    return (
      <div className="profileSession-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  // 6) Exibe erro, se houver
  if (error) {
    return <div className="profileSession-error">{error}</div>;
  }

  // 7) Se não houver dados (ex.: campanha não encontrada), não renderiza nada
  if (!sessionData) {
    return null;
  }

  // 8) Função para atualizar local sessionData (após editar título ou descrição)
  const handleUpdateSessionData = (newData) => {
    setSessionData((prev) => ({ ...prev, ...newData }));
  };

  // 9) Renderiza o conteúdo de cada aba
  const renderTabContent = () => {
    switch (activeTab) {
      case "CHAT":
        return <ChatTab campaignUid={campaignUid} />;
      case "JOGADORES":
        return <PlayersTab campaignUid={campaignUid} sessionData={sessionData} onSheetCreated={handleSheetCreated} />;
      case "FICHAS":
        return <SheetsTab campaignUid={campaignUid} sessionData={sessionData} refreshTrigger={sheetsRefreshTrigger} />;
      case "SESSÕES":
        return <SessionsTab campaignUid={campaignUid} />;
      case "NOTAS":
        return <NotesTab campaignUid={campaignUid} />;
      case "MAPAS":
        return <MapsTab campaignUid={campaignUid} />;
      case "NPCS":
        return <NPCsTab campaignUid={campaignUid} />;
      default:
        return <ChatTab campaignUid={campaignUid} />;
    }
  };

  return (
    <div className="profileSession-container">
      <Navbar />

      <div className="content-profileSession">
        {/* 10) Sidebar com dados principais da sessão */}
        <div className="sidebar-profileSession">
          <SessionInfo
            sessionData={sessionData}
            onUpdateSessionData={handleUpdateSessionData}
          />
        </div>

        {/* 11) Área principal com as abas */}
        <div className="main-profileSession">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="tab-content-profileSession">
            {renderTabContent()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
