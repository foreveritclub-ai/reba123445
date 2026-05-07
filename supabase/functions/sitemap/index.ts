// Dynamic sitemap.xml generator — auto-includes new blog posts, case studies, services
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SITE = "https://egreedtech.org";

const STATIC: { loc: string; changefreq: string; priority: string }[] = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/blog", changefreq: "daily", priority: "0.9" },
  { loc: "/case-studies", changefreq: "weekly", priority: "0.9" },
  { loc: "/internship", changefreq: "weekly", priority: "0.8" },
  { loc: "/how-to-learn", changefreq: "monthly", priority: "0.7" },
  { loc: "/products/kero-iwawe-assist", changefreq: "monthly", priority: "0.8" },
  { loc: "/products/egreed-learning", changefreq: "monthly", priority: "0.8" },
  { loc: "/products/rebalive-rw", changefreq: "monthly", priority: "0.8" },
  { loc: "/about-egreed-technology", changefreq: "monthly", priority: "0.95" },
  { loc: "/it-consulting-rwanda", changefreq: "monthly", priority: "0.9" },
  { loc: "/school-management-system-rwanda", changefreq: "monthly", priority: "0.9" },
  { loc: "/software-development-rwanda", changefreq: "monthly", priority: "0.9" },
  { loc: "/signup", changefreq: "monthly", priority: "0.5" },
  { loc: "/signin", changefreq: "monthly", priority: "0.5" },
  { loc: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { loc: "/terms-of-service", changefreq: "yearly", priority: "0.3" },
];

// Service slugs (mirrors src/lib/services-data.ts)
const SERVICE_SLUGS = [
  "cloud-migration", "cybersecurity", "infrastructure-management", "it-strategy",
  "web-development", "mobile-app-development", "ai-machine-learning",
  "ai-chatbot-automation", "seo-local-ranking", "social-media-marketing",
  "ecommerce-mobile-money",
];

function urlTag(loc: string, lastmod: string, changefreq: string, priority: string) {
  return `  <url><loc>${SITE}${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const today = new Date().toISOString().slice(0, 10);
  const lines: string[] = [];

  for (const s of STATIC) lines.push(urlTag(s.loc, today, s.changefreq, s.priority));
  for (const slug of SERVICE_SLUGS)
    lines.push(urlTag(`/services/${slug}`, today, "monthly", "0.85"));

  const [{ data: posts }, { data: studies }] = await Promise.all([
    supabase.from("blog_posts").select("slug, updated_at").eq("is_published", true),
    supabase.from("case_studies").select("slug, updated_at").eq("is_published", true),
  ]);

  for (const p of posts ?? [])
    lines.push(urlTag(`/blog/${p.slug}`, (p.updated_at ?? today).slice(0, 10), "weekly", "0.85"));
  for (const c of studies ?? [])
    lines.push(urlTag(`/case-studies/${c.slug}`, (c.updated_at ?? today).slice(0, 10), "monthly", "0.85"));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${lines.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=300",
      "access-control-allow-origin": "*",
    },
  });
});
