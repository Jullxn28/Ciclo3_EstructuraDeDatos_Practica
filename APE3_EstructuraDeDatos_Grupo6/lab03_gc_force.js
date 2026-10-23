const historial = [];

console.log("[Iniciando prueba de Garbage Collector]");

// Definimos el ciclo iterativo donde 'i' toma valor
for (let i = 0; i < 100000; i++) {
    // Simulamos acumulación de memoria (push al historial)
    historial.push({ id: i, datos: new Array(1000).fill("test") });

    // --- BLOQUE QUE TIENES EN TU ARCHIVO ---
    if (i % 100 === 0) {
        // Si global.gc está expuesto, lo forzamos a limpiar
        if (global.gc) {
            global.gc(); // Ejecutamos el barrido manual
        }
        const memoryUsed = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
        console.log(`Iteración ${i} | RAM post-GC: ${memoryUsed} MB`);
    }
}