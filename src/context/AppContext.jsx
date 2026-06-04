import { createContext, useContext, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { initialMissions, plantStages } from '../data/data.js';
import { fetchIntegrationActivities } from '../services/api.js';


const POINTS_PER_IMPORTED_ACTIVITY = 40;

const AppContext = createContext(null);

export function AppProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('cp:auth', false);
  const [userProfile, setUserProfile] = useLocalStorage('cp:profile', {
    name: 'Ana Martins',
    username: 'ana.martins',
    email: 'ana@careplus.com',
    plan: 'CarePlus Premium',
    rankingOptIn: false,
    notifications: { email: true, push: true, sms: false }
  });
  const [selectedJourney, setSelectedJourney] = useLocalStorage('cp:journey', 'vida-ativa');
  const [missions, setMissions] = useLocalStorage('cp:missions', initialMissions);
  const [score, setScore] = useLocalStorage('cp:score', 1240);
  const [streak, setStreak] = useLocalStorage('cp:streak', 23);
  const [redeemedRewards, setRedeemedRewards] = useLocalStorage('cp:redeemed', []);
  const [consent, setConsent] = useLocalStorage('cp:consent', false);
  const [manualActivities, setManualActivities] = useLocalStorage('cp:manualActs', []);
  const [iotConnections, setIotConnections] = useLocalStorage('cp:iot', {
    'shoe-sensor': true,
    'keychain': true,
    'esp32': true
  });
  const [appConnections, setAppConnections] = useLocalStorage('cp:apps', {
    strava: false,
    googlefit: true,
    applehealth: false,
    fitbit: false,
    garmin: false,
    samsung: false
  });

  
  const [importedActivities, setImportedActivities] = useLocalStorage('cp:imported', {});

 
  const [toast, setToast] = useState(null);

  const [syncingApp, setSyncingApp] = useState(null);

  const currentStage = useMemo(() => {
    return [...plantStages].reverse().find((s) => score >= s.min) || plantStages[0];
  }, [score]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    clearTimeout(showToast.timeout);
    showToast.timeout = setTimeout(() => setToast(null), 4000);
  };

  const login = (username) => {
    setIsAuthenticated(true);
    setUserProfile((p) => ({ ...p, username }));
    showToast('Login realizado com sucesso!');
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Você saiu da conta.');
  };

  const completeMission = (missionId) => {
    const mission = missions.find((m) => m.id === missionId);
    if (!mission || mission.status === 'done') return;
    // Missão atrelada a dispositivo IoT exige que o dispositivo esteja conectado
    if (mission.device && mission.device !== 'manual') {
      if (!iotConnections[mission.device]) {
        showToast('Conecte o dispositivo na página de Sincronização para concluir esta missão.', 'error');
        return;
      }
    }
    setMissions((curr) => curr.map((m) =>
      m.id === missionId ? { ...m, status: 'done', progress: 100 } : m
    ));
    setScore((s) => s + mission.points);
    showToast(`Missão concluída! +${mission.points} pontos.`);
  };

  const addManualActivity = (activity) => {
    setManualActivities((curr) => [{ ...activity, id: Date.now() }, ...curr]);
    setScore((s) => s + 50);
    showToast('Atividade registrada! +50 pts.');
  };

  const redeemReward = (reward) => {
    if (redeemedRewards.includes(reward.id)) return;
    if (score < reward.cost) {
      const missing = reward.cost - score;
      showToast(`Faltam ${missing.toLocaleString('pt-BR')} pontos para ${reward.title}.`, 'error');
      return;
    }
    setScore((s) => s - reward.cost);
    setRedeemedRewards((r) => [...r, reward.id]);
    showToast(`Recompensa resgatada: ${reward.title}.`);
  };

  const toggleIotDevice = (deviceId) => {
    if (!consent) {
      showToast('Autorize o consentimento LGPD antes de conectar dispositivos.', 'error');
      return;
    }

    const willConnect = !iotConnections[deviceId];
    setIotConnections((curr) => ({ ...curr, [deviceId]: !curr[deviceId] }));

    if (!willConnect) {
     
      showToast('Dispositivo desconectado.');
      return;
    }

    showToast('Dispositivo conectado. Sincronizando dados via MQTT...');

    const pendingForDevice = missions.filter(
      (m) => m.device === deviceId && m.status !== 'done'
    );

    if (pendingForDevice.length === 0) return;

   
    setTimeout(() => {
      const pointsGained = pendingForDevice.reduce((sum, m) => sum + m.points, 0);

      setMissions((curr) =>
        curr.map((m) =>
          pendingForDevice.some((p) => p.id === m.id)
            ? { ...m, status: 'done', progress: 100 }
            : m
        )
      );
      setScore((s) => s + pointsGained);

      const count = pendingForDevice.length;
      showToast(
        `✓ ${count} ${count === 1 ? 'missão validada automaticamente' : 'missões validadas automaticamente'} · +${pointsGained} pts`
      );
    }, 1500);
  };

  const toggleAppConnection = async (appId) => {
    if (!consent) {
      showToast('Autorize o consentimento LGPD antes de conectar aplicativos.', 'error');
      return;
    }

    const isConnected = appConnections[appId];

  
    if (isConnected) {
      setAppConnections((curr) => ({ ...curr, [appId]: false }));
    
      showToast('Aplicativo desconectado da plataforma.');
      return;
    }

    
    setSyncingApp(appId);
    setAppConnections((curr) => ({ ...curr, [appId]: true }));

    try {
      const activities = await fetchIntegrationActivities(appId, { useCache: false });

      const validated = activities.filter((a) => a._validation.status === 'validada');
      const suspicious = activities.filter((a) => a._validation.status === 'suspeita');

     
      setImportedActivities((curr) => ({ ...curr, [appId]: activities }));

      
      const pointsGained = validated.length * POINTS_PER_IMPORTED_ACTIVITY;
      if (pointsGained > 0) {
        setScore((s) => s + pointsGained);
      }

      if (activities.length === 0) {
        showToast('Conectado. Nenhuma atividade recente encontrada neste app.');
      } else if (suspicious.length > 0) {
      
        showToast(
          `✓ ${validated.length} ${validated.length === 1 ? 'atividade importada' : 'atividades importadas'} · +${pointsGained} pts · ${suspicious.length} retida${suspicious.length === 1 ? '' : 's'} p/ revisão`,
        );
      } else {
        showToast(
          `✓ ${validated.length} ${validated.length === 1 ? 'atividade importada e validada' : 'atividades importadas e validadas'} · +${pointsGained} pts`,
        );
      }
    } catch (err) {
     
      setAppConnections((curr) => ({ ...curr, [appId]: false }));
      showToast(`Não foi possível sincronizar: ${err.message}`, 'error');
    } finally {
      setSyncingApp(null);
    }
  };

  const value = {
  
    isAuthenticated, userProfile, selectedJourney, missions, score, streak,
    redeemedRewards, consent, manualActivities, iotConnections, appConnections,
    importedActivities, syncingApp,
    currentStage, toast,
  
    setUserProfile, setSelectedJourney, setConsent, setToast,
  
    login, logout, completeMission, addManualActivity, redeemReward,
    toggleIotDevice, toggleAppConnection, showToast
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp deve ser usado dentro de <AppProvider>');
  return ctx;
}
