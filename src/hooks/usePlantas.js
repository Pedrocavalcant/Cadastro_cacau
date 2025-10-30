import { useState, useEffect, useCallback } from 'react';
import { PlantaService } from '../services/PlantaService.js';

/**
 * Hook personalizado para gerenciar plantas
 * @returns {Object} Objeto com estado e funções para gerenciar plantas
 */
export const usePlantas = () => {
  const [plantas, setPlantas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar todas as plantas
  const loadPlantas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await PlantaService.getAll();
      setPlantas(data);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar plantas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar plantas na inicialização
  useEffect(() => {
    loadPlantas();
  }, [loadPlantas]);

  // Criar nova planta
  const createPlanta = useCallback(async (plantaData) => {
    setLoading(true);
    setError(null);
    try {
      const id = await PlantaService.create(plantaData);
      await loadPlantas(); // Recarregar lista
      return id;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadPlantas]);

  // Atualizar planta
  const updatePlanta = useCallback(async (id, updateData) => {
    setLoading(true);
    setError(null);
    try {
      await PlantaService.update(id, updateData);
      await loadPlantas(); // Recarregar lista
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadPlantas]);

  // Deletar planta
  const deletePlanta = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await PlantaService.delete(id);
      await loadPlantas(); // Recarregar lista
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadPlantas]);

  // Buscar planta por ID
  const getPlantaById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const planta = await PlantaService.getById(id);
      return planta;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar planta por código
  const getPlantaByCodigo = useCallback(async (codigo) => {
    setLoading(true);
    setError(null);
    try {
      const planta = await PlantaService.getByCodigo(codigo);
      return planta;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar plantas com filtros
  const searchPlantas = useCallback(async (filters) => {
    setLoading(true);
    setError(null);
    try {
      const results = await PlantaService.search(filters);
      setPlantas(results);
      return results;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Limpar filtros e recarregar todas as plantas
  const clearFilters = useCallback(() => {
    loadPlantas();
  }, [loadPlantas]);

  return {
    plantas,
    loading,
    error,
    createPlanta,
    updatePlanta,
    deletePlanta,
    getPlantaById,
    getPlantaByCodigo,
    searchPlantas,
    clearFilters,
    loadPlantas
  };
};
