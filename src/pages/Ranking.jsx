
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useApiResource } from '../hooks/useApiResource.js';
import { fetchLeaderboard } from '../services/api.js';
 
const trendColor = (trend) => {
  if (trend.startsWith('+')) return { color: '#1c9770', bg: 'rgba(28,151,112,.12)' };
  if (trend.startsWith('-')) return { color: '#c0392b', bg: 'rgba(192,57,43,.10)' };
  return { color: '#748a80', bg: 'rgba(116,138,128,.10)' };
};
 
export default function Ranking() {
  const { userProfile, setUserProfile, score, currentStage, showToast } = useApp();
  const [period, setPeriod] = useState('week');
 
  // Consumo de API (JSON Local) — /api/leaderboard.json
  const { data: leaderboard, isLoading, error } = useApiResource(fetchLeaderboard);
 
  // -----------------------------------------------------------
  // IMPORTANTE — Rules of Hooks: TODOS os hooks (incl. useMemo)
  // devem ser chamados ANTES de qualquer return condicional.
  // Por isso calculamos top3/rest/me/podium aqui, mesmo quando
  // o leaderboard ainda está vazio (durante o loading).
  // -----------------------------------------------------------
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);
  const me = leaderboard.find((p) => p.current);
 
  // Pódio: 2º à esquerda, 1º no centro, 3º à direita
  const podium = useMemo(
    () => [top3[1], top3[0], top3[2]].filter(Boolean),
    [top3]
  );
 
  // Se opt-in desligado → tela explicativa com CTA
  if (!userProfile.rankingOptIn) {
    return (
      <main className="container py-5">
        <PageHeader
          eyebrow="Ranking opt-in"
          title="Você ainda não está no ranking"
          subtitle="A CarePlus Journey não impõe competição. Você só aparece se quiser — e pode sair a qualquer momento sem perder pontos."
        />
        <section>
          <div
            className="cp-card p-5 text-center mx-auto"
            style={{
              maxWidth: 640,
              background: 'linear-gradient(135deg, rgba(28,151,112,.06), rgba(147,203,82,.10))',
              border: '1px solid rgba(28,151,112,.18)'
            }}
          >
            <div style={{ marginBottom: 12 }}>
              <Icon name="aperto-de-mao" size={64} />
            </div>
            <h2 className="font-display" style={{ fontSize: '1.6rem', color: 'var(--ink)' }}>
              Quer entrar no ranking?
            </h2>
            <p className="text-ink-soft mx-auto mb-4" style={{ maxWidth: 460 }}>
              Sua posição é calculada apenas a partir de atividades validadas. Sua identidade
              fica visível só com o primeiro nome. Você pode sair quando quiser.
            </p>
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              <button
                type="button"
                className="btn-cp btn-cp-primary"
                onClick={() => {
                  setUserProfile((p) => ({ ...p, rankingOptIn: true }));
                  showToast('Bem-vinda ao ranking! 🌱');
                }}
              >
                ✓ Entrar no ranking
              </button>
              <Link to="/perfil" className="btn-cp btn-cp-soft">
                Ajustar no perfil
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }
 
  // Loading e erro do consumo de API
  if (isLoading) {
    return (
      <main className="container py-5">
        <div className="cp-card text-center" role="status" aria-live="polite">
          <div className="spinner-border text-success mb-3" style={{ width: 40, height: 40 }} />
          <p style={{ color: '#435d50', marginBottom: 0 }}>Carregando ranking da API...</p>
        </div>
      </main>
    );
  }
 
  if (error) {
    return (
      <main className="container py-5">
        <div className="cp-card" role="alert" style={{ borderLeft: '4px solid #d9534f', background: '#fff5f5' }}>
          <h3 style={{ fontSize: 17, marginBottom: 6, color: '#a02828' }}>⚠️ Erro ao carregar ranking</h3>
          <p style={{ color: '#a02828', fontSize: 14, marginBottom: 0 }}>{error}</p>
        </div>
      </main>
    );
  }
 
  return (
    <main className="container py-5">
      <PageHeader
        eyebrow="Ranking semanal"
        title="Pódio da Flora"
        subtitle="Comparação saudável entre quem optou por participar. A pontuação considera apenas atividades validadas por dispositivos IoT, apps fit ou registros manuais."
      >
        {me && (
          <div className="cp-card p-4" style={{
            background: 'linear-gradient(135deg, #1c9770, #11614a)',
            color: 'white',
            border: 'none'
          }}>
            <p className="mb-3" style={{ opacity: .8, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', fontSize: 11 }}>
              Sua posição
            </p>
            <div className="d-flex align-items-center gap-3">
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: 'rgba(255,255,255,.18)',
                display: 'grid', placeItems: 'center',
                fontWeight: 800, fontSize: 26, fontFamily: 'Sora, sans-serif'
              }}>
                #{me.position}
              </div>
              <div>
                <p className="mb-0" style={{ fontWeight: 700, fontSize: 18 }}>
                  <Icon name={currentStage.stageIcon} size={20} /> {me.name}
                </p>
                <p className="mb-0" style={{ opacity: .85, fontSize: 13 }}>
                  {score.toLocaleString('pt-BR')} pts · {me.trend} esta semana
                </p>
              </div>
            </div>
          </div>
        )}
      </PageHeader>
 
      {/* Filtro de período */}
      <section className="mb-4">
        <div className="d-flex justify-content-between flex-wrap gap-3 align-items-center">
          <div className="d-flex gap-2" role="tablist">
            {[
              { id: 'week', label: 'Semanal' },
              { id: 'month', label: 'Mensal' },
              { id: 'all', label: 'Geral' }
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPeriod(p.id)}
                className={period === p.id ? 'btn-cp btn-cp-primary' : 'btn-cp btn-cp-soft'}
                style={{ padding: '8px 16px', fontSize: 13 }}
              >
                {p.label}
              </button>
            ))}
          </div>
          <small className="text-ink-soft">
            Atualizado em tempo real conforme suas conexões.
          </small>
        </div>
      </section>
 
      {/* Pódio visual */}
      <section className="mb-5">
        <div
          className="d-flex justify-content-center align-items-end gap-3 gap-md-4 flex-wrap"
          style={{ minHeight: 320 }}
        >
          {podium.map((p) => {
            const height = p.position === 1 ? 240 : p.position === 2 ? 200 : 170;
            const medal = p.position === 1 ? '🥇' : p.position === 2 ? '🥈' : '🥉';
            const podiumGradient = p.position === 1
              ? 'linear-gradient(180deg, #93cb52, #1c9770)'
              : p.position === 2
                ? 'linear-gradient(180deg, #cde9b8, #93cb52)'
                : 'linear-gradient(180deg, #dbf3e6, #6ab27e)';
 
            return (
              <div
                key={p.position}
                className="text-center"
                style={{ width: 'min(180px, 28vw)' }}
              >
                {/* Avatar acima do pódio */}
                <div
                  className="mx-auto mb-3 position-relative"
                  style={{
                    width: 84, height: 84, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f0faf5, #ffffff)',
                    display: 'grid', placeItems: 'center',
                    fontSize: 42,
                    boxShadow: '0 12px 28px rgba(28,151,112,.18)',
                    border: '3px solid white'
                  }}
                >
                  {p.current
                    ? <Icon name={currentStage.stageIcon} size={56} />
                    : p.emoji}
                  <span
                    style={{ position: 'absolute', top: -8, right: -8, fontSize: 26 }}
                    aria-hidden
                  >
                    {medal}
                  </span>
                </div>
                <p className="mb-1" style={{ fontWeight: 800, color: 'var(--ink)', fontSize: 15 }}>
                  {p.name}
                </p>
                <p className="mb-2 text-ink-soft" style={{ fontSize: 12 }}>
                  <Icon name={p.stageIcon} size={16} /> {p.stageName}
                </p>
 
                {/* Bloco do pódio */}
                <div
                  style={{
                    height,
                    background: podiumGradient,
                    borderRadius: '14px 14px 4px 4px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 14px 30px rgba(28,151,112,.22)'
                  }}
                >
                  <span style={{ fontSize: 48, fontFamily: 'Sora, sans-serif', fontWeight: 800, lineHeight: 1 }}>
                    {p.position}º
                  </span>
                  <span style={{ fontSize: 13, opacity: .9, marginTop: 6, fontWeight: 600 }}>
                    {p.points.toLocaleString('pt-BR')} pts
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
 
      {/* Lista do restante */}
      <section className="mb-5">
        <h2 className="font-display mb-3" style={{ fontSize: '1.4rem', color: 'var(--ink)' }}>
          Demais posições
        </h2>
        <ul className="list-unstyled m-0">
          {rest.map((p) => {
            const t = trendColor(p.trend);
            return (
              <li
                key={p.position}
                className="d-flex align-items-center gap-3 p-3 mb-2"
                style={{
                  background: p.current ? 'linear-gradient(135deg, #eaf5d8, #ffffff)' : 'white',
                  borderRadius: 14,
                  border: p.current ? '2px solid #1c9770' : '1px solid rgba(28,151,112,.10)',
                  boxShadow: p.current ? '0 10px 24px rgba(28,151,112,.12)' : 'none'
                }}
              >
                <span style={{
                  width: 36, height: 36, borderRadius: 999,
                  background: '#f6f9f5',
                  color: '#11614a',
                  display: 'grid', placeItems: 'center',
                  fontWeight: 800, fontFamily: 'Sora, sans-serif',
                  fontSize: 14,
                  border: '1px solid rgba(28,151,112,0.15)'
                }}>
                  {p.position}
                </span>
                <span style={{ fontSize: 28 }}>
                  {p.current
                    ? <Icon name={currentStage.stageIcon} size={32} />
                    : p.emoji}
                </span>
                <div className="flex-grow-1">
                  <strong style={{ fontSize: 14, color: 'var(--ink)' }}>
                    {p.name} {p.current && <small style={{ color: '#1c9770', fontWeight: 700 }}>• Você</small>}
                  </strong>
                  <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
                    <Icon name={p.stageIcon} size={16} /> {p.stageName}
                  </div>
                </div>
                <span
                  className="d-none d-sm-inline-block"
                  style={{
                    fontSize: 11, fontWeight: 700,
                    color: t.color, background: t.bg,
                    padding: '4px 10px', borderRadius: 999
                  }}
                >
                  {p.trend}
                </span>
                <strong style={{ fontSize: 15, color: '#11614a', minWidth: 80, textAlign: 'right' }}>
                  {p.points.toLocaleString('pt-BR')} pts
                </strong>
              </li>
            );
          })}
        </ul>
      </section>
 
      {/* Rodapé: explicação + opt-out */}
      <section>
        <div className="row g-4">
          <div className="col-12 col-lg-7">
            <article className="cp-card p-4 h-100">
              <span className="eyebrow mb-3">
                <span className="pulse-dot" /> Transparência
              </span>
              <h3 className="font-display" style={{ fontSize: '1.3rem', color: 'var(--ink)' }}>
                Como a pontuação é calculada
              </h3>
              <ul className="mb-0 ps-3" style={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
                <li>Missões IoT (tênis, chaveiro) somam pontos automaticamente quando validadas pelo dispositivo</li>
                <li>Apps fit conectados (Strava, Google Fit etc.) contam após o sync</li>
                <li>Atividades manuais valem +50 pts por registro e passam por revisão semanal</li>
                <li>Nenhum dado clínico sensível entra no cálculo público</li>
              </ul>
            </article>
          </div>
          <div className="col-12 col-lg-5">
            <article
              className="cp-card p-4 h-100 text-center d-flex flex-column justify-content-center"
              style={{ background: 'linear-gradient(135deg, #f6f9f5, #ffffff)' }}
            >
              <h3 className="font-display mb-2" style={{ fontSize: '1.2rem', color: 'var(--ink)' }}>
                Quer sair do ranking?
              </h3>
              <p className="text-ink-soft mb-3" style={{ fontSize: 14 }}>
                Sua participação é sempre voluntária. Saindo, você continua acumulando pontos e
                evoluindo a Flora — só não aparece publicamente.
              </p>
              <button
                type="button"
                className="btn-cp btn-cp-soft"
                onClick={() => {
                  setUserProfile((p) => ({ ...p, rankingOptIn: false }));
                  showToast('Você saiu do ranking. Seus pontos continuam.', 'success');
                }}
              >
                Sair do ranking
              </button>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
 