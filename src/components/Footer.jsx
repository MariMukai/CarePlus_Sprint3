import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="cp-container">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <span style={{
                width: 44, height: 44, borderRadius: 14,
                background: 'linear-gradient(135deg, #93cb52, #1c9770)',
                display: 'grid', placeItems: 'center'
              }}>
                <Icon name="logo" size={28} />
              </span>
              <div>
                <strong style={{ color: 'white', fontFamily: 'Sora, sans-serif', fontSize: 19, letterSpacing: '-0.02em' }}>
                  care<span style={{ color: '#93cb52' }}>plus</span>
                </strong>
                <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
                  journey
                </div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', maxWidth: 320 }}>
              Plataforma gamificada de saúde preventiva que transforma o cuidado contínuo em
              uma jornada motivadora e segura, respeitando a LGPD.
            </p>
          </div>

          <div className="col-6 col-md-2">
            <h4>Plataforma</h4>
            <Link to="/como-funciona">Como funciona</Link>
            <Link to="/jornadas">Jornadas</Link>
            <Link to="/missoes">Missões</Link>
            <Link to="/recompensas">Recompensas</Link>
          </div>

          <div className="col-6 col-md-2">
            <h4>Conta</h4>
            <Link to="/perfil">Perfil</Link>
            <Link to="/sincronizacao">Dispositivos & Apps</Link>
            <Link to="/lgpd">Privacidade (LGPD)</Link>
          </div>

          <div className="col-12 col-md-4">
            <h4>Projeto Acadêmico</h4>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: '0 0 8px' }}>
              Challenge Care Plus — FIAP 2026<br />
              1º ano de Engenharia de Software
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
              <strong>Equipe 404 Girls Not Found:</strong><br />
              Giovanna O. F. Dias (RM 566647)<br />
              Maria Laura P. Druzeic (RM 566634)<br />
              Marianne M. Nishikawa (RM 568001)
            </p>
          </div>
        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.12)', margin: '36px 0 18px' }} />

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
          <span>© 2026 CarePlus Journey — Plataforma acadêmica, não substitui orientação médica profissional.</span>
          <span>Conforme LGPD (Lei 13.709/2018) • WCAG 2.1 AA</span>
        </div>
      </div>
    </footer>
  );
}
