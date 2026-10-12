/** Prefix a root-relative path (e.g. "/assets/img/a.png") with the site's base path. */
export function withBase(path: string): string {
  if (!path.startsWith('/')) return path;
  return import.meta.env.BASE_URL.replace(/\/$/, '') + path;
}
