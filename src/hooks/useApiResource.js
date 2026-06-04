

import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Encapsula o consumo de uma função assíncrona que retorna
 * dados de uma API. Garante que setState não seja chamado em
 * componente desmontado (evita warning no console).
 *
 * @param {Function} fetcher Função que retorna uma Promise<Array>
 * @param {Array} [deps] Lista de dependências para refetch
 * @returns {{ data: Array, isLoading: boolean, error: string|null, reload: Function }}
 */
export function useApiResource(fetcher, deps = []) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const isMountedRef = useRef(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      if (isMountedRef.current) {
        setData(result);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err.message || 'Erro desconhecido ao carregar dados.');
        setData([]);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
   
  }, deps);

  useEffect(() => {
    isMountedRef.current = true;
    load();
    return () => {
      isMountedRef.current = false;
    };
  }, [load]);

  return { data, isLoading, error, reload: load };
}
