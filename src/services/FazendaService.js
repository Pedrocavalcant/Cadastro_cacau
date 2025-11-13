import { db } from '../database/index.js';

// Base URL da API (defina em .env: VITE_API_BASE_URL)
const API_BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL
  : null;

// Normaliza dados de fazenda
const normalizeFazenda = (data = {}) => {
  const empty = {
    nome: '',
    cnpj: '',
    proprietario: '',
    areaCultivo: '',
    especiePredominante: '',
    sistemaProdutivo: '',
    divisaoPlantio: ''
  };

  return {
    ...empty,
    ...data,
    id: data.id,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
};

// Prepara objeto para persistência no Dexie, incluindo campos de atalho no topo (índices)
const prepareForDb = (fazenda = {}) => {
  const f = typeof fazenda === 'object' ? fazenda : {};
  return {
    ...f,
    nome: f.nome ?? '',
    cnpj: f.cnpj ?? '',
    proprietario: f.proprietario ?? '',
    createdAt: f.createdAt ?? new Date(),
    updatedAt: f.updatedAt ?? new Date()
  };
};

/**
 * Serviço para operações CRUD+ de fazendas
 */
export class FazendaService {
  
  /**
   * Criar uma nova fazenda
   * @param {Object} fazendaData - Dados da fazenda
   * @returns {Promise<Number>} ID da fazenda criada
   */
  static async create(fazendaData) {
    try {
      const normalized = normalizeFazenda(fazendaData);

      // Tenta criar via backend se a API estiver configurada
      if (API_BASE) {
        try {
          const res = await fetch(`${API_BASE.replace(/\/$/, '')}/fazendas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(normalized)
          });

          if (!res.ok) throw new Error(`API error: ${res.status}`);

          const created = await res.json();
          try { await db.fazendas.put(prepareForDb(normalizeFazenda(created))); } catch (e) {}

          return created.id ?? created._id ?? null;
        } catch (err) {
          console.warn('Falha ao criar via API, salvando localmente:', err.message);
        }
      }

      // Persistência local (fallback)
      const id = await db.fazendas.add(prepareForDb({ ...normalized, createdAt: new Date(), updatedAt: new Date() }));
      return id;
    } catch (error) {
      console.error('Erro ao criar fazenda:', error);
      throw new Error('Falha ao criar fazenda');
    }
  }

  /**
   * Buscar todas as fazendas
   * @returns {Promise<Array>} Lista de fazendas
   */
  static async getAll() {
    try {
      if (API_BASE) {
        try {
          const res = await fetch(`${API_BASE.replace(/\/$/, '')}/fazendas`);
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const fazendas = await res.json();

          try {
            if (Array.isArray(fazendas)) {
              await db.fazendas.bulkPut(fazendas.map(f => prepareForDb(normalizeFazenda(f))));
            }
          } catch (e) {}

          return Array.isArray(fazendas) ? fazendas.map(normalizeFazenda) : [];
        } catch (err) {
          console.warn('Falha ao buscar via API, carregando do cache local:', err.message);
        }
      }

      const fazendas = await db.fazendas.orderBy('createdAt').reverse().toArray();
      return fazendas.map(normalizeFazenda);
    } catch (error) {
      console.error('Erro ao buscar fazendas:', error);
      throw new Error('Falha ao buscar fazendas');
    }
  }

  /**
   * Buscar fazenda por ID
   * @param {Number} id - ID da fazenda
   * @returns {Promise<Object|null>} Dados da fazenda ou null se não encontrada
   */
  static async getById(id) {
    try {
      if (API_BASE) {
        try {
          const res = await fetch(`${API_BASE.replace(/\/$/, '')}/fazendas/${encodeURIComponent(id)}`);
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const fazenda = await res.json();
          if (fazenda) {
            try { await db.fazendas.put(prepareForDb(normalizeFazenda(fazenda))); } catch (e) {}
          }
          return normalizeFazenda(fazenda) || null;
        } catch (err) {
          console.warn('Falha ao buscar por ID via API, consultando cache local:', err.message);
        }
      }

      const fazenda = await db.fazendas.get(parseInt(id));
      return fazenda ? normalizeFazenda(fazenda) : null;
    } catch (error) {
      console.error('Erro ao buscar fazenda por ID:', error);
      throw new Error('Falha ao buscar fazenda');
    }
  }

  /**
   * Buscar fazenda por CNPJ
   * @param {String} cnpj - CNPJ da fazenda
   * @returns {Promise<Object|null>} Dados da fazenda ou null se não encontrada
   */
  static async getByCnpj(cnpj) {
    try {
      if (API_BASE) {
        try {
          const url = new URL(`${API_BASE.replace(/\/$/, '')}/fazendas`);
          url.searchParams.set('cnpj', cnpj);
          const res = await fetch(url.toString());
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const results = await res.json();
          const fazenda = Array.isArray(results) ? results[0] : results;
          if (fazenda) {
            try { await db.fazendas.put(prepareForDb(normalizeFazenda(fazenda))); } catch (e) {}
          }
          return normalizeFazenda(fazenda) || null;
        } catch (err) {
          console.warn('Falha ao buscar por CNPJ via API, consultando cache local:', err.message);
        }
      }

      const cnpjLimpo = cnpj.replace(/\D/g, '');
      let fazenda = await db.fazendas.where('cnpj').equals(cnpjLimpo).first();
      
      if (!fazenda) {
        const todasFazendas = await db.fazendas.toArray();
        fazenda = todasFazendas.find(f => {
          const fCnpj = (f.cnpj || '').replace(/\D/g, '');
          return fCnpj === cnpjLimpo;
        });
      }
      
      return fazenda ? normalizeFazenda(fazenda) : null;
    } catch (error) {
      console.error('Erro ao buscar fazenda por CNPJ:', error);
      throw new Error('Falha ao buscar fazenda');
    }
  }

  /**
   * Atualizar uma fazenda
   * @param {Number} id - ID da fazenda
   * @param {Object} updateData - Dados para atualização
   * @returns {Promise<Number>} Número de registros atualizados
   */
  static async update(id, updateData) {
    try {
      const normalizedUpdate = normalizeFazenda(updateData);

      if (API_BASE) {
        try {
          const res = await fetch(`${API_BASE.replace(/\/$/, '')}/fazendas/${encodeURIComponent(id)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(normalizedUpdate)
          });

          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const updated = await res.json();
          try { await db.fazendas.put(prepareForDb(normalizeFazenda(updated))); } catch (e) {}
          return 1;
        } catch (err) {
          console.warn('Falha ao atualizar via API, atualizando localmente:', err.message);
        }
      }

      const existing = await db.fazendas.get(parseInt(id));
      if (!existing) throw new Error('Fazenda não encontrada');
      
      const merged = { ...normalizeFazenda(existing), ...normalizedUpdate, updatedAt: new Date() };
      await db.fazendas.put(prepareForDb({ ...merged, id: parseInt(id) }));
      return 1;
    } catch (error) {
      console.error('Erro ao atualizar fazenda:', error);
      throw new Error('Falha ao atualizar fazenda');
    }
  }

  /**
   * Deletar uma fazenda
   * @param {Number} id - ID da fazenda
   * @returns {Promise<Number>} Número de registros deletados
   */
  static async delete(id) {
    try {
      if (API_BASE) {
        try {
          const res = await fetch(`${API_BASE.replace(/\/$/, '')}/fazendas/${encodeURIComponent(id)}`, {
            method: 'DELETE'
          });
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          try { await db.fazendas.delete(parseInt(id)); } catch (e) {}
          return 1;
        } catch (err) {
          console.warn('Falha ao deletar via API, deletando localmente:', err.message);
        }
      }

      await db.fazendas.delete(parseInt(id));
      return 1;
    } catch (error) {
      console.error('Erro ao deletar fazenda:', error);
      throw new Error('Falha ao deletar fazenda');
    }
  }

  /**
   * Buscar fazendas por filtros
   * @param {Object} filters - Filtros de busca
   * @returns {Promise<Array>} Lista de fazendas filtradas
   */
  static async search(filters = {}) {
    try {
      if (API_BASE) {
        try {
          const url = new URL(`${API_BASE.replace(/\/$/, '')}/fazendas`);
          Object.entries(filters || {}).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
          });
          const res = await fetch(url.toString());
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const fazendas = await res.json();
          try { if (Array.isArray(fazendas)) await db.fazendas.bulkPut(fazendas.map(f => prepareForDb(normalizeFazenda(f)))); } catch (e) {}
          return Array.isArray(fazendas) ? fazendas.map(normalizeFazenda) : [];
        } catch (err) {
          console.warn('Falha ao buscar por filtros via API, consultando cache local:', err.message);
        }
      }

      let query = db.fazendas.toCollection();
      
      if (filters.nome) {
        query = query.filter(fazenda => 
          (fazenda.nome || '').toLowerCase().includes(filters.nome.toLowerCase())
        );
      }
      
      if (filters.proprietario) {
        query = query.filter(fazenda => 
          (fazenda.proprietario || '').toLowerCase().includes(filters.proprietario.toLowerCase())
        );
      }
      
      if (filters.especiePredominante) {
        query = query.filter(fazenda => 
          (fazenda.especiePredominante || '').toLowerCase().includes(filters.especiePredominante.toLowerCase())
        );
      }
      
      if (filters.sistemaProdutivo) {
        query = query.filter(fazenda => 
          (fazenda.sistemaProdutivo || '').toLowerCase().includes(filters.sistemaProdutivo.toLowerCase())
        );
      }
      
      const fazendas = await query.toArray();
      return fazendas.map(normalizeFazenda);
    } catch (error) {
      console.error('Erro ao buscar fazendas com filtros:', error);
      throw new Error('Falha ao buscar fazendas');
    }
  }

  /**
   * Contar total de fazendas
   * @returns {Promise<Number>} Total de fazendas
   */
  static async count() {
    try {
      return await db.fazendas.count();
    } catch (error) {
      console.error('Erro ao contar fazendas:', error);
      throw new Error('Falha ao contar fazendas');
    }
  }

  /**
   * Limpar todas as fazendas (usar com cuidado!)
   * @returns {Promise<Number>} Número de registros deletados
   */
  static async clear() {
    try {
      return await db.fazendas.clear();
    } catch (error) {
      console.error('Erro ao limpar fazendas:', error);
      throw new Error('Falha ao limpar fazendas');
    }
  }
}
