

export const plantStages = [
  {
    id: 1,
    name: 'Iniciante',
    subtitle: 'Começando a cuidar',
    points: '0–249 pts',
    min: 0,
    emoji: '🌱',
    stageIcon: 'flora-1',
    color: '#84d3ab',
    description: 'Sua Flora acabou de ser plantada. Tudo começa com uma escolha simples por sua saúde.'
  },
  {
    id: 2,
    name: 'Explorador',
    subtitle: 'Criando raízes',
    points: '250–999 pts',
    min: 250,
    emoji: '🌿',
    stageIcon: 'flora-2',
    color: '#4bb884',
    description: 'Você está criando novos hábitos e descobrindo o poder das pequenas ações diárias.'
  },
  {
    id: 3,
    name: 'Guerreiro',
    subtitle: 'Fortalecendo hábitos',
    points: '1.000–2.499 pts',
    min: 1000,
    emoji: '🌳',
    stageIcon: 'flora-3',
    color: '#1c9770',
    description: 'Disciplina e constância te tornam mais forte. Sua Flora está cheia de energia.'
  },
  {
    id: 4,
    name: 'Campeão',
    subtitle: 'Inspirando outros',
    points: '2.500–4.999 pts',
    min: 2500,
    emoji: '🌲',
    stageIcon: 'flora-4',
    color: '#157a5b',
    description: 'Você é inspiração. Sua Flora floresce e mostra o poder do seu exemplo.'
  },
  {
    id: 5,
    name: 'Lenda da Saúde',
    subtitle: 'Sua melhor versão',
    points: '5.000+ pts',
    min: 5000,
    emoji: '🌴',
    stageIcon: 'flora-5',
    color: '#0d4d3c',
    description: 'Você alcançou o topo. Sua Flora se torna lendária e seu impacto vai mais longe.'
  }
];

export const steps = [
  {
    icon: '🧭',
    title: 'Escolha sua jornada',
    description: 'Selecione uma jornada pronta ou crie uma personalizada conforme seu perfil de saúde preventiva.'
  },
  {
    icon: '🎯',
    title: 'Complete missões',
    description: 'Desafios diários e semanais de hidratação, sono, atividade física e cuidado preventivo.'
  },
  {
    icon: '🏆',
    title: 'Ganhe pontos e recompensas',
    description: 'Acumule pontos, desbloqueie badges e troque conquistas por benefícios reais ou virtuais.'
  },
  {
    icon: '🌱',
    title: 'Evolua sua Flora',
    description: 'O avatar acompanha sua evolução visualmente e celebra cada etapa do seu cuidado.'
  }
];

export const journeys = [
  {
    id: 'emagrecimento',
    icon: '🥗',
    title: 'Emagrecimento Saudável',
    description: 'Hábitos alimentares, movimento e acompanhamento preventivo com foco em constância.',
    tags: ['Nutrição', 'Movimento', '30 dias'],
    professional: 'Nutricionista',
    color: '#a4ca4a'
  },
  {
    id: 'vida-ativa',
    icon: '🏃',
    title: 'Vida Ativa',
    description: 'Desafios progressivos de passos, caminhada e condicionamento para ganhar disposição.',
    tags: ['Exercício', 'Passos', '21 dias'],
    professional: 'Clínico geral',
    color: '#1c9770'
  },
  {
    id: 'bem-estar',
    icon: '🧘',
    title: 'Bem-estar Mental',
    description: 'Rotina de sono, pausas, respiração e mindfulness com incentivo acolhedor.',
    tags: ['Sono', 'Mindfulness', '28 dias'],
    professional: 'Psicólogo',
    color: '#7ad1c3'
  },
  {
    id: 'diabetes',
    icon: '💧',
    title: 'Controle da Diabetes',
    description: 'Registro de hábitos, atividade física e orientação de cuidado preventivo contínuo.',
    tags: ['Glicemia', 'Rotina', '45 dias'],
    professional: 'Endocrinologista',
    color: '#4285f4'
  },
  {
    id: 'cardio',
    icon: '❤️',
    title: 'Saúde Cardiovascular',
    description: 'Metas leves e progressivas para apoiar pressão, movimentação e acompanhamento médico.',
    tags: ['Cardio', 'Pressão', '30 dias'],
    professional: 'Cardiologista',
    color: '#ff6b88'
  },
  {
    id: 'personalizada',
    icon: '✨',
    title: 'Jornada Personalizada',
    description: 'Monte uma experiência adaptada ao seu objetivo com metas customizadas e recompensas.',
    tags: ['Customizável', 'Opt-in'],
    professional: 'Profissional indicado pela jornada',
    color: '#93cb52'
  }
];


export const initialMissions = [
  { id: 'agua', icon: '💧', title: 'Beber 8 copos d\'água', points: 120, status: 'pending', progress: 45, category: 'Hidratação', deadline: 'Hoje, 23:59', device: 'manual' },
  { id: 'caminhada', icon: '🚶', title: 'Caminhar por 30 minutos', points: 180, status: 'pending', progress: 60, category: 'Movimento', deadline: 'Hoje, 23:59', device: 'manual' },
  { id: 'sono', icon: '😴', title: 'Registrar qualidade do sono', points: 90, status: 'pending', progress: 0, category: 'Sono', deadline: 'Amanhã, 09:00', device: 'manual' },
  { id: 'respirar', icon: '🌬️', title: 'Fazer pausa de respiração', points: 70, status: 'pending', progress: 25, category: 'Bem-estar', deadline: 'Hoje, 23:59', device: 'manual' },
  { id: 'passos-semana', icon: '👟', title: 'Atingir 35.000 passos na semana', points: 320, status: 'pending', progress: 72, category: 'Movimento', deadline: 'Domingo, 23:59', device: 'keychain' },
  { id: 'meditacao', icon: '🧠', title: '5 sessões de meditação na semana', points: 250, status: 'pending', progress: 40, category: 'Bem-estar', deadline: 'Domingo, 23:59', device: 'manual' },

  
  { id: 'corrida-5k', icon: '🏃', title: 'Correr 5km com o sensor do tênis', points: 380, status: 'pending', progress: 55, category: 'Movimento', deadline: 'Domingo, 23:59', device: 'shoe-sensor' },
  { id: 'cadencia', icon: '⚡', title: 'Manter cadência > 140 ppm por 20min', points: 220, status: 'pending', progress: 30, category: 'Performance', deadline: 'Hoje, 23:59', device: 'shoe-sensor' },
  { id: 'caminhada-matinal', icon: '🌅', title: 'Caminhada matinal automática por 5 dias', points: 290, status: 'pending', progress: 60, category: 'Movimento', deadline: 'Domingo, 23:59', device: 'shoe-sensor' },


  { id: 'passos-diarios', icon: '👣', title: '8.000 passos detectados pelo chaveiro', points: 200, status: 'pending', progress: 78, category: 'Movimento', deadline: 'Hoje, 23:59', device: 'keychain' },
  { id: 'rotina-saida', icon: '🚪', title: 'Sair de casa em 5 dias seguidos', points: 160, status: 'pending', progress: 80, category: 'Hábitos', deadline: 'Domingo, 23:59', device: 'keychain' },
  { id: 'pausas-ativas', icon: '🔁', title: '3 pausas ativas durante o dia', points: 130, status: 'pending', progress: 33, category: 'Bem-estar', deadline: 'Hoje, 23:59', device: 'keychain' },

  
  { id: 'telemetria-semana', icon: '📡', title: 'Hub conectado 7 dias seguidos', points: 180, status: 'pending', progress: 71, category: 'Tecnologia', deadline: 'Domingo, 23:59', device: 'esp32' }
];

export const badges = [
  { id: 'b1', icon: '🌅', title: 'Primeira Semana Ativa', unlocked: true, description: '7 dias consecutivos de atividade' },
  { id: 'b2', icon: '💧', title: 'Hidratação Master', unlocked: true, description: '10 dias atingindo a meta de água' },
  { id: 'b3', icon: '👟', title: '10K Passos', unlocked: true, description: 'Atingiu 10.000 passos em um dia' },
  { id: 'b4', icon: '🔥', title: 'Streak 30 dias', unlocked: false, description: 'Mantenha 30 dias consecutivos' },
  { id: 'b5', icon: '🏆', title: 'Jornada Completa', unlocked: false, description: 'Conclua uma jornada inteira' },
  { id: 'b6', icon: '🌟', title: 'Lenda da Saúde', unlocked: false, description: 'Atinja o nível máximo' }
];

export const rewards = [
  { id: 'coroa', type: 'Virtual', icon: '👑', title: 'Coroa Dourada da Flora', cost: 450, description: 'Personalização visual para o avatar.' },
  { id: 'capa', type: 'Virtual', icon: '🦸', title: 'Capa de Herói', cost: 700, description: 'Acessório especial para celebrar constância.' },
  { id: 'consulta', type: 'CarePlus', icon: '🩺', title: 'Consulta de orientação', cost: 1200, description: 'Benefício simulado para cuidado preventivo.' },
  { id: 'farmacia', type: 'CarePlus', icon: '💊', title: 'Desconto em farmácia', cost: 800, description: 'Benefício físico simulado em rede parceira.' },
  { id: 'miniatura', type: 'Física', icon: '🌱', title: 'Miniatura da Flora', cost: 1600, description: 'Recompensa especial de conclusão de jornada.' },
  { id: 'spa', type: 'CarePlus', icon: '💆', title: 'Sessão de bem-estar', cost: 1400, description: 'Benefício de relaxamento na rede credenciada.' }
];

export const leaderboard = [
  { position: 1, name: 'Ana Clara', points: 12560, emoji: '👩', trend: '+3', stage: '🌴', stageIcon: 'flora-5', stageName: 'Lenda da Saúde' },
  { position: 2, name: 'Carlos Eduardo', points: 10890, emoji: '👨', trend: '+1', stage: '🌲', stageIcon: 'flora-4', stageName: 'Campeão' },
  { position: 3, name: 'Você', points: 9240, emoji: '🌳', trend: '+2', current: true, stage: '🌳', stageIcon: 'flora-3', stageName: 'Guerreiro' },
  { position: 4, name: 'Dona Sônia', points: 7890, emoji: '👵', trend: '-1', stage: '🌳', stageIcon: 'flora-3', stageName: 'Guerreiro' },
  { position: 5, name: 'Seu Pedro', points: 6530, emoji: '👴', trend: '-1', stage: '🌳', stageIcon: 'flora-3', stageName: 'Guerreiro' },
  { position: 6, name: 'Júlia Mendes', points: 5410, emoji: '👧', trend: '+5', stage: '🌿', stageIcon: 'flora-2', stageName: 'Explorador' },
  { position: 7, name: 'Rafael Santos', points: 4280, emoji: '🧔', trend: '+2', stage: '🌿', stageIcon: 'flora-2', stageName: 'Explorador' },
  { position: 8, name: 'Letícia Alves', points: 3150, emoji: '👩‍🦱', trend: '-2', stage: '🌿', stageIcon: 'flora-2', stageName: 'Explorador' }
];

export const iotDevices = [
  {
    id: 'shoe-sensor',
    icon: '👟',
    tileClass: 'iot-shoe',
    name: 'Dispositivo no Tênis',
    model: 'CarePlus Sole v2',
    protocol: 'Bluetooth 5.0 + MQTT',
    captures: ['Distância percorrida', 'Velocidade', 'Tempo de exercício', 'Tipo de atividade'],
    battery: 84,
    lastSync: 'há 12 min',
    description: 'Sensor acoplado ao tênis que captura atividade física automaticamente e transmite via MQTT.'
  },
  {
    id: 'keychain',
    icon: '🔑',
    tileClass: 'iot-keychain',
    name: 'Chaveiro Inteligente',
    model: 'CarePlus Tag',
    protocol: 'Bluetooth 5.0 + MQTT',
    captures: ['Contagem de passos automática', 'Movimento contínuo', 'Localização aproximada'],
    battery: 67,
    lastSync: 'há 3 min',
    description: 'Sensor portátil discreto que monitora passos de forma autônoma — sem registro manual.'
  },
  {
    id: 'esp32',
    icon: '🛰️',
    tileClass: 'iot-esp32',
    name: 'Hub ESP32',
    model: 'ESP32 + FIWARE',
    protocol: 'Wi-Fi 802.11 + MQTT',
    captures: ['Telemetria em tempo real', 'Roteamento para FIWARE', 'Sensores de saúde acoplados'],
    battery: null,
    lastSync: 'há 1 min',
    description: 'Microcontrolador central que conecta os dispositivos físicos à plataforma FIWARE/Node-RED.'
  }
];

export const fitnessApps = [
  {
    id: 'strava',
    name: 'Strava',
    tag: 'ST',
    brandClass: 'app-strava',
    icon: 'strava',
    category: 'Corrida & Ciclismo',
    description: 'Importa corridas, pedaladas e atividades segmentadas.',
    dataTypes: ['Distância', 'Pace', 'Elevação', 'Frequência cardíaca'],
    permission: 'Leitura de atividades'
  },
  {
    id: 'googlefit',
    name: 'Google Fit',
    tag: 'GF',
    icon: 'gh',
    brandClass: 'app-googlefit',
    category: 'Geral',
    description: 'Sincronização ampla de passos, calorias e minutos ativos.',
    dataTypes: ['Passos', 'Calorias', 'Minutos ativos', 'Sono'],
    permission: 'Leitura de fitness'
  },
  {
    id: 'applehealth',
    name: 'Apple Health',
    icon: 'ah',
    tag: 'AH',
    brandClass: 'app-applehealth',
    category: 'Geral',
    description: 'Coleta unificada de dados de saúde do ecossistema Apple.',
    dataTypes: ['Passos', 'Frequência cardíaca', 'Sono', 'Hidratação'],
    permission: 'HealthKit (somente leitura)'
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    tag: 'FB',
    icon: 'fitibit',
    brandClass: 'app-fitbit',
    category: 'Wearables',
    description: 'Dados de wearables Fitbit, sono e atividade contínua.',
    dataTypes: ['Passos', 'Sono', 'FC em repouso', 'Atividade'],
    permission: 'Web API Fitbit'
  },
  {
    id: 'garmin',
    name: 'Garmin Connect',
    tag: 'GA',
    icon: 'garmin',
    brandClass: 'app-garmin',
    category: 'Wearables',
    description: 'Métricas avançadas de treino para corrida e ciclismo.',
    dataTypes: ['Treinos', 'VO₂ máx', 'Carga de treino', 'Recuperação'],
    permission: 'Connect IQ'
  },
  {
    id: 'samsung',
    name: 'Samsung Health',
    tag: 'SH',
    icon: 'sh',
    brandClass: 'app-samsung',
    category: 'Geral',
    description: 'Dados de smartphone e wearables Galaxy Watch.',
    dataTypes: ['Passos', 'Sono', 'Stress', 'Hidratação'],
    permission: 'Samsung Health SDK'
  }
];


export const telemetryData = {
  hourlySteps: [120, 340, 580, 230, 90, 410, 720, 1200, 890, 560, 340, 180],
  weeklySteps: [6420, 8120, 7340, 9200, 5680, 10240, 8990],
  dayLabels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
};
