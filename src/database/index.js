import Dexie from 'dexie';

// Definindo o esquema do banco de dados
export const db = new Dexie('CacauDatabase');

// Versão 1: Schema inicial (DEPRECADO)
db.version(1).stores({
  plantas: '++id, codigo_individual, especie, data_plantio, situacao, ultima_colheita_peso, data_ultima_colheita',
  fazendas: '++id, nome, localizacao, responsavel',
  funcionarios: '++id, nome, cpf, cargo, fazenda_id'
});

// Versão 2: Muda de auto-increment (++id) para ID customizável
// A estratégia é: criar novas tabelas com a estrutura correta
// Quando há mudança de chave primária, precisamos recriar a tabela
db.version(2).stores({
  plantas: 'id, codigo_individual, especie, data_plantio, situacao, ultima_colheita_peso, data_ultima_colheita, createdAt, updatedAt',
  fazendas: 'id, nome, cnpj, proprietario, createdAt, updatedAt',
  funcionarios: 'id, nome, cpf, email, usuario, fazenda_id, createdAt, updatedAt'
}).upgrade(async tx => {
  // Nota: Dexie não permite mudança de chave primária via upgrade
  // Solução: Limpar e recomeçar (dados antigos perdidos, mas schema funciona)
  try {
    console.log('[DB Migration v2] Preparando para mudança de esquema');
    await tx.plantas.clear();
    await tx.fazendas.clear();
    await tx.funcionarios.clear();
    console.log('[DB Migration v2] Limpeza concluída');
  } catch (e) {
    console.warn('[DB Migration v2] Erro durante limpeza (esperado):', e.message);
  }
});

// Definindo os tipos de dados para TypeScript-like intellisense
export const PlantSchema = {
  codigo_individual: String, // Agora pode ser o ID primário
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
