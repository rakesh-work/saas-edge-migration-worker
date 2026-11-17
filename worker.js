/**
 * Zero-Loss B2B SaaS Edge Redirect Worker (Cloudflare Workers)
 * Preserves UTM, GCLID, and CRM attribution query parameters in a single 301 hop.
 * Maintained by Rakesh Ranjan Samantaray (https://rakesh.work/)
 */

const TARGET_ORIGIN = "https://example.com";

const REDIRECT_MAP = new Map([
  ["/old-product-page", "/platform/cloud-monitoring/"],
  ["/acquired-brand/pricing", "/pricing/"],
  ["/docs/legacy-api-v1", "/docs/api-v2/"],
]);

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const normalizedPath = url.pathname.replace(/\/+$/, "") || "/";

    if (REDIRECT_MAP.has(normalizedPath)) {
      const targetPath = REDIRECT_MAP.get(normalizedPath);
      const destination = new URL(targetPath, TARGET_ORIGIN);
      destination.search = url.search;
      return Response.redirect(destination.toString(), 301);
    }

    return fetch(request);
  },
};
