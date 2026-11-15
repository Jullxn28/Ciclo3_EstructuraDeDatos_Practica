const GestorOrdenamientoTransaccional = require('./GestorOrdenamientoTransaccional');
const { catalan, secuenciasValidas } = require('./Catalan');
const { PilaTransaccional } = require('./PilaTransaccional');
const { performance } = require('perf_hooks');


// --- Undo / Redo ---
const base = Array.from({ length: 10 }, (_, i) => ({ id: i, watts: i * 100 }));
const gestor = new GestorOrdenamientoTransaccional(base);
const copiaOriginal = gestor.registros.map(r => r.watts);

gestor.actualizarConRegistroDelta(0, 9999, 'LOTE_A');
console.log('Tras la mutación:', gestor.registros.map(r => r.watts).join(', '));

const revertidas = gestor.deshacerLoteTransaccional('LOTE_A');
console.log(`Deltas revertidos: ${revertidas}`);
console.log('Restaurado:', gestor.registros.map(r => r.watts).join(', '));
console.log('¿Idéntico al original?', JSON.stringify(copiaOriginal) === JSON.stringify(gestor.registros.map(r => r.watts)));

gestor.rehacerLoteTransaccional('LOTE_A');
console.log('Tras Redo:', gestor.registros.map(r => r.watts).join(', '));

// --- Números de Catalan ---
console.log('\n=== SECUENCIAS VÁLIDAS DE PILA ===');
for (let n = 1; n <= 5; n++) {
  const generadas = secuenciasValidas(n).length;
  console.log(`n=${n}: C_n=${catalan(n)} | generadas=${generadas} | ${generadas === catalan(n) ? 'ok' : 'ERROR'}`);
}
console.log('\n=== VERIFICACIÓN O(1) PUSH/POP ===');
for (const n of [10000, 50000, 100000, 500000]) {
  const p = new PilaTransaccional();
  const t0 = performance.now();
  for (let i = 0; i < n; i++) p.push(i, i, i + 1, 'L');
  for (let i = 0; i < n; i++) p.pop();
  const t1 = performance.now();
  console.log(`n=${n} | total=${(t1 - t0).toFixed(2)} ms | por op=${((t1 - t0) / (2 * n) * 1000).toFixed(4)} µs`);
}
