import { db } from '../database/index.js';

/**
 * Serviço para operações CRUD de plantas
 */
export class PlantaService {
  
  /**
   * Criar uma nova planta
   * @param {Object} plantaData - Dados da planta
   * @returns {Promise<Number>} ID da planta criada
   */
  static async create(plantaData) {
    try {
      const id = await db.plantas.add({
        ...plantaData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return id;
    } catch (error) {
      console.error('Erro ao criar planta:', error);
      throw new Error('Falha ao criar planta');
    }
  }

  /**
   * Buscar todas as plantas
   * @returns {Promise<Array>} Lista de plantas
   */
  static async getAll() {
    try {
      const plantas = await db.plantas.orderBy('createdAt').reverse().toArray();
      return plantas;
    } catch (error) {
      console.error('Erro ao buscar plantas:', error);
      throw new Error('Falha ao buscar plantas');
    }
  }

  /**
   * Buscar planta por ID
   * @param {Number} id - ID da planta
   * @returns {Promise<Object|null>} Dados da planta ou null se não encontrada
   */
  static async getById(id) {
    try {
      const planta = await db.plantas.get(parseInt(id));
      return planta || null;
    } catch (error) {
      console.error('Erro ao buscar planta por ID:', error);
      throw new Error('Falha ao buscar planta');
    }
  }

  /**
   * Buscar planta por código individual
   * @param {String} codigo - Código individual da planta
   * @returns {Promise<Object|null>} Dados da planta ou null se não encontrada
   */
  static async getByCodigo(codigo) {
    try {
      const planta = await db.plantas.where('codigo_individual').equals(codigo).first();
      return planta || null;
    } catch (error) {
      console.error('Erro ao buscar planta por código:', error);
      throw new Error('Falha ao buscar planta');
    }
  }

  /**
   * Atualizar uma planta
   * @param {Number} id - ID da planta
   * @param {Object} updateData - Dados para atualização
   * @returns {Promise<Number>} Número de registros atualizados
   */
  static async update(id, updateData) {
    try {
      const updatedCount = await db.plantas.update(parseInt(id), {
        ...updateData,
        updatedAt: new Date()
      });
      
      if (updatedCount === 0) {
        throw new Error('Planta não encontrada');
      }
      
      return updatedCount;
    } catch (error) {
      console.error('Erro ao atualizar planta:', error);
      throw new Error('Falha ao atualizar planta');
    }
  }

  /**
   * Deletar uma planta
   * @param {Number} id - ID da planta
   * @returns {Promise<Number>} Número de registros deletados
   */
  static async delete(id) {
    try {
      const deletedCount = await db.plantas.delete(parseInt(id));
      
      if (deletedCount === 0) {
        throw new Error('Planta não encontrada');
      }
      
      return deletedCount;
    } catch (error) {
      console.error('Erro ao deletar planta:', error);
      throw new Error('Falha ao deletar planta');
    }
  }

  /**
   * Buscar plantas por filtros
   * @param {Object} filters - Filtros de busca
   * @returns {Promise<Array>} Lista de plantas filtradas
   */
  static async search(filters = {}) {
    try {
      let query = db.plantas.toCollection();
      
      // Aplicar filtros se fornecidos
      if (filters.especie) {
        query = query.filter(planta => 
          planta.identificacao?.especie?.toLowerCase().includes(filters.especie.toLowerCase())
        );
      }
      
      if (filters.situacao) {
        query = query.filter(planta => 
          planta.status?.situacao?.toLowerCase().includes(filters.situacao.toLowerCase())
        );
      }
      
      if (filters.data_plantio_inicio && filters.data_plantio_fim) {
        query = query.filter(planta => {
          const dataPlantio = new Date(planta.detalhes_plantio?.data_plantio);
          const inicio = new Date(filters.data_plantio_inicio);
          const fim = new Date(filters.data_plantio_fim);
          return dataPlantio >= inicio && dataPlantio <= fim;
        });
      }
      
      const plantas = await query.toArray();
      return plantas;
    } catch (error) {
      console.error('Erro ao buscar plantas com filtros:', error);
      throw new Error('Falha ao buscar plantas');
    }
  }

  /**
   * Contar total de plantas
   * @returns {Promise<Number>} Total de plantas
   */
  static async count() {
    try {
      return await db.plantas.count();
    } catch (error) {
      console.error('Erro ao contar plantas:', error);
      throw new Error('Falha ao contar plantas');
    }
  }

  /**
   * Limpar todas as plantas (usar com cuidado!)
   * @returns {Promise<Number>} Número de registros deletados
   */
  static async clear() {
    try {
      return await db.plantas.clear();
    } catch (error) {
      console.error('Erro ao limpar plantas:', error);
      throw new Error('Falha ao limpar plantas');
    }
  }
}
