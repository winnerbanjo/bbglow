# Flawless by BB Glow Skincare
## Nile-Powered Headless Commerce Experience

[![Nile Storefront API v1](https://img.shields.io/badge/Commerce%20Backend-Nile%20API%20v1-gold)](https://api.nile.ng/storefront/v1)
[![Shopify Liquid Host](https://img.shields.io/badge/Frontend%20Host-Shopify%20Liquid-green)](https://bbglowskincare.com/pages/flawless)
[![React 18 & Vite](https://img.shields.io/badge/Framework-React%2018%20%2B%20Vite-blue)](https://vitejs.dev)

A headless, production-ready e-commerce campaign storefront for the **Flawless Collection** by **BB Glow Skincare**. Built to demonstrate complete brand independence using Nile's commerce infrastructure.

---

## 💎 Core Architecture

- **Commerce Backend:** **Nile Storefront API v1** (`https://api.nile.ng/storefront/v1`)
  - Authoritative product catalog & real-time inventory
  - Authoritative pricing & automatic backend discounts
  - Shopping cart sessions (`x-anonymous-cart-id` / `x-cart-token`)
  - Order creation (`POST /storefront/v1/checkout`)
  - Payment initiation (`POST /storefront/v1/checkout/:orderId/payment`)
  - Passwordless Customer Email OTP authentication
  - Product review retrieval and submission
- **Frontend Hosting & Domain:** **Shopify** (`https://bbglowskincare.com/pages/flawless`)
  - Serves strictly as the domain and liquid host. No Shopify cart, no Shopify checkout, and no Shopify inventory are used.

---

## 📸 Authentic Product Photography & Label Data

The store incorporates the official BB Glow Flawless product packaging:
- **Flawless Body Milk Brightening (500ml)**:
  - Official crown & BB monogram label
  - **NAFDAC Registration Number:** `NAFDAC REGN* A2-030`
  - **Barcode:** `156000 557311`
  - **Bio-Actives:** Niacinamide, Glutathione, Alpha-Arbutin, Retinol, 3-O-Ethyl Ascorbic Acid (Vitamin C), Nonapeptide-1, Zinc PCA, Hyaluronic Acid, Vitamin E & UV filter
- **Flawless Face Wash (200ml)**:
  - Gentle purifying clarifying gel with mild fruit acids and niacinamide

---

## 🚀 Quick Start

### 1. Installation
```bash
git clone <repo>
cd bbglow
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_NILE_API_KEY=pk_live_bbglow_production_key
VITE_NILE_API_BASE_URL=https://api.nile.ng/storefront/v1
VITE_ALLOWED_ORIGIN=https://bbglowskincare.com
VITE_STORE_SLUG=bbglow
VITE_WHATSAPP_NUMBER=2347042061009
```

### 3. Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
```bash
npm run build
node scripts/prepare-shopify-assets.js
```

---

## 🛍️ Shopify Theme Deployment

To deploy this headless experience directly into the BB Glow Skincare Shopify store:

1. **Upload Assets:**
   Copy files from `shopify/assets/` into your Shopify theme's `assets/` directory.
2. **Add Page Template:**
   Add `shopify/templates/page.flawless.liquid` into your theme's `templates/` directory.
3. **Assign Page in Shopify Admin:**
   - Go to **Online Store > Pages > Add page**.
   - Set Title: `Flawless` (handle: `flawless`).
   - Under **Theme template**, select `page.flawless`.
   - Save the page.

---

## 🧪 In-App Nile API Diagnostics & Automated Test Suite

Click the **Nile API** badge in the navbar or footer to open the in-app Developer Drawer. It includes:
- Live request telemetry (monitoring `x-request-id`)
- API key switching (`pk_test_...` vs `pk_live_...`)
- Simulated sandbox fallback toggle
- Automated 13-point integration test runner
- Full Nile backend capabilities and gap analysis report

---

## 📄 Documentation

See [NILE_INTEGRATION_REPORT.md](file:///Users/oyekunle/Downloads/bbglow/NILE_INTEGRATION_REPORT.md) for full architectural contracts, gap analysis, and Section 19 testing verification.
