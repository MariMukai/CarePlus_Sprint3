import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import { steps } from '../data/data.js';
import Icon from '../components/Icon.jsx';

export default function HowItWorks() {
  return (
    <>
      <PageHeader
        eyebrow="Visão geral"
        title="Como funciona o CarePlus Journey"
        subtitle="Quatro pilares que se conectam para tornar o cuidado preventivo uma experiência contínua, gratificante e segura."
      />

      <section className="section-padding" style={{ paddingTop: 32 }}>
        <div className="cp-container">
         
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24
          }}>
            {steps.map((step, idx) => (
              <article key={step.title} className={`cp-card reveal delay-${idx + 1}`}>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: 'linear-gradient(135deg, #1c9770 0%, #93cb52 100%)',
                    color: 'white', display: 'grid', placeItems: 'center',
                    fontSize: 26, boxShadow: '0 10px 22px rgba(28,151,112,0.3)'
                  }}>
                    <Icon name={step.icon} size={30} />
                  </div>
                  <span style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 36, fontWeight: 800,
                    color: 'rgba(28, 151, 112, 0.15)',
                    lineHeight: 1
                  }}>
                    0{idx + 1}
                  </span>
                </div>
                <h3 style={{ fontSize: 18, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ color: '#748a80', fontSize: 14, margin: 0 }}>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

     
    

     
      <section className="section-padding">
        <div className="cp-container">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6">
              <span className="eyebrow">Arquitetura</span>
              <h2 className="mt-2 mb-3">Edge Computing + Cloud</h2>
              <p style={{ color: '#435d50', fontSize: 16 }}>
                Os dados de saúde fluem do mundo físico para a plataforma digital através de
                uma arquitetura IoT robusta:
              </p>
              <ul className="list-unstyled mt-3">
                <ArchItem icon="👟" text="Sensores físicos no tênis e chaveiro inteligente" />
                <ArchItem icon="🛰️" text="ESP32 captura e envia via MQTT" />
                <ArchItem icon="☁️" text="FIWARE / Node-RED para roteamento e telemetria" />
                <ArchItem icon="⚛️" text="Frontend React + Vite + Tailwind + Bootstrap" />
                <ArchItem icon="🔒" text="TLS 1.2+ em trânsito · AES-256 em repouso" />
              </ul>
            </div>
            <div className="col-12 col-lg-6">
              <div className="cp-card position-relative" style={{ background: 'linear-gradient(135deg, #0d4d3c, #11614a)', color: 'white' }}>
                <pre style={{
                  color: '#dbf3e6',
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                  fontSize: 13,
                  lineHeight: 1.7,
                  margin: 0,
                  whiteSpace: 'pre-wrap'
                }}>
{`┌────────────────┐
│   👟 + 🔑      │  ← Sensores físicos
└───────┬────────┘
        │ Bluetooth 5.0
┌───────▼────────┐
│   🛰️ ESP32     │  ← Microcontrolador
└───────┬────────┘
        │ MQTT
┌───────▼────────┐
│  ☁️ FIWARE     │  ← Telemetria
└───────┬────────┘
        │ REST API
┌───────▼────────┐
│  ⚛️ CarePlus   │  ← Frontend React
│     Journey    │
└────────────────┘`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

   
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #1c9770 0%, #11614a 100%)', color: 'white' }}>
        <div className="cp-container text-center">
          <h2 style={{ color: 'white', fontSize: 36, marginBottom: 16 }}>Pronto para começar?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 600, margin: '0 auto 28px' }}>
            Escolha sua primeira jornada e desbloqueie o cuidado preventivo que cabe na sua rotina.
          </p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <Link to="/jornadas" className="btn-cp btn-cp-lime btn-cp-lg">Explorar jornadas →</Link>
            <Link to="/missoes" className="btn-cp btn-cp-ghost btn-cp-lg" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>
              Ver missões
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function PrincipleCard({ icon, title, desc }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="cp-card h-100">
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: 'rgba(28, 151, 112, 0.1)',
          display: 'grid', placeItems: 'center',
          fontSize: 24, marginBottom: 14
        }}>
          {icon}
        </div>
        <h4 style={{ fontSize: 17, marginBottom: 8 }}>{title}</h4>
        <p style={{ color: '#748a80', fontSize: 14, margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}

function ArchItem({ icon, text }) {
  return (
    <li className="d-flex align-items-center gap-3 mb-2 py-2">
      <span style={{
        width: 36, height: 36, borderRadius: 10,
        background: 'rgba(147, 203, 82, 0.2)',
        display: 'grid', placeItems: 'center', fontSize: 18,
        flexShrink: 0
      }}>{icon}</span>
      <span style={{ fontSize: 15, color: '#10221a', fontWeight: 500 }}>{text}</span>
    </li>
  );
}
