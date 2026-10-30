/**
 * Clase que representa un Nodo con referencia bidireccional.
 */

// Clase que representa un nodo de una lista doblemente enlazada
class NodoDoble {

  /**
   * Constructor que permite crear un nuevo nodo.
   * @param {Object} dato - Objeto que contiene la información
   * del proyecto ABP que se almacenará en el nodo.
   */
  constructor(dato) {

    // Almacena la información que recibe el nodo
    this.dato = dato;

    // Referencia al siguiente nodo de la lista
    // Inicialmente es null porque aún no está conectado
    this.siguiente = null;

    // Referencia al nodo anterior de la lista
    // Inicialmente es null porque aún no está conectado
    this.anterior = null;
  }
}

// Exporta la clase para utilizarla en otros archivos del proyecto
module.exports = NodoDoble;