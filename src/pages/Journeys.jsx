import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useApiResource } from '../hooks/useApiResource.js';
import { fetchJourneys } from '../services/api.js';
import Icon from '../components/Icon.jsx';

export default function Journeys() {
  const { selectedJourney, setSelectedJourney, userProfile, setUserProfile, showToast } = useApp();
  const [filter, setFilter] = useState('todas');
  const [modalJourney, setModalJourney] = useState(null);

 
  const { data: journeys, isLoading, error } = useApiResource(fetchJourneys);

  const filteredJourneys = journeys.filter((j) => {
    if (filter === 'todas') return true;
    if (filter === 'movimento') return ['vida-ativa', 'cardio'].includes(j.id);
    if (filter === 'mental') return ['bem-estar'].includes(j.id);
    if (filter === 'cronico') return ['diabetes', 'cardio', 'emagrecimento'].includes(j.id);
    return true;
  });

  const handleSelect = (journey, rankingChoice = false) => {
    setSelectedJourney(journey.id);
    setUserProfile((p) => ({ ...p, rankingOptIn: rankingChoice }));
    setModalJourney(null);
    showToast(rankingChoice
      ? `Jornada "${journey.title}" selecionada e participação no ranking ativada.`
      : `Jornada "${journey.title}" selecionada sem ranking competitivo.`);
  };

  return (
    <>
      <PageHeader
        eyebrow="Trilhas temáticas"
        title="Escolha sua jornada"
        subtitle="Cada jornada é uma trilha de etapas progressivas, com objetivos claros, duração estimada e profissional de saúde de referência. Inscreva-se em quantas quiser."
      />

     
      <section className="section-padding" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <div className="cp-container">
          <div className="d-flex flex-wrap gap-2 align-items-center" role="tablist" aria-label="Filtros de categorias de jornadas">
            <span className="me-2 fw-semibold" style={{ fontSize: 13, color: '#748a80', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Filtrar:
            </span>
            {[
              { id: 'todas', label: 'Todas' },
              { id: 'movimento', label: 'Movimento' },
              { id: 'mental', label: 'Saúde mental' },
              { id: 'cronico', label: 'Crônicos' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={filter === f.id ? 'btn-cp btn-cp-primary' : 'btn-cp btn-cp-soft'}
                style={{ padding: '8px 16px', fontSize: 13 }}
                role="tab"
                aria-selected={filter === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

     
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="cp-container">
          {isLoading && (
            <div className="cp-card text-center" role="status" aria-live="polite">
              <div className="spinner-border text-success mb-3" style={{ width: 40, height: 40 }} />
              <p style={{ color: '#435d50', marginBottom: 0 }}>Carregando jornadas da API...</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="cp-card" role="alert" style={{ borderLeft: '4px solid #d9534f', background: '#fff5f5' }}>
              <h3 style={{ fontSize: 17, marginBottom: 6, color: '#a02828' }}>⚠️ Erro ao carregar jornadas</h3>
              <p style={{ color: '#a02828', fontSize: 14, marginBottom: 0 }}>{error}</p>
            </div>
          )}

          {!isLoading && !error && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24
          }}>
            {filteredJourneys.map((j, idx) => {
              const isSelected = selectedJourney === j.id;
              return (
                <article
                  key={j.id}
                  className={`cp-card reveal delay-${(idx % 4) + 1} position-relative`}
                  style={{
                    border: isSelected ? '2px solid #1c9770' : '1px solid rgba(28, 151, 112, 0.16)',
                    background: isSelected ? 'linear-gradient(135deg, #f0faf5, #ffffff)' : 'white'
                  }}
                >
                  {isSelected && (
                    <span style={{
                      position: 'absolute', top: 16, right: 16,
                      background: '#1c9770', color: 'white',
                      padding: '4px 10px', borderRadius: 999,
                      fontSize: 11, fontWeight: 700, letterSpacing: '0.05em'
                    }}>
                      ATIVA
                    </span>
                  )}

                  <div style={{
                    width: 64, height: 64, borderRadius: 18,
                    background: `linear-gradient(135deg, ${j.color}, ${j.color}cc)`,
                    color: 'white', display: 'grid', placeItems: 'center',
                    fontSize: 32, marginBottom: 16
                  }}>
                    <Icon name={j.icon} size={28} />
                  </div>

                  <h3 style={{ fontSize: 19, marginBottom: 10 }}>{j.title}</h3>
                  <p style={{ color: '#748a80', fontSize: 14, marginBottom: 16 }}>{j.description}</p>

                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {j.tags.map((tag) => (
                      <span key={tag} style={{
                        background: 'rgba(147, 203, 82, 0.18)',
                        color: '#11614a', fontSize: 11.5,
                        padding: '4px 10px', borderRadius: 999, fontWeight: 600
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="d-flex align-items-center gap-2 mb-4" style={{ fontSize: 13, color: '#435d50' }}>
                    <span>👨‍⚕️</span>
                    <span><strong>{j.professional}</strong></span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setModalJourney(j)}
                    className={isSelected ? 'btn-cp btn-cp-ghost w-100' : 'btn-cp btn-cp-primary w-100'}
                  >
                    {isSelected ? 'Selecionada' : 'Selecionar jornada'}
                  </button>
                </article>
              );
            })}
          </div>
          )}
        </div>
      </section>

      
      {modalJourney && (
        <JourneyModal
          journey={modalJourney}
          rankingOptIn={userProfile.rankingOptIn}
          onClose={() => setModalJourney(null)}
          onConfirm={handleSelect}
        />
      )}
    </>
  );
}

function JourneyModal({ journey, rankingOptIn, onClose, onConfirm }) {
  const [rankingChoice, setRankingChoice] = useState(rankingOptIn);

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      style={{ background: 'rgba(13, 61, 46, 0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target.classList.contains('modal')) onClose(); }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content reveal" style={{ borderRadius: 24, border: 'none', overflow: 'hidden' }}>
          <div className="modal-header border-0 pb-0" style={{ padding: '28px 28px 0' }}>
            <div className="d-flex align-items-center gap-3">
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: `linear-gradient(135deg, ${journey.color}, ${journey.color}cc)`,
                color: 'white', display: 'grid', placeItems: 'center', fontSize: 28
              }}>
                <Icon name={journey.icon} size={34} />
              </div>
              <div>
                <span className="eyebrow">Confirme sua jornada</span>
                <h3 className="mt-2 mb-0" style={{ fontSize: 24 }}>{journey.title}</h3>
              </div>
            </div>
            <button type="button" className="btn-close" aria-label="Fechar" onClick={onClose}></button>
          </div>
          <div className="modal-body" style={{ padding: '20px 28px' }}>
            <p style={{ color: '#435d50' }}>{journey.description}</p>

            <div className="row g-2 mt-2 mb-3">
              {journey.tags.map((t) => (
                <div key={t} className="col-auto">
                  <span style={{
                    background: 'rgba(147, 203, 82, 0.18)', color: '#11614a',
                    fontSize: 12, padding: '6px 12px', borderRadius: 999, fontWeight: 600
                  }}>{t}</span>
                </div>
              ))}
            </div>

            <div className="p-3" style={{ background: '#f6f9f5', borderRadius: 14, border: '1px solid rgba(28,151,112,0.12)' }}>
              <strong style={{ fontSize: 13, color: '#11614a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Profissional acompanhante
              </strong>
              <p style={{ margin: '6px 0 0', fontSize: 14 }}>{journey.professional}</p>
            </div>

            <div className="form-check mt-4 p-3" style={{ background: '#fff8e1', borderRadius: 12 }}>
              <input
                className="form-check-input"
                type="checkbox"
                id="ranking-opt-in"
                checked={rankingChoice}
                onChange={(e) => setRankingChoice(e.target.checked)}
              />
              <label className="form-check-label ms-2" htmlFor="ranking-opt-in" style={{ fontSize: 14 }}>
                <strong>Participar do ranking competitivo</strong> (opcional)<br />
                <span style={{ color: '#748a80', fontSize: 13 }}>
                  Você pode ativar/desativar a qualquer momento nas configurações de privacidade.
                </span>
              </label>
            </div>
          </div>
          <div className="modal-footer border-0" style={{ padding: '0 28px 28px' }}>
            <button type="button" onClick={onClose} className="btn-cp btn-cp-ghost">Cancelar</button>
            <button type="button" onClick={() => onConfirm(journey, rankingChoice)} className="btn-cp btn-cp-primary">
              Confirmar e iniciar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
