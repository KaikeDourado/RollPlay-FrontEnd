import React from 'react';
import './styles/TabNavigation.css';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ['CHAT', 'JOGADORES', 'SESSÕES', 'NOTAS', 'MAPAS', 'NPCS'];
  
  return (
    <div className="tabs-navigation-profileSession">
      {tabs.map(tab => (
        <button
          key={tab}
          className={`tab-button-profileSession ${activeTab === tab ? 'active' : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;