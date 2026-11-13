/**
 * Representa una unidad atómica de cambio (Delta) dentro de la Pila Transaccional.
 * Almacena únicamente la variación de estado para evitar clonaciones de O(N).
 */
class NodoDelta {
  constructor(indice, estadoAnterior, estadoNuevo, loteId, tipo = 'valor', indiceSecundario = null) {
    this.indice = indice;
    this.estadoAnterior = estadoAnterior;
    this.estadoNuevo = estadoNuevo;
    this.loteId = loteId;
    this.tipo = tipo;                       // 'valor' | 'swap'
    this.indiceSecundario = indiceSecundario;
    this.siguiente = null;
  }
}

class PilaTransaccional {
  constructor() {
    this.tope = null;
    this.tamano = 0;
  }

  push(indice, estadoAnterior, estadoNuevo, loteId) {
    const nuevoNodo = new NodoDelta(indice, estadoAnterior, estadoNuevo, loteId);
    nuevoNodo.siguiente = this.tope;
    this.tope = nuevoNodo;
    this.tamano++;
  }

  pushSwap(indiceA, indiceB, loteId) {
    const nuevoNodo = new NodoDelta(indiceA, null, null, loteId, 'swap', indiceB);
    nuevoNodo.siguiente = this.tope;
    this.tope = nuevoNodo;
    this.tamano++;
  }

  pop() {
    if (this.estaVacia()) return null;
    const nodoExtraido = this.tope;
    this.tope = this.tope.siguiente;
    nodoExtraido.siguiente = null;
    this.tamano--;
    return nodoExtraido;
  }

  peek() { return this.tope; }
  estaVacia() { return this.tamano === 0; }
}

module.exports = { NodoDelta, PilaTransaccional };
