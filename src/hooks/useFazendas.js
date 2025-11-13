import { useState, useEffect, useCallback } from 'react';
import { FazendaService } from '../services/FazendaService.js';

/**
 * Hook personalizado para gerenciar fazendas
 * @returns {Object} Objeto com estado e funções para gerenciar fazendas
 */
export const useFazendas = () => {
  const [fazendas, setFazendas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar todas as fazendas
  const loadFazendas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await FazendaService.getAll();
      setFazendas(data);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar fazendas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar fazendas na inicialização
  useEffect(() => {
    loadFazendas();
  }, [loadFazendas]);

  // Criar nova fazenda
  const createFazenda = useCallback(async (fazendaData) => {
    setLoading(true);
    setError(null);
    try {
      const id = await FazendaService.create(fazendaData);
      await loadFazendas(); // Recarregar lista
      return id;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadFazendas]);

  // Atualizar fazenda
  const updateFazenda = useCallback(async (id, updateData) => {
    setLoading(true);
    setError(null);
    try {
      await FazendaService.update(id, updateData);
      await loadFazendas(); // Recarregar lista
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadFazendas]);

  // Deletar fazenda
  const deleteFazenda = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await FazendaService.delete(id);
      await loadFazendas(); // Recarregar lista
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadFazendas]);

  // Buscar fazenda por ID
  const getFazendaById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const fazenda = await FazendaService.getById(id);
      return fazenda;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar fazenda por CNPJ
  const getFazendaByCnpj = useCallback(async (cnpj) => {
    setLoading(true);
    setError(null);
    try {
      const fazenda = await FazendaService.getByCnpj(cnpj);
      return fazenda;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar fazendas com filtros
  const searchFazendas = useCallback(async (filters) => {
    setLoading(true);
    setError(null);
    try {
      const results = await FazendaService.search(filters);
      setFazendas(results);
      return results;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Limpar filtros e recarregar todas as fazendas
  const clearFilters = useCallback(() => {
    loadFazendas();
  }, [loadFazendas]);

  return {
    fazendas,
    loading,
    error,
    createFazenda,
    updateFazenda,
    deleteFazenda,
    getFazendaById,
    getFazendaByCnpj,
    searchFazendas,
    clearFilters,
    loadFazendas
  };
};
