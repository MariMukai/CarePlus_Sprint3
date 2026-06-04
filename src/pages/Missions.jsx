import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import { useApp } from '../context/AppContext.jsx';
import { badges, iotDevices } from '../data/data.js';
import Icon from '../components/Icon.jsx';

const deviceMap = iotDevices.reduce((acc, d) => {
  acc[d.id] = d;
  return acc;
}, {});

const deviceLabels = {
  manual: { icon: '', name: 'Registro manual', color: '#748a80' },
  'shoe-sensor': { icon: '', name: 'Sensor no tênis', color: '#1c9770' },
  keychain: { icon: '', name: 'Chaveiro CarePlus', color: '#11614a' },
  esp32: { icon: '', name: 'Hub ESP32', color: '#3a7bd5' }
};

export default function Missions() {
  const { missions, score, currentStage, streak, completeMission, addManualActivity, manualActivities, iotConnections } = useApp();
  const [showManualForm, setShowManualForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [deviceFilter, setDeviceFilter] = useState('all');

  const filteredMissions = missions.filter((m) => {
    if (filter === 'pending' && m.status === 'done') return false;
    if (filter === 'done' && m.status !== 'done') return false;
    if (deviceFilter !== 'all' && m.device !== deviceFilter) return false;
    return true;
  });

  const isDeviceConnected = (deviceId) => {
    if (!deviceId || deviceId === 'manual') return true;
    return !!iotConnections[deviceId];
  };

  return (
    <>
      <PageHeader
        eyebrow="Gamificação ativa"
        title="Missões diárias e semanais"
        subtitle="Desafios curtos e mensuráveis que reconhecem seu cuidado preventivo com pontos, badges e progresso da Flora."
      >
        {/* Mini dashboard card */}
        <div className="cp-card" style={{ background: 'linear-gradient(135deg, #1c9770, #11614a)', color: 'white', border: 'none' }}>
          <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 }}>
            Seu painel
          </div>
          <div className="row g-3 mt-2">
            <div className="col-4">
              <div style={{ width: 40, height: 40 }}><Icon name={currentStage.stageIcon} size={40} /></div>
              <small style={{ opacity: 0.75, fontSize: 11 }}>{currentStage.name}</small>
            </div>
            <div className="col-4">
              <div className="fw-bold" style={{ fontSize: 22, fontFamily: 'Sora, sans-serif' }}>
                {score.toLocaleString('pt-BR')}
              </div>
              <small style={{ opacity: 0.75, fontSize: 11 }}>pontos</small>
            </div>
            <div className="col-4">
              <div className="fw-bold" style={{ fontSize: 22, fontFamily: 'Sora, sans-serif' }}>
                🔥{streak}
              </div>
              <small style={{ opacity: 0.75, fontSize: 11 }}>dias seguidos</small>
            </div>
          </div>
        </div>
      </PageHeader>

    
      <section className="section-padding" style={{ paddingTop: 32, paddingBottom: 24 }}>
        <div className="cp-container">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div className="d-flex gap-2" role="tablist">
              {[
                { id: 'all', label: 'Todas' },
                { id: 'pending', label: 'Pendentes' },
                { id: 'done', label: 'Concluídas' }
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={filter === f.id ? 'btn-cp btn-cp-primary' : 'btn-cp btn-cp-soft'}
                  style={{ padding: '8px 16px', fontSize: 13 }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowManualForm((s) => !s)}
              className="btn-cp btn-cp-lime"
            >
              {showManualForm ? '✕ Fechar formulário' : '＋ Registrar atividade manual'}
            </button>
          </div>

          
          <div className="d-flex flex-wrap align-items-center gap-2 mt-3">
            <small style={{ color: '#748a80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: 11 }}>
              Fonte:
            </small>
            {[
              { id: 'all', label: 'Todas' },
              { id: 'manual', label: ' Manual' },
              { id: 'shoe-sensor', label: ' Tênis' },
              { id: 'keychain', label: ' Chaveiro' },
              { id: 'esp32', label: ' Hub' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setDeviceFilter(f.id)}
                className={deviceFilter === f.id ? 'btn-cp btn-cp-primary' : 'btn-cp btn-cp-ghost'}
                style={{ padding: '6px 14px', fontSize: 12 }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      
      {showManualForm && (
        <section className="section-padding" style={{ paddingTop: 0, paddingBottom: 32 }}>
          <div className="cp-container">
            <ManualActivityForm onSubmit={(act) => {
              addManualActivity(act);
              setShowManualForm(false);
            }} />
          </div>
        </section>
      )}

      
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="cp-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20
          }}>
            {filteredMissions.length === 0 ? (
              <div className="cp-card text-center" style={{ gridColumn: '1 / -1' }}>
                <p style={{ color: '#748a80', margin: 0 }}>Nenhuma missão neste filtro.</p>
              </div>
            ) : filteredMissions.map((m) => {
              const devInfo = deviceLabels[m.device] || deviceLabels.manual;
              const connected = isDeviceConnected(m.device);
              const locked = m.device && m.device !== 'manual' && !connected && m.status !== 'done';
              return (
              <article
                key={m.id}
                className="cp-card"
                style={{
                  background: m.status === 'done'
                    ? 'linear-gradient(135deg, #f0faf5, #ffffff)'
                    : locked ? 'linear-gradient(135deg, #fafafa, #ffffff)' : 'white',
                  opacity: m.status === 'done' ? 0.85 : 1,
                  position: 'relative'
                }}
              >
                <div className="d-flex align-items-start justify-content-between gap-2 mb-3">
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: 'linear-gradient(135deg, #eaf5d8, #dbf3e6)',
                    display: 'grid', placeItems: 'center', fontSize: 24,
                    filter: locked ? 'grayscale(50%)' : 'none'
                  }}>
                    <Icon name={m.icon} size={26} />
                  </div>
                  <span style={{
                    background: 'rgba(28, 151, 112, 0.1)',
                    color: '#11614a',
                    fontSize: 11, fontWeight: 700,
                    padding: '4px 10px', borderRadius: 999, letterSpacing: '0.04em'
                  }}>
                    +{m.points} pts
                  </span>
                </div>

               
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    background: `${devInfo.color}15`,
                    color: devInfo.color,
                    fontSize: 11, fontWeight: 700,
                    padding: '3px 9px', borderRadius: 999,
                    letterSpacing: '0.02em'
                  }}>
                    <Icon name={devInfo.icon} size={16} /> {devInfo.name}
                  </span>
                  {connected && m.device !== 'manual' && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 3,
                      fontSize: 10, color: '#1c9770', fontWeight: 700
                    }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: '#1c9770', boxShadow: '0 0 0 3px rgba(28,151,112,.2)'
                      }} /> ao vivo
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: 16, marginBottom: 4 }}>{m.title}</h3>
                <small style={{ color: '#748a80', display: 'block', marginBottom: 12 }}>
                  {m.category} • ⏰ {m.deadline}
                </small>

                <div className="progress-bar-cp">
                  <div className="fill" style={{ width: `${m.progress}%` }}></div>
                </div>
                <small style={{ color: '#748a80', fontSize: 12, marginTop: 6, display: 'block' }}>
                  {m.progress}% concluído
                </small>

                {locked ? (
                  <Link
                    to="/sincronizacao"
                    className="btn-cp btn-cp-soft w-100 mt-3 text-center text-decoration-none"
                    style={{ display: 'block' }}
                  >
                    🔒 Conectar {deviceMap[m.device]?.name || 'dispositivo'}
                  </Link>
                ) : m.device && m.device !== 'manual' && m.status !== 'done' ? (
                  // Missão IoT com dispositivo conectado — captura automática
                  <div
                    className="w-100 mt-3 text-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(28,151,112,.08), rgba(147,203,82,.10))',
                      border: '1px dashed rgba(28,151,112,.35)',
                      borderRadius: 12,
                      padding: '10px 14px',
                      fontSize: 13,
                      color: '#11614a',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6
                    }}
                    aria-live="polite"
                  >
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: '#1c9770',
                      animation: 'pulseDot 1.8s ease-out infinite'
                    }} />
                    📡 Captura automática via {devInfo.name}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => completeMission(m.id)}
                    disabled={m.status === 'done'}
                    className={m.status === 'done' ? 'btn-cp btn-cp-soft w-100 mt-3' : 'btn-cp btn-cp-primary w-100 mt-3'}
                    style={m.status === 'done' ? { opacity: 0.7, cursor: 'default' } : undefined}
                  >
                    {m.status === 'done' ? '✓ Concluída' : 'Marcar como concluída'}
                  </button>
                )}
              </article>
              );
            })}
          </div>
        </div>
      </section>

    
      {manualActivities.length > 0 && (
        <section className="section-padding" style={{ paddingTop: 32 }}>
          <div className="cp-container">
            <h2 style={{ fontSize: 22, marginBottom: 16 }}>Histórico de atividades manuais</h2>
            <div className="cp-card p-0" style={{ overflow: 'hidden' }}>
              <table className="table table-hover mb-0">
                <thead style={{ background: '#f6f9f5' }}>
                  <tr>
                    <th style={{ padding: 14, fontSize: 13, color: '#11614a' }}>Tipo</th>
                    <th style={{ padding: 14, fontSize: 13, color: '#11614a' }}>Duração</th>
                    <th style={{ padding: 14, fontSize: 13, color: '#11614a' }}>Intensidade</th>
                    <th style={{ padding: 14, fontSize: 13, color: '#11614a' }}>Pontos</th>
                  </tr>
                </thead>
                <tbody>
                  {manualActivities.slice(0, 5).map((a) => (
                    <tr key={a.id}>
                      <td style={{ padding: 14, fontSize: 14 }}>{a.type}</td>
                      <td style={{ padding: 14, fontSize: 14 }}>{a.duration} min</td>
                      <td style={{ padding: 14, fontSize: 14 }}>{a.intensity}</td>
                      <td style={{ padding: 14, fontSize: 14, color: '#1c9770', fontWeight: 700 }}>+50 pts</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

    
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, #f6f9f5, #ffffff)' }}>
        <div className="cp-container">
          <span className="eyebrow">Conquistas</span>
          <h2 className="mt-2 mb-4">Badges desbloqueados</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 16
          }}>
            {badges.map((b) => (
              <div
                key={b.id}
                className="cp-card text-center"
                style={{
                  opacity: b.unlocked ? 1 : 0.45,
                  filter: b.unlocked ? 'none' : 'grayscale(80%)'
                }}
              >
                <div style={{ marginBottom: 8 }}><Icon name={b.icon} size={44} /></div>
                <h4 style={{ fontSize: 14, marginBottom: 4 }}>{b.title}</h4>
                <small style={{ color: '#748a80', fontSize: 12 }}>{b.description}</small>
                <div className="mt-2">
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                    color: b.unlocked ? '#1c9770' : '#748a80',
                    textTransform: 'uppercase'
                  }}>
                    {b.unlocked ? '✓ Desbloqueado' : '🔒 Bloqueado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ManualActivityForm({ onSubmit }) {
  const [type, setType] = useState('Caminhada');
  const [duration, setDuration] = useState(30);
  const [intensity, setIntensity] = useState('Moderada');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ type, duration, intensity, date: new Date().toLocaleDateString('pt-BR') });
  };

  return (
    <div className="cp-card" style={{ background: 'linear-gradient(135deg, #f0faf5, #ffffff)', border: '1px dashed rgba(28,151,112,0.3)' }}>
      <div className="d-flex align-items-center gap-2 mb-3">
        <span style={{ fontSize: 24 }}>📝</span>
        <h3 style={{ fontSize: 18, margin: 0 }}>Registrar atividade manual</h3>
      </div>
      <p style={{ fontSize: 13, color: '#748a80' }}>
        Para modalidades não detectadas pelos dispositivos integrados (natação, yoga, musculação, etc).
      </p>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <label htmlFor="act-type" className="form-label fw-semibold" style={{ fontSize: 13 }}>Tipo de atividade</label>
            <select
              id="act-type"
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ borderRadius: 10, borderColor: 'rgba(28,151,112,0.2)' }}
            >
              <option>Caminhada</option>
              <option>Natação</option>
              <option>Yoga</option>
              <option>Musculação</option>
              <option>Ciclismo indoor</option>
              <option>Pilates</option>
              <option>Dança</option>
            </select>
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="act-duration" className="form-label fw-semibold" style={{ fontSize: 13 }}>Duração (min)</label>
            <input
              id="act-duration"
              type="number"
              min="5"
              max="240"
              className="form-control"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              style={{ borderRadius: 10, borderColor: 'rgba(28,151,112,0.2)' }}
            />
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="act-intensity" className="form-label fw-semibold" style={{ fontSize: 13 }}>Intensidade</label>
            <select
              id="act-intensity"
              className="form-select"
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
              style={{ borderRadius: 10, borderColor: 'rgba(28,151,112,0.2)' }}
            >
              <option>Leve</option>
              <option>Moderada</option>
              <option>Intensa</option>
            </select>
          </div>
        </div>
        <div className="d-flex gap-2 mt-3">
          <button type="submit" className="btn-cp btn-cp-primary">Registrar +50 pts</button>
        </div>
      </form>
    </div>
  );
}
