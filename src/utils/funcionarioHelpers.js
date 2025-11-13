/**
 * Utilitários para manipulação de dados de funcionários
 */

/**
 * Valida se os dados do funcionário estão completos
 * @param {Object} funcionarioData - Dados do funcionário
 * @returns {Object} Objeto com isValid e errors
 */
export const validateFuncionarioData = (funcionarioData) => {
  const errors = [];
  
  if (!funcionarioData.nome || funcionarioData.nome.trim().length === 0) {
    errors.push('Nome completo é obrigatório');
  }
  
  if (!funcionarioData.usuario || funcionarioData.usuario.trim().length === 0) {
    errors.push('Usuário é obrigatório');
  }
  
  if (!funcionarioData.email || !funcionarioData.email.includes('@')) {
    errors.push('Email válido é obrigatório');
  }
  
  if (!funcionarioData.senha || funcionarioData.senha.trim().length < 6) {
    errors.push('Senha deve ter no mínimo 6 caracteres');
  }
  
  if (funcionarioData.confirmarSenha && funcionarioData.senha !== funcionarioData.confirmarSenha) {
    errors.push('As senhas não coincidem');
  }
  
  if (!funcionarioData.cpf || funcionarioData.cpf.replace(/\D/g, '').length !== 11) {
    errors.push('CPF é obrigatório e deve ter 11 dígitos');
  }
  
  if (!funcionarioData.celular || funcionarioData.celular.replace(/\D/g, '').length < 10) {
    errors.push('Celular é obrigatório');
  }
  
  if (!funcionarioData.endereco) {
    errors.push('Endereço é obrigatório');
  } else {
    if (!funcionarioData.endereco.rua || funcionarioData.endereco.rua.trim().length === 0) {
      errors.push('Rua é obrigatória');
    }
    if (!funcionarioData.endereco.numero || funcionarioData.endereco.numero.trim().length === 0) {
      errors.push('Número da casa é obrigatório');
    }
    if (!funcionarioData.endereco.bairro || funcionarioData.endereco.bairro.trim().length === 0) {
      errors.push('Bairro é obrigatório');
    }
    if (!funcionarioData.endereco.cidade || funcionarioData.endereco.cidade.trim().length === 0) {
      errors.push('Cidade é obrigatória');
    }
    if (!funcionarioData.endereco.uf || funcionarioData.endereco.uf.trim().length !== 2) {
      errors.push('UF é obrigatória e deve ter 2 caracteres');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Formata CPF
 * @param {String} cpf - CPF sem formatação
 * @returns {String} CPF formatado
 */
export const formatCpf = (cpf) => {
  if (!cpf) return '';
  const cpfLimpo = cpf.replace(/\D/g, '');
  if (cpfLimpo.length > 9) {
    return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  }
  if (cpfLimpo.length > 6) {
    return cpfLimpo.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
  }
  if (cpfLimpo.length > 3) {
    return cpfLimpo.replace(/(\d{3})(\d{0,3})/, '$1.$2');
  }
  return cpfLimpo;
};

/**
 * Formata celular
 * @param {String} celular - Celular sem formatação
 * @returns {String} Celular formatado
 */
export const formatCelular = (celular) => {
  if (!celular) return '';
  const celularLimpo = celular.replace(/\D/g, '');
  if (celularLimpo.length > 10) {
    return celularLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  if (celularLimpo.length > 6) {
    return celularLimpo.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  }
  if (celularLimpo.length > 2) {
    return celularLimpo.replace(/(\d{2})(\d{0,5})/, '($1) $2');
  }
  return celularLimpo;
};

/**
 * Cria estrutura padrão para novo funcionário
 * @returns {Object} Estrutura padrão de funcionário
 */
export const createEmptyFuncionario = () => {
  return {
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
};

/**
 * Formata dados do funcionário para exibição
 * @param {Object} funcionario - Dados do funcionário
 * @returns {Object} Dados formatados
 */
export const formatFuncionarioForDisplay = (funcionario) => {
  if (!funcionario) return null;
  
  return {
    ...funcionario,
    nome: funcionario.nome || 'Não informado',
    usuario: funcionario.usuario || 'Não informado',
    email: funcionario.email || 'Não informado',
    cpf: formatCpf(funcionario.cpf) || 'Não informado',
    celular: formatCelular(funcionario.celular) || 'Não informado',
    endereco: {
      rua: funcionario.endereco?.rua || 'Não informado',
      numero: funcionario.endereco?.numero || '',
      bairro: funcionario.endereco?.bairro || 'Não informado',
      cidade: funcionario.endereco?.cidade || 'Não informado',
      uf: funcionario.endereco?.uf || 'Não informado'
    }
  };
};
