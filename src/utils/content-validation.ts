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

  const featuredImageOwners = new Map<string, string>();

  for (const article of articles) {
    const blockIds = new Set<string>();

    // Setiap gambar hanya boleh dipakai 1 kali di seluruh artikel.
    if (article.data.featuredImage) {
      const owner = featuredImageOwners.get(article.data.featuredImage);
      if (owner) {
        throw new Error(`Article "${article.data.slug}" reuses featuredImage "${article.data.featuredImage}" already used by "${owner}". Each image may only be used once.`);
      }
      featuredImageOwners.set(article.data.featuredImage, article.data.slug);
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
