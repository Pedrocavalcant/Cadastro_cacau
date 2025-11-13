/**
 * Utilitários para manipulação de dados de fazendas
 */

/**
 * Valida se os dados da fazenda estão completos
 * @param {Object} fazendaData - Dados da fazenda
 * @returns {Object} Objeto com isValid e errors
 */
export const validateFazendaData = (fazendaData) => {
  const errors = [];
  
  if (!fazendaData.nome || fazendaData.nome.trim().length === 0) {
    errors.push('Nome da fazenda é obrigatório');
  }
  
  if (!fazendaData.cnpj || fazendaData.cnpj.replace(/\D/g, '').length < 14) {
    errors.push('CNPJ é obrigatório e deve ter 14 dígitos');
  }
  
  if (!fazendaData.proprietario || fazendaData.proprietario.trim().length === 0) {
    errors.push('Proprietário é obrigatório');
  }
  
  if (!fazendaData.areaCultivo || fazendaData.areaCultivo.trim().length === 0) {
    errors.push('Área de cultivo é obrigatória');
  }
  
  if (!fazendaData.especiePredominante) {
    errors.push('Espécie predominante é obrigatória');
  }
  
  if (!fazendaData.sistemaProdutivo) {
    errors.push('Sistema produtivo é obrigatório');
  }
  
  if (!fazendaData.divisaoPlantio) {
    errors.push('Divisão do plantio é obrigatória');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Formata CNPJ
 * @param {String} cnpj - CNPJ sem formatação
 * @returns {String} CNPJ formatado
 */
export const formatCnpj = (cnpj) => {
  if (!cnpj) return '';
  const cnpjLimpo = cnpj.replace(/\D/g, '');
  if (cnpjLimpo.length > 12) {
    return cnpjLimpo.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
  }
  if (cnpjLimpo.length > 8) {
    return cnpjLimpo.replace(/(\d)(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3/$4');
  }
  if (cnpjLimpo.length > 5) {
    return cnpjLimpo.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
  }
  if (cnpjLimpo.length > 2) {
    return cnpjLimpo.replace(/(\d{2})(\d{0,2})/, '$1.$2');
  }
  return cnpjLimpo;
};

/**
 * Cria estrutura padrão para nova fazenda
 * @returns {Object} Estrutura padrão de fazenda
 */
export const createEmptyFazenda = () => {
  return {
    nome: '',
    cnpj: '',
    proprietario: '',
    areaCultivo: '',
    especiePredominante: '',
    sistemaProdutivo: '',
    divisaoPlantio: ''
  };
};

/**
 * Formata dados da fazenda para exibição
 * @param {Object} fazenda - Dados da fazenda
 * @returns {Object} Dados formatados
 */
export const formatFazendaForDisplay = (fazenda) => {
  if (!fazenda) return null;
  
  return {
    ...fazenda,
    nome: fazenda.nome || 'Não informado',
    cnpj: formatCnpj(fazenda.cnpj) || 'Não informado',
    proprietario: fazenda.proprietario || 'Não informado',
    areaCultivo: fazenda.areaCultivo || 'Não informado',
    especiePredominante: fazenda.especiePredominante || 'Não informado',
    sistemaProdutivo: fazenda.sistemaProdutivo || 'Não informado',
    divisaoPlantio: fazenda.divisaoPlantio || 'Não informado'
  };
};
