(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  menu?.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(expanded));
    nav.classList.toggle('open', expanded);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
      menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); menu.focus();
    }
  });
  const search = document.querySelector('#paper-search');
  const filters = [...document.querySelectorAll('.filter-button')];
  const papers = [...document.querySelectorAll('#paper-list .paper')];
  let filter = 'all';
  const applyFilters = () => {
    const query = (search?.value || '').trim().toLowerCase();
    let count = 0;
    for (const paper of papers) {
      const category = filter === 'all' || (filter === 'published' ? paper.dataset.status === 'Published' : paper.dataset.topic === filter);
      const visible = category && paper.dataset.search.includes(query);
      paper.hidden = !visible; if (visible) count++;
    }
    const counter = document.querySelector('.results-count');
    if (counter) counter.textContent = `${count} ${count === 1 ? 'paper or manuscript' : 'papers and manuscripts'}`;
    const empty = document.querySelector('.no-results'); if (empty) empty.hidden = count > 0;
  };
  search?.addEventListener('input', applyFilters);
  filters.forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    filters.forEach(x => x.setAttribute('aria-pressed', String(x === button)));
    applyFilters();
  }));
  document.querySelector('#reset-filters')?.addEventListener('click', () => {
    search.value = ''; filter = 'all';
    filters.forEach(x => x.setAttribute('aria-pressed', String(x.dataset.filter === 'all')));
    applyFilters(); search.focus();
  });
  let toastTimer;
  const notify = message => {
    const toast = document.querySelector('.toast'); if (!toast) return;
    toast.textContent = message; toast.classList.add('visible'); clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2400);
  };
  document.querySelectorAll('.copy-citation').forEach(button => button.addEventListener('click', async () => {
    const code = button.closest('.citation-body').querySelector('code');
    try { await navigator.clipboard.writeText(code.textContent); notify('Citation copied'); }
    catch {
      const selection = window.getSelection(); const range = document.createRange();
      range.selectNodeContents(code); selection.removeAllRanges(); selection.addRange(range);
      notify('Citation selected. Use your browser’s copy command.');
    }
  }));
})();

