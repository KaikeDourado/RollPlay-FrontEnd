import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import SessionModal from "@/components/forms/SessionModal";
import EnterSessionModal from "@/components/forms/EnterSessionModal";
import "./profile.css";

export default function ProfilePage() {
  // ─────────────── Hooks de estado ───────────────
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isEnterSessionModalOpen, setIsEnterSessionModalOpen] = useState(false);

  // ─────────────── Hooks de edição ───────────────
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  // ───────────── UseEffect para buscar usuário e campanhas ─────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
        if (!token) {
          navigate("/entrar");
          return;
        }

        // 1) Busca dados do usuário
        const resUser = await axios.get(`http://localhost:5000/api/user/uid`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (resUser.data.success) {
          setUser(resUser.data.data);
          setEditData(resUser.data.data);
        } else {
          setError(resUser.data.message || "Falha ao carregar usuário.");
          setLoading(false);
          return;
        }

        // 2) Busca campanhas do usuário
        const resCampaigns = await axios.get(
          "http://localhost:5000/api/campaign/userCampaigns",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (resCampaigns.data.success) {
          setCampaigns(resCampaigns.data.data);
        } else {
          console.error("Falha ao buscar campanhas:", resCampaigns.data.message);
        }
      } catch (err) {
        console.error("Erro ao buscar perfil ou campanhas:", err);
        setError(
          err.response?.data?.message || "Erro de conexão. Tente novamente mais tarde."
        );
        if ([401, 403].includes(err.response?.status)) {
          navigate("/entrar");
        }
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
    return null;
  }

  // ─────────────── Helpers e contagens ───────────────
  const campaignsCount = campaigns.length;
  const charactersCount = user.charactersCount ?? 0;
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

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async () => {
    setError("");
    if (!editData.displayName || editData.displayName.trim().length < 3) {
      setError("O nome deve ter ao menos 3 caracteres.");
      return;
    }

    try {
      setSaving(true);
      const token =
        localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

      const payload = {
        displayName: editData.displayName,
        title: editData.title,
        bio: editData.bio,
        photoURL: editData.photoURL,
      };

      const res = await axios.put(
        "http://localhost:5000/api/user/update",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setUser(res.data.data);
        setEditing(false);
        window.location.reload();
      } else {
        setError(res.data.message || "Falha ao salvar dados.");
      }
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      const msg =
        err.response?.data?.message ||
        "Falha ao salvar. Tente novamente mais tarde.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateCharacter = async () => {
    try {
      const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      if (!token) {
        navigate("/entrar");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/character/create", {
        headers: { Authorization: `Bearer ${token}` },
      }); 

      if (res.data.success && res.data.character) {
        const newCharacterId = res.data.character.id || res.data.character._id;
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
          <section className="profile-campaigns-section">
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
          </section>

          {/* ─── SEUS PERSONAGENS ─── */}
          <section className="profile-characters-section">
            <h2>SEUS PERSONAGENS</h2>
            <div className="profile-section-divider"></div>
            <div className="profile-characters-grid">
              {/* TODO: mapear personagens do user */}
              <button
                className="profile-btn-create-character"
                onClick={handleCreateCharacter}
              >
                CRIAR NOVO PERSONAGEM
              </button>
              <Link to="../sheet" className="profile-character-card">
                <div className="profile-character-image">
                  <img src="/imagens/ladybug.jpg" alt="Lady Bug" />
                </div>
                <div className="profile-character-info">
                  <h3>LADY BUG</h3>
                  <p>HUMANO DRUIDA</p>
                  <p>NÍVEL 7</p>
                </div>
              </Link>
            </div>
          </section>

          {/* ─── PRÓXIMAS SESSÕES ─── */}
          <section className="profile-sessions-section">
            <h2>PRÓXIMAS SESSÕES</h2>
            <div className="profile-section-divider"></div>
            <div className="profile-sessions-list">
              {/* TODO: mapear sessões do user */}
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
          </section>
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
