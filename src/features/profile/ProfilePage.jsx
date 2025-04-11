import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import "./profile.css";

export default function ProfilePage() {
    return (
        <div className="profile-container">
            <Navbar />
            <main className="profile-main">
                <section className="profile-sidebar">
                    <div className="profile-image-container">
                        <img src="https://placeholder.svg?height=200&width=200" alt="Foto de perfil" className="profile-image"/>
                            <button className="profile-button edit-profile-image">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            </button>
                    </div>
                    <div className="profile-info">
                        <h2 className="profile-name">SÉRGIO</h2>
                        <p className="profile-title">MESTRE DA BALDURS GATE</p>
                    </div>
                    <div className="profile-bio">
                        <h3>BIO</h3>
                        <div className="profile-bio-text">                      
                            <p>OI GENTE, EU MIM CHAMAR SÉRGIO, E MIM GOSTAR MUITO DE RPGS E COISAS DE NERD.</p>
                        </div>
                    </div>
                    <div className="profile-stats">
                        <div className="profile-stat-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                            <span>12 CAMPANHAS CRIADAS</span>
                        </div>
                        <div className="profile-stat-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            <span>25 PERSONAGENS CRIADOS</span>
                        </div>
                        <div className="profile-stat-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            <span>MEMBRO DESDE 2023</span>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button className="profile-btn-edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            EDITAR INFORMAÇÕES
                        </button>
                        <button className="profile-btn-logout">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            SAIR DA CONTA
                        </button>
                    </div>
                </section>

                <div className="profile-content">
                    <section className="profile-campaigns-section">
                        <h2>SUAS CAMPANHAS</h2>
                        <div className="profile-section-divider"></div>

                        <div className="profile-campaigns-grid">
                            <div className="profile-campaign-card">
                                <div className="profile-campaign-image">
                                    <img src="https://placeholder.svg?height=80&width=80" alt="Mina Perdida da Rocinha"/>
                                </div>
                                <div className="profile-campaign-info">
                                    <h3>MINA PERDIDA DA ROCINHA</h3>
                                    <p>SISTEMA: D&D 5E</p>
                                    <p>5 JOGADORES • ATIVA</p>
                                </div>
                            </div>
                        </div>
                        <button className="profile-btn-create-campaign">CRIAR NOVA CAMPANHA</button>
                    </section>

                    <section class="profile-characters-section">
                        <h2>SEUS PERSONAGENS</h2>
                        <div className="profile-section-divider"></div>

                        <div className="profile-characters-grid">
                            <div className="profile-character-card">
                                <div className="profile-character-image">
                                    <img src="https://placeholder.svg?height=100&width=100" alt="Lady Bug"/>
                                </div>
                                <div className="profile-character-info">
                                    <h3>LADY BUG</h3>
                                    <p>HUMANO DRUIDA</p>
                                    <p>NÍVEL 7</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="profile-sessions-section">
                        <h2>PRÓXIMAS SEÇÕES</h2>
                        <div className="profile-section-divider"></div>

                        <div className="profile-sessions-list">
                            <div className="profile-session-card">
                                <div className="profile-session-date">
                                    <div className="profile-date-number">28</div>
                                    <div className="profile-date-month">JUN</div>
                                </div>
                                <div className="profile-session-info">
                                    <h3>DIA D - RPG DO ORGULHO #SEÇÃO 10</h3>
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
        </div>
    );
}
