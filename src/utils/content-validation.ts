import { getCollection } from 'astro:content';

export async function validateContentRelations(): Promise<void> {
  const [articles, pages, services, schedules] = await Promise.all([
    getCollection('articles'),
    getCollection('pages'),
    getCollection('services'),
    getCollection('schedule'),
  ]);

  assertUnique(articles, 'article');
  assertUnique(pages, 'page');
  assertUnique(services, 'service');
  assertUnique(schedules, 'schedule');

  assertUniqueUlids([...articles, ...pages, ...services, ...schedules]);

  for (const batch of schedules) {
    if (batch.data.startDate > batch.data.endDate) {
      throw new Error(`Schedule "${batch.data.slug}" has startDate after endDate.`);
    }
    if (batch.data.attendanceMode === 'online' && !batch.data.virtualUrl) {
      throw new Error(`Schedule "${batch.data.slug}" with attendanceMode "${batch.data.attendanceMode}" requires virtualUrl.`);
    }
  }

  const targets = { article: articles, page: pages, service: services };

  // Setiap gambar hanya boleh dipakai 1 kali di seluruh artikel (featuredImage + galeri).
  const imageOwners = new Map<string, string>();
  const claimImage = (src: string, owner: string) => {
    const previous = imageOwners.get(src);
    if (previous) {
      throw new Error(`Image "${src}" is used by both "${previous}" and "${owner}". Each image may only be used once.`);
    }
    imageOwners.set(src, owner);
  };

  for (const article of articles) {
    const blockIds = new Set<string>();

    if (article.data.featuredImage) {
      claimImage(article.data.featuredImage, `${article.data.slug} (featuredImage)`);
    }

    // Aturan SEO gambar: alt foto utama wajib ada dan sama persis dengan judul artikel.
    if (article.data.featuredImage && !article.data.featuredImageAlt) {
      throw new Error(`Article "${article.data.slug}" has featuredImage but is missing featuredImageAlt (must equal the article title).`);
    }
    if (article.data.featuredImageAlt && article.data.featuredImageAlt !== article.data.title) {
      throw new Error(`Article "${article.data.slug}" featuredImageAlt must equal the article title "${article.data.title}".`);
    }

    for (const block of article.data.blocks) {
      if ('id' in block && block.id) {
        if (blockIds.has(block.id)) {
          throw new Error(`Article "${article.data.slug}" has duplicate block ID "${block.id}".`);
        }
        blockIds.add(block.id);
      }

      if (
        block.component === 'table' &&
        block.rows.some((row) => row.length !== block.head.length)
      ) {
        throw new Error(
          `Article "${article.data.slug}" table "${block.id ?? block.heading ?? 'unnamed'}" has rows that do not match its ${block.head.length} headers.`,
        );
      }

      if (
        block.component === 'comparison-table' &&
        block.rows.some((row) => row.length !== block.headers.length)
      ) {
        throw new Error(
          `Article "${article.data.slug}" comparison table "${block.id}" has rows that do not match its ${block.headers.length} headers.`,
        );
      }

      if (block.component === 'gallery') {
        if (block.items.length < 2 || block.items.length > 4) {
          throw new Error(
            `Article "${article.data.slug}" gallery "${block.id}" must contain 2–4 photos (found ${block.items.length}).`,
          );
        }
        const relatedServiceId = article.data.relatedServices?.[0];
        const relatedService = relatedServiceId !== undefined
          ? services.find((service) => service.data.id === relatedServiceId)
          : undefined;
        const allowedPrefixes = [article.data.slug, relatedService?.data.slug].filter(
          (prefix): prefix is string => Boolean(prefix),
        );
        const seenGallerySources = new Set<string>();
        for (const item of block.items) {
          if (seenGallerySources.has(item.src)) {
            throw new Error(
              `Article "${article.data.slug}" gallery "${block.id}" lists image "${item.src}" more than once.`,
            );
          }
          seenGallerySources.add(item.src);
          claimImage(item.src, `${article.data.slug} (gallery "${block.id}")`);

          const fileName = item.src.split('/').pop() ?? '';
          if (!allowedPrefixes.some((prefix) => fileName.startsWith(`${prefix}-`))) {
            throw new Error(
              `Article "${article.data.slug}" gallery "${block.id}" image "${fileName}" must be named with the article slug or related service slug plus a number (e.g. "${allowedPrefixes[0]}-1.webp").`,
            );
          }
          if (relatedService && fileName.startsWith(`${relatedService.data.slug}-`)) {
            const expectedAlt = `${relatedService.data.title} adalah `;
            if (!item.alt.startsWith(expectedAlt)) {
              throw new Error(
                `Article "${article.data.slug}" gallery "${block.id}" service image "${fileName}" alt must start with "${expectedAlt}".`,
              );
            }
          }
        }
      }
    }

    const relatedServiceIds = article.data.relatedServices ?? [];
    if (relatedServiceIds.length > 1) {
      throw new Error(`Article "${article.data.slug}" may reference only one related service (found ${relatedServiceIds.length}); the footer claim must name a single service.`);
    }
    const uniqueRelatedServiceIds = new Set<number>();
    for (const serviceId of relatedServiceIds) {
      if (uniqueRelatedServiceIds.has(serviceId)) {
        throw new Error(`Article "${article.data.slug}" lists related service ID ${serviceId} more than once.`);
      }
      uniqueRelatedServiceIds.add(serviceId);
      const targetService = services.find((service) => service.data.id === serviceId && !service.data.draft && service.data.status === 'active');
      if (!targetService) {
        throw new Error(`Article "${article.data.slug}" references missing, draft, or inactive service ID ${serviceId} in relatedServices.`);
      }
    }

    const { relatedType, relatedId, relatedArticles = [] } = article.data;
    if ((relatedType === undefined) !== (relatedId === undefined)) {
      throw new Error(`Article "${article.data.slug}" must set both relatedType and relatedId, or neither.`);
    }
    if (relatedType && relatedId !== undefined) {
      const target = targets[relatedType].find((item) => item.data.id === relatedId && !item.data.draft);
      if (!target) {
        throw new Error(`Article "${article.data.slug}" references missing or draft ${relatedType} ID ${relatedId}.`);
      }
    }
    const combinedServiceIds = new Set<number>(relatedServiceIds);
    if (relatedType === 'service' && relatedId !== undefined) combinedServiceIds.add(relatedId);
    if (combinedServiceIds.size > 1) {
      throw new Error(`Article "${article.data.slug}" may reference only one related service (found ${combinedServiceIds.size}); the footer claim must name a single service.`);
    }
    const relatedArticleIds = new Set<number>();
    for (const relatedIdValue of relatedArticles) {
      if (relatedArticleIds.has(relatedIdValue)) {
        throw new Error(`Article "${article.data.slug}" lists related article ID ${relatedIdValue} more than once.`);
      }
      relatedArticleIds.add(relatedIdValue);

      const target = articles.find((item) => item.data.id === relatedIdValue && !item.data.draft);
      if (!target) {
        throw new Error(`Article "${article.data.slug}" references missing, draft, or unpublished related article ID ${relatedIdValue}.`);
      }
      if (target.data.id === article.data.id) {
        throw new Error(`Article "${article.data.slug}" cannot reference itself in relatedArticles.`);
      }
    }

    assertHeadingOrder('Article', article.data.slug, article.data.blocks);
  }

  for (const service of services) {
    assertHeadingOrder('Service', service.data.slug, service.data.blocks);
  }
  for (const page of pages) {
    assertHeadingOrder('Page', page.data.slug, page.data.blocks, { allowLeadingH1: true });
  }
}

type HeadingBlock = { component: string; heading?: string; title?: string };

/**
 * Level heading yang dirender tiap block, sesuai urutan di DOM.
 * Hanya block yang benar-benar merender <hN> yang dicatat.
 */
function headingLevelsForBlock(block: HeadingBlock): number[] {
  switch (block.component) {
    case 'card': return [3];
    case 'faq': return [2];
    case 'cta': return block.heading ? [2] : [];
    case 'table': return block.heading ? [2] : [];
    case 'note': return [3];
    case 'steps': return [2, 3];
    case 'stats': return block.heading ? [2] : [];
    case 'glossary': return [2];
    case 'quote': return [];
    case 'section': return [2];
    case 'process-timeline': return [2, 3];
    case 'checklist-card': return [2];
    case 'comparison-table': return [2];
    case 'document-list': return [2, 3];
    case 'image-panel': return [];
    case 'gallery': return block.heading ? [2] : [];
    case 'feature-card-grid': return [2, 3];
    case 'stats-grid': return [];
    case 'source-links': return [2];
    case 'page-header': return [1];
    case 'home-hero': return [1, 2, 3];
    case 'service-list': return block.heading ? [2] : [];
    case 'home-process': return [2, 3];
    case 'article-list': return [2];
    case 'home-cta': return [2];
    case 'not-found': return [1];
    case 'multi-step-form': return [2];
    case 'contact-panel': return [2, 3, 3, 3, 3];
    default: return [];
  }
}

/**
 * Struktur heading harus berurutan: H1 → H2 → H3 → H4 → (boleh turun lagi ke H3).
 * Naik lebih dari satu level (mis. H1 → H3 atau H2 → H4) ditolak.
 * Halaman artikel/layanan sudah punya H1 dari layout, jadi block tidak boleh merender H1.
 */
function assertHeadingOrder(
  kind: string,
  slug: string,
  blocks: ReadonlyArray<HeadingBlock>,
  options: { allowLeadingH1?: boolean } = {},
): void {
  let previous = 1;
  let seenHeading = false;

  for (const block of blocks) {
    for (const level of headingLevelsForBlock(block)) {
      if (level === 1) {
        if (options.allowLeadingH1 && !seenHeading) {
          previous = 1;
          seenHeading = true;
          continue;
        }
        throw new Error(
          `${kind} "${slug}" block "${block.component}" renders an H1, but the page already has an H1 title. Use H2 or lower.`,
        );
      }
      if (level > previous + 1) {
        throw new Error(
          `${kind} "${slug}" heading order invalid at block "${block.component}": H${level} follows H${previous} (skips H${previous + 1}). Headings must run H1 → H2 → H3 → H4 without gaps.`,
        );
      }
      previous = level;
      seenHeading = true;
    }
  }
}

function assertUniqueUlids(items: Array<{ data: { ulid: string; slug: string } }>): void {
  const seen = new Map<string, string>();
  for (const item of items) {
    const previous = seen.get(item.data.ulid);
    if (previous) {
      throw new Error(`Duplicate ULID "${item.data.ulid}" used by "${previous}" and "${item.data.slug}".`);
    }
    seen.set(item.data.ulid, item.data.slug);
  }
}

function assertUnique<T extends { data: { id: number; slug: string } }>(items: T[], type: string): void {
  const ids = new Set<number>();
  const slugs = new Set<string>();
  for (const item of items) {
    if (ids.has(item.data.id)) throw new Error(`Duplicate ${type} ID: ${item.data.id}.`);
    if (slugs.has(item.data.slug)) throw new Error(`Duplicate ${type} slug: "${item.data.slug}".`);
    ids.add(item.data.id);
    slugs.add(item.data.slug);
  }
}
