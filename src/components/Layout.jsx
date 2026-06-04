import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import Toast from './Toast.jsx';

export default function Layout() {
  const { pathname } = useLocation();

  // Scroll para o topo a cada mudança de rota — comportamento de site multi-página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-body">
        <main id="main-content">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toast />
    </div>
  );
}
