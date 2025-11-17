/**
 * Calcula a idade de uma planta com base na data de plantio
 * @param {string} dataPlantio - Data de plantio no formato YYYY-MM-DD
 * @returns {string} Idade formatada como "X anos, Y meses e Z dias"
 */
export function calculateAge(dataPlantio) {
  if (!dataPlantio) return "";

  const plantDate = new Date(dataPlantio);
  const today = new Date();

  // Validar data
  if (isNaN(plantDate.getTime())) return "";

  let years = today.getFullYear() - plantDate.getFullYear();
  let months = today.getMonth() - plantDate.getMonth();
  let days = today.getDate() - plantDate.getDate();

  // Ajustar dias
  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  // Ajustar meses
  if (months < 0) {
    years--;
    months += 12;
  }

  // Formatar saída
  const parts = [];
  if (years > 0) {
    parts.push(`${years} ano${years !== 1 ? 's' : ''}`);
  }
  if (months > 0) {
    parts.push(`${months} mês${months !== 1 ? 'es' : ''}`);
  }
  if (days > 0) {
    parts.push(`${days} dia${days !== 1 ? 's' : ''}`);
  }

  if (parts.length === 0) {
    return "0 dias";
  }

  if (parts.length === 1) {
    return parts[0];
  }

  if (parts.length === 2) {
    return `${parts[0]} e ${parts[1]}`;
  }

  return `${parts[0]}, ${parts[1]} e ${parts[2]}`;
}
