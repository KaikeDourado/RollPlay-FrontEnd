import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import SessionModal from "@/components/forms/SessionModal";
import EnterSessionModal from "@/components/forms/EnterSessionModal";
import "./profile.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isEnterSessionModalOpen, setIsEnterSessionModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
        //TODO: Descomentar isso depois de arrumar essa tela
        // if (!token) {
        //   navigate("/entrar");
        //   return;
        // }

        const res = await axios.get(
          `http://localhost:5000/api/user/uid`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          setUser(res.data.data);
        } else {
          setError(res.data.message || "Falha ao carregar usuário.");
        }
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        setError(
          err.response?.data?.message ||
          "Erro de conexão. Tente novamente mais tarde."
        );
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate("/entrar");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  // Dados estáticos para teste(remover depois)
  // Comente o useEffect e os useState para usar os dados estáticos
  /*const [user, setUser] = useState({
    displayName: "Kaike Teste",
    title: "MESTRE DE RPG",
    bio: "Sou um mestre experiente em D&D!",
    photoURL: "",
    campaignsCount: 2,
    charactersCount: 5,
    createdAt: "2022-01-01T00:00:00.000Z"
  });
  
  const loading = false;
  const error = "";*/

  if (loading) {
    return <div className="profile-loading">Carregando perfil...</div>;
  }
  if (error) {
    return <div className="profile-error">{error}</div>;
  }

  // Estado para edição do perfil
  // Usado para controlar se o usuário está editando as informações do perfil
  const [editing, setEditing] = useState(false);

  const [editData, setEditData] = useState(user);

  const handleEditClick = () => {
    setEditData(user); // Preenche os inputs com os dados atuais
    setEditing(true);
  };

  const handleSaveClick = () => {
    setUser(editData); // Salva as alterações
    setEditing(false);
  };

  // Função para lidar com mudanças nos inputs de edição
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Dados estáticos ou placeholders para contagens
  const campaignsCount = user.campaignsCount ?? 0;
  const charactersCount = user.charactersCount ?? 0;
  const memberYear = new Date(user.createdAt).getFullYear();

  return (
    <div className="profile-container">
      <Navbar />

      <main className="profile-main">
        <section className="profile-sidebar">
          <div className="profile-image-container">
            <img
              src={user.photoURL || "/imagens/default-profile.png"}
              alt="Foto de perfil"
              className="profile-image"
            />
            {editing && (
              <>
                <label htmlFor="profile-image-upload" className="edit-profile-image" title="Alterar foto">
                  ✎
                </label>
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={e => {
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
                  value={editData.displayName}
                  onChange={handleChange}
                  className="profile-input"
                  placeholder="Nome"
                />
                <input
                  type="text"
                  name="title"
                  value={editData.title}
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
                  value={editData.bio}
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
              <button className="profile-btn-edit" onClick={handleSaveClick}>
                SALVAR
              </button>
            ) : (
              <button className="profile-btn-edit" onClick={handleEditClick}>
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
        </section>

        <div className="profile-content">
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
              {/* TODO: mapear campanhas do user */}
              <Link to="../profile-session" className="profile-campaign-card">
                <div className="profile-campaign-image">
                  <img src="/imagens/rocinha.jfif" alt="Mina Perdida da Rocinha" />
                </div>
                <div className="profile-campaign-info">
                  <h3>MINA PERDIDA DA ROCINHA</h3>
                  <p>SISTEMA: D&D 5E</p>
                  <p>5 JOGADORES • ATIVA</p>
                </div>
              </Link>
            </div>
            <button
              className="profile-btn-create-campaign"
              onClick={() => setIsSessionModalOpen(true)}
            >
              CRIAR NOVA CAMPANHA
            </button>
          </section>

          <section className="profile-characters-section">
            <h2>SEUS PERSONAGENS</h2>
            <div className="profile-section-divider"></div>
            <div className="profile-characters-grid">
              {/* TODO: mapear personagens do user */}
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
          // ação ao enviar código
          setIsEnterSessionModalOpen(false);
        }}
      />
    </div>
  );
}
