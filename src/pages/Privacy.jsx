import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import { useApp } from '../context/AppContext.jsx';
import Icon from '../components/Icon.jsx';

const rights = [
  {
    icon: '🔎',
    title: 'Acesso',
    desc: 'Solicite a qualquer momento uma cópia completa dos dados que armazenamos sobre você.'
  },
  {
    icon: '📦',
    title: 'Portabilidade',
    desc: 'Exporte seus dados em formato JSON ou CSV para levar a outro serviço de saúde.'
  },
  {
    icon: '✏️',
    title: 'Correção',
    desc: 'Atualize informações imprecisas no perfil, jornada ou registros manuais.'
  },
  {
    icon: '🗑️',
    title: 'Exclusão',
    desc: 'Apague sua conta e todos os dados associados em até 15 dias úteis.'
  },
  {
    icon: '🔕',
    title: 'Revogação',
    desc: 'Desligue conexões com IoT e apps fit quando quiser, sem perder histórico local.'
  },
  {
    icon: '🛑',
    title: 'Oposição',
    desc: 'Recuse o uso de dados para finalidades secundárias como pesquisa estatística.'
  }
];

const dataInventory = [
  { categoria: 'Identificação', exemplos: 'Nome, e-mail, usuário', base: 'Execução do serviço', retencao: 'Enquanto a conta existir' },
  { categoria: 'Saúde / atividade', exemplos: 'Passos, treinos, frequência', base: 'Consentimento explícito', retencao: '12 meses (rolling)' },
  { categoria: 'Dispositivos IoT', exemplos: 'Sensor de tênis, chaveiro, ESP32', base: 'Consentimento explícito', retencao: 'Até desconexão' },
  { categoria: 'Apps fit', exemplos: 'Strava, Google Fit, Apple Health', base: 'Consentimento granular', retencao: 'Até revogação OAuth' },
  { categoria: 'Uso da plataforma', exemplos: 'Logs anônimos de navegação', base: 'Legítimo interesse', retencao: '90 dias' }
];

export default function Privacy() {
  const { consent, setConsent, showToast } = useApp();

  const handleToggle = () => {
    const next = !consent;
    setConsent(next);
    showToast(
      next ? 'Consentimento LGPD registrado.' : 'Consentimento revogado. Conexões pausadas.',
      next ? 'success' : 'error'
    );
  };

  return (
    <main className="container py-5">
      <PageHeader
        eyebrow="Lei Geral de Proteção de Dados"
        title="Sua privacidade é o ponto de partida"
        subtitle="A CarePlus Journey foi desenhada sob princípios LGPD: minimização de dados, consentimento granular, transparência e controle total nas mãos do usuário."
      >
        <div className="cp-card p-4">
          <p className="text-sm text-ink-soft mb-3" style={{ fontWeight: 600 }}>
            Status do consentimento
          </p>
          <div className="d-flex align-items-center gap-3 mb-3">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: 48,
                height: 48,
                background: consent ? 'var(--green)' : '#e5e7eb',
                color: 'white',
                fontSize: 22,
                transition: 'background .25s'
              }}
            >
              {consent ? '✓' : '✕'}
            </div>
            <div>
              <p className="mb-0" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                {consent ? 'Consentimento ativo' : 'Consentimento pendente'}
              </p>
              <p className="mb-0 text-sm text-ink-soft">
                {consent ? 'Coleta e sincronização autorizadas' : 'Coleta de dados desativada'}
              </p>
            </div>
          </div>
          <button
            type="button"
            className={consent ? 'btn-cp btn-cp-ghost w-100' : 'btn-cp btn-cp-primary w-100'}
            onClick={handleToggle}
          >
            {consent ? 'Revogar consentimento' : 'Autorizar coleta de dados'}
          </button>
        </div>
      </PageHeader>

      {/* Princípios */}
      <section className="mb-5">
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <article className="cp-card p-4 h-100">
              <span className="eyebrow mb-3">
                <span className="pulse-dot" /> Princípios
              </span>
              <h2 className="font-display" style={{ fontSize: '1.6rem', color: 'var(--ink)' }}>
                Como tratamos seus dados
              </h2>
              <ul className="mt-3 mb-0 ps-3" style={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
                <li><strong>Finalidade legítima:</strong> dados servem só ao seu bem-estar.</li>
                <li><strong>Minimização:</strong> coletamos apenas o necessário para a jornada escolhida.</li>
                <li><strong>Consentimento granular:</strong> autorize cada fonte (IoT, app) separadamente.</li>
                <li><strong>Transparência:</strong> mostramos o que é coletado, por quanto tempo e por quê.</li>
                <li><strong>Segurança:</strong> criptografia em trânsito (TLS) e em repouso (AES-256).</li>
                <li><strong>Não compartilhamento:</strong> dados sensíveis nunca são vendidos a terceiros.</li>
              </ul>
            </article>
          </div>
          <div className="col-12 col-lg-6">
            <article className="cp-card p-4 h-100">
              <span className="eyebrow mb-3">
                <span className="pulse-dot" /> Sem pressão social
              </span>
              <h2 className="font-display" style={{ fontSize: '1.6rem', color: 'var(--ink)' }}>
                Ranking é opcional
              </h2>
              <p className="text-ink-soft mb-3">
                O CarePlus Journey não impõe ranking público. Você decide se quer aparecer no
                leaderboard ou manter sua evolução totalmente privada. A Flora 🌱 cresce
                independentemente da comparação com outros usuários.
              </p>
              <Link to="/perfil" className="btn-cp btn-cp-soft">
                Ajustar preferência no perfil
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Direitos do titular */}
      <section className="mb-5">
        <h2 className="font-display mb-4" style={{ fontSize: '1.8rem', color: 'var(--ink)' }}>
          Seus direitos como titular
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {rights.map((r) => (
            <article key={r.title} className="cp-card p-4">
              <div
                className="d-flex align-items-center justify-content-center mb-3"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, rgba(28,151,112,.12), rgba(147,203,82,.18))',
                  fontSize: 28
                }}
              >
                <Icon name={r.icon} size={24} />
              </div>
              <h3 className="font-display" style={{ fontSize: '1.15rem', color: 'var(--ink)' }}>
                {r.title}
              </h3>
              <p className="text-sm text-ink-soft mb-0">{r.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Inventário de dados */}
      <section className="mb-5">
        <article className="cp-card p-4">
          <span className="eyebrow mb-3">
            <span className="pulse-dot" /> Inventário
          </span>
          <h2 className="font-display mb-3" style={{ fontSize: '1.6rem', color: 'var(--ink)' }}>
            O que coletamos e por quê
          </h2>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr style={{ color: 'var(--ink-soft)', fontSize: '.85rem' }}>
                  <th scope="col">Categoria</th>
                  <th scope="col">Exemplos</th>
                  <th scope="col">Base legal</th>
                  <th scope="col">Retenção</th>
                </tr>
              </thead>
              <tbody>
                {dataInventory.map((d) => (
                  <tr key={d.categoria}>
                    <td style={{ fontWeight: 600, color: 'var(--ink)' }}>{d.categoria}</td>
                    <td className="text-ink-soft">{d.exemplos}</td>
                    <td className="text-ink-soft">{d.base}</td>
                    <td className="text-ink-soft">{d.retencao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      {/* Contato DPO */}
      <section>
        <article
          className="cp-card p-5 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(28,151,112,.08), rgba(147,203,82,.12))',
            border: '1px solid rgba(28,151,112,.18)'
          }}
        >
          <span className="eyebrow mb-3">
            <span className="pulse-dot" /> Encarregado de dados
          </span>
          <h2 className="font-display mb-3" style={{ fontSize: '1.8rem', color: 'var(--ink)' }}>
            Fale com nosso DPO
          </h2>
          <p className="text-ink-soft mx-auto" style={{ maxWidth: 560 }}>
            Solicitações de acesso, correção ou exclusão são respondidas em até 15 dias úteis.
            Envie pedidos identificando seu nome completo e o direito que deseja exercer.
          </p>
          <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
            <a className="btn-cp btn-cp-primary" href="mailto:dpo@careplus.com.br">
              dpo@careplus.com.br
            </a>
            <Link to="/sincronizacao" className="btn-cp btn-cp-soft">
              Gerenciar conexões
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
