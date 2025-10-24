// Percorso del file Markdown esterno
const MARKDOWN_FILE = 'https://raw.githubusercontent.com/FrancescoCeliento/saria-toolkit/refs/heads/main/DOCS.MD';

fetch(MARKDOWN_FILE)
  .then(res => res.text())
  .then(md => {
    // Converte Markdown in HTML
    const html = marked.parse(md);
    document.getElementById('content').innerHTML = html;

    // Aggiunge ID ai titoli per il collegamento
    document.querySelectorAll('#content h1, #content h2, #content h3').forEach(h => {
      const id = h.innerText.toLowerCase().replace(/[^\w]+/g, '-');
      h.id = id;
    });

    // Genera il menu laterale
    generateMenu(md);
  });

function generateMenu(mdText) {
  const lines = mdText.split('\n');
  const menu = document.getElementById('menu');
  let html = '';

  lines.forEach(line => {
    if (line.startsWith('# ')) {
      const title = line.replace('# ', '');
      const id = title.toLowerCase().replace(/[^\w]+/g, '-');
      html += `<div class="menu-item level1"><strong>${title}</strong></div>`;
    }
    if (line.startsWith('## ')) {
      const title = line.replace('## ', '');
      const id = title.toLowerCase().replace(/[^\w]+/g, '-');
      html += `<div class="menu-item level2"><a href="#${id}">${title}</a></div>`;
    }
    if (line.startsWith('### ')) {
      const title = line.replace('### ', '');
      const id = title.toLowerCase().replace(/[^\w]+/g, '-');
      html += `<div class="menu-item level3"><a href="#${id}">${title}</a></div>`;
    }
  });

  menu.innerHTML = html;

  // Filtro
  document.getElementById('filter').addEventListener('input', e => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('.menu-item').forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(term) ? '' : 'none';
    });
  });
}

