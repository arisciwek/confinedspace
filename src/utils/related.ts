import type { CollectionEntry } from 'astro:content';

/**
 * Artikel terkait sebuah layanan.
 *
 * Relasi disimpan di frontmatter artikel (relatedServices: [id layanan],
 * maksimal 1 id per artikel — dipakai juga untuk klaim footer).
 * Hasil diurutkan descending dari updatedDate (fallback pubDate),
 * tie-break id lebih besar dulu, lalu dibatasi `limit`.
 */
export function articlesForService(
  articles: CollectionEntry<'articles'>[],
  serviceId: number,
  limit = 3,
): CollectionEntry<'articles'>[] {
  return articles
    .filter((article) =>
      !article.data.draft
      && article.data.contentType !== 'local-seo'
      && (article.data.relatedServices ?? []).includes(serviceId),
    )
    .sort((a, b) => {
      const aDate = (a.data.updatedDate ?? a.data.pubDate).valueOf();
      const bDate = (b.data.updatedDate ?? b.data.pubDate).valueOf();
      return bDate - aDate || b.data.id - a.data.id;
    })
    .slice(0, limit);
}