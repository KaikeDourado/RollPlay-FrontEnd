import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import SessionModal from "@/components/forms/SessionModal";
import EnterSessionModal from "@/components/forms/EnterSessionModal";
import { authApi } from "@/lib/auth";
import { fetchSecure } from "@/lib/fetchSecure";
import "./profile.css";

export default function ProfilePage() {
  // ─────────────── Hooks de estado ───────────────
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [errorCharacters, setErrorCharacters] = useState("");

  const navigate = useNavigate();

  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isEnterSessionModalOpen, setIsEnterSessionModalOpen] = useState(false);

  // ─────────────── Hooks de edição ───────────────
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  // ───────────── UseEffect para buscar usuário e campanhas ─────────────
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const currentUser = authApi.getCurrentUser();

        if (!currentUser) {
          throw new Error('Usuário não autenticado');
        }

        // Buscar dados completos do usuário no backend
        const userRes = await fetchSecure(
          `http://localhost:5000/users/token`,
          {
            method: 'GET',
          }
        )
        const response = await userRes.json();

        // Os dados do usuário estão dentro de response.data
        const userDataFromBackend = response.data || {};
        console.log('Dados do usuário obtidos do backend:', userDataFromBackend);

        // Mesclar dados do Firebase com dados do backend
        const userData = {
          uid: currentUser.uid,
          displayName: userDataFromBackend.displayName || currentUser.displayName,
          email: userDataFromBackend.email || currentUser.email,
          title: userDataFromBackend.title || '',
          bio: userDataFromBackend.bio || '',
          userPhoto: userDataFromBackend.userPhoto || currentUser.userPhoto,
          createdAt: new Date(currentUser.metadata?.creationTime).toISOString() || new Date().toISOString(),
        };

        setUser(userData);
        console.log('User data loaded:', userData);
        setEditData(userData);

        // Buscar campanhas
        const campaignsRes = await fetchSecure(`http://localhost:5000/campaigns/user/${userData.uid}`);
        const campaignsData = await campaignsRes.json();
        setCampaigns(Array.isArray(campaignsData) ? campaignsData : campaignsData.campaigns || []);

        // Buscar personagens
        const charactersRes = await fetchSecure(`http://localhost:5000/sheets/user/${userData.uid}`);
        const charactersData = await charactersRes.json();
        setCharacters(Array.isArray(charactersData) ? charactersData : charactersData.sheets || []);

      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err.message);
        setError('Não foi possível carregar os dados do usuário.');

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);


  // ─────────────── Retornos condicionais ───────────────
  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
      </div>
    );
  }
  if (error && !editing) {
    return <div className="profile-error">{error}</div>;
  }
  if (!user) {
    return <div className="profile-error">Usuário não encontrado</div>;
  }

  // ─────────────── Helpers e contagens ───────────────
  const campaignsCount = campaigns.length;
  const charactersCount = user.characters.length;
  const memberYear = new Date(user.createdAt).getFullYear();

  // ─────────────── Handlers de edição ───────────────
  const handleEditClick = () => {
    setEditData(user);
    setEditing(true);
    setError("");
  };

  const handleCancelClick = () => {
    setEditing(false);
    setError("");
    setEditData(user);
  };

  const handleChange = (name, value) => {
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    setError("");
    if (!editData.displayName || editData.displayName.trim().length < 3) {
      setError("O nome deve ter ao menos 3 caracteres.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetchSecure(
        `http://localhost:5000/users/${user.uid}`,
        {
          method: 'PUT',
          body: JSON.stringify(editData)
        }
      );
      const result = await response.json();

      setUser(editData);
      setEditing(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (err) {
      setError('Erro ao salvar perfil: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      Alert.alert('Erro', 'Falha ao sair. Tente novamente.');
      console.error('Logout error:', err);
    }
  };

  const handleCreateCharacter = async () => {
    try {
      const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      if (!token) {
        navigate("/entrar");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/character/create", {} ,{
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res.data)

      if (res.data.success === true) {
        const newCharacterId = res.data.id;
        navigate(`/sheet/${newCharacterId}`);
      } else {
        alert("Erro ao criar personagem.");
      }
    } catch (err) {
      console.error("Erro ao criar personagem:", err);
      alert("Erro de conexão. Tente novamente mais tarde.");
    }
  };

  // ─────────────── Renderização ───────────────
  return (
    <div className="profile-container">
      <Navbar />

      <main className="profile-main">
        <section className="profile-sidebar">
          <div className="profile-image-container">
            <img
              src={
                editing
                  ? editData.photoURL ?? "/imagens/default-profile-img.png"
                  : user.photoURL || "/imagens/default-profile-img.png"
              }
              alt="Foto de perfil"
              className="profile-image"
            />
            {editing && (
              <>
                <label
                  htmlFor="profile-image-upload"
                  className="edit-profile-image"
                  title="Alterar foto"
                >
                  ✎
                </label>
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setEditData({ ...editData, photoURL: ev.target.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </>
            )}
          </div>

          <div className="profile-info">
            {editing ? (
              <>
                <input
                  type="text"
                  name="displayName"
                  value={editData.displayName || ""}
                  onChange={handleChange}
                  className="profile-input"
                  placeholder="Nome"
                />
                <input
                  type="text"
                  name="title"
                  value={editData.title || ""}
                  onChange={handleChange}
                  className="profile-input"
                  placeholder="Título"
                />
              </>
            ) : (
              <>
                <h2 className="profile-name">{user.displayName}</h2>
                <p className="profile-title">{user.title || "MESTRE DE RPG"}</p>
              </>
            )}
          </div>

          <div className="profile-bio">
            <h3>BIO</h3>
            <div className="profile-bio-text">
              {editing ? (
                <textarea
                  name="bio"
                  value={editData.bio || ""}
                  onChange={handleChange}
                  placeholder="Biografia"
                  rows={3}
                />
              ) : (
                <p>{user.bio || "Nenhuma biografia cadastrada."}</p>
              )}
            </div>
          </div>

          <div className="profile-stats">
            <div className="profile-stat-item">
              🎲 <span>{campaignsCount} CAMPANHAS CRIADAS</span>
            </div>
            <div className="profile-stat-item">
              🛡️ <span>{charactersCount} PERSONAGENS CRIADOS</span>
            </div>
            <div className="profile-stat-item">
              📅 <span>MEMBRO DESDE {memberYear}</span>
            </div>
          </div>

          <div className="profile-actions">
            {editing ? (
              <>
                <button
                  className="profile-btn-edit"
                  onClick={handleSaveClick}
                  disabled={saving}
                >
                  {saving ? "SALVANDO..." : "SALVAR"}
                </button>
                <button
                  className="profile-btn-edit"
                  onClick={handleCancelClick}
                  style={{ marginLeft: "0.5rem" }}
                >
                  CANCELAR
                </button>
              </>
            ) : (
              <button
                className="profile-btn-edit"
                onClick={handleEditClick}
              >
                EDITAR INFORMAÇÕES
              </button>
            )}
            <button
              className="profile-btn-logout"
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                navigate("/entrar");
              }}
            >
              SAIR DA CONTA
            </button>
          </div>

          {error && editing && (
            <p className="profile-error" style={{ marginTop: "0.5rem" }}>
              {error}
            </p>
          )}
        </section>

        <div className="profile-content">
          {/* ─── SUAS CAMPANHAS ─── */}
          {/* <section className="profile-campaigns-section">
            <h2>SUAS CAMPANHAS</h2>
            <button
              className="profile-btn-enter-session"
              style={{ position: "absolute", top: "2rem", right: "2rem" }}
              onClick={() => setIsEnterSessionModalOpen(true)}
            >
              ENTRAR EM UMA SESSÃO
            </button>

            <div className="profile-section-divider"></div>

            <div className="profile-campaigns-grid">
              {campaigns.length === 0 ? (
                <p>Você ainda não criou nenhuma campanha.</p>
              ) : (
                campaigns.map((c) => (
                  <Link
                    key={c.id}
                    to={`/profile-session/${c.id}`}
                    className="profile-campaign-card"
                  >
                    <div className="profile-campaign-image">
                      <img
                        src={c.imageUrl || "/imagens/default-campaign-img.png"}
                        alt={c.sessionName}
                      />
                    </div>
                    <div className="profile-campaign-info">
                      <h3>{c.sessionName}</h3>
                      <p>SISTEMA: {c.system}</p>
                      <p>
                        {c.playersCount} / {c.maxPlayers} JOGADORES •{" "}
                        {c.isActive ? "ATIVA" : "INATIVA"}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>

            <button
              className="profile-btn-create-campaign"
              onClick={() => setIsSessionModalOpen(true)}
            >
              CRIAR NOVA CAMPANHA
            </button>
          </section> */}

          {/* ─── SEUS PERSONAGENS ─── */}
          {/* <section className="profile-characters-section">
            <h2>SEUS PERSONAGENS</h2>
            <div className="profile-section-divider"></div>

            {loadingCharacters ? (
              <div className="profile-loading">
                <div className="spinner"></div>
              </div>
            ) : errorCharacters ? (
              <p className="profile-error">{errorCharacters}</p>
            ) : (
              <>
                <div className="profile-characters-grid">
                  {characters.length === 0 ? (
                    <p>Você ainda não criou nenhum personagem.</p>
                  ) : (
                    characters.map((char) => (
                      <Link
                        key={char.id}
                        to={`/sheet/${char.id}`}
                        className="profile-character-card"
                      >
                        <div className="profile-character-image">
                          <img
                            src={char.imageUrl || "/imagens/sheet-generic-img.png"}
                            alt={char.name || "Personagem"}
                          />
                        </div>
                        <div className="profile-character-info">
                          <h3>{char.nome || "SEM NOME"}</h3>
                          <p>{(char.raca || "RAÇA")} {char.class || "CLASSE"}</p>
                          <p>NÍVEL {char.level || 1}</p>
                        </div>
                      </Link>
                    ))
                  )}
                </div>

                <button
                  className="profile-btn-create-character"
                  onClick={handleCreateCharacter}
                >
                  CRIAR NOVO PERSONAGEM
                </button>
              </>
            )}
          </section> */}

          {/* ─── PRÓXIMAS SESSÕES ─── */}
          {/* TODO: mapear sessões do user */}
          {/* <section className="profile-sessions-section">
            <h2>PRÓXIMAS SESSÕES</h2>
            <div className="profile-section-divider"></div>
            <div className="profile-sessions-list">
              <div className="profile-session-card">
                <div className="profile-session-date">
                  <div className="profile-date-number">28</div>
                  <div className="profile-date-month">JUN</div>
                </div>
                <div className="profile-session-info">
                  <h3>DIA D - RPG DO ORGULHO #SESSÃO 10</h3>
                  <p>SÁBADO • 19:00 - 23:00</p>
                  <div className="profile-players-confirmed">
                    <div className="profile-player-avatars">
                      <span className="profile-player-avatar">A</span>
                      <span className="profile-player-avatar">B</span>
                      <span className="profile-player-avatar">C</span>
                      <span className="profile-player-avatar">D</span>
                    </div>
                    <span>4 JOGADORES CONFIRMADOS</span>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
        </div>
      </main>

      <Footer />

      <SessionModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
      />
      <EnterSessionModal
        isOpen={isEnterSessionModalOpen}
        onClose={() => setIsEnterSessionModalOpen(false)}
        onSubmit={(code) => {
          setIsEnterSessionModalOpen(false);
        }}
      />
    </div>
  );
}
