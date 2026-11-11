export type ScheduleStatus = 'open' | 'ongoing' | 'closed';

/** Compare date-only schedule fields against the current calendar date in WIB. */
export function getScheduleStatus(startDate: string, endDate: string, now = new Date()): ScheduleStatus {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const today = values.year + '-' + values.month + '-' + values.day;

  if (today < startDate) return 'open';
  if (today <= endDate) return 'ongoing';
  return 'closed';
}
