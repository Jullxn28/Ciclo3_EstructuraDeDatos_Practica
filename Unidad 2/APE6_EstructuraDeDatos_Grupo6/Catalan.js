/**
 * Números de Catalan: C_n = (1/(n+1)) * binom(2n, n)
 * Cuenta las secuencias válidas de n push y n pop sobre una pila.
 */
function catalan(n) {
  let resultado = 1;
  for (let i = 0; i < n; i++) {
    resultado = (resultado * 2 * (2 * i + 1)) / (i + 2);
  }
  return Math.round(resultado);
}

/**
 * Genera todas las secuencias válidas de push ('P') y pop ('O') para n.
 */
function secuenciasValidas(n) {
  const salida = [];
  const construir = (actual, abiertos, cerrados) => {
    if (actual.length === 2 * n) {
      salida.push(actual);
      return;
    }
    if (abiertos < n) construir(actual + 'P', abiertos + 1, cerrados);
    if (cerrados < abiertos) construir(actual + 'O', abiertos, cerrados + 1);
  };
  construir('', 0, 0);
  return salida;
}

module.exports = { catalan, secuenciasValidas };
