import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL(import.meta.env.SITE_URL ?? 'http://confinedspace.lan')).toString().replace(/\/$/, '');
  const [articles, services, pages] = await Promise.all([
    getCollection('articles'),
    getCollection('services'),
    getCollection('pages'),
  ]);
  const urls = [
    ...pages.filter((page) => !page.data.draft && !page.data.noindex && ['home', 'articles', 'services', 'kontak'].includes(page.data.slug)).map((page) => ({
      // Slug "home" dirender oleh index.astro di root, bukan [slug].astro.
      loc: page.data.slug === 'home' ? `${base}/` : (page.data.canonical ? new URL(page.data.canonical, base).toString() : `${base}/${page.data.slug}/`),
      lastmod: page.data.updatedDate,
    })),
    ...articles.filter((item) => !item.data.draft).map((item) => ({
      loc: `${base}/articles/${item.data.slug}/`,
      lastmod: item.data.updatedDate ?? item.data.pubDate,
    })),
    ...services.filter((item) => !item.data.draft && item.data.status === 'active').map((item) => ({
      loc: `${base}/services/${item.data.slug}/`,
      lastmod: item.data.updatedDate ?? item.data.pubDate,
    })),
  ];
  const body = urls.map(({ loc, lastmod }) =>
    `  <url><loc>${escapeXml(loc)}</loc>${lastmod ? `<lastmod>${lastmod.toISOString().replace(/\.\d{3}Z$/, 'Z')}</lastmod>` : ''}</url>`
  ).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

function escapeXml(value: string): string {
  return value.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"').replace(/'/g, '&apos;');
}