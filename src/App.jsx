import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import Journeys from './pages/Journeys.jsx';
import Missions from './pages/Missions.jsx';
import Sync from './pages/Sync.jsx';
import Rewards from './pages/Rewards.jsx';
import Profile from './pages/Profile.jsx';
import Privacy from './pages/Privacy.jsx';
import Ranking from './pages/Ranking.jsx';

export default function App() {
  return (
    <Routes>
    
      <Route path="/login" element={<Login />} />

      
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/como-funciona" element={<HowItWorks />} />
        <Route path="/jornadas" element={<Journeys />} />
        <Route path="/missoes" element={<Missions />} />
        <Route path="/sincronizacao" element={<Sync />} />
        <Route path="/recompensas" element={<Rewards />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/lgpd" element={<Privacy />} />
      </Route>

      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
