# Debt Snowball Calculator

A free, privacy-first debt payoff calculator. Enter your debts and see your
**debt-free date**, **total interest**, and the smartest payoff order — comparing
the **Debt Snowball** and **Debt Avalanche** methods side by side. Everything runs
client-side in the browser; no accounts, no servers, no data leaves your device.

**Live:** https://oscargml.github.io/Debt-Snowball-Calculator/

## Features

- **Snowball vs. Avalanche** — toggle between paying the smallest balance first
  (momentum) or the highest interest rate first (math), and watch the timeline change.
- **Debt-free date** — results show both months to payoff and the calendar month
  you'll be free, plus total interest paid.
- **Add / remove debts** — start from an example, then add as many debts as you have.
- **Shareable plan links** — "Copy my shareable plan link" encodes your inputs into
  the URL so you can save or share a scenario (great for backlinks and revisiting).
- **100% private** — a single static `index.html`; all amortization runs in your
  browser. Privacy-friendly Google Analytics (page views only) is the only network call.

## Tech stack

- **HTML5 + CSS3** — single-file app, custom properties, responsive CSS grid.
- **Vanilla JavaScript (ES6+)** — month-by-month payoff simulation, no frameworks,
  no build step.

## File layout

| File | Purpose |
|------|---------|
| `index.html` | The entire app: markup, styles, and the calculation/share logic |
| `favicon.svg`, `apple-touch-icon.png`, `logo.png` | Brand icons |
| `og-image.png` | 1200×630 social share image |
| `sitemap.xml`, `robots.txt` | SEO crawl files |
| `google25f1072709fa8a10.html` | Google Search Console file verification |

## Run locally

```bash
git clone https://github.com/oscargml/Debt-Snowball-Calculator.git
cd Debt-Snowball-Calculator
python -m http.server 8000   # then open http://localhost:8000
```

Or just open `index.html` in any modern browser.

## SEO & monetization setup

**Already wired:**
- Title, meta description, canonical, Open Graph + Twitter cards, and an OG image.
- JSON-LD structured data: `WebApplication` + `FAQPage` (rich-result eligible).
- Google Analytics (`G-CMKPNHRNWQ`) and Search Console verification.
- `sitemap.xml` + `robots.txt`.
- Buy Me a Coffee support button (`velmorpub`).
- Reserved ad zones (`.ad-slot`) ready for AdSense Auto Ads.

**Manual steps to turn on ads:** once your AdSense account is approved, uncomment the
loader `<script>` in the `<head>` (replace `ca-pub-XXXXXXXXXXXXXXXX` with your real
publisher ID), then enable **Auto Ads → By site** in the AdSense dashboard. Google
will fill the reserved zones automatically — don't ship a placeholder/fake `ca-pub` id.

**After deploy:** submit `sitemap.xml` in Google Search Console and request indexing.

## License

MIT — fork, modify, and adapt for your own region or tax rules.
