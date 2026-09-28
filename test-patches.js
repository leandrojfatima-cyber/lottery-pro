const fs = require('fs');

const cssPatch = fs.readFileSync('PATCH-1-CSS-ANALISE.txt', 'utf8')
  .split('/* ===== UPGRADE VISUAL ANÁLISE (ESTILO DEZENEIRO) ===== */')[1]
  .split('4. Pressione Ctrl + S')[0];

const htmlPatch = fs.readFileSync('PATCH-2-HTML-ANALISE.txt', 'utf8')
  .split('<!-- ANÁLISE -->')[1]
  .split('5. Pressione Ctrl + S')[0];

const jsPatch = fs.readFileSync('PATCH-3-JS-ANALISE.txt', 'utf8')
  .split('/* ============================================================ ANÁLISE */')[1]
  .split('4. Pressione Ctrl + S')[0];

console.log('Patches read successfully');
