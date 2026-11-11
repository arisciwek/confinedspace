// Status jadwal otomatis dalam kalender WIB (Asia/Jakarta).
(function () {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(function (part) { return [part.type, part.value]; }));
  const today = values.year + '-' + values.month + '-' + values.day;

  document.querySelectorAll('tr[data-start][data-end]').forEach(function (row) {
    const startDate = row.dataset.start || '';
    const endDate = row.dataset.end || '';
    const statusEl = row.querySelector('.status');
    if (!statusEl || !/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) return;

    const status = today < startDate ? 'open' : today <= endDate ? 'ongoing' : 'closed';
    statusEl.textContent = status === 'open' ? 'Dibuka' : status === 'ongoing' ? 'Berlangsung' : 'Ditutup';
    statusEl.classList.toggle('is-open', status === 'open');
    statusEl.classList.toggle('is-ongoing', status === 'ongoing');
    statusEl.classList.toggle('is-closed', status === 'closed');
  });
})();
