/**
 * Utilitas HowTo (schema.org) — membangun node JSON-LD HowTo dari satu blok
 * prosedural yang benar-benar ditampilkan pada halaman.
 *
 * Blok yang didukung:
 * - `steps`             → langkah di `items[].{title, text}`
 * - `process-timeline`  → langkah di `steps[].{title, description}`
 *
 * Node dikembalikan `null` (bukan error) bila blok tidak ditemukan, langkah
 * kurang dari 2, atau ada langkah tanpa `title`/teks — sejalan dengan pola
 * FAQPage/ItemList di layout: JSON-LD turunan hanya muncul bila datanya valid.
 */

export interface HowToRef {
  /** `id` blok `steps` / `process-timeline` yang dirujuk. */
  blockId: string;
  /** Nama alternatif HowTo; bila kosong memakai judul halaman. */
  name?: string;
  /** Deskripsi alternatif; bila kosong memakai deskripsi halaman. */
  description?: string;
}

interface ProceduralBlock {
  component: 'steps' | 'process-timeline';
  id?: string;
  items?: unknown;
  steps?: unknown;
}

export function howToJsonLd(opts: {
  /** URL absolut halaman tempat HowTo berada. */
  pageUrl: string;
  /** Judul default (dipakai bila `howTo.name` tidak diisi). */
  name: string;
  /** Deskripsi default (dipakai bila `howTo.description` tidak diisi). */
  description: string;
  howTo: HowToRef;
  blocks: readonly unknown[];
}): Record<string, unknown> | null {
  const { pageUrl, name, description, howTo, blocks } = opts;
  if (!Array.isArray(blocks)) return null;

  const block = blocks.find(
    (block): block is ProceduralBlock =>
      typeof block === 'object' &&
      block !== null &&
      (block as ProceduralBlock).id === howTo.blockId &&
      ((block as { component?: string }).component === 'steps' ||
        (block as { component?: string }).component === 'process-timeline'),
  );
  if (!block) return null;

  const rawSteps = block.component === 'steps' ? block.items : block.steps;
  if (!Array.isArray(rawSteps) || rawSteps.length < 2) return null;

  const steps = rawSteps.map((step: { title?: unknown; text?: unknown; description?: unknown }, index: number) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: typeof step.title === 'string' ? step.title.replace(/^\d+[.)]\s*/, '') : '',
    text: typeof step.text === 'string' ? step.text : typeof step.description === 'string' ? step.description : '',
  }));
  if (steps.some((step) => !step.name || !step.text)) return null;

  return {
    '@type': 'HowTo',
    '@id': `${pageUrl}#howto`,
    name,
    description,
    inLanguage: 'id-ID',
    mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
    step: steps,
  };
}
