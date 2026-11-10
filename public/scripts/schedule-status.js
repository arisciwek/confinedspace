// Status jadwal otomatis (Dibuka / Ditutup) berdasarkan tanggal lokal perangkat
// Dipakai bersama oleh halaman depan, listing jadwal, dan detail angkatan.
// Versi plain JS untuk di-serve sebagai static file.

// Label dari config ui.ts (hardcode agar tidak butuh import)
const STATUS_OPEN = 'Dibuka';
const STATUS_CLOSED = 'Ditutup';

(function () {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  document.querySelectorAll('tr[data-end]').forEach(function (row) {
    var endAttr = row.dataset.end || '';
    var parts = endAttr.split('-').map(Number);
    if (parts.length !== 3) return;
    var endDate = new Date(parts[0], parts[1] - 1, parts[2]);
    var statusEl = row.querySelector('.status');
    if (!statusEl) return;

    var isOpen = endDate >= today;
    statusEl.textContent = isOpen ? STATUS_OPEN : STATUS_CLOSED;
    statusEl.classList.toggle('is-open', isOpen);
    statusEl.classList.toggle('is-closed', !isOpen);
  });
})();