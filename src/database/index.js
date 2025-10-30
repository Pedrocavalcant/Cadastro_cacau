import Dexie from 'dexie';

// Definindo o esquema do banco de dados
export const db = new Dexie('CacauDatabase');

// Definindo as tabelas e seus índices
db.version(1).stores({
  plantas: '++id, codigo_individual, especie, data_plantio, situacao, ultima_colheita_peso, data_ultima_colheita',
  fazendas: '++id, nome, localizacao, responsavel',
  funcionarios: '++id, nome, cpf, cargo, fazenda_id'
});

// Versão 2: adiciona índices para createdAt/updatedAt usados pelo serviço
// (necessário para usar orderBy('createdAt') sem erro de SchemaError)
db.version(2).stores({
  plantas: '++id, codigo_individual, especie, data_plantio, situacao, ultima_colheita_peso, data_ultima_colheita, createdAt, updatedAt',
  fazendas: '++id, nome, localizacao, responsavel',
  funcionarios: '++id, nome, cpf, cargo, fazenda_id'
});

// Definindo os tipos de dados para TypeScript-like intellisense
export const PlantSchema = {
  id: Number,
  identificacao: {
    imagens: String,
    codigo_individual: String,
    especie: String
  },
  detalhes_plantio: {
    tipo_muda: String,
    altura_metros: Number,
    diametro_copa_metros: Number,
    diametro_tronco_metros: Number,
    data_plantio: String,
    idade_arvore: String,
    lote: String,
    localizacao: String
  },
  produtividade: {
    qr_code: String,
    ultima_colheita_peso: Number,
    data_ultima_colheita: String
  },
  status: {
    situacao: String,
    adubo: String,
    data_adubacao: String,
    data_ultima_inspecao: String,
    nao_foi_adubado: Boolean,
    observacoes: String
  }
};

export default db;
