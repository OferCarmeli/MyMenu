const q = document.getElementById('q');
const rows = [...document.querySelectorAll('.item-row')];
const pillars = [...document.querySelectorAll('.pillar')];
const resetBtn = document.getElementById('reset');

const norm = s => (s || '').toLowerCase().trim();

function updateCounts() {
  pillars.forEach(p => {
    const visible = p.querySelectorAll('.item-row:not(.hidden)').length;
    const total = p.querySelectorAll('.item-row').length;

    const badge = p.querySelector('[data-count]');
    if (badge) badge.textContent = `${visible}/${total}`;

    p.classList.toggle('hidden', visible === 0);
  });
}

function applyFilter() {
  const needle = norm(q.value);

  rows.forEach(row => {
    const hay = [
      row.dataset.name,
      row.dataset.desc,
      row.dataset.tags,
      row.textContent
    ].map(norm).join(' ');

    row.classList.toggle('hidden', needle && !hay.includes(needle));
  });

  updateCounts();
}

q.addEventListener('input', applyFilter);

resetBtn.addEventListener('click', () => {
  q.value = '';
  applyFilter();
  q.focus();
});

window.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    q.focus();
  }
  if (e.key === 'Escape') {
    q.value = '';
    applyFilter();
  }
});

updateCounts();
