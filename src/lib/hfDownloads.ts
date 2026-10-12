/**
 * Build-time Hugging Face download counts.
 *
 * `collectionDownloads("owner/slug")` sums the all-time downloads of every
 * model and dataset in a Hugging Face collection (papers and Spaces carry no
 * download count and are skipped). It runs during `astro build`, so the
 * number is baked into the static HTML; the scheduled GitHub Actions run
 * rebuilds the site to keep it current.
 *
 * Failures (network, rate limit, renamed repo) resolve to `null` instead of
 * throwing, so callers can fall back to a static label and the build never
 * breaks because Hugging Face is unreachable. Results are memoized per
 * collection for the lifetime of the build process.
 */

const HUB = 'https://huggingface.co';
const TIMEOUT_MS = 15_000;

const cache = new Map<string, Promise<number | null>>();

async function getJson(url: string): Promise<any> {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

async function fetchCollectionDownloads(collection: string): Promise<number> {
  const { items } = await getJson(`${HUB}/api/collections/${collection}`);
  const repos = items.filter((i: any) => i.type === 'model' || i.type === 'dataset');
  const counts = await Promise.all(
    repos.map(async (i: any) => {
      const kind = i.type === 'dataset' ? 'datasets' : 'models';
      const info = await getJson(`${HUB}/api/${kind}/${i.id}?expand[]=downloadsAllTime`);
      return (info.downloadsAllTime as number | undefined) ?? 0;
    }),
  );
  return counts.reduce((a, b) => a + b, 0);
}

export function collectionDownloads(collection: string): Promise<number | null> {
  let pending = cache.get(collection);
  if (!pending) {
    pending = fetchCollectionDownloads(collection).catch((err) => {
      console.warn(`[hfDownloads] ${collection}: ${err}`);
      return null;
    });
    cache.set(collection, pending);
  }
  return pending;
}

/**
 * Formats a count compactly, rounded to the nearest unit:
 * 262468 → "262K", 1_234_567 → "1.2M", 950 → "950".
 */
export function formatCompact(n: number): string {
  if (Math.round(n / 1_000) >= 1_000) return `${(Math.round(n / 100_000) / 10).toString()}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return `${n}`;
}
