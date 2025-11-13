import { db } from '../database/index.js';

// Base URL da API (defina em .env: VITE_API_BASE_URL)
const API_BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL
  : null;

// Normaliza dados de funcionário
const normalizeFuncionario = (data = {}) => {
  const empty = {
    nome: '',
    usuario: '',
    email: '',
    senha: '',
    cpf: '',
    celular: '',
    endereco: {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: ''
    },
    fazenda_id: null
  };

  // Se já tiver endereco como objeto, preserva
  if (data.endereco && typeof data.endereco === 'object') {
    return {
      ...empty,
      ...data,
      endereco: { ...empty.endereco, ...data.endereco },
      id: data.id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
  }

  // Mapeia campos achatados para o formato aninhado
  return {
    ...empty,
    nome: data.nome ?? '',
    usuario: data.usuario ?? '',
    email: data.email ?? '',
    senha: data.senha ?? '',
    cpf: data.cpf ?? '',
    celular: data.celular ?? '',
    endereco: {
      rua: data.rua ?? data.endereco?.rua ?? '',
      numero: data.numero ?? data.numeroCasa ?? data.endereco?.numero ?? '',
      bairro: data.bairro ?? data.endereco?.bairro ?? '',
      cidade: data.cidade ?? data.endereco?.cidade ?? '',
      uf: data.uf ?? data.endereco?.uf ?? ''
    },
    fazenda_id: data.fazenda_id ?? null,
    id: data.id,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
};

// Prepara objeto para persistência no Dexie, incluindo campos de atalho no topo (índices)
const prepareForDb = (funcionario = {}) => {
  const f = typeof funcionario === 'object' ? funcionario : {};
  const normalized = normalizeFuncionario(f);
  return {
    ...normalized,
    nome: normalized.nome ?? '',
    cpf: (normalized.cpf || '').replace(/\D/g, ''), // Remove formatação para busca
    email: normalized.email ?? '',
    usuario: normalized.usuario ?? '',
    fazenda_id: normalized.fazenda_id ?? null,
    createdAt: normalized.createdAt ?? new Date(),
    updatedAt: normalized.updatedAt ?? new Date()
  };
};

/**
 * Serviço para operações CRUD+ de funcionários
 */
export class FuncionarioService {
  
  /**
   * Criar um novo funcionário
   * @param {Object} funcionarioData - Dados do funcionário
   * @returns {Promise<Number>} ID do funcionário criado
   */
  static async create(funcionarioData) {
    try {
      const normalized = normalizeFuncionario(funcionarioData);

      // Tenta criar via backend se a API estiver configurada
      if (API_BASE) {
        try {
          const res = await fetch(`${API_BASE.replace(/\/$/, '')}/funcionarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(normalized)
          });

          if (!res.ok) throw new Error(`API error: ${res.status}`);

          const created = await res.json();
          try { await db.funcionarios.put(prepareForDb(normalizeFuncionario(created))); } catch (e) {}

          return created.id ?? created._id ?? null;
        } catch (err) {
          console.warn('Falha ao criar via API, salvando localmente:', err.message);
        }
      }

      // Persistência local (fallback)
      const id = await db.funcionarios.add(prepareForDb({ ...normalized, createdAt: new Date(), updatedAt: new Date() }));
      return id;
    } catch (error) {
      console.error('Erro ao criar funcionário:', error);
      throw new Error('Falha ao criar funcionário');
    }
  }

  /**
   * Buscar todos os funcionários
   * @returns {Promise<Array>} Lista de funcionários
   */
  static async getAll() {
    try {
      if (API_BASE) {
        try {
          const res = await fetch(`${API_BASE.replace(/\/$/, '')}/funcionarios`);
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const funcionarios = await res.json();

          try {
            if (Array.isArray(funcionarios)) {
              await db.funcionarios.bulkPut(funcionarios.map(f => prepareForDb(normalizeFuncionario(f))));
            }
          } catch (e) {}

          return Array.isArray(funcionarios) ? funcionarios.map(normalizeFuncionario) : [];
        } catch (err) {
          console.warn('Falha ao buscar via API, carregando do cache local:', err.message);
        }
      }

      const funcionarios = await db.funcionarios.orderBy('createdAt').reverse().toArray();
      return funcionarios.map(normalizeFuncionario);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
      throw new Error('Falha ao buscar funcionários');
    }
  }

  /**
   * Buscar funcionário por ID
   * @param {Number} id - ID do funcionário
   * @returns {Promise<Object|null>} Dados do funcionário ou null se não encontrado
   */
  static async getById(id) {
    try {
      if (API_BASE) {
        try {
          const res = await fetch(`${API_BASE.replace(/\/$/, '')}/funcionarios/${encodeURIComponent(id)}`);
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const funcionario = await res.json();
          if (funcionario) {
            try { await db.funcionarios.put(prepareForDb(normalizeFuncionario(funcionario))); } catch (e) {}
          }
          return normalizeFuncionario(funcionario) || null;
        } catch (err) {
          console.warn('Falha ao buscar por ID via API, consultando cache local:', err.message);
        }
      }

      const funcionario = await db.funcionarios.get(parseInt(id));
      return funcionario ? normalizeFuncionario(funcionario) : null;
    } catch (error) {
      console.error('Erro ao buscar funcionário por ID:', error);
      throw new Error('Falha ao buscar funcionário');
    }
  }

  /**
   * Buscar funcionário por CPF
   * @param {String} cpf - CPF do funcionário
   * @returns {Promise<Object|null>} Dados do funcionário ou null se não encontrado
   */
  static async getByCpf(cpf) {
    try {
      if (API_BASE) {
        try {
          const url = new URL(`${API_BASE.replace(/\/$/, '')}/funcionarios`);
          url.searchParams.set('cpf', cpf);
          const res = await fetch(url.toString());
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const results = await res.json();
          const funcionario = Array.isArray(results) ? results[0] : results;
          if (funcionario) {
            try { await db.funcionarios.put(prepareForDb(normalizeFuncionario(funcionario))); } catch (e) {}
          }
          return normalizeFuncionario(funcionario) || null;
        } catch (err) {
          console.warn('Falha ao buscar por CPF via API, consultando cache local:', err.message);
        }
      }

      const cpfLimpo = cpf.replace(/\D/g, '');
      let funcionario = await db.funcionarios.where('cpf').equals(cpfLimpo).first();
      
      if (!funcionario) {
        const todosFuncionarios = await db.funcionarios.toArray();
        funcionario = todosFuncionarios.find(f => {
          const fCpf = (f.cpf || '').replace(/\D/g, '');
          return fCpf === cpfLimpo;
        });
      }
      
      return funcionario ? normalizeFuncionario(funcionario) : null;
    } catch (error) {
      console.error('Erro ao buscar funcionário por CPF:', error);
      throw new Error('Falha ao buscar funcionário');
    }
  }

  /**
   * Buscar funcionário por email
   * @param {String} email - Email do funcionário
   * @returns {Promise<Object|null>} Dados do funcionário ou null se não encontrado
   */
  static async getByEmail(email) {
    try {
      if (API_BASE) {
        try {
          const url = new URL(`${API_BASE.replace(/\/$/, '')}/funcionarios`);
          url.searchParams.set('email', email);
          const res = await fetch(url.toString());
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const results = await res.json();
          const funcionario = Array.isArray(results) ? results[0] : results;
          if (funcionario) {
            try { await db.funcionarios.put(prepareForDb(normalizeFuncionario(funcionario))); } catch (e) {}
          }
          return normalizeFuncionario(funcionario) || null;
        } catch (err) {
          console.warn('Falha ao buscar por email via API, consultando cache local:', err.message);
        }
      }

      let funcionario = await db.funcionarios.where('email').equals(email.toLowerCase()).first();
      
      if (!funcionario) {
        const todosFuncionarios = await db.funcionarios.toArray();
        funcionario = todosFuncionarios.find(f => 
          (f.email || '').toLowerCase() === email.toLowerCase()
        );
      }
      
      return funcionario ? normalizeFuncionario(funcionario) : null;
    } catch (error) {
      console.error('Erro ao buscar funcionário por email:', error);
      throw new Error('Falha ao buscar funcionário');
    }
  }

  /**
   * Buscar funcionários por fazenda
   * @param {Number} fazendaId - ID da fazenda
   * @returns {Promise<Array>} Lista de funcionários da fazenda
   */
  static async getByFazenda(fazendaId) {
    try {
      if (API_BASE) {
        try {
          const url = new URL(`${API_BASE.replace(/\/$/, '')}/funcionarios`);
          url.searchParams.set('fazenda_id', fazendaId);
          const res = await fetch(url.toString());
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const funcionarios = await res.json();
          try { if (Array.isArray(funcionarios)) await db.funcionarios.bulkPut(funcionarios.map(f => prepareForDb(normalizeFuncionario(f)))); } catch (e) {}
          return Array.isArray(funcionarios) ? funcionarios.map(normalizeFuncionario) : [];
        } catch (err) {
          console.warn('Falha ao buscar por fazenda via API, consultando cache local:', err.message);
        }
      }

      const funcionarios = await db.funcionarios.where('fazenda_id').equals(parseInt(fazendaId)).toArray();
      return funcionarios.map(normalizeFuncionario);
    } catch (error) {
      console.error('Erro ao buscar funcionários por fazenda:', error);
      throw new Error('Falha ao buscar funcionários');
    }
  }

  /**
   * Atualizar um funcionário
   * @param {Number} id - ID do funcionário
   * @param {Object} updateData - Dados para atualização
   * @returns {Promise<Number>} Número de registros atualizados
   */
  static async update(id, updateData) {
    try {
      const normalizedUpdate = normalizeFuncionario(updateData);

      if (API_BASE) {
        try {
          const res = await fetch(`${API_BASE.replace(/\/$/, '')}/funcionarios/${encodeURIComponent(id)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(normalizedUpdate)
          });

          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const updated = await res.json();
          try { await db.funcionarios.put(prepareForDb(normalizeFuncionario(updated))); } catch (e) {}
          return 1;
        } catch (err) {
          console.warn('Falha ao atualizar via API, atualizando localmente:', err.message);
        }
      }

      const existing = await db.funcionarios.get(parseInt(id));
      if (!existing) throw new Error('Funcionário não encontrado');
      
      const merged = { ...normalizeFuncionario(existing), ...normalizedUpdate, updatedAt: new Date() };
      await db.funcionarios.put(prepareForDb({ ...merged, id: parseInt(id) }));
      return 1;
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
      throw new Error('Falha ao atualizar funcionário');
    }
  }

  /**
   * Deletar um funcionário
   * @param {Number} id - ID do funcionário
   * @returns {Promise<Number>} Número de registros deletados
   */
  static async delete(id) {
    try {
      if (API_BASE) {
        try {
          const res = await fetch(`${API_BASE.replace(/\/$/, '')}/funcionarios/${encodeURIComponent(id)}`, {
            method: 'DELETE'
          });
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          try { await db.funcionarios.delete(parseInt(id)); } catch (e) {}
          return 1;
        } catch (err) {
          console.warn('Falha ao deletar via API, deletando localmente:', err.message);
        }
      }

      await db.funcionarios.delete(parseInt(id));
      return 1;
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
      throw new Error('Falha ao deletar funcionário');
    }
  }

  /**
   * Buscar funcionários por filtros
   * @param {Object} filters - Filtros de busca
   * @returns {Promise<Array>} Lista de funcionários filtrados
   */
  static async search(filters = {}) {
    try {
      if (API_BASE) {
        try {
          const url = new URL(`${API_BASE.replace(/\/$/, '')}/funcionarios`);
          Object.entries(filters || {}).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
          });
          const res = await fetch(url.toString());
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const funcionarios = await res.json();
          try { if (Array.isArray(funcionarios)) await db.funcionarios.bulkPut(funcionarios.map(f => prepareForDb(normalizeFuncionario(f)))); } catch (e) {}
          return Array.isArray(funcionarios) ? funcionarios.map(normalizeFuncionario) : [];
        } catch (err) {
          console.warn('Falha ao buscar por filtros via API, consultando cache local:', err.message);
        }
      }

      let query = db.funcionarios.toCollection();
      
      if (filters.nome) {
        query = query.filter(funcionario => 
          (funcionario.nome || '').toLowerCase().includes(filters.nome.toLowerCase())
        );
      }
      
      if (filters.email) {
        query = query.filter(funcionario => 
          (funcionario.email || '').toLowerCase().includes(filters.email.toLowerCase())
        );
      }
      
      if (filters.usuario) {
        query = query.filter(funcionario => 
          (funcionario.usuario || '').toLowerCase().includes(filters.usuario.toLowerCase())
        );
      }
      
      if (filters.fazenda_id) {
        query = query.filter(funcionario => 
          funcionario.fazenda_id === parseInt(filters.fazenda_id)
        );
      }
      
      const funcionarios = await query.toArray();
      return funcionarios.map(normalizeFuncionario);
    } catch (error) {
      console.error('Erro ao buscar funcionários com filtros:', error);
      throw new Error('Falha ao buscar funcionários');
    }
  }

  /**
   * Contar total de funcionários
   * @returns {Promise<Number>} Total de funcionários
   */
  static async count() {
    try {
      return await db.funcionarios.count();
    } catch (error) {
      console.error('Erro ao contar funcionários:', error);
      throw new Error('Falha ao contar funcionários');
    }
  }

  /**
   * Limpar todos os funcionários (usar com cuidado!)
   * @returns {Promise<Number>} Número de registros deletados
   */
  static async clear() {
    try {
      return await db.funcionarios.clear();
    } catch (error) {
      console.error('Erro ao limpar funcionários:', error);
      throw new Error('Falha ao limpar funcionários');
    }
  }
}
