import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Icon from './Icon';

const baseLinks = [
  { to: '/', label: 'Início', end: true },
  { to: '/como-funciona', label: 'Como funciona' },
  { to: '/jornadas', label: 'Jornadas' },
  { to: '/missoes', label: 'Missões' },
  { to: '/sincronizacao', label: 'Sincronização' },
  { to: '/recompensas', label: 'Recompensas' },
  { to: '/perfil', label: 'Perfil' },
  { to: '/lgpd', label: 'LGPD' }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { score, currentStage, userProfile } = useApp();

  // Insere "Ranking" antes de "Perfil" quando o opt-in está ativo
  const links = userProfile?.rankingOptIn
    ? [
        ...baseLinks.slice(0, 6),
        { to: '/ranking', label: '🏆 Ranking' },
        ...baseLinks.slice(6)
      ]
    : baseLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav-shell" aria-label="Navegação principal">
        <Link to="/" className="brand-mark" aria-label="CarePlus Journey — início">
          <span className="logo">
            <Icon name="logo1" size={28} />
          </span>
          <span className="brand-copy">
            <strong>care<span>plus</span></strong>
            <small>journey</small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((s) => !s)}
        >
          {menuOpen ? '✕' : '☰'}
          <span className="sr-only">Menu</span>
        </button>

        <div id="main-nav" className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
          <span className="d-none d-lg-inline-flex align-items-center ms-2 px-3 py-2 rounded-pill" style={{ background: 'rgba(147, 203, 82, 0.18)', color: '#11614a', fontWeight: 700, fontSize: 13 }}>
            {currentStage.emoji} {score.toLocaleString('pt-BR')} pts
          </span>
        </div>
      </nav>
    </header>
  );
}
