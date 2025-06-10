// src/features/profileSession/ProfileSession.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import SessionInfo from "@/components/profileSession/SessionInfo";
import TabNavigation from "@/components/profileSession/TabNavigation";
import PlayersTab from "./tabs/PlayersTab";
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

  // 4) useEffect para buscar os dados da campanha assim que o componente montar
  useEffect(() => {
    const fetchSession = async () => {
      try {
        // 4.1) recupera token do storage
        const token =
          localStorage.getItem("authToken") ||
          sessionStorage.getItem("authToken");
        if (!token) {
          navigate("/entrar");
          return;
        }

        console.log(campaignUid)

        // 4.2) faz GET para /api/campaign/:uid (aqui campaignUid)
        const res = await axios.get(
          `http://localhost:5000/api/campaign/info/${campaignUid}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
         
          setSessionData(res.data.data);
        } else {
          setError(res.data.message || "Falha ao carregar dados da sessão.");
        }
      } catch (err) {
        console.error("Erro ao buscar campanha:", err);
        setError(
          err.response?.data?.message ||
            "Erro de conexão. Tente novamente mais tarde."
        );
        if ([401, 403].includes(err.response?.status)) {
          // se token inválido ou expirado, redireciona para login
          navigate("/entrar");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [campaignUid, navigate]);

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
        return <PlayersTab campaignUid={campaignUid} />;
      case "SESSÕES":
        return <SessionsTab campaignUid={campaignUid} />;
      case "NOTAS":
        return <NotesTab campaignUid={campaignUid} />;
      case "MAPAS":
        return <MapsTab campaignUid={campaignUid} />;
      case "NPCS":
        return <NPCsTab campaignUid={campaignUid} />;
      default:
        return <PlayersTab campaignUid={campaignUid} />;
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
