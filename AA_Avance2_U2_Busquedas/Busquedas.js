function busquedaSecuencial(arr, objetivo) {
  let comparaciones = 0;
  for (let i = 0; i < arr.length; i++) {
    comparaciones++;
    if (arr[i].id === objetivo) {
      return { indice: i, comparaciones };
    }
    if (arr[i].id > objetivo) break;
  }
  return { indice: -1, comparaciones };
}

function busquedaBinaria(arr, objetivo) {
  let comparaciones = 0;
  let izquierda = 0;
  let derecha = arr.length - 1;

  while (izquierda <= derecha) {
    const medio = izquierda + Math.floor((derecha - izquierda) / 2);
    comparaciones++;

    if (arr[medio].id === objetivo) {
      return { indice: medio, comparaciones };
    }
    if (arr[medio].id < objetivo) {
      izquierda = medio + 1;
    } else {
      derecha = medio - 1;
    }
  }
  return { indice: -1, comparaciones };
}

module.exports = { busquedaSecuencial, busquedaBinaria };
