  function formatarDecimal(valor) {
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{2})$/, ',$1');
    valor = valor.replace(/^0+/, '');
    return valor;
  }
  export default formatarDecimal;