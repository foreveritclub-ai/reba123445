import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, ExternalLink, RefreshCcw, Globe, FileSearch } from "lucide-react";

const SITE = "https://egreedtech.org";
const DYNAMIC_SITEMAP = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sitemap`;

type CheckResult = { label: string; ok: boolean; detail?: string };

async function fetchText(url: string): Promise<string> {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error(`${r.status}`);
  return r.text();
}

function checkHtmlForSeo(html: string): CheckResult[] {
  const tag = (re: RegExp) => re.test(html);
  return [
    { label: "<title> tag present", ok: tag(/<title[^>]*>[^<]+<\/title>/i) },
    { label: "Meta description", ok: tag(/<meta[^>]+name=["']description["'][^>]+content=/i) },
    { label: "Canonical link", ok: tag(/<link[^>]+rel=["']canonical["']/i) },
    { label: "OG title", ok: tag(/property=["']og:title["']/i) },
    { label: "OG description", ok: tag(/property=["']og:description["']/i) },
    { label: "OG image", ok: tag(/property=["']og:image["']/i) },
    { label: "Twitter card", ok: tag(/name=["']twitter:card["']/i) },
    { label: "JSON-LD structured data", ok: tag(/application\/ld\+json/i) },
  ];
}

const AdminSeoPreview = () => {
  const [robots, setRobots] = useState<string>("");
  const [staticSitemap, setStaticSitemap] = useState<string>("");
  const [dynamicSitemap, setDynamicSitemap] = useState<string>("");
  const [pageChecks, setPageChecks] = useState<{ url: string; checks: CheckResult[] } | null>(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const [pageUrl, setPageUrl] = useState("/");

  const { data: blogs } = useQuery({
    queryKey: ["seo-blog-slugs"],
    queryFn: async () => {
      const { data } = await supabase.from("blog_posts").select("slug, title, updated_at").eq("is_published", true);
      return data ?? [];
    },
  });

  const { data: cases } = useQuery({
    queryKey: ["seo-case-slugs"],
    queryFn: async () => {
      const { data } = await supabase.from("case_studies").select("slug, title, updated_at").eq("is_published", true);
      return data ?? [];
    },
  });

  const loadFiles = async () => {
    try { setRobots(await fetchText("/robots.txt")); } catch { setRobots("(failed to load)"); }
    try { setStaticSitemap(await fetchText("/sitemap.xml")); } catch { setStaticSitemap("(failed to load)"); }
    try { setDynamicSitemap(await fetchText(DYNAMIC_SITEMAP)); } catch (e) { setDynamicSitemap(`(failed: ${(e as Error).message})`); }
  };

  useEffect(() => { loadFiles(); }, []);

  const inSitemap = (path: string) =>
    dynamicSitemap.includes(`${SITE}${path}`) || staticSitemap.includes(`${SITE}${path}`);

  const validatePage = async () => {
    setLoadingPage(true);
    try {
      const html = await fetchText(pageUrl.startsWith("http") ? pageUrl : pageUrl);
      setPageChecks({ url: pageUrl, checks: checkHtmlForSeo(html) });
    } catch (e) {
      setPageChecks({ url: pageUrl, checks: [{ label: "Fetch failed", ok: false, detail: (e as Error).message }] });
    } finally {
      setLoadingPage(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FileSearch className="w-5 h-5" /> SEO Preview & Validation
        </h2>
        <Button size="sm" variant="outline" onClick={loadFiles}>
          <RefreshCcw className="w-4 h-4 mr-2" /> Refresh
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Robots.txt</CardTitle></CardHeader>
        <CardContent>
          <a href="/robots.txt" target="_blank" rel="noopener" className="text-primary text-sm inline-flex items-center gap-1 mb-2">
            /robots.txt <ExternalLink className="w-3 h-3" />
          </a>
          <pre className="text-xs bg-muted p-3 rounded max-h-40 overflow-auto whitespace-pre-wrap">{robots}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            <span>Live Dynamic Sitemap</span>
            <Badge variant="secondary">auto-updates</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Submit this URL to Google Search Console — it rebuilds itself whenever you publish a new blog post, case study or service:
          </p>
          <a href={DYNAMIC_SITEMAP} target="_blank" rel="noopener" className="text-primary text-sm inline-flex items-center gap-1 break-all">
            {DYNAMIC_SITEMAP} <ExternalLink className="w-3 h-3 flex-shrink-0" />
          </a>
          <pre className="text-xs bg-muted p-3 rounded max-h-60 overflow-auto whitespace-pre-wrap">{dynamicSitemap.slice(0, 5000)}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Static /sitemap.xml</CardTitle></CardHeader>
        <CardContent>
          <pre className="text-xs bg-muted p-3 rounded max-h-40 overflow-auto whitespace-pre-wrap">{staticSitemap.slice(0, 3000)}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Published Content Indexing Status</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2 text-sm">Blog Posts ({blogs?.length ?? 0})</h4>
            <div className="space-y-1 max-h-48 overflow-auto">
              {blogs?.map((b) => {
                const path = `/blog/${b.slug}`;
                const ok = inSitemap(path);
                return (
                  <div key={b.slug} className="flex items-center justify-between text-sm border border-border/50 rounded px-3 py-2">
                    <span className="truncate flex-1 mr-2">{b.title}</span>
                    {ok ? <Badge className="bg-green-500/15 text-green-600">In sitemap</Badge> : <Badge variant="destructive">Missing</Badge>}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-sm">Case Studies ({cases?.length ?? 0})</h4>
            <div className="space-y-1 max-h-48 overflow-auto">
              {cases?.map((c) => {
                const path = `/case-studies/${c.slug}`;
                const ok = inSitemap(path);
                return (
                  <div key={c.slug} className="flex items-center justify-between text-sm border border-border/50 rounded px-3 py-2">
                    <span className="truncate flex-1 mr-2">{c.title}</span>
                    {ok ? <Badge className="bg-green-500/15 text-green-600">In sitemap</Badge> : <Badge variant="destructive">Missing</Badge>}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><Globe className="w-4 h-4" /> Page SEO Tag Validator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <input
              value={pageUrl}
              onChange={(e) => setPageUrl(e.target.value)}
              placeholder="/blog/your-post-slug"
              className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm"
            />
            <Button size="sm" onClick={validatePage} disabled={loadingPage}>
              {loadingPage ? "Checking..." : "Validate"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Note: This SPA injects SEO tags client-side, so the validator best reflects what crawlers like Googlebot (which now executes JS) will see after rendering. Use Google Rich Results Test for final confirmation.
          </p>
          {pageChecks && (
            <ul className="space-y-1.5">
              {pageChecks.checks.map((c) => (
                <li key={c.label} className="flex items-center gap-2 text-sm">
                  {c.ok ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-destructive" />}
                  <span>{c.label}</span>
                  {c.detail && <span className="text-muted-foreground text-xs">— {c.detail}</span>}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSeoPreview;
