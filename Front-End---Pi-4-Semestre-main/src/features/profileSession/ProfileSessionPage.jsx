import React, { useState } from 'react';
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import SessionInfo from './components/SessionInfo';
import TabNavigation from './components/TabNavigation';
import PlayersTab from './tabs/PlayersTab';
import SessionsTab from './tabs/SessionsTab';
import NotesTab from './tabs/NotesTab';
import MapsTab from './tabs/MapsTab';
import NPCsTab from './tabs/NPCsTab';
import "./ProfileSession.css";

const ProfileSession = () => {
    const [activeTab, setActiveTab] = useState('JOGADORES');
  
    const sessionData = {
      title: 'MINA PERDIDA DA ROCINHA',
      system: 'D&D 5E',
      playerCount: 6,
      sessionCount: 12,
      createdAt: 'SETEMBRO DE 2023',
      description: 'UMA AVENTURA ÉPICA NAS PROFUNDEZAS DA ROCINHA, ONDE OS AVENTUREIROS PRECISAM ENCONTRAR A MINA PERDIDA E SEUS TESOUROS. PREPARE-SE PARA ENFRENTAR PERIGOS, MONSTROS E DESVENDAR MISTÉRIOS ANTIGOS NESTA CAMPANHA CHEIA DE AÇÃO E INTRIGA.'
    };
  
    const renderTabContent = () => {
      switch (activeTab) {
        case 'JOGADORES':
          return <PlayersTab />;
        case 'SESSÕES':
          return <SessionsTab />;
        case 'NOTAS':
          return <NotesTab />;
        case 'MAPAS':
          return <MapsTab />;
        case 'NPCS':
          return <NPCsTab />;
        default:
          return <PlayersTab />;
      }
    };

    return (
        <div className="profileSession-container">
            <Navbar />
            <div className="content-profileSession">
                <div className="sidebar-profileSession">
                    <SessionInfo sessionData={sessionData} />
                </div>
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
};

export default ProfileSession;