import { db } from '../database/index.js';

// Base URL da API (defina em .env: VITE_API_BASE_URL)
const API_BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL
  : null;

// Normaliza um objeto de planta que pode estar em formato "achatado" ou já aninhado
const normalizePlanta = (data = {}) => {
  // Se já estiver no formato aninhado (possui identificacao), retorna mesclado com defaults
  const empty = {
    identificacao: { imagens: [], codigo_individual: '', especie: '' },
    detalhes_plantio: { tipo_muda: '', altura_metros: null, diametro_copa_metros: null, diametro_tronco_metros: null, data_plantio: '', idade_arvore: '', lote: '', localizacao: '' },
    produtividade: { qr_code: null, ultima_colheita_peso: null, data_ultima_colheita: '' },
    status: { situacao: '', adubo: '', data_adubacao: '', data_ultima_inspecao: '', nao_foi_adubado: false, observacoes: '', doenca: '', tratamento: '' }
  };

  const isNested = !!data.identificacao || !!data.detalhes_plantio || !!data.produtividade || !!data.status;

  if (isNested) {
    return {
      identificacao: { ...empty.identificacao, ...data.identificacao },
      detalhes_plantio: { ...empty.detalhes_plantio, ...data.detalhes_plantio },
      produtividade: { ...empty.produtividade, ...data.produtividade },
      status: { ...empty.status, ...data.status },
      id: data.id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
  }

  // Mapeia campos achatados para o formato aninhado
  const parseNumber = (v) => {
    if (v === null || v === undefined || v === '') return null;
    if (typeof v === 'number') return v;
    if (typeof v === 'string') {
      const normalized = v.replace(',', '.');
      const parsed = parseFloat(normalized);
      return isNaN(parsed) ? null : parsed;
    }
    return null;
  };

  return {
    identificacao: {
      imagens: Array.isArray(data.imagens) ? data.imagens : (data.identificacao_imagens || []),
      codigo_individual: data.codigo_individual ?? data.identificacao_codigo ?? '',
      especie: data.especie ?? ''
    },
    detalhes_plantio: {
      tipo_muda: data.tipo_muda ?? '',
      altura_metros: parseNumber(data.altura_metros ?? data.detalhes_plantio_altura),
      diametro_copa_metros: parseNumber(data.diametro_copa_metros),
      diametro_tronco_metros: parseNumber(data.diametro_tronco_metros),
      data_plantio: data.data_plantio ?? '',
      idade_arvore: data.idade_arvore ?? '',
      lote: data.lote ?? '',
      localizacao: data.localizacao ?? ''
    },
    produtividade: {
      qr_code: data.qr_code ?? null,
      ultima_colheita_peso: parseNumber(data.ultima_colheita_peso ?? data.ultima_colheita),
      data_ultima_colheita: data.data_ultima_colheita ?? ''
    },
    status: {
      situacao: (data.situacao ?? data.status_situacao ?? data.status) || '',
      adubo: data.adubo ?? '',
      data_adubacao: data.data_adubacao ?? '',
      data_ultima_inspecao: data.data_ultima_inspecao ?? '',
      nao_foi_adubado: !!data.nao_foi_adubado,
      observacoes: data.observacoes ?? '',
      doenca: data.doenca ?? '',
      tratamento: data.tratamento ?? ''
    },
    id: data.id,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
};

// Mescla objetos de planta (existing e update), preservando valores não-nulos corretamente
const mergePlanta = (existing = {}, update = {}) => {
  return {
    ...existing,
    identificacao: { ...existing.identificacao, ...update.identificacao },
    detalhes_plantio: { ...existing.detalhes_plantio, ...update.detalhes_plantio },
    produtividade: { ...existing.produtividade, ...update.produtividade },
    status: { ...existing.status, ...update.status },
    updatedAt: update.updatedAt ?? new Date()
  };
};

// Prepara objeto para persistência no Dexie, incluindo campos de atalho no topo (índices)
const prepareForDb = (planta = {}) => {
  const p = typeof planta === 'object' ? planta : {};
  return {
    ...p,
    codigo_individual: p.identificacao?.codigo_individual ?? p.codigo_individual ?? '',
    especie: p.identificacao?.especie ?? p.especie ?? '',
    data_plantio: p.detalhes_plantio?.data_plantio ?? p.data_plantio ?? '',
    situacao: p.status?.situacao ?? p.situacao ?? '',
    ultima_colheita_peso: p.produtividade?.ultima_colheita_peso ?? p.ultima_colheita_peso ?? p.ultima_colheita ?? null,
    data_ultima_colheita: p.produtividade?.data_ultima_colheita ?? p.data_ultima_colheita ?? '',
    createdAt: p.createdAt ?? new Date(),
    updatedAt: p.updatedAt ?? new Date()
  };
};

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
      // Normaliza dados para o formato aninhado
      const normalized = normalizePlanta(plantaData);

      // Tenta criar via backend se a API estiver configurada
      if (API_BASE) {
        try {
          const res = await fetch(`${API_BASE.replace(/\/$/, '')}/plantas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(normalized)
          });

          if (!res.ok) throw new Error(`API error: ${res.status}`);

          const created = await res.json();
          // Persistir/atualizar no DB local para cache/offline (inclui campos top-level para índices)
          try { await db.plantas.put(prepareForDb(normalizePlanta(created))); } catch (e) { /* ignore local persistence errors */ }

          // Retornar id do backend ou id local
          return created.id ?? created._id ?? null;
        } catch (err) {
          console.warn('Falha ao criar via API, salvando localmente:', err.message);
          // cairá para salvar localmente abaixo
        }
      }

      // Persistência local (fallback)
      const id = await db.plantas.add(prepareForDb({ ...normalized, createdAt: new Date(), updatedAt: new Date() }));
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
      // Tenta buscar do backend quando disponível
      if (API_BASE) {
        try {
          const res = await fetch(`${API_BASE.replace(/\/$/, '')}/plantas`);
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const plantas = await res.json();

          // Sincroniza cache local (atualiza ou cria)
          try {
            if (Array.isArray(plantas)) {
              await db.plantas.bulkPut(plantas.map(p => prepareForDb(normalizePlanta(p))));
            }
          } catch (e) { /* ignore sync errors */ }

          return Array.isArray(plantas) ? plantas.map(normalizePlanta) : [];
        } catch (err) {
          console.warn('Falha ao buscar via API, carregando do cache local:', err.message);
          // fallback para local
        }
      }

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
      if (API_BASE) {
        try {
          const res = await fetch(`${API_BASE.replace(/\/$/, '')}/plantas/${encodeURIComponent(id)}`);
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const planta = await res.json();
          if (planta) {
            // Normaliza antes de salvar localmente
            try { await db.plantas.put(prepareForDb(normalizePlanta(planta))); } catch (e) {}
          }
          return normalizePlanta(planta) || null;
        } catch (err) {
          console.warn('Falha ao buscar por ID via API, consultando cache local:', err.message);
        }
      }

  const planta = await db.plantas.get(parseInt(id));
  return planta ? normalizePlanta(planta) : null;
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
      if (API_BASE) {
        try {
          const url = new URL(`${API_BASE.replace(/\/$/, '')}/plantas`);
          url.searchParams.set('codigo_individual', codigo);
          const res = await fetch(url.toString());
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const results = await res.json();
          const planta = Array.isArray(results) ? results[0] : results;
          if (planta) {
            try { await db.plantas.put(prepareForDb(normalizePlanta(planta))); } catch (e) {}
          }
          return normalizePlanta(planta) || null;
        } catch (err) {
          console.warn('Falha ao buscar por código via API, consultando cache local:', err.message);
        }
      }

      // Tenta buscar pelo índice top-level
      let planta = await db.plantas.where('codigo_individual').equals(codigo).first();
      
      // Se não encontrar, tenta buscar no campo aninhado (fallback)
      if (!planta) {
        const todasPlantas = await db.plantas.toArray();
        planta = todasPlantas.find(p => p.identificacao?.codigo_individual === String(codigo));
      }
      
      return planta ? normalizePlanta(planta) : null;
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
      // Normaliza updateData (pode ser parcial)
      const normalizedUpdate = normalizePlanta(updateData);

      // Tenta atualizar via backend
      if (API_BASE) {
        try {
          const res = await fetch(`${API_BASE.replace(/\/$/, '')}/plantas/${encodeURIComponent(id)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(normalizedUpdate)
          });

          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const updated = await res.json();
          try { await db.plantas.put(prepareForDb(normalizePlanta(updated))); } catch (e) {}
          return 1;
        } catch (err) {
          console.warn('Falha ao atualizar via API, atualizando localmente:', err.message);
          // fallback para local
        }
      }

      // Atualização local: mesclar com o existente
      const existing = await db.plantas.get(parseInt(id));
      if (!existing) throw new Error('Planta não encontrada');
      const merged = mergePlanta(normalizePlanta(existing), normalizedUpdate);
  await db.plantas.put(prepareForDb({ ...merged, id: parseInt(id), updatedAt: new Date() }));
      return 1;
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
      // Tenta deletar via backend
      if (API_BASE) {
        try {
          const res = await fetch(`${API_BASE.replace(/\/$/, '')}/plantas/${encodeURIComponent(id)}`, {
            method: 'DELETE'
          });
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          // também remover do cache local
          try { await db.plantas.delete(parseInt(id)); } catch (e) {}
          return 1;
        } catch (err) {
          console.warn('Falha ao deletar via API, deletando localmente:', err.message);
          // fallback para local
        }
      }

      await db.plantas.delete(parseInt(id));
      return 1;
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
      // Tenta buscar via API com query params
      if (API_BASE) {
        try {
          const url = new URL(`${API_BASE.replace(/\/$/, '')}/plantas`);
          Object.entries(filters || {}).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
          });
          const res = await fetch(url.toString());
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const plantas = await res.json();
          try { if (Array.isArray(plantas)) await db.plantas.bulkPut(plantas.map(p=>prepareForDb(normalizePlanta(p)))); } catch (e) {}
          return Array.isArray(plantas) ? plantas.map(normalizePlanta) : [];
        } catch (err) {
          console.warn('Falha ao buscar por filtros via API, consultando cache local:', err.message);
          // fallback para local
        }
      }

      let query = db.plantas.toCollection();
      // Aplicar filtros localmente
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
