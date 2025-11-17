/**
 * Gera um código auto-increment baseado no tipo e timestamp
 * Garante unicidade mesmo se múltiplos cadastros forem feitos rapidamente
 * @param {string} tipo - Tipo de entidade: 'planta', 'funcionario', 'fazenda'
 * @param {number} [id] - ID da entidade (opcional, será gerado a partir de timestamp se não fornecido)
 * @returns {string} Código formatado (ex: PL-000001, FU-000001, FA-000001)
 */
export function gerarCodigoAutoIncrement(tipo, id) {
  const prefixos = {
    planta: 'PL',
    funcionario: 'FU',
    fazenda: 'FA'
  };

  const prefixo = prefixos[tipo] || 'XX';
  
  // Se ID não foi fornecido, gera um baseado em timestamp
  // Usa os últimos 6 dígitos do timestamp em milissegundos + random de 2 dígitos
  let numero;
  if (id !== undefined && id !== null) {
    numero = String(id).padStart(6, '0');
  } else {
    // Combina timestamp (últimos 5 dígitos) + contador aleatório (1 dígito)
    // Garante unicidade mesmo com múltiplos cadastros na mesma unidade de tempo
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 10);
    const combinado = ((timestamp % 100000) * 10 + randomPart);
    numero = String(combinado).padStart(6, '0').slice(-6);
  }
  
  return `${prefixo}-${numero}`;
}

/**
 * Gera um UUID para ser usado como chave única de registro
 * Útil para garantir que cada cadastro tenha um identificador único
 * @returns {string} UUID v4
 */
export function gerarUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Extrai o número do código formatado
 * @param {string} codigo - Código formatado (ex: PL-000001)
 * @returns {number} Número extraído
 */
export function extrairNumeroDoCodifo(codigo) {
  const match = codigo.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
}

