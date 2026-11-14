const { performance } = require('perf_hooks');

// Referencia global que utilizaremos para almacenar y limpiar datos
let historialSatelitalGlobal = []; 

console.log("[Auditoría] Iniciando simulación con gestión de memoria...");

function procesarCoordenada() {
    // Simulamos un paquete de datos pesado
    const paquete = {
        timestamp: Date.now(),
        lat: Math.random() * 90,
        lng: Math.random() * 180,
        // Carga útil pesada para acelerar el llenado de la memoria
        payload: new Array(100000).fill('datos_topograficos_basura') 
    };
    // El error lógico: Almacenamos todo indefinidamente causando S(n) = O(n)
    historialSatelitalGlobal.push(paquete);
}

// Monitoreo y limpieza de la memoria Heap cada 100 iteraciones
for (let i = 1; i <= 500; i++) {
    procesarCoordenada();
    if (i % 100 === 0) {
        const memoryBefore = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
        console.log(`Iteración ${i} | RAM antes de limpiar: ${memoryBefore} MB`);
        //Vaciamos el arreglo para que los objetos 
        //dejen de ser alcanzables desde la raíz global.
        historialSatelitalGlobal = []; 
        // FORZAR EL RECOLECTOR DE BASURA
        if (global.gc) {
            global.gc(); // Barrido manual
        }

        const memoryAfter = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
        console.log(`Iteración ${i} | RAM post-GC (liberada): ${memoryAfter} MB`);
    }
}

console.log(`[Auditoría] Finalizado con éxito.`);