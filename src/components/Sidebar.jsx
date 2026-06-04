import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import ImgIcon from './Icon.jsx';


const Icon = ({ children, size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

const icons = {
  home:    <Icon><path d="M3 11l9-8 9 8" /><path d="M5 10v10a1 1 0 0 0 1 1h4v-7h4v7h4a1 1 0 0 0 1-1V10" /></Icon>,
  info:    <Icon><circle cx="12" cy="12" r="9" /><path d="M12 8v0" /><path d="M11 12h1v5h1" /></Icon>,
  map:     <Icon><path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z" /><path d="M9 4v14M15 6v14" /></Icon>,
  target:  <Icon><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></Icon>,
  sync:    <Icon><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></Icon>,
  gift:    <Icon><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M5 12v9h14v-9" /><path d="M12 8v13" /><path d="M12 8s-2-5-5-5-2 5 0 5" /><path d="M12 8s2-5 5-5 2 5 0 5" /></Icon>,
  trophy:  <Icon><path d="M8 4h8v4a4 4 0 0 1-8 0V4z" /><path d="M8 6H5a2 2 0 0 0 0 4h3" /><path d="M16 6h3a2 2 0 0 1 0 4h-3" /><path d="M12 12v4" /><path d="M9 20h6" /><path d="M10 16h4v4h-4z" /></Icon>,
  user:    <Icon><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Icon>,
  shield:  <Icon><path d="M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" /></Icon>,
  // controles
  chevronLeft:  <Icon size={20}><path d="M15 18l-6-6 6-6" /></Icon>,
  chevronRight: <Icon size={20}><path d="M9 6l6 6-6 6" /></Icon>,
  menu:    <Icon><path d="M4 6h16M4 12h16M4 18h16" /></Icon>,
  close:   <Icon><path d="M6 6l12 12M6 18L18 6" /></Icon>,
};

/* -------------------------------------------------------------------------- */
/*  Definição dos links de navegação                                          */
/* -------------------------------------------------------------------------- */
const baseLinks = [
  { to: '/',                label: 'Início',         icon: 'inicio',   end: true },
  { to: '/como-funciona',   label: 'Como funciona',  icon: 'informacao' },
  { to: '/jornadas',        label: 'Jornadas',       icon: 'mapa' },
  { to: '/missoes',         label: 'Missões',        icon: 'alvo' },
  { to: '/sincronizacao',   label: 'Sincronização',  icon: 'sincronizar' },
  { to: '/recompensas',     label: 'Recompensas',    icon: 'presente' },
  { to: '/perfil',          label: 'Perfil',         icon: 'usuario' },
  { to: '/lgpd',            label: 'LGPD',           icon: 'escudo' },
];

/* -------------------------------------------------------------------------- */
/*  Componente Sidebar                                                        */
/* -------------------------------------------------------------------------- */
export default function Sidebar() {
  // Estado de colapso persistido em localStorage (preferência do usuário)
  const [collapsed, setCollapsed] = useLocalStorage('careplus.sidebarCollapsed', false);
  // Estado de abertura do drawer no mobile
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { score, currentStage, userProfile } = useApp();
  const location = useLocation();

  // Insere "Ranking" antes de "Perfil" quando opt-in está ativo
  const links = userProfile?.rankingOptIn
    ? [
        ...baseLinks.slice(0, 6),
        { to: '/ranking', label: 'Ranking', icon: 'trofeu' },
        ...baseLinks.slice(6),
      ]
    : baseLinks;

  // Fecha o drawer mobile ao trocar de rota
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Bloqueia scroll do body quando drawer mobile está aberto
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Sincroniza o estado colapsado com uma classe no <body>.
  // Serve como fallback para browsers que não suportam o seletor :has()
  // — assim o ajuste da margem do conteúdo principal continua funcionando.
  useEffect(() => {
    document.body.classList.toggle('sidebar-is-collapsed', collapsed);
    return () => document.body.classList.remove('sidebar-is-collapsed');
  }, [collapsed]);

  return (
    <>
      {/* Botão flutuante para abrir drawer no mobile */}
      <button
        type="button"
        className="sidebar-mobile-toggle"
        aria-label="Abrir menu de navegação"
        aria-expanded={drawerOpen}
        onClick={() => setDrawerOpen(true)}
      >
        {icons.menu}
      </button>

      {/* Backdrop do drawer mobile */}
      <div
        className={`sidebar-backdrop ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`cp-sidebar ${collapsed ? 'collapsed' : ''} ${drawerOpen ? 'drawer-open' : ''}`}
        aria-label="Navegação principal"
      >
        {/* Cabeçalho: brand + botão de colapsar */}
        <div className="sidebar-head">
          <Link to="/" className="sidebar-brand" aria-label="CarePlus Journey — início">
            <span className="brand-icon">
              <ImgIcon name="logo" size={28} />
            </span>
            <span className="brand-copy">
              <strong>care<span>plus</span></strong>
              <small>journey</small>
            </span>
          </Link>

          {/* Botão de colapsar (visível em desktop) */}
          <button
            type="button"
            className="sidebar-toggle"
            aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
            aria-pressed={collapsed}
            title={collapsed ? 'Expandir menu' : 'Recolher menu'}
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? icons.chevronRight : icons.chevronLeft}
          </button>

          {/* Botão de fechar (apenas mobile) */}
          <button
            type="button"
            className="sidebar-close"
            aria-label="Fechar menu"
            onClick={() => setDrawerOpen(false)}
          >
            {icons.close}
          </button>
        </div>

        {/* Lista de navegação */}
        <nav className="sidebar-nav" aria-label="Seções da plataforma">
          <ul>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                  // Tooltip nativo quando colapsado — auxilia acessibilidade
                  title={collapsed ? l.label : undefined}
                >
                  <span className="sidebar-item-icon" aria-hidden="true">
                    <ImgIcon name={l.icon} size={22} />
                  </span>
                  <span className="sidebar-item-label">{l.label}</span>
                  {/* Tooltip customizado (CSS) quando colapsado */}
                  <span className="sidebar-tooltip" aria-hidden="true">{l.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Rodapé: pill de pontuação + estágio atual */}
        <div className="sidebar-foot">
          <div
            className="sidebar-score"
            title={collapsed ? `${score.toLocaleString('pt-BR')} pontos — ${currentStage.name}` : undefined}
          >
            <span className="score-emoji" aria-hidden="true">{currentStage.emoji}</span>
            <span className="score-copy">
              <strong>{score.toLocaleString('pt-BR')} pts</strong>
              <small>{currentStage.name}</small>
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
