/**
 * Módulo de Ordenamiento Logarítmico (QuickSort) - Proyecto ABPr (Agua Cisternas Loja)
 */

const { performance } = require('perf_hooks');

// 1. Dataset inicial creado en memoria basado en el proyecto ABPr
const datasetCisternas = [
    { id: "CIS-004", capacidadLitros: 8000, estado: "disponible", prioridad: 2, zona: "El Valle" },
    { id: "CIS-001", capacidadLitros: 5000, estado: "disponible", prioridad: 1, zona: "Centro" },
    { id: "CIS-006", capacidadLitros: 10000, estado: "disponible", prioridad: 1, zona: "Carigán" },
    { id: "CIS-002", capacidadLitros: 3000, estado: "mantenimiento", prioridad: 3, zona: "Punzara" },
    { id: "CIS-003", capacidadLitros: 5000, estado: "disponible", prioridad: 2, zona: "Belén" },
    { id: "CIS-005", capacidadLitros: 3000, estado: "disponible", prioridad: 1, zona: "Tierras Coloradas" }
];

/**
 * Función de comparación para múltiples criterios:
 * 1. Capacidad de litros (Descendente: mayor capacidad primero)
 * 2. Prioridad operativa (Ascendente: menor número = mayor urgencia)
 * 3. ID alfanumérico (Ascendente)
 */
function compararRegistros(a, b) {
    if (b.capacidadLitros !== a.capacidadLitros) {
        return b.capacidadLitros - a.capacidadLitros; // Descendente
    }
    if (a.prioridad !== b.prioridad) {
        return a.prioridad - b.prioridad; // Ascendente
    }
    return a.id.localeCompare(b.id); // Ascendente alfanumérico
}

/**
 * Implementación de QuickSort desde cero
 */
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        // Si arr[j] es "menor" que el pivote según los criterios múltiples
        if (compararRegistros(arr[j], pivot) < 0) {
            i++;
            // Intercambio sin métodos nativos
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}

// Ejecucion

console.log("=== ANTES DEL ORDENAMIENTO (Dataset ABPr) ===");
console.table(datasetCisternas);

// Capturar métricas iniciales de memoria heap y tiempo
const memoriaAntes = process.memoryUsage().heapUsed;
const tiempoInicio = performance.now();

// Ejecución del algoritmo de ordenamiento logarítmico sobre una copia independiente
const datasetProcesado = [...datasetCisternas];
quickSort(datasetProcesado);

// Capturar métricas finales
const tiempoFin = performance.now();
const memoriaDespues = process.memoryUsage().heapUsed;

console.log("\n=== DESPUÉS DEL ORDENAMIENTO (QuickSort Multicriterio) ===");
console.table(datasetProcesado);

// Cálculos de rendimiento
const tiempoEjecucionMs = (tiempoFin - tiempoInicio).toFixed(4);
const consumoMemoriaBytes = memoriaDespues - memoriaAntes;
const heapUsedActual = memoriaDespues;

console.log("\n=== MÉTRICAS DE EFICIENCIA COMPUTACIONAL ===");
console.log(`Tiempo de respuesta: ${tiempoEjecucionMs} ms`);
console.log(`Consumo de memoria Heap (diferencia): ${consumoMemoriaBytes} bytes`);
console.log(`Consumo total process.memoryUsage().heapUsed: ${heapUsedActual} bytes`);