import { ui } from '../config/ui.ts';

// Status jadwal otomatis (Dibuka / Ditutup) berdasarkan tanggal lokal perangkat,
// dipakai bersama oleh halaman depan, listing jadwal, dan detail angkatan.
const today = new Date();
today.setHours(0, 0, 0, 0);

document.querySelectorAll<HTMLTableRowElement>('tr[data-end]').forEach((row) => {
  const [y, m, d] = (row.dataset.end ?? '').split('-').map(Number);
  const endDate = new Date(y, m - 1, d);
  const status = row.querySelector('.status');
  if (!status) return;

  const isOpen = endDate >= today;
  status.textContent = isOpen ? ui.jadwal.statusOpen : ui.jadwal.statusClosed;
  status.classList.toggle('is-open', isOpen);
  status.classList.toggle('is-closed', !isOpen);
});
