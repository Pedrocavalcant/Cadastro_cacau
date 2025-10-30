/**
 * Utilitários para manipulação de dados de plantas
 */

/**
 * Valida se os dados da planta estão completos
 * @param {Object} plantaData - Dados da planta
 * @returns {Object} Objeto com isValid e errors
 */
export const validatePlantaData = (plantaData) => {
  const errors = [];
  
  // Validações obrigatórias
  if (!plantaData.identificacao?.codigo_individual) {
    errors.push('Código individual é obrigatório');
  }
  
  if (!plantaData.identificacao?.especie) {
    errors.push('Espécie é obrigatória');
  }
  
  if (!plantaData.detalhes_plantio?.data_plantio) {
    errors.push('Data de plantio é obrigatória');
  }
  
  if (!plantaData.status?.situacao) {
    errors.push('Situação é obrigatória');
  }
  
  // Validação de formato de data
  if (plantaData.detalhes_plantio?.data_plantio) {
    const dataPlantio = new Date(plantaData.detalhes_plantio.data_plantio);
    if (isNaN(dataPlantio.getTime())) {
      errors.push('Data de plantio deve estar no formato válido');
    }
  }
  
  // Validação de valores numéricos
  if (plantaData.detalhes_plantio?.altura_metros && 
      (isNaN(plantaData.detalhes_plantio.altura_metros) || plantaData.detalhes_plantio.altura_metros < 0)) {
    errors.push('Altura deve ser um número positivo');
  }
  
  if (plantaData.produtividade?.ultima_colheita_peso && 
      (isNaN(plantaData.produtividade.ultima_colheita_peso) || plantaData.produtividade.ultima_colheita_peso < 0)) {
    errors.push('Peso da última colheita deve ser um número positivo');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Formata dados da planta para exibição
 * @param {Object} planta - Dados da planta
 * @returns {Object} Dados formatados
 */
export const formatPlantaForDisplay = (planta) => {
  if (!planta) return null;
  
  return {
    ...planta,
    identificacao: {
      ...planta.identificacao,
      especie: planta.identificacao?.especie || 'Não informado'
    },
    detalhes_plantio: {
      ...planta.detalhes_plantio,
      data_plantio: planta.detalhes_plantio?.data_plantio || 'Não informado',
      altura_metros: planta.detalhes_plantio?.altura_metros || 0
    },
    produtividade: {
      ...planta.produtividade,
      ultima_colheita_peso: planta.produtividade?.ultima_colheita_peso || 0,
      data_ultima_colheita: planta.produtividade?.data_ultima_colheita || 'Nunca colhida'
    },
    status: {
      ...planta.status,
      situacao: planta.status?.situacao || 'Não informado',
      observacoes: planta.status?.observacoes || 'Nenhuma observação'
    }
  };
};

/**
 * Cria estrutura padrão para nova planta
 * @returns {Object} Estrutura padrão de planta
 */
export const createEmptyPlanta = () => {
  return {
    identificacao: {
      imagens: "",
      codigo_individual: "",
      especie: ""
    },
    detalhes_plantio: {
      tipo_muda: "",
      altura_metros: null,
      diametro_copa_metros: null,
      diametro_tronco_metros: null,
      data_plantio: "",
      idade_arvore: "",
      lote: "",
      localizacao: ""
    },
    produtividade: {
      qr_code: "",
      ultima_colheita_peso: null,
      data_ultima_colheita: ""
    },
    status: {
      situacao: "",
      adubo: "",
      data_adubacao: "",
      data_ultima_inspecao: "",
      nao_foi_adubado: false,
      observacoes: ""
    }
  };
};

/**
 * Calcula idade da árvore baseada na data de plantio
 * @param {String} dataPlantio - Data de plantio no formato dd/mm/aaaa
 * @returns {String} Idade calculada
 */
export const calcularIdadeArvore = (dataPlantio) => {
  if (!dataPlantio) return '';
  
  try {
    const [dia, mes, ano] = dataPlantio.split('/');
    const dataPlantioObj = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    
    const diffTime = Math.abs(hoje - dataPlantioObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const anos = Math.floor(diffDays / 365);
    const meses = Math.floor((diffDays % 365) / 30);
    
    if (anos > 0) {
      return `${anos} ano${anos > 1 ? 's' : ''}${meses > 0 ? ` e ${meses} mês${meses > 1 ? 'es' : ''}` : ''}`;
    } else {
      return `${meses} mês${meses > 1 ? 'es' : ''}`;
    }
  } catch (error) {
    console.error('Erro ao calcular idade da árvore:', error);
    return '';
  }
};

/**
 * Gera código QR único para a planta
 * @param {String} especie - Espécie da planta
 * @param {String} localizacao - Localização da planta
 * @returns {String} Código QR gerado
 */
export const gerarCodigoQR = (especie, localizacao) => {
  const timestamp = Date.now();
  const especieCode = especie?.substring(0, 3).toUpperCase() || 'PLA';
  const localizacaoCode = localizacao?.substring(0, 3).toUpperCase() || 'LOC';
  
  return `QR_${especieCode}_${localizacaoCode}_${timestamp}`;
};

/**
 * Exporta dados das plantas para JSON
 * @param {Array} plantas - Lista de plantas
 * @returns {String} JSON string dos dados
 */
export const exportPlantasToJSON = (plantas) => {
  try {
    return JSON.stringify(plantas, null, 2);
  } catch (error) {
    console.error('Erro ao exportar plantas:', error);
    throw new Error('Falha ao exportar dados');
  }
};

/**
 * Importa dados de plantas de JSON
 * @param {String} jsonString - JSON string dos dados
 * @returns {Array} Lista de plantas importadas
 */
export const importPlantasFromJSON = (jsonString) => {
  try {
    const plantas = JSON.parse(jsonString);
    if (!Array.isArray(plantas)) {
      throw new Error('Dados inválidos: deve ser um array de plantas');
    }
    return plantas;
  } catch (error) {
    console.error('Erro ao importar plantas:', error);
    throw new Error('Falha ao importar dados');
  }
};
