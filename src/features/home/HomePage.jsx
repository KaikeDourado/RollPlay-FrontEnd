import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import "./home.css";

export default function HomePage() {
    return (
        <div className="home-container">
            <Navbar />
            <main className="home-main">               
                <section className="home-hero">
                    <div className="home-hero-content">
                        <h2>SUA AVENTURA COMEÇA AQUI</h2>
                        <p>ROLL & PLAY É UMA PLATAFORMA GRATUITA PARA JOGADORES DE RPG DE MESA. CRIE PERSONAGENS, ORGANIZE SESSÕES E ROLE DADOS - TUDO EM UM SÓ LUGAR.</p>
                        <div className="home-hero-buttons">
                            <a href="/registrar" className="home-btn-primary">Começar agora</a>
                            <a href="/entrar" className="home-btn-secondary">Fazer Login</a>
                        </div>
                    </div>
                    <div className="home-hero-image">
                        {/* Imagem do mago com a lua */}
                    </div>
                </section>
                <section className="home-features">
                    <h2>TUDO QUE VOCÊ PRECISA PARA SUAS AVENTURAS</h2>
                    <p className="home-features-subtitle">A ROLL & PLAY É UM SISTEMA QUE SE PROPÕE A FACILITAR A CRIAÇÃO E A ADMINISTRAÇÃO DE CAMPANHAS DE RPG, OFERECENDO DIVERSAS FERRAMENTAS PARA AUXILIAR A VIDA DE PLAYERS E MESTRES.</p>

                    <div className="home-features-grid">
                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">📝</span>
                            </div>
                            <h3>FICHAS DE PERSONAGENS</h3>
                            <p>CRIE E GERENCIE FICHAS DE PERSONAGEM PARA SEUS JOGOS DE RPG, COM ATUALIZAÇÃO EM TEMPO REAL E COMPARTILHAMENTO FÁCIL.</p>
                        </div>

                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">📅</span>
                            </div>
                            <h3>CRIAÇÃO DE SESSÕES</h3>
                            <p>ORGANIZE SUAS SESSÕES DE JOGO CRIANDO SALAS VIRTUAIS E DEFININDO AGENDAMENTO DE AVENTURAS PARA SEU GRUPO.</p>
                        </div>

                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">💬</span>
                            </div>
                            <h3>CHAT INTEGRADO</h3>
                            <p>COMUNIQUE-SE COM OUTROS ATRAVÉS DE NOSSO CHAT INTEGRADO, TUDO REUNIDO NA MESMA PLATAFORMA.</p>
                        </div>

                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">🎲</span>
                            </div>
                            <h3>ROLAGEM DE DADOS</h3>
                            <p>SISTEMA AVANÇADO DE ROLAGEM DE DADOS COM SUPORTE PARA FÓRMULAS COMPLEXAS E HISTÓRICO DE ROLAGENS.</p>
                        </div>

                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">📊</span>
                            </div>
                            <h3>AGENDAMENTO DE SESSÕES</h3>
                            <p>AGENDE SESSÕES DE JOGO E ENVIE LEMBRETES AUTOMÁTICOS PARA TODOS OS PARTICIPANTES.</p>
                        </div>

                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">📚</span>
                            </div>
                            <h3>BIBLIOTECA DE RECURSOS</h3>
                            <p>ACESSE UMA VASTA BIBLIOTECA DE RECURSOS, INCLUINDO REGRAS, MATERIAIS E AVENTURAS PRONTAS PARA JOGAR.</p>
                        </div>
                    </div>
                </section>

                <section className="home-about">
                    <div className="home-about-content">
                        <h2>SOBRE O ROLL & PLAY</h2>
                        <p>ROLL & PLAY NASCEU DA PAIXÃO POR JOGOS DE RPG DE MESA E DA NECESSIDADE DE UMA PLATAFORMA GRATUITA E COMPLETA PARA JOGADORES.</p>
                        <p>NOSSA MISSÃO É TORNAR OS JOGOS DE RPG MAIS ACESSÍVEIS E DIVERTIDOS PARA TODOS, OFERECENDO FERRAMENTAS QUE FACILITAM A ORGANIZAÇÃO E A JOGABILIDADE.</p>
                        <p>SOMOS UMA COMUNIDADE DE JOGADORES CRIANDO PARA JOGADORES, E ACREDITAMOS QUE AS MELHORES AVENTURAS SÃO AQUELAS COMPARTILHADAS COM AMIGOS.</p>
                    </div>

                    <div className="home-about-features">
                        <div className="home-about-badge">100% Gratuito</div>
                        <h2>SOBRE O ROLL & PLAY</h2>
                        <ul className="home-about-list">
                            <li>PLATAFORMA TOTALMENTE GRATUITA, SEM RECURSOS PREMIUM ESCONDIDOS</li>
                            <li>SUPORTE PARA MÚLTIPLOS SISTEMAS DE RPG</li>
                            <li>INTERFACE INTUITIVA E FÁCIL DE USAR</li>
                            <li>COMUNIDADE ATIVA E EM CRESCIMENTO</li>
                            <li>ATUALIZAÇÕES REGULARES COM NOVAS FUNCIONALIDADES</li>
                        </ul>
                        <a href="#" className="home-btn-primary">Junte-se a nós</a>
                    </div>
                </section>

                <section className="home-faq">
                    <h2>PERGUNTAS FREQUENTES</h2>

                    <div className="home-faq-grid">
                        <div className="home-faq-item">
                            <h3>O ROLL & PLAY É REALMENTE GRATUITO?</h3>
                            <p>SIM, O ROLL & PLAY É 100% GRATUITO. NÃO HÁ RECURSOS PREMIUM OU CONTEÚDOS PARA USUÁRIOS PAGANTES. NOSSO OBJETIVO É TORNAR O RPG ACESSÍVEL A TODOS.</p>
                        </div>

                        <div className="home-faq-item">
                            <h3>POSSO USAR O ROLL & PLAY NO CELULAR?</h3>
                            <p>SIM, O ROLL & PLAY É TOTALMENTE RESPONSIVO E FUNCIONA EM QUALQUER DISPOSITIVO: DESKTOP, MÓVEIS, TABLETS E CONSOLES. VOCÊ PODE ACESSAR SUAS FICHAS E SESSÕES DE QUALQUER LUGAR.</p>
                        </div>

                        <div className="home-faq-item">
                            <h3>QUAIS SISTEMAS DE RPG SÃO SUPORTADOS?</h3>
                            <p>ATUALMENTE, O ROLL & PLAY OFERECE SUPORTE EXCLUSIVO AOS SISTEMAS D&D 5E E TORMENTA 20. NO ENTANTO, NOSSO OBJETIVO É EXPANDIR PARA OUTROS SISTEMAS POPULARES, ALÉM DE PERMITIR A CRIAÇÃO DE FICHAS PERSONALIZADAS PARA TAIS SISTEMAS.</p>
                        </div>

                        <div className="home-faq-item">
                            <h3>COMO FAÇO PARA CONVIDAR MEUS AMIGOS PARA UMA SESSÃO?</h3>
                            <p>AO CRIAR UMA SESSÃO, VOCÊ RECEBERÁ UM LINK DE CONVITE QUE PODE SER COMPARTILHADO COM SEUS AMIGOS. ELES PRECISARÃO TER UMA CONTA NO ROLL & PLAY PARA PARTICIPAR.</p>
                        </div>

                        <div className="home-faq-item">
                            <h3>PRECISO CRIAR UMA CONTA PARA USAR?</h3>
                            <p>SIM, É NECESSÁRIO CRIAR UMA CONTA PARA ACESSAR AS FUNCIONALIDADES DO ROLL & PLAY. O REGISTRO É RÁPIDO E GRATUITO, E SÓ PEDIMOS INFORMAÇÕES ESSENCIAIS.</p>
                        </div>

                        <div className="home-faq-item">
                            <h3>VOCÊS TÊM PLANOS PARA ADICIONAR NOVAS FUNCIONALIDADES?</h3>
                            <p>ABSOLUTAMENTE! ESTAMOS CONSTANTEMENTE TRABALHANDO EM NOVAS FUNCIONALIDADES E MELHORIAS COM BASE NO FEEDBACK DA COMUNIDADE. FIQUE ATENTO ÀS ATUALIZAÇÕES!</p>
                        </div>
                    </div>
                </section>

                <section className="home-cta">
                    <h2>PRONTO PARA COMEÇAR SUA AVENTURA?</h2>
                    <p>JUNTE-SE A CENTENAS DE JOGADORES DE RPG QUE JÁ ESTÃO USANDO O ROLL & PLAY PARA SUAS CAMPANHAS.</p>
                    <div className="home-cta-buttons">
                        <a href="/registrar" className="home-btn-primary">Criar conta gratuita</a>
                        <a href="#" className="home-btn-secondary">Saiba mais</a>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
