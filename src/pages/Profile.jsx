import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import { useApp } from '../context/AppContext.jsx';
import { leaderboard, plantStages, badges } from '../data/data.js';
import Icon from '../components/Icon.jsx';

export default function Profile() {
  const {
    userProfile, setUserProfile, score, currentStage, streak,
    selectedJourney, manualActivities, logout, showToast
  } = useApp();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [formName, setFormName] = useState(userProfile.name);
  const [formEmail, setFormEmail] = useState(userProfile.email);
  const [tab, setTab] = useState('overview');

  const saveProfile = (e) => {
    e.preventDefault();
    setUserProfile((p) => ({ ...p, name: formName, email: formEmail }));
    setEditing(false);
    showToast('Perfil atualizado com sucesso.');
  };

  const toggleRanking = () => {
    const newValue = !userProfile.rankingOptIn;
    setUserProfile((p) => ({ ...p, rankingOptIn: newValue }));
    showToast(newValue ? 'Participação no ranking ativada.' : 'Você saiu do ranking público.');
  };

  const toggleNotif = (key) => {
    setUserProfile((p) => ({
      ...p,
      notifications: { ...p.notifications, [key]: !p.notifications[key] }
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const unlockedBadges = badges.filter((b) => b.unlocked).length;

  return (
    <>
      <PageHeader eyebrow="Meu perfil" title={`Olá, ${userProfile.name.split(' ')[0]}!`} subtitle="Gerencie sua conta, metas, conquistas e preferências de privacidade.">
        <div className="cp-card text-center" style={{ background: 'white' }}>
          <div style={{
            width: 96, height: 96, margin: '0 auto',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #eaf5d8, #dbf3e6)',
            display: 'grid', placeItems: 'center', fontSize: 56,
            boxShadow: 'inset 0 0 30px rgba(28,151,112,0.08)'
          }}>
            <Icon name={currentStage.stageIcon} size={72} />
          </div>
          <h3 className="mt-3 mb-1" style={{ fontSize: 18 }}>{userProfile.name}</h3>
          <small style={{ color: '#748a80', display: 'block' }}>@{userProfile.username}</small>
          <small style={{ color: '#1c9770', fontWeight: 700, display: 'block', marginTop: 6, fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {userProfile.plan}
          </small>
        </div>
      </PageHeader>

      {/* Tabs (Bootstrap nav-pills) */}
      <section style={{ paddingTop: 32 }}>
        <div className="cp-container">
          <ul className="nav nav-pills flex-wrap gap-2" role="tablist">
            {[
              { id: 'overview', label: 'Visão geral' },
              { id: 'editar', label: 'Editar conta' },
              { id: 'privacy', label: 'Privacidade & Notificações' },
              { id: 'ranking', label: 'Ranking' }
            ].map((t) => (
              <li className="nav-item" key={t.id}>
                <button
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={tab === t.id ? 'nav-link active' : 'nav-link'}
                  style={{
                    background: tab === t.id ? 'linear-gradient(135deg, #1c9770, #157a5b)' : 'rgba(28,151,112,0.08)',
                    color: tab === t.id ? 'white' : '#11614a',
                    border: 'none', fontWeight: 600, fontSize: 14,
                    borderRadius: 999, padding: '8px 18px'
                  }}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tab content */}
      <section className="section-padding" style={{ paddingTop: 24 }}>
        <div className="cp-container">
          {tab === 'overview' && (
            <div className="row g-4">
              {/* Stats grid */}
              <div className="col-12">
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: 16
                }}>
                  <StatCard icon="estrela-preenchida" value={score.toLocaleString('pt-BR')} label="Pontos totais" />
                  <StatCard icon="chama" value={`${streak}`} label="Dias seguidos" />
                  <StatCard icon="trofeu" value={`${unlockedBadges}/${badges.length}`} label="Badges" />
                  <StatCard icon={currentStage.stageIcon} value={currentStage.name} label="Nível atual" />
                </div>
              </div>

              {/* Jornada ativa */}
              <div className="col-12 col-lg-6">
                <div className="cp-card h-100">
                  <span className="eyebrow">Jornada ativa</span>
                  <h3 className="mt-2" style={{ fontSize: 20 }}>
                    {selectedJourney === 'vida-ativa' ? 'Vida Ativa' :
                     selectedJourney === 'emagrecimento' ? 'Emagrecimento Saudável' :
                     selectedJourney === 'bem-estar' ? 'Bem-estar Mental' :
                     selectedJourney === 'diabetes' ? 'Controle da Diabetes' :
                     selectedJourney === 'cardio' ? 'Saúde Cardiovascular' :
                     'Jornada Personalizada'}
                  </h3>
                  <p style={{ color: '#748a80', fontSize: 14 }}>
                    Continue conquistando missões e evolua sua Flora.
                  </p>
                  <Link to="/jornadas" className="btn-cp btn-cp-ghost mt-2">Alterar jornada →</Link>
                </div>
              </div>

              {/* Atividades manuais */}
              <div className="col-12 col-lg-6">
                <div className="cp-card h-100">
                  <span className="eyebrow">Últimas atividades manuais</span>
                  <h3 className="mt-2 mb-3" style={{ fontSize: 20 }}>{manualActivities.length} registros</h3>
                  {manualActivities.length === 0 ? (
                    <p style={{ color: '#748a80', fontSize: 14, margin: 0 }}>
                      Nenhuma atividade registrada manualmente ainda.
                    </p>
                  ) : (
                    <ul className="list-unstyled m-0">
                      {manualActivities.slice(0, 3).map((a) => (
                        <li key={a.id} className="d-flex justify-content-between py-2" style={{ borderBottom: '1px solid rgba(28,151,112,0.08)', fontSize: 14 }}>
                          <span>{a.type} • {a.duration}min</span>
                          <span style={{ color: '#748a80', fontSize: 12 }}>{a.date}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link to="/missoes" className="btn-cp btn-cp-ghost mt-3">Registrar nova →</Link>
                </div>
              </div>

              {/* Níveis */}
              <div className="col-12">
                <div className="cp-card">
                  <span className="eyebrow">Progresso por níveis</span>
                  <h3 className="mt-2 mb-4" style={{ fontSize: 20 }}>Evolução da Flora</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: 16
                  }}>
                    {plantStages.map((stage) => {
                      const reached = score >= stage.min;
                      const current = stage.id === currentStage.id;
                      return (
                        <div
                          key={stage.id}
                          className="text-center p-3"
                          style={{
                            borderRadius: 16,
                            background: current ? 'linear-gradient(135deg, #eaf5d8, #dbf3e6)' : reached ? '#f6f9f5' : 'transparent',
                            border: current ? '2px solid #1c9770' : '1px solid rgba(28,151,112,0.12)',
                            opacity: reached ? 1 : 0.5
                          }}
                        >
                          <div style={{ filter: reached ? 'none' : 'grayscale(70%)', opacity: reached ? 1 : 0.5 }}><Icon name={stage.stageIcon} size={40} /></div>
                          <strong style={{ fontSize: 13, color: '#0d4d3c', display: 'block', marginTop: 6 }}>{stage.name}</strong>
                          <small style={{ color: '#748a80', fontSize: 11 }}>{stage.points}</small>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="col-12">
                <button onClick={handleLogout} className="btn-cp btn-cp-ghost">
                  Sair da conta
                </button>
              </div>
            </div>
          )}

          {tab === 'editar' && (
            <div className="cp-card" style={{ maxWidth: 600 }}>
              <h3 style={{ fontSize: 20, marginBottom: 16 }}>Dados da conta</h3>
              <form onSubmit={saveProfile}>
                <div className="mb-3">
                  <label htmlFor="p-name" className="form-label fw-semibold" style={{ fontSize: 13 }}>Nome de exibição</label>
                  <input
                    id="p-name" type="text" className="form-control"
                    value={formName} onChange={(e) => setFormName(e.target.value)}
                    style={{ borderRadius: 10, borderColor: 'rgba(28,151,112,0.2)' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="p-email" className="form-label fw-semibold" style={{ fontSize: 13 }}>E-mail</label>
                  <input
                    id="p-email" type="email" className="form-control"
                    value={formEmail} onChange={(e) => setFormEmail(e.target.value)}
                    style={{ borderRadius: 10, borderColor: 'rgba(28,151,112,0.2)' }}
                  />
                </div>
                <button type="submit" className="btn-cp btn-cp-primary mt-2">Salvar alterações</button>
              </form>
            </div>
          )}

          {tab === 'privacy' && (
            <div className="row g-4">
              <div className="col-12 col-lg-6">
                <div className="cp-card h-100">
                  <h3 style={{ fontSize: 20, marginBottom: 16 }}>Notificações</h3>
                  <NotifToggle
                    label="E-mail"
                    desc="Resumos diários e relatórios mensais."
                    checked={userProfile.notifications.email}
                    onChange={() => toggleNotif('email')}
                  />
                  <NotifToggle
                    label="Notificações Push"
                    desc="Lembretes de missão e badges conquistados."
                    checked={userProfile.notifications.push}
                    onChange={() => toggleNotif('push')}
                  />
                  <NotifToggle
                    label="SMS"
                    desc="Apenas alertas críticos de segurança."
                    checked={userProfile.notifications.sms}
                    onChange={() => toggleNotif('sms')}
                  />
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="cp-card h-100">
                  <h3 style={{ fontSize: 20, marginBottom: 16 }}>Privacidade</h3>
                  <p style={{ fontSize: 14, color: '#435d50' }}>
                    Gerencie consentimentos, portabilidade e exclusão de dados na página dedicada.
                  </p>
                  <Link to="/lgpd" className="btn-cp btn-cp-primary mt-2">
                    Página de Privacidade (LGPD) →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {tab === 'ranking' && (
            <div className="row g-4">
              <div className="col-12 col-lg-7">
                <div className="cp-card">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h3 style={{ fontSize: 20, marginBottom: 4 }}>Ranking semanal</h3>
                      <small style={{ color: '#748a80' }}>
                        {userProfile.rankingOptIn
                          ? 'Você está participando do ranking público.'
                          : 'Você não está participando do ranking.'}
                      </small>
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                      {userProfile.rankingOptIn && (
                        <Link
                          to="/ranking"
                          className="btn-cp btn-cp-lime"
                          style={{ fontSize: 13, padding: '8px 14px' }}
                        >
                          🏆 Ver pódio completo
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={toggleRanking}
                        className={userProfile.rankingOptIn ? 'btn-cp btn-cp-soft' : 'btn-cp btn-cp-primary'}
                        style={{ fontSize: 13, padding: '8px 14px' }}
                      >
                        {userProfile.rankingOptIn ? 'Sair do ranking' : 'Entrar no ranking'}
                      </button>
                    </div>
                  </div>

                  {userProfile.rankingOptIn ? (
                    <ul className="list-unstyled m-0">
                      {leaderboard.map((p) => (
                        <li
                          key={p.position}
                          className="d-flex align-items-center gap-3 p-3 mb-2"
                          style={{
                            background: p.current ? 'linear-gradient(135deg, #eaf5d8, #ffffff)' : '#f6f9f5',
                            borderRadius: 14,
                            border: p.current ? '2px solid #1c9770' : '1px solid transparent'
                          }}
                        >
                          <span style={{
                            width: 32, height: 32, borderRadius: 999,
                            background: p.position <= 3 ? 'linear-gradient(135deg, #93cb52, #1c9770)' : 'white',
                            color: p.position <= 3 ? 'white' : '#11614a',
                            display: 'grid', placeItems: 'center',
                            fontWeight: 800, fontFamily: 'Sora, sans-serif',
                            fontSize: 14,
                            border: p.position > 3 ? '1px solid rgba(28,151,112,0.2)' : 'none'
                          }}>
                            {p.position}
                          </span>
                          <span style={{ fontSize: 24 }}>{p.emoji}</span>
                          <div className="flex-grow-1">
                            <strong style={{ fontSize: 14 }}>{p.name}</strong>
                            <small style={{ display: 'block', color: '#748a80', fontSize: 11 }}>
                              {p.trend} esta semana
                            </small>
                          </div>
                          <strong style={{ fontSize: 14, color: '#11614a' }}>
                            {p.points.toLocaleString('pt-BR')} pts
                          </strong>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-4">
                      <div style={{ fontSize: 48, marginBottom: 12 }}>🤝</div>
                      <p style={{ color: '#435d50', maxWidth: 420, margin: '0 auto' }}>
                        Ranking é sempre opcional. Ative apenas se quiser competição saudável.
                        Você pode voltar a sair a qualquer momento.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-12 col-lg-5">
                <div className="cp-card h-100" style={{ background: 'linear-gradient(135deg, #f6f9f5, #ffffff)' }}>
                  <h3 style={{ fontSize: 18, marginBottom: 12 }}>📜 Como funciona</h3>
                  <ul style={{ paddingLeft: 18, fontSize: 14, color: '#435d50', margin: 0 }}>
                    <li className="mb-2">Ranking é <strong>opt-in</strong>: por padrão, você não aparece.</li>
                    <li className="mb-2">Pontos contados: apenas atividades validadas.</li>
                    <li className="mb-2">Quem não participa <strong>não aparece</strong> nos rankings de outros.</li>
                    <li>Você pode entrar/sair quantas vezes quiser, sem perder pontos.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="cp-card text-center">
      <div style={{ width: 30, height: 30, margin: '0 auto' }}><Icon name={icon} size={30} /></div>
      <div className="fw-bold mt-2" style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, color: '#0d4d3c' }}>{value}</div>
      <small style={{ color: '#748a80', fontSize: 12 }}>{label}</small>
    </div>
  );
}

function NotifToggle({ label, desc, checked, onChange }) {
  return (
    <div className="d-flex align-items-center justify-content-between py-3" style={{ borderBottom: '1px solid rgba(28,151,112,0.08)' }}>
      <div style={{ flex: 1, paddingRight: 12 }}>
        <strong style={{ fontSize: 14, color: '#10221a' }}>{label}</strong>
        <p style={{ fontSize: 12, color: '#748a80', margin: '2px 0 0' }}>{desc}</p>
      </div>
      <label className="toggle-switch">
        <input type="checkbox" checked={checked} onChange={onChange} aria-label={label} />
        <span className="toggle-slider"></span>
      </label>
    </div>
  );
}
