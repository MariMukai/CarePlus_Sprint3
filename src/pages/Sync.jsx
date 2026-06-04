import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import { useApp } from '../context/AppContext.jsx';
import { iotDevices, fitnessApps, telemetryData } from '../data/data.js';
import Icon from '../components/Icon.jsx';

export default function Sync() {
  const {
    consent, iotConnections, appConnections, missions,
    importedActivities, syncingApp,
    toggleIotDevice, toggleAppConnection, showToast
  } = useApp();
  const [authorizingApp, setAuthorizingApp] = useState(null);
  const [syncingNow, setSyncingNow] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('há 3 min');

  const connectedIotCount = Object.values(iotConnections).filter(Boolean).length;
  const connectedAppsCount = Object.values(appConnections).filter(Boolean).length;

  // Para o gráfico — pico do dia
  const maxHourly = useMemo(() => Math.max(...telemetryData.hourlySteps), []);

  const handleSyncAll = () => {
    if (!consent) {
      showToast('Aceite o consentimento LGPD para sincronizar dados.', 'error');
      return;
    }
    if (connectedIotCount === 0 && connectedAppsCount === 0) {
      showToast('Nenhum dispositivo ou app conectado para sincronizar.', 'error');
      return;
    }
    setSyncingNow(true);
    setTimeout(() => {
      setSyncingNow(false);
      setLastSyncTime('agora mesmo');
      showToast('Sincronização concluída! +80 pts pela atividade validada.');
    }, 2000);
  };

  return (
    <>
      <PageHeader
        eyebrow="Conexões"
        title="Sincronização IoT & Apps de Fitness"
        subtitle="Conecte os dispositivos físicos da Care Plus e seus aplicativos de fitness favoritos para que toda atividade seja capturada automaticamente — sem registro manual."
      >
        <div className="cp-card" style={{ background: 'linear-gradient(135deg, #11614a, #0d4d3c)', color: 'white', border: 'none' }}>
          <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 }}>
            Status atual
          </div>
          <div className="row g-2 mt-2">
            <div className="col-6">
              <div className="fw-bold" style={{ fontSize: 28, fontFamily: 'Sora, sans-serif' }}>{connectedIotCount}/3</div>
              <small style={{ opacity: 0.75, fontSize: 11 }}>dispositivos IoT</small>
            </div>
            <div className="col-6">
              <div className="fw-bold" style={{ fontSize: 28, fontFamily: 'Sora, sans-serif' }}>{connectedAppsCount}/6</div>
              <small style={{ opacity: 0.75, fontSize: 11 }}>apps conectados</small>
            </div>
          </div>
          <div className="mt-3 d-flex align-items-center gap-2" style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
            <span className="status-dot connected" style={{ width: 8, height: 8, borderRadius: 999, background: '#4ade80' }}></span>
            <span>Última sincronização: <strong style={{ color: 'white' }}>{lastSyncTime}</strong></span>
          </div>
        </div>
      </PageHeader>

      {/* Alerta LGPD */}
      {!consent && (
        <section style={{ paddingTop: 24 }}>
          <div className="cp-container">
            <div className="cp-card d-flex flex-wrap align-items-center gap-3" style={{ background: '#fff4e0', borderLeft: '4px solid #f59e0b' }}>
              <span style={{ fontSize: 28 }}>⚠️</span>
              <div className="flex-grow-1" style={{ minWidth: 240 }}>
                <strong style={{ fontSize: 15 }}>Consentimento LGPD pendente</strong>
                <p style={{ margin: '4px 0 0', fontSize: 14, color: '#435d50' }}>
                  Para conectar dispositivos e aplicativos, você precisa autorizar a coleta de dados de saúde.
                </p>
              </div>
              <Link to="/lgpd" className="btn-cp btn-cp-primary">Revisar privacidade →</Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA: Sincronizar agora */}
      <section className="section-padding" style={{ paddingTop: 40, paddingBottom: 24 }}>
        <div className="cp-container">
          <div className="cp-card d-flex flex-wrap justify-content-between align-items-center gap-4" style={{
            background: 'linear-gradient(135deg, #1c9770 0%, #157a5b 100%)',
            color: 'white', border: 'none'
          }}>
            <div>
              <span style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.75 }}>
                Sincronização instantânea
              </span>
              <h3 className="mt-2 mb-1" style={{ color: 'white', fontSize: 22 }}>
                Atualizar dados agora
              </h3>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>
                Coleta dados de todos os dispositivos e apps conectados via MQTT + REST.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSyncAll}
              disabled={syncingNow}
              className="btn-cp btn-cp-lime btn-cp-lg"
              style={syncingNow ? { opacity: 0.7, cursor: 'wait' } : undefined}
            >
              {syncingNow ? '⏳ Sincronizando...' : '🔄 Sincronizar tudo'}
            </button>
          </div>
        </div>
      </section>

      {/* DISPOSITIVOS IoT */}
      <section className="section-padding" style={{ paddingTop: 32 }}>
        <div className="cp-container">
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
            <div>
              <span className="eyebrow">Hardware proprietário</span>
              <h2 className="mt-2 mb-2">Dispositivos IoT da Care Plus</h2>
              <p style={{ color: '#435d50', fontSize: 16, maxWidth: 640 }}>
                Sensores físicos que capturam automaticamente sua atividade e transmitem
                via ESP32/MQTT para a plataforma FIWARE.
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 20
          }}>
            {iotDevices.map((d) => {
              const connected = iotConnections[d.id];
              const pendingMissions = missions.filter(
                (m) => m.device === d.id && m.status !== 'done'
              );
              return (
                <article key={d.id} className="cp-card device-card">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className={`iot-tile ${d.tileClass}`}><Icon name={d.icon} size={30} /></div>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className={`status-dot ${connected ? 'connected' : 'disconnected'}`}></span>
                        <small style={{ color: connected ? '#1c9770' : '#748a80', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {connected ? 'Conectado' : 'Desconectado'}
                        </small>
                      </div>
                      <h3 style={{ fontSize: 17, marginBottom: 2 }}>{d.name}</h3>
                      <small style={{ color: '#748a80', fontSize: 12 }}>{d.model}</small>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={connected}
                        onChange={() => toggleIotDevice(d.id)}
                        aria-label={`Conectar ${d.name}`}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <p style={{ fontSize: 13.5, color: '#435d50', marginBottom: 12 }}>
                    {d.description}
                  </p>

                  {/* Aviso de auto-sincronização */}
                  {pendingMissions.length > 0 && (
                    <div style={{
                      background: connected ? 'rgba(28,151,112,.08)' : 'rgba(147,203,82,.12)',
                      border: `1px dashed ${connected ? 'rgba(28,151,112,.4)' : 'rgba(147,203,82,.5)'}`,
                      borderRadius: 10,
                      padding: '8px 12px',
                      fontSize: 12.5,
                      color: '#11614a',
                      marginBottom: 12,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}>
                      <span style={{ fontSize: 16 }}>{connected ? '✅' : '🔄'}</span>
                      <span>
                        {connected
                          ? <>Captura ativa: <strong>{pendingMissions.length}</strong> {pendingMissions.length === 1 ? 'missão monitorada' : 'missões monitoradas'} em tempo real.</>
                          : <>Ao conectar, <strong>{pendingMissions.length}</strong> {pendingMissions.length === 1 ? 'missão pendente será validada' : 'missões pendentes serão validadas'} automaticamente.</>
                        }
                      </span>
                    </div>
                  )}

                  <div style={{ background: '#f6f9f5', borderRadius: 12, padding: 12 }}>
                    <small style={{ color: '#748a80', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Captura
                    </small>
                    <ul style={{ margin: '6px 0 0', paddingLeft: 18, fontSize: 13, color: '#10221a' }}>
                      {d.captures.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3" style={{ fontSize: 12, color: '#748a80' }}>
                    <span>📡 {d.protocol}</span>
                    {d.battery !== null && (
                      <span>🔋 {d.battery}%</span>
                    )}
                  </div>
                  {connected && (
                    <div className="mt-2" style={{ fontSize: 12, color: '#1c9770', fontWeight: 600 }}>
                      ⏱️ Última leitura: {d.lastSync}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* APPS DE FITNESS */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, #f6f9f5, #ffffff)' }}>
        <div className="cp-container">
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
            <div>
              <span className="eyebrow">Integrações externas</span>
              <h2 className="mt-2 mb-2">Aplicativos de Fitness</h2>
              <p style={{ color: '#435d50', fontSize: 16, maxWidth: 640 }}>
                Sincronize com seus apps favoritos e traga todo o histórico de atividades
                para o seu progresso na Flora.
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 20
          }}>
            {fitnessApps.map((app) => {
              const connected = appConnections[app.id];
              const isSyncing = syncingApp === app.id;
              const imported = importedActivities[app.id] || [];
              const validCount = imported.filter((a) => a._validation?.status === 'validada').length;
              const suspectCount = imported.filter((a) => a._validation?.status === 'suspeita').length;
              return (
                <article key={app.id} className="cp-card">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className={`app-brand-tile ${app.brandClass}`}>
                      <Icon name={app.icon} size={32} />
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className={`status-dot ${connected ? 'connected' : 'disconnected'}`} style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 999, background: connected ? '#4ade80' : '#c4c8cc' }}></span>
                        <small style={{ color: connected ? '#1c9770' : '#748a80', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {isSyncing ? 'Sincronizando…' : connected ? 'Sincronizando' : 'Desconectado'}
                        </small>
                      </div>
                      <h3 style={{ fontSize: 17, marginBottom: 2 }}>{app.name}</h3>
                      <small style={{ color: '#748a80', fontSize: 12 }}>{app.category}</small>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={connected}
                        disabled={isSyncing}
                        onChange={() => {
                          if (!consent) {
                            showToast('Aceite o consentimento LGPD antes de conectar apps.', 'error');
                            return;
                          }
                          if (!connected) {
                            setAuthorizingApp(app);
                          } else {
                            toggleAppConnection(app.id);
                          }
                        }}
                        aria-label={`Conectar ${app.name}`}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <p style={{ fontSize: 13.5, color: '#435d50', marginBottom: 12 }}>{app.description}</p>

                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {app.dataTypes.map((dt) => (
                      <span key={dt} style={{
                        background: 'rgba(28, 151, 112, 0.08)',
                        color: '#11614a', fontSize: 11.5,
                        padding: '3px 9px', borderRadius: 999, fontWeight: 600
                      }}>
                        {dt}
                      </span>
                    ))}
                  </div>

                  {/* Atividades importadas via API */}
                  {connected && imported.length > 0 && (
                    <div style={{ background: '#f6f9f5', borderRadius: 12, padding: 12, marginTop: 10, marginBottom: 10 }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <small style={{ color: '#748a80', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          Atividades importadas
                        </small>
                        <span style={{ fontSize: 11, color: '#1c9770', fontWeight: 700 }}>
                          {validCount} validada{validCount === 1 ? '' : 's'}
                          {suspectCount > 0 && <span style={{ color: '#b45309' }}> · {suspectCount} retida{suspectCount === 1 ? '' : 's'}</span>}
                        </span>
                      </div>
                      <ul className="list-unstyled" style={{ margin: 0 }}>
                        {imported.slice(0, 4).map((act) => {
                          const ok = act._validation?.status === 'validada';
                          return (
                            <li key={act.external_id} className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: 12.5 }}>
                              <span style={{ color: ok ? '#1c9770' : '#d97706', fontWeight: 700 }} title={ok ? 'Validada' : act._validation?.reason}>
                                {ok ? '✓' : '⚠'}
                              </span>
                              <span style={{ color: '#10221a', flexGrow: 1 }}>{act.name}</span>
                              <span style={{ color: '#748a80' }}>
                                {act.distance_m > 0
                                  ? `${(act.distance_m / 1000).toFixed(1)} km`
                                  : act.steps > 0
                                    ? `${act.steps.toLocaleString('pt-BR')} passos`
                                    : `${Math.round(act.moving_time_s / 60)} min`}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                      {suspectCount > 0 && (
                        <small style={{ display: 'block', marginTop: 6, fontSize: 11.5, color: '#b45309' }}>
                          ⚠ Atividades com valores implausíveis foram retidas para revisão (RN-05) e não pontuaram.
                        </small>
                      )}
                    </div>
                  )}

                  <small style={{ color: '#748a80', fontSize: 12 }}>
                    🔐 {app.permission}
                  </small>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* TELEMETRIA — Painel FIWARE simulado */}
      <section className="section-padding">
        <div className="cp-container">
          <span className="eyebrow">Painel FIWARE</span>
          <h2 className="mt-2 mb-4">Telemetria em tempo real</h2>

          <div className="row g-4">
            {/* Hourly chart */}
            <div className="col-12 col-lg-7">
              <div className="cp-card">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h3 style={{ fontSize: 17, marginBottom: 4 }}>Passos por hora — hoje</h3>
                    <small style={{ color: '#748a80' }}>Capturados pelo chaveiro inteligente</small>
                  </div>
                  <span style={{
                    background: 'rgba(74, 222, 128, 0.15)',
                    color: '#0f7c3a', fontSize: 11, fontWeight: 700,
                    padding: '4px 10px', borderRadius: 999
                  }}>
                    ● AO VIVO
                  </span>
                </div>

                <div className="bar-chart">
                  {telemetryData.hourlySteps.map((v, i) => (
                    <div
                      key={i}
                      className="bar"
                      style={{ height: `${Math.max(8, (v / maxHourly) * 100)}%` }}
                      title={`${i * 2}h: ${v} passos`}
                      aria-label={`${i * 2}h: ${v} passos`}
                    >
                      {i % 2 === 0 && <span>{i * 2}h</span>}
                    </div>
                  ))}
                </div>

                <div className="row text-center mt-4 pt-3" style={{ borderTop: '1px solid rgba(28,151,112,0.1)' }}>
                  <div className="col-4">
                    <div className="fw-bold" style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, color: '#0d4d3c' }}>
                      {telemetryData.hourlySteps.reduce((a, b) => a + b, 0).toLocaleString('pt-BR')}
                    </div>
                    <small style={{ color: '#748a80', fontSize: 12 }}>passos hoje</small>
                  </div>
                  <div className="col-4">
                    <div className="fw-bold" style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, color: '#0d4d3c' }}>
                      {maxHourly}
                    </div>
                    <small style={{ color: '#748a80', fontSize: 12 }}>pico horário</small>
                  </div>
                  <div className="col-4">
                    <div className="fw-bold" style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, color: '#0d4d3c' }}>
                      82%
                    </div>
                    <small style={{ color: '#748a80', fontSize: 12 }}>da meta diária</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly chart */}
            <div className="col-12 col-lg-5">
              <div className="cp-card h-100">
                <h3 style={{ fontSize: 17, marginBottom: 4 }}>Esta semana</h3>
                <small style={{ color: '#748a80', display: 'block', marginBottom: 16 }}>Total agregado por dia</small>

                {telemetryData.weeklySteps.map((v, i) => {
                  const max = Math.max(...telemetryData.weeklySteps);
                  return (
                    <div key={i} className="mb-2">
                      <div className="d-flex justify-content-between" style={{ fontSize: 13, marginBottom: 4 }}>
                        <span style={{ color: '#435d50', fontWeight: 600 }}>{telemetryData.dayLabels[i]}</span>
                        <span style={{ color: '#0d4d3c', fontWeight: 700 }}>{v.toLocaleString('pt-BR')}</span>
                      </div>
                      <div className="progress-bar-cp">
                        <div className="fill" style={{ width: `${(v / max) * 100}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Bootstrap Accordion */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, #f6f9f5, #ffffff)' }}>
        <div className="cp-container">
          <span className="eyebrow">Perguntas frequentes</span>
          <h2 className="mt-2 mb-4">Como funciona a sincronização?</h2>

          <div className="accordion" id="syncFaq" style={{ maxWidth: 820 }}>
            {[
              {
                q: 'Meus dados são compartilhados com terceiros?',
                a: 'Não. Os dados de saúde coletados são classificados como sensíveis pela LGPD e utilizados exclusivamente para as finalidades descritas na política de privacidade que você aceitou. Nenhum dado individual é compartilhado sem consentimento explícito.'
              },
              {
                q: 'Posso desconectar um aplicativo a qualquer momento?',
                a: 'Sim. Basta desativar o toggle do app correspondente. Todos os dados já coletados podem ser excluídos via página de Privacidade (LGPD), com processamento em até 15 dias úteis.'
              },
              {
                q: 'Como funciona a integração com Strava, Google Fit e Apple Health?',
                a: 'Cada integração usa a API oficial do app correspondente (Strava API, Google Fit Web API, HealthKit). Ao autorizar, a plataforma recebe permissão de leitura limitada aos dados de atividade — nunca permissão de escrita.'
              },
              {
                q: 'O que é o ESP32 e por que ele aparece aqui?',
                a: 'O ESP32 é o microcontrolador central que conecta os sensores físicos (tênis e chaveiro) à plataforma FIWARE via protocolo MQTT. Ele faz a "ponte" entre o mundo físico (Edge Computing) e a nuvem.'
              },
              {
                q: 'Posso registrar atividade manualmente mesmo com dispositivos conectados?',
                a: 'Sim, mas apenas para modalidades que os dispositivos não detectam — como natação, yoga ou musculação. Para passos e caminhada, o chaveiro inteligente faz a captura automaticamente, garantindo a integridade dos dados.'
              }
            ].map((item, i) => (
              <div className="accordion-item mb-2" key={i} style={{ borderRadius: 12, border: '1px solid rgba(28,151,112,0.12)', overflow: 'hidden' }}>
                <h3 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#faq-${i}`}
                    aria-expanded="false"
                    style={{ fontSize: 15, fontWeight: 600, color: '#0d4d3c' }}
                  >
                    {item.q}
                  </button>
                </h3>
                <div id={`faq-${i}`} className="accordion-collapse collapse" data-bs-parent="#syncFaq">
                  <div className="accordion-body" style={{ fontSize: 14.5, color: '#435d50' }}>
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de autorização */}
      {authorizingApp && (
        <AuthorizeModal
          app={authorizingApp}
          onClose={() => setAuthorizingApp(null)}
          onAuthorize={() => {
            toggleAppConnection(authorizingApp.id);
            setAuthorizingApp(null);
          }}
        />
      )}
    </>
  );
}

function AuthorizeModal({ app, onClose, onAuthorize }) {
  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      style={{ background: 'rgba(13, 61, 46, 0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target.classList.contains('modal')) onClose(); }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content reveal" style={{ borderRadius: 24, border: 'none', overflow: 'hidden' }}>
          <div className="modal-body p-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className={`app-brand-tile ${app.brandClass}`}>{app.tag}</div>
              <div>
                <span className="eyebrow">Autorizar acesso</span>
                <h3 className="mt-2 mb-0" style={{ fontSize: 22 }}>Conectar com {app.name}?</h3>
              </div>
            </div>

            <p style={{ fontSize: 14, color: '#435d50' }}>
              O CarePlus Journey solicitará permissão de <strong>leitura</strong> para os seguintes dados:
            </p>

            <ul className="list-unstyled" style={{ background: '#f6f9f5', borderRadius: 12, padding: 16, marginBottom: 16 }}>
              {app.dataTypes.map((dt) => (
                <li key={dt} className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: 14 }}>
                  <span style={{ color: '#1c9770', fontWeight: 700 }}>✓</span>
                  <span>{dt}</span>
                </li>
              ))}
            </ul>

            <div className="p-3 mb-3" style={{ background: '#fff8e1', borderRadius: 12, fontSize: 13, color: '#5b4710' }}>
              <strong>🔐 Importante:</strong> A plataforma <strong>nunca</strong> grava dados no {app.name}.
              O acesso é apenas de leitura e pode ser revogado a qualquer momento.
            </div>

            <div className="d-flex gap-2 justify-content-end">
              <button type="button" onClick={onClose} className="btn-cp btn-cp-ghost">Cancelar</button>
              <button type="button" onClick={onAuthorize} className="btn-cp btn-cp-primary">
                Autorizar e conectar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
