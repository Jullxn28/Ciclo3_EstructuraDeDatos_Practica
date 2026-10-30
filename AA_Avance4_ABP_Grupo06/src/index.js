/**
 * Punto de entrada del módulo de navegación bidireccional.
 * Demostración de uso de ListaDobleNavegacion (Avance 4 - ABP).
 */

const ListaDobleNavegacion = require('./models/ListaDobleNavegacion');

function demo() {
  const historial = new ListaDobleNavegacion();

  historial.insertar({ id: 101, accion: 'Cargar Vista A' });
  historial.insertar({ id: 102, accion: 'Filtrar Datos B' });
  historial.insertar({ id: 103, accion: 'Exportar Reporte C' });

  console.log('Actual:', historial.obtenerActual());

  console.log('Avanzar ->', historial.avanzar());
  console.log('Avanzar ->', historial.avanzar());
  console.log('Avanzar (límite) ->', historial.avanzar());

  console.log('Retroceder ->', historial.retroceder());
  console.log('Retroceder ->', historial.retroceder());
  console.log('Retroceder (límite) ->', historial.retroceder());

  historial.avanzar(); // cursor en 102
  console.log('Eliminar actual:', historial.eliminarActual());
  console.log('Nuevo actual:', historial.obtenerActual());
  console.log('Longitud:', historial.longitud);
}

if (require.main === module) {
  demo();
}

module.exports = { ListaDobleNavegacion };
