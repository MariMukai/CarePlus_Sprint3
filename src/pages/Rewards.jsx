import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useApiResource } from '../hooks/useApiResource.js';
import { fetchRewards } from '../services/api.js';
import Icon from '../components/Icon.jsx';

export default function Rewards() {
  const { score, redeemedRewards, redeemReward } = useApp();
  const [filter, setFilter] = useState('Todos');

  // ----------------------------------------------------------
  // Consumo de API (JSON Local) — /api/rewards.json
  // O hook useApiResource gerencia loading, erro e os dados.
  // ----------------------------------------------------------
  const { data: rewards, isLoading, error, reload } = useApiResource(fetchRewards);

  const categories = ['Todos', 'Virtual', 'CarePlus', 'Física'];
  const filtered = filter === 'Todos' ? rewards : rewards.filter((r) => r.type === filter);

  return (
    <>
      <PageHeader
        eyebrow="Catálogo de recompensas"
        title="Troque pontos por benefícios reais"
        subtitle="Acessórios virtuais, benefícios Care Plus em rede credenciada e recompensas físicas exclusivas."
      >
        <div className="cp-card text-center" style={{ background: 'linear-gradient(135deg, #93cb52, #6f9a2e)', color: 'white', border: 'none' }}>
          <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.85 }}>
            Sua carteira
          </div>
          <div className="fw-bold mt-2" style={{ fontSize: 42, fontFamily: 'Sora, sans-serif', letterSpacing: '-0.02em' }}>
            {score.toLocaleString('pt-BR')}
          </div>
          <small style={{ opacity: 0.9, fontSize: 12 }}>pontos disponíveis</small>
        </div>
      </PageHeader>

      {/* Filtros */}
      <section className="section-padding" style={{ paddingTop: 32, paddingBottom: 24 }}>
        <div className="cp-container">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div className="d-flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={filter === c ? 'btn-cp btn-cp-primary' : 'btn-cp btn-cp-soft'}
                  style={{ padding: '8px 16px', fontSize: 13 }}
                >
                  {c}
                </button>
              ))}
            </div>
            <small style={{ color: '#748a80', fontSize: 12 }}>
              📡 Dados carregados via API local <code>/api/rewards.json</code>
            </small>
          </div>
        </div>
      </section>

      {/* Estados de UI: Loading / Erro / Vazio / Dados */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="cp-container">
          {isLoading && (
            <div className="cp-card text-center" role="status" aria-live="polite">
              <div className="spinner-border text-success mb-3" style={{ width: 40, height: 40 }} />
              <p style={{ color: '#435d50', marginBottom: 0 }}>Carregando recompensas da API...</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="cp-card" role="alert" style={{ borderLeft: '4px solid #d9534f', background: '#fff5f5' }}>
              <h3 style={{ fontSize: 17, marginBottom: 6, color: '#a02828' }}>⚠️ Erro ao carregar recompensas</h3>
              <p style={{ color: '#a02828', fontSize: 14, marginBottom: 12 }}>{error}</p>
              <button type="button" onClick={reload} className="btn-cp btn-cp-primary">
                Tentar novamente
              </button>
            </div>
          )}

          {!isLoading && !error && filtered.length === 0 && (
            <div className="cp-card text-center">
              <p style={{ color: '#435d50' }}>Nenhuma recompensa encontrada para esta categoria.</p>
            </div>
          )}

          {!isLoading && !error && filtered.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 20
            }}>
              {filtered.map((r) => {
                const isRedeemed = redeemedRewards.includes(r.id);
                const canRedeem = score >= r.cost && !isRedeemed;
                const typeColors = {
                  Virtual: 'linear-gradient(135deg, #93cb52, #c0dd76)',
                  CarePlus: 'linear-gradient(135deg, #1c9770, #4bb884)',
                  Física: 'linear-gradient(135deg, #11614a, #1c9770)'
                };
                return (
                  <article key={r.id} className="cp-card position-relative">
                    {isRedeemed && (
                      <span style={{
                        position: 'absolute', top: 16, right: 16,
                        background: '#1c9770', color: 'white',
                        padding: '4px 10px', borderRadius: 999,
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.05em'
                      }}>
                        ✓ RESGATADA
                      </span>
                    )}

                    <div style={{
                      background: typeColors[r.type] || 'linear-gradient(135deg, #1c9770, #4bb884)',
                      borderRadius: 16,
                      padding: '32px 20px',
                      display: 'grid', placeItems: 'center',
                      fontSize: 64, marginBottom: 16,
                      color: 'white'
                    }}>
                      <Icon name={r.icon} size={30} />
                    </div>

                    <span style={{
                      background: 'rgba(28, 151, 112, 0.08)',
                      color: '#11614a', fontSize: 11,
                      padding: '3px 9px', borderRadius: 999, fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.06em'
                    }}>
                      {r.type}
                    </span>

                    <h3 style={{ fontSize: 17, marginTop: 10, marginBottom: 6 }}>{r.title}</h3>
                    <p style={{ color: '#748a80', fontSize: 13, marginBottom: 16 }}>{r.description}</p>

                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-bold" style={{ fontSize: 22, fontFamily: 'Sora, sans-serif', color: '#0d4d3c' }}>
                          {r.cost.toLocaleString('pt-BR')}
                        </div>
                        <small style={{ color: '#748a80', fontSize: 11 }}>pontos</small>
                      </div>
                      <button
                        type="button"
                        onClick={() => redeemReward(r)}
                        disabled={!canRedeem}
                        className={canRedeem ? 'btn-cp btn-cp-primary' : 'btn-cp btn-cp-soft'}
                        style={!canRedeem ? { opacity: 0.6, cursor: 'not-allowed' } : undefined}
                      >
                        {isRedeemed ? 'Resgatada' : canRedeem ? 'Resgatar' : 'Insuficiente'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Info importante */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="cp-container">
          <div className="cp-card" style={{ background: '#f6f9f5', borderLeft: '4px solid #1c9770' }}>
            <h3 style={{ fontSize: 17, marginBottom: 10 }}>ℹ️ Sobre as recompensas</h3>
            <ul style={{ paddingLeft: 18, margin: 0, fontSize: 14, color: '#435d50' }}>
              <li className="mb-1"><strong>Virtuais:</strong> personalização do avatar Flora. Sem equivalência em moeda real.</li>
              <li className="mb-1"><strong>CarePlus:</strong> benefícios em rede credenciada, gerenciados pela operadora.</li>
              <li><strong>Físicas:</strong> itens exclusivos enviados ao endereço cadastrado no plano.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
