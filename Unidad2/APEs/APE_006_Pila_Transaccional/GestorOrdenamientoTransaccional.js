const { PilaTransaccional } = require('./PilaTransaccional');

class GestorOrdenamientoTransaccional {
  constructor(datosIniciales) {
    this.registros = [...datosIniciales].sort((a, b) => a.watts - b.watts);
    this.pilaUndo = new PilaTransaccional();
    this.pilaRehacer = new PilaTransaccional();
  }

  /**
   * Actualiza un registro y lo reubica manteniendo el orden.
   * Registra un delta por cada intercambio (swap) realizado.
   * Complejidad: O(1) amortizado por swap, O(d) deltas por mutación.
   */
  actualizarConRegistroDelta(indiceObjetivo, nuevoWatts, loteId) {
    const previo = this.registros[indiceObjetivo].watts;
    this.pilaUndo.push(indiceObjetivo, previo, nuevoWatts, loteId);
    this.registros[indiceObjetivo].watts = nuevoWatts;

    let i = indiceObjetivo;
    while (i > 0 && this.registros[i - 1].watts > this.registros[i].watts) {
      // delta de tipo swap: se intercambian las posiciones i-1 e i
      this.pilaUndo.pushSwap(i - 1, i, loteId);
      const temp = this.registros[i];
      this.registros[i] = this.registros[i - 1];
      this.registros[i - 1] = temp;
      i--;
    }
  }

  /**
   * Estrategia A: Undo por lote en O(m), sin reordenar.
   * Revierte los deltas del tope mientras pertenezcan al lote.
   */
  deshacerLoteTransaccional(loteId) {
    let revertidas = 0;
    while (!this.pilaUndo.estaVacia() && this.pilaUndo.peek().loteId === loteId) {
      const delta = this.pilaUndo.pop();

      if (delta.tipo === 'swap') {
        // deshacer el intercambio: volver a permutar las mismas posiciones
        const temp = this.registros[delta.indice];
        this.registros[delta.indice] = this.registros[delta.indiceSecundario];
        this.registros[delta.indiceSecundario] = temp;
      } else {
        this.registros[delta.indice].watts = delta.estadoAnterior;
      }

      this.pilaRehacer.push(delta.indice, delta.estadoNuevo, delta.estadoAnterior, loteId);
      revertidas++;
    }
    return revertidas;
  }

  /**
   * Redo: reaplica los deltas del lote desde pilaRehacer.
   */
  rehacerLoteTransaccional(loteId) {
    let reaplicadas = 0;
    while (!this.pilaRehacer.estaVacia() && this.pilaRehacer.peek().loteId === loteId) {
      const delta = this.pilaRehacer.pop();
      this.registros[delta.indice].watts = delta.estadoAnterior;
      this.pilaUndo.push(delta.indice, delta.estadoNuevo, delta.estadoAnterior, loteId);
      reaplicadas++;
    }
    return reaplicadas;
  }

  /**
   * Estrategia B: re-ordenamiento completo O(N log N).
   */
  reprocesarOrdenamientoCompleto() {
    this.registros.sort((a, b) => a.watts - b.watts);
  }

  estaOrdenado() {
    for (let i = 1; i < this.registros.length; i++) {
      if (this.registros[i - 1].watts > this.registros[i].watts) return false;
    }
    return true;
  }
}

module.exports = GestorOrdenamientoTransaccional;
