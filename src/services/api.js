// =============================================================
// CarePlus Journey — Camada de serviço de API
// =============================================================
// Centraliza o consumo de dados a partir da API JSON local
// servida pelo Vite na pasta /public/api. Cumpre o requisito
// "Consumo de API (JSON Local)" do escopo de Web Development.
// =============================================================

/**
 * Base URL da API local. Como o Vite serve /public na raiz,
 * os arquivos JSON em /public/api/*.json ficam acessíveis
 * em runtime via fetch('/api/<recurso>.json').
 */
const API_BASE_URL = '/api';

/**
 * Cache simples em memória para evitar refetch desnecessário
 * dentro da mesma sessão de navegação. Reinicia ao recarregar
 * a página — adequado para protótipo acadêmico.
 */
const memoryCache = new Map();

/**
 * Função utilitária que faz GET no endpoint JSON local, trata
 * erros HTTP e devolve o array `data` do envelope padronizado.
 *
 * Envelope esperado:
 *   { "_meta": {...}, "data": [...] }
 *
 * @param {string} resource Nome do recurso (ex: "journeys", "rewards")
 * @param {Object} [options] Opções: { useCache: boolean }
 * @returns {Promise<Array>} Array de objetos do recurso
 */
async function fetchJsonResource(resource, options = {}) {
  const { useCache = true } = options;
  const url = `${API_BASE_URL}/${resource}.json`;

  // Reutiliza dados já carregados na sessão
  if (useCache && memoryCache.has(url)) {
    return memoryCache.get(url);
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error(
        `Falha ao carregar ${resource}: HTTP ${response.status} ${response.statusText}`
      );
    }

    const payload = await response.json();

    // Tolera tanto o envelope { data: [...] } quanto array puro
    const data = Array.isArray(payload) ? payload : payload.data;

    if (!Array.isArray(data)) {
      throw new Error(`Resposta inválida da API para ${resource}: campo "data" não é uma lista.`);
    }

    memoryCache.set(url, data);
    return data;
  } catch (error) {
    // Erros de rede também caem aqui (TypeError do fetch).
    // Encapsulamos com mensagem mais clara para a UI.
    console.error(`[api.js] Erro ao consumir ${url}:`, error);
    throw new Error(`Não foi possível carregar "${resource}". ${error.message}`);
  }
}

// ---------- Funções públicas por recurso ----------

export function fetchJourneys(options) {
  return fetchJsonResource('journeys', options);
}

export function fetchRewards(options) {
  return fetchJsonResource('rewards', options);
}

export function fetchBadges(options) {
  return fetchJsonResource('badges', options);
}

export function fetchLeaderboard(options) {
  return fetchJsonResource('leaderboard', options);
}

// ---------- Integracoes de fitness (Strava, Google Fit, Apple Health...) ----------

/**
 * Limites fisiologicos usados para validar atividades importadas.
 * Reflete as regras de negocio RN-04 (validacao obrigatoria) e
 * RN-05 (sinalizacao de valores implausiveis) do escopo.
 */
const VALIDATION_LIMITS = {
  maxSteps: 60000,          // > limite diario humano plausivel
  maxSpeedMs: 12,           // ~43 km/h: acima disso nao e atividade humana a pe/corrida
  maxDistanceM: 100000,     // 100 km em uma unica sessao
  maxMovingTimeS: 86400     // 24h
};

/**
 * Aplica as regras de validacao a uma atividade importada.
 * Atividades implausiveis NAO sao descartadas silenciosamente: recebem
 * status 'suspeita' e ficam retidas (RN-05), sem gerar pontuacao (RN-04).
 *
 * @param {Object} activity Atividade no formato normalizado da API de integracoes
 * @returns {{ status: 'validada'|'suspeita', reason: string|null }}
 */
export function validateImportedActivity(activity) {
  const reasons = [];
  if (activity.steps != null && activity.steps > VALIDATION_LIMITS.maxSteps) {
    reasons.push('contagem de passos acima do limite fisiologico');
  }
  if (activity.average_speed_ms != null && activity.average_speed_ms > VALIDATION_LIMITS.maxSpeedMs) {
    reasons.push('velocidade media implausivel');
  }
  if (activity.distance_m != null && activity.distance_m > VALIDATION_LIMITS.maxDistanceM) {
    reasons.push('distancia acima do limite por sessao');
  }
  if (activity.moving_time_s != null && activity.moving_time_s > VALIDATION_LIMITS.maxMovingTimeS) {
    reasons.push('duracao acima de 24h');
  }
  return reasons.length > 0
    ? { status: 'suspeita', reason: reasons.join('; ') }
    : { status: 'validada', reason: null };
}

/**
 * Busca as atividades importadas de um provedor de fitness especifico.
 *
 * Na Sprint 1/2 consome o mock local /api/integrations.json. Na Sprint 3
 * (RF-18) bastaria apontar este fetch para o endpoint OAuth real do
 * provedor — o contrato de dados normalizado abaixo permanece o mesmo,
 * entao a UI nao muda.
 *
 * Cada atividade vem anotada com o resultado da validacao (RN-04/RN-05).
 *
 * @param {string} provider id do app (ex: 'strava', 'googlefit', 'applehealth')
 * @param {Object} [options] { useCache: boolean }
 * @returns {Promise<Array>} Atividades do provedor, com { _validation } anexado
 */
export async function fetchIntegrationActivities(provider, options) {
  const all = await fetchJsonResource('integrations', options);
  return all
    .filter((act) => act.provider === provider)
    .map((act) => ({ ...act, _validation: validateImportedActivity(act) }));
}

/**
 * Invalida o cache em memória. Útil ao forçar um reload
 * dos dados após uma ação do usuário.
 */
export function invalidateCache(resource) {
  if (resource) {
    memoryCache.delete(`${API_BASE_URL}/${resource}.json`);
  } else {
    memoryCache.clear();
  }
}
