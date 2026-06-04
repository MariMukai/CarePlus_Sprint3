import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { plantStages } from '../data/data.js';
import Icon from '../components/Icon.jsx';

export default function Home() {
  const { score, currentStage, streak, missions } = useApp();
  const activeMissions = missions.filter((m) => m.status !== 'done').length;
  const completedMissions = missions.filter((m) => m.status === 'done').length;
  const nextStage = plantStages.find((s) => s.min > score);
  const progressToNext = nextStage
    ? Math.min(100, Math.round(((score - currentStage.min) / (nextStage.min - currentStage.min)) * 100))
    : 100;

  return (
    <>
      
      <section className="page-header section-padding position-relative">
        <span className="deco-leaf" style={{ top: 80, left: 40 }}>🌿</span>
        <span className="deco-leaf" style={{ bottom: 100, right: 60 }}>🍃</span>

        <div className="cp-container position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6 reveal">
              <span className="eyebrow mb-3"><span className="pulse-dot" /> Plataforma de Saúde Preventiva</span>
              <h1 className="display-3 fw-bold mt-3" style={{ letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                Transforme sua saúde em uma <em style={{ fontStyle: 'normal', color: '#1c9770', position: 'relative' }}>
                  jornada
                  <span style={{
                    position: 'absolute', left: 0, right: 0, bottom: -4,
                    height: 8, background: 'rgba(147, 203, 82, 0.45)',
                    zIndex: -1, borderRadius: 999
                  }}></span>
                </em>
              </h1>
              <p className="lead mt-4" style={{ color: '#435d50', fontSize: 18, maxWidth: 560 }}>
                A CarePlus Journey gamifica o cuidado contínuo com missões, pontos, recompensas
                e a evolução da Flora, transformando hábitos preventivos em uma experiência
                leve e motivadora.
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/missoes" className="btn-cp btn-cp-primary btn-cp-lg">
                  Ver missões de hoje →
                </Link>
                <Link to="/como-funciona" className="btn-cp btn-cp-ghost btn-cp-lg">
                  Como funciona
                </Link>
              </div>

              
              <div className="row g-3 mt-4">
                <div className="col-4">
                  <div style={{ borderLeft: '3px solid #1c9770', paddingLeft: 14 }}>
                    <div className="fw-bold" style={{ fontFamily: 'Sora, sans-serif', fontSize: 24, color: '#0d4d3c' }}>12+</div>
                    <div style={{ fontSize: 12, color: '#748a80', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Jornadas</div>
                  </div>
                </div>
                <div className="col-4">
                  <div style={{ borderLeft: '3px solid #93cb52', paddingLeft: 14 }}>
                    <div className="fw-bold" style={{ fontFamily: 'Sora, sans-serif', fontSize: 24, color: '#0d4d3c' }}>LGPD</div>
                    <div style={{ fontSize: 12, color: '#748a80', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Privacidade</div>
                  </div>
                </div>
                <div className="col-4">
                  <div style={{ borderLeft: '3px solid #1c9770', paddingLeft: 14 }}>
                    <div className="fw-bold" style={{ fontFamily: 'Sora, sans-serif', fontSize: 24, color: '#0d4d3c' }}>0</div>
                    <div style={{ fontSize: 12, color: '#748a80', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pressão</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6 reveal delay-2">
              <div className="d-flex justify-content-center position-relative" style={{ minHeight: 420 }}>
                <div className="avatar-circle">
                  <div className="orbit-ring r1 animate-spin-slow"></div>
                  <div className="orbit-ring r2"></div>
                  <div className="orbit-ring r3"></div>
                  <span className="avatar-emoji"><Icon name={currentStage.stageIcon} size={88} /></span>
                </div>

                <div className="float-card" style={{ top: 10, left: '5%', animationDelay: '0s' }}>
                  <div className="ico"><Icon name="estrela-preenchida" size={28} /></div>
                  <div>
                    <strong>{score.toLocaleString('pt-BR')} pts</strong>
                    <small>pontuação</small>
                  </div>
                </div>

                <div className="float-card" style={{ top: '45%', right: '0%', animationDelay: '1.5s' }}>
                  <div className="ico"><Icon name="chama" size={28} /></div>
                  <div>
                    <strong>{streak} dias</strong>
                    <small>sequência ativa</small>
                  </div>
                </div>

                <div className="float-card" style={{ bottom: 10, left: '8%', animationDelay: '3s' }}>
                 <div className="ico"><Icon name="trofeu" size={28} /></div>
                  <div>
                    <strong>{currentStage.name}</strong>
                    <small>nível atual</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="section-padding" style={{ paddingTop: 32 }}>
        <div className="cp-container">
          <div className="row g-4">
            {/* Card progresso flora */}
            <div className="col-12 col-lg-8">
              <div className="cp-card h-100">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
                  <div>
                    <span className="eyebrow">Seu progresso</span>
                    <h3 className="mt-2 mb-1">Flora {currentStage.name}</h3>
                    <p style={{ color: '#748a80', margin: 0, fontSize: 14 }}>{currentStage.description}</p>
                  </div>
                  <div style={{ width: 72, height: 72 }}><Icon name={currentStage.stageIcon} size={72} /></div>
                </div>

                {nextStage ? (
                  <>
                    <div className="d-flex justify-content-between mb-2" style={{ fontSize: 13, color: '#435d50' }}>
                      <span>Próximo nível: <strong style={{ color: '#0d4d3c' }}>{nextStage.name}</strong></span>
                      <span>{score} / {nextStage.min} pts</span>
                    </div>
                    <div className="progress-bar-cp">
                      <div className="fill" style={{ width: `${progressToNext}%` }}></div>
                    </div>
                    <small className="d-block mt-2" style={{ color: '#748a80', fontSize: 12 }}>
                      Faltam {(nextStage.min - score).toLocaleString('pt-BR')} pontos
                    </small>
                  </>
                ) : (
                 <p><Icon name="trofeu" size={20} /> Você atingiu o nível máximo!</p>
                )}
              </div>
            </div>

          
            <div className="col-12 col-lg-4">
              <div className="row g-3 h-100">
                <div className="col-6 col-lg-12">
                  <div className="cp-card text-center h-100 p-4">
                    <div><Icon name="alvo" size={28} /></div>
                    <div className="fw-bold mt-2" style={{ fontSize: 28, fontFamily: 'Sora, sans-serif', color: '#0d4d3c' }}>{activeMissions}</div>
                    <small style={{ color: '#748a80' }}>missões ativas</small>
                  </div>
                </div>
                <div className="col-6 col-lg-12">
                  <div className="cp-card text-center h-100 p-4">
                    <div><Icon name="concluido" size={28} /></div>
                    <div className="fw-bold mt-2" style={{ fontSize: 28, fontFamily: 'Sora, sans-serif', color: '#0d4d3c' }}>{completedMissions}</div>
                    <small style={{ color: '#748a80' }}>concluídas</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="cp-container">
          <div className="row mb-4">
            <div className="col-12 col-lg-8">
              <span className="eyebrow">Navegação rápida</span>
              <h2 className="mt-2 mb-3">Explore a plataforma</h2>
              <p style={{ color: '#435d50', fontSize: 16 }}>
                Cada área do CarePlus Journey foi pensada para uma etapa específica
                do seu cuidado preventivo. Acesse o que precisa em poucos cliques.
              </p>
            </div>
          </div>

        
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20
          }}>
            <QuickCard to="/jornadas" icon="mapa" title="Jornadas" desc="Trilhas temáticas para cada objetivo de saúde." />
            <QuickCard to="/missoes" icon="alvo" title="Missões" desc="Desafios diários e semanais validados." />
            <QuickCard to="/sincronizacao" icon="sinal" title="Sincronização" desc="Conecte tênis, chaveiro, Strava, Google Fit e mais." accent />
            <QuickCard to="/recompensas" icon="trofeu" title="Recompensas" desc="Troque pontos por benefícios reais Care Plus." />
            <QuickCard to="/perfil" icon="usuario" title="Perfil" desc="Conta, metas, badges e histórico." />
            <QuickCard to="/lgpd" icon="cadeado" title="Privacidade" desc="Consentimento, portabilidade e exclusão de dados." />
          </div>
        </div>
      </section>
    </>
  );
}

function QuickCard({ to, icon, title, desc, accent = false }) {
  return (
    <Link
      to={to}
      className="cp-card text-decoration-none position-relative"
      style={{
        color: 'inherit',
        background: accent ? 'linear-gradient(135deg, #1c9770 0%, #157a5b 100%)' : 'white',
        border: accent ? 'none' : undefined
      }}
    >
      <div className="d-flex align-items-start gap-3">
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: accent ? 'rgba(255,255,255,0.15)' : 'linear-gradient(135deg, #eaf5d8, #dbf3e6)',
          display: 'grid', placeItems: 'center', fontSize: 26
        }}>
          <Icon name={icon} size={26} />
        </div>
        <div className="flex-grow-1">
          <h4 style={{ fontSize: 17, color: accent ? 'white' : '#0d4d3c', marginBottom: 6 }}>{title}</h4>
          <p style={{ fontSize: 14, color: accent ? 'rgba(255,255,255,0.85)' : '#748a80', margin: 0 }}>
            {desc}
          </p>
        </div>
      </div>
      <span style={{
        position: 'absolute', right: 20, bottom: 20,
        color: accent ? 'rgba(255,255,255,0.6)' : '#1c9770', fontWeight: 700, fontSize: 18
      }}>→</span>
    </Link>
  );
}
