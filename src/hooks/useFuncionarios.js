import { useState, useEffect, useCallback } from 'react';
import { FuncionarioService } from '../services/FuncionarioService.js';

/**
 * Hook personalizado para gerenciar funcionários
 * @returns {Object} Objeto com estado e funções para gerenciar funcionários
 */
export const useFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar todos os funcionários
  const loadFuncionarios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await FuncionarioService.getAll();
      setFuncionarios(data);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar funcionários:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar funcionários na inicialização
  useEffect(() => {
    loadFuncionarios();
  }, [loadFuncionarios]);

  // Criar novo funcionário
  const createFuncionario = useCallback(async (funcionarioData) => {
    setLoading(true);
    setError(null);
    try {
      const id = await FuncionarioService.create(funcionarioData);
      await loadFuncionarios(); // Recarregar lista
      return id;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadFuncionarios]);

  // Atualizar funcionário
  const updateFuncionario = useCallback(async (id, updateData) => {
    setLoading(true);
    setError(null);
    try {
      await FuncionarioService.update(id, updateData);
      await loadFuncionarios(); // Recarregar lista
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadFuncionarios]);

  // Deletar funcionário
  const deleteFuncionario = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await FuncionarioService.delete(id);
      await loadFuncionarios(); // Recarregar lista
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadFuncionarios]);

  // Buscar funcionário por ID
  const getFuncionarioById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const funcionario = await FuncionarioService.getById(id);
      return funcionario;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar funcionário por CPF
  const getFuncionarioByCpf = useCallback(async (cpf) => {
    setLoading(true);
    setError(null);
    try {
      const funcionario = await FuncionarioService.getByCpf(cpf);
      return funcionario;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar funcionário por email
  const getFuncionarioByEmail = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    try {
      const funcionario = await FuncionarioService.getByEmail(email);
      return funcionario;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar funcionários por fazenda
  const getFuncionariosByFazenda = useCallback(async (fazendaId) => {
    setLoading(true);
    setError(null);
    try {
      const funcionarios = await FuncionarioService.getByFazenda(fazendaId);
      return funcionarios;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar funcionários com filtros
  const searchFuncionarios = useCallback(async (filters) => {
    setLoading(true);
    setError(null);
    try {
      const results = await FuncionarioService.search(filters);
      setFuncionarios(results);
      return results;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Limpar filtros e recarregar todos os funcionários
  const clearFilters = useCallback(() => {
    loadFuncionarios();
  }, [loadFuncionarios]);

  return {
    funcionarios,
    loading,
    error,
    createFuncionario,
    updateFuncionario,
    deleteFuncionario,
    getFuncionarioById,
    getFuncionarioByCpf,
    getFuncionarioByEmail,
    getFuncionariosByFazenda,
    searchFuncionarios,
    clearFilters,
    loadFuncionarios
  };
};
