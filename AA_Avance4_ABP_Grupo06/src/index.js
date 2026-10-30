/**
 * Punto de entrada del módulo de navegación bidireccional.
 * Demostración de uso de ListaDobleNavegacion (Avance 4 - ABP).
 */

// Importa la clase que administra la lista doblemente enlazada
const ListaDobleNavegacion = require('./models/ListaDobleNavegacion');

// Función principal para demostrar el funcionamiento de la lista
function demo() {

  // Crea una nueva lista doblemente enlazada
  const historial = new ListaDobleNavegacion();

  // Inserta tres acciones en el historial
  historial.insertar({ id: 101, accion: 'Cargar Vista A' });
  historial.insertar({ id: 102, accion: 'Filtrar Datos B' });
  historial.insertar({ id: 103, accion: 'Exportar Reporte C' });

  // Muestra el elemento donde se encuentra el cursor
  console.log('Actual:', historial.obtenerActual());

  // Avanza entre los nodos y comprueba el límite final
  console.log('Avanzar ->', historial.avanzar());
  console.log('Avanzar ->', historial.avanzar());
  console.log('Avanzar (límite) ->', historial.avanzar());

  // Retrocede entre los nodos y comprueba el límite inicial
  console.log('Retroceder ->', historial.retroceder());
  console.log('Retroceder ->', historial.retroceder());
  console.log('Retroceder (límite) ->', historial.retroceder());

  // Avanza hasta el nodo con ID 102
  historial.avanzar();

  // Elimina el nodo actual y muestra el resultado
  console.log('Eliminar actual:', historial.eliminarActual());

  // Muestra el nuevo nodo actual y la cantidad de elementos
  console.log('Nuevo actual:', historial.obtenerActual());
  console.log('Longitud:', historial.longitud);
}

// Ejecuta la demostración solo si este archivo se ejecuta directamente
if (require.main === module) {
  demo();
}

// Exporta la clase para utilizarla desde otros archivos
module.exports = { ListaDobleNavegacion };
