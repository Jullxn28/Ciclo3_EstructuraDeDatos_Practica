// Tarea 1: Implementación del TDA Lista Doblemente Enlazada
class Nodo {
    constructor(dato) {
        this.dato = dato;          
        this.siguiente = null;     
        this.anterior = null;      
    }
}

class ListaSatelital {
    constructor() {
        this.cabeza = null; // Primer elemento de la lista
        this.cola = null;   // Último elemento de la lista
        this.actual = null; // Puntero auxiliar para navegación fluid (next/prev)
        this.tamaño = 0;    // Contador de elementos
    }

    // Método para insertar al inicio: Complejidad O(1)
    prepend(dato) {
        const nuevoNodo = new Nodo(dato);

        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
            this.actual = nuevoNodo;
        } else {
            nuevoNodo.siguiente = this.cabeza;
            this.cabeza.anterior = nuevoNodo;
            this.cabeza = nuevoNodo;
        }

        this.tamaño++;
    }

    // --- MÉTODOS REQUERIDOS POR LA RÚBRICA ---

    // Navegación hacia adelante: Complejidad O(1)
    next() {
        if (this.actual && this.actual.siguiente) {
            this.actual = this.actual.siguiente;
            return this.actual.dato;
        }
        return null; // Fin de la lista
    }

    // Navegación hacia atrás: Complejidad O(1)
    prev() {
        if (this.actual && this.actual.anterior) {
            this.actual = this.actual.anterior;
            return this.actual.dato;
        }
        return null; // Inicio de la lista
    }

    // Método para imprimir los primeros elementos (Recorrido secuencial O(n))
    imprimirPrimeros(limite) {
        let nodoActual = this.cabeza;
        let contador = 0;
        let salida = "";

        while (nodoActual && contador < limite) {
            salida += `[ID: ${nodoActual.dato.id}] <-> `;
            nodoActual = nodoActual.siguiente;
            contador++;
        }
        console.log(salida + "NULL");
    }
}

module.exports = { ListaSatelital };