# saas-edge-migration-worker

Lightweight Cloudflare Worker template for zero-loss B2B SaaS domain and M&A migrations. Resolves legacy `301` redirects at the CDN edge in a single hop while preserving `?utm_*` and CRM attribution parameters.

Maintained by [Rakesh Ranjan Samantaray](https://rakesh.work/) - Head of SEO @ Dotcom-Monitor.

## Why Edge Redirects
- Eliminates multi-hop `301 -> 301 -> 200` chains caused by origin CMS plugins.
- Preserves HubSpot and Salesforce query parameters (`url.search`) across redirects.
- Keeps origin latency flat during post-migration recrawls.

## Pre-Launch QA Command

```bash
curl -s -I -L --max-redirs 3 "https://staging.example.com/old-product-page?utm_source=test" | grep -E "HTTP/|location:"
```

## Production Reference
- Used in enterprise B2B SaaS M&A migrations at Voxco (`0%` migration traffic loss; `+320%` organic traffic surge; `80%+` HubSpot inbound pipeline share).
- Full engineering walkthrough: [Hashnode](https://hashnode.com/@rakesh-work) | [rakesh.work/case-studies/](https://rakesh.work/case-studies/)
