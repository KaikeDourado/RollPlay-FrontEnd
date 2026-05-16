import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSecure } from '@/lib/fetchSecure';
import { useAuth } from '@/contexts/AuthContext';
import './styles/SheetsTab.css';

const SheetsTab = ({ campaignUid, sessionData, refreshTrigger }) => {
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const isMaster = sessionData?.userUid === user?.uid;

  const loadSheets = async () => {
    setLoading(true);
    setError("");

    try {
      const endpoint = isMaster
        ? `http://localhost:5000/sheets/campaign/${campaignUid}`
        : `http://localhost:5000/sheets/token/${campaignUid}`;

      const response = await fetchSecure(endpoint, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || `Erro ao carregar fichas: ${response.statusText}`);
      }

      const data = await response.json();
      const sheetsArray = Array.isArray(data.sheets) ? data.sheets : [];

      let filteredSheets = sheetsArray;
      if (!isMaster) {
        filteredSheets = sheetsArray.filter(sheet => sheet.userUid === user?.uid);
      }

      setSheets(filteredSheets);
    } catch (err) {
      console.error('Erro ao buscar fichas:', err);
      setError(err.message || 'Não foi possível carregar as fichas da campanha.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (campaignUid) {
      loadSheets();
    }
  }, [campaignUid, isMaster, user?.uid, refreshTrigger]);

  const handleViewSheet = (sheetUid) => {
    navigate(`/sheet/${sheetUid}`);
  };

  return (
    <div className="sheets-tab-profileSession">
      <div className="tab-header-profileSession">
        <div>
          <h2 className="tab-title-profileSession">FICHAS</h2>
          {isMaster && (
            <div className="sheets-info-profileSession">
              Total de fichas: {sheets.length}
            </div>
          )}
        </div>
        <button
          className="refresh-sheets-button-profileSession"
          onClick={loadSheets}
        >
          Atualizar
        </button>
      </div>

      {loading ? (
        <p>Carregando fichas...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : sheets.length === 0 ? (
        <p>
          {isMaster 
            ? 'Nenhuma ficha criada nesta campanha ainda.' 
            : 'Você não possui fichas nesta campanha ainda.'}
        </p>
      ) : (
        <div className="sheets-grid-profileSession">
          {sheets.map(sheet => (
            <div key={sheet.uid} className="sheet-card-profileSession">
              <div className="sheet-card-content-profileSession">
                <div className="sheet-name-profileSession">{sheet.name}</div>
                <div className="sheet-details-profileSession">
                  <span className="sheet-class-profileSession">
                    {sheet.characterClass} - {sheet.race}
                  </span>
                  <span className="sheet-level-profileSession">Nível {sheet.level}</span>
                </div>
                {isMaster && (
                  <div className="sheet-owner-profileSession">
                    Dono: {sheet.userUid}
                  </div>
                )}
              </div>
              <button 
                className="view-sheet-button-profileSession"
                onClick={() => handleViewSheet(sheet.uid)}
              >
                📄 VER FICHA
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SheetsTab;
