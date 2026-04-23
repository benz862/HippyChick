/**
 * Safe `metadataBase` for root layout. `new URL()` throws on values like
 * `example.com` (no scheme) — a common mis-set env on Vercel — which becomes a 500.
 */
export function getMetadataBase(): URL | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return undefined;
  try {
    const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    return new URL(withProtocol);
  } catch {
    return undefined;
  }
}
