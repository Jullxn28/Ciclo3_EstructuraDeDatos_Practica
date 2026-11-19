const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");
const { busquedaSecuencial, busquedaBinaria } = require("./Busquedas");

const ESCENARIOS = [1000, 50000, 500000];
const REPLICAS = 100;

function generarDatasetOrdenado(n) {
  return Array.from({ length: n }, (_, idx) => ({
    id: idx * 2,
    valor: "REG_" + idx
  }));
}

function promedio(arr) {
  return arr.reduce((acc, v) => acc + v, 0) / arr.length;
}

console.log("=== BENCHMARK EMPIRICO: BUSQUEDA SECUENCIAL vs BUSQUEDA BINARIA ===");

for (const n of ESCENARIOS) {
  const dataset = generarDatasetOrdenado(n);
  const archivoIndice = path.join(__dirname, "indice_" + n + ".json");
  fs.writeFileSync(archivoIndice, JSON.stringify(dataset));
  const datosDesdeArchivo = JSON.parse(fs.readFileSync(archivoIndice, "utf-8"));

  const tiemposSeqMem = [];
  const compSeqMem = [];
  const tiemposBinMem = [];
  const compBinMem = [];
  const tiemposSeqDisk = [];
  const tiemposBinDisk = [];

  for (let r = 0; r < REPLICAS; r++) {
    const idxObjetivo = Math.floor(Math.random() * n);
    const objetivo = dataset[idxObjetivo].id;

    const t0SeqM = performance.now();
    const resSeqM = busquedaSecuencial(dataset, objetivo);
    const t1SeqM = performance.now();
    tiemposSeqMem.push(t1SeqM - t0SeqM);
    compSeqMem.push(resSeqM.comparaciones);

    const t0BinM = performance.now();
    const resBinM = busquedaBinaria(dataset, objetivo);
    const t1BinM = performance.now();
    tiemposBinMem.push(t1BinM - t0BinM);
    compBinMem.push(resBinM.comparaciones);

    const t0SeqD = performance.now();
    busquedaSecuencial(datosDesdeArchivo, objetivo);
    const t1SeqD = performance.now();
    tiemposSeqDisk.push(t1SeqD - t0SeqD);

    const t0BinD = performance.now();
    busquedaBinaria(datosDesdeArchivo, objetivo);
    const t1BinD = performance.now();
    tiemposBinDisk.push(t1BinD - t0BinD);
  }

  if (fs.existsSync(archivoIndice)) fs.unlinkSync(archivoIndice);

  console.log("--- Escenario N = " + n.toLocaleString() + " registros ---");
  console.table([
    {
      Estrategia: "Secuencial O(n) [Memoria]",
      "Tiempo Prom (ms)": promedio(tiemposSeqMem).toFixed(6),
      "Comparaciones Prom": promedio(compSeqMem).toFixed(1),
      "Cota Teorica": n
    },
    {
      Estrategia: "Binaria O(log n) [Memoria]",
      "Tiempo Prom (ms)": promedio(tiemposBinMem).toFixed(6),
      "Comparaciones Prom": promedio(compBinMem).toFixed(1),
      "Cota Teorica": Math.ceil(Math.log2(n))
    },
    {
      Estrategia: "Secuencial O(n) [Archivo Indexado]",
      "Tiempo Prom (ms)": promedio(tiemposSeqDisk).toFixed(6),
      "Comparaciones Prom": promedio(compSeqMem).toFixed(1),
      "Cota Teorica": n
    },
    {
      Estrategia: "Binaria O(log n) [Archivo Indexado]",
      "Tiempo Prom (ms)": promedio(tiemposBinDisk).toFixed(6),
      "Comparaciones Prom": promedio(compBinMem).toFixed(1),
      "Cota Teorica": Math.ceil(Math.log2(n))
    }
  ]);
}
