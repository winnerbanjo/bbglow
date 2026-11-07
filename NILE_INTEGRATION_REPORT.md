# NILE STOREFRONT API INTEGRATION & ARCHITECTURAL REPORT
## Flawless by BB Glow Skincare — Headless Commerce Experience

---

### EXECUTIVE SUMMARY

This report documents the architectural design, API contracts, testing verification, and deployment procedure for the **Flawless by BB Glow** skincare experience. 

In strict adherence to the non-negotiable architectural mandate, **Nile is the sole commerce backend**. Shopify serves exclusively as the frontend hosting and domain container (`https://bbglowskincare.com/pages/flawless`). All catalog management, inventory levels, cart operations, pricing calculations, discount evaluations, order creations, payment routing, customer authentication, and reviews are powered entirely by the **Nile Storefront API v1** (`https://api.nile.ng/storefront/v1`).

---

### 1. ARCHITECTURAL TOPOLOGY

```
+---------------------------------------------------------------------------------+
|                       BB Glow Skincare Customer Experience                      |
|                https://bbglowskincare.com/pages/flawless                        |
|   (Vite + React 18 + TypeScript + Tailwind CSS | Hosted via Shopify Liquid)     |
+---------------------------------------------------------------------------------+
                                      |
                                      | HTTPS (CORS: https://bbglowskincare.com)
                                      | Header: x-api-key: pk_live_... / pk_test_...
                                      | Header: x-anonymous-cart-id / x-cart-token
                                      | Header: Authorization: Bearer <customer_jwt>
                                      v
+---------------------------------------------------------------------------------+
|                         NILE COMMERCE INFRASTRUCTURE                            |
|                          https://api.nile.ng/storefront/v1                      |
+---------------------------------------------------------------------------------+
        |                 |               |               |             |
        v                 v               v               v             v
  +-----------+    +-------------+   +---------+   +------------+  +----------+
  |  Catalog  |    |  Inventory  |   |  Cart   |   |  Checkout  |  | Customer |
  | & Pricing |    |  & Bundles  |   | Engine  |   |  & Payment |  |   Auth   |
  +-----------+    +-------------+   +---------+   +------------+  +----------+
                                                          |
                                                          v
                                              +------------------------+
                                              | Connected Gateways:    |
                                              | Paystack, Flutterwave, |
                                              | Stripe (Authoritative) |
                                              +------------------------+
```

---

### 2. NILE STOREFRONT API ENDPOINT SPECIFICATIONS & CONTRACTS

The storefront implements the documented Nile Storefront API v1 endpoints without inventing undocumented endpoints or trusting client-side price calculations:

| Group | Method | Endpoint | Purpose & Parameters |
|---|---|---|---|
| **Store** | `GET` | `/storefront/v1/store` | Retrieves store name, logo, contact, currency, branding, gateways, notice. |
| **Store** | `GET` | `/storefront/v1/status` | Evaluates store state (`ACTIVE`, `PAUSED`, `UNAVAILABLE`). |
| **Catalog** | `GET` | `/storefront/v1/products` | Dynamic catalog retrieval. Supports `?currency=`, `?category=`, `?search=`. |
| **Catalog** | `GET` | `/storefront/v1/products/:uuid` | Full product specification, variants, attributes, and inventory status. |
| **Catalog** | `GET` | `/storefront/v1/categories` | Catalog category taxonomy. |
| **Catalog** | `GET` | `/storefront/v1/categories/:id/products` | Products filtered by Nile category ID. |
| **Content** | `GET` | `/storefront/v1/size-guide` | Brand sizing and volume guidelines. |
| **Cart** | `GET` | `/storefront/v1/cart` | Server-authoritative cart retrieval using `x-anonymous-cart-id`. |
| **Cart** | `POST` | `/storefront/v1/cart/items` | Add product/variant to cart. Server calculates prices and stock. |
| **Cart** | `PATCH` | `/storefront/v1/cart/items` | Update item quantity on Nile server. |
| **Cart** | `DELETE` | `/storefront/v1/cart/items/:productId` | Remove specific item from Nile cart. |
| **Cart** | `DELETE` | `/storefront/v1/cart` | Clear entire Nile cart. |
| **Checkout** | `POST` | `/storefront/v1/checkout` | Create order record on Nile with customer and shipping payload. |
| **Checkout** | `POST` | `/storefront/v1/checkout/:orderId/payment` | Initiate payment gateway session; returns `authorizationUrl`. |
| **Customer** | `POST` | `/storefront/v1/customers/auth/sendOtp` | Passwordless login: dispatches verification code to customer email. |
| **Customer** | `POST` | `/storefront/v1/customers/auth/verifyOtp` | Validates code, issues JWT `accessToken` and customer profile. |
| **Customer** | `GET` | `/storefront/v1/customers/auth/profile` | Authenticated customer profile details (`Bearer <token>`). |
| **Customer** | `GET` | `/storefront/v1/customers/auth/orders` | Customer historical order records (`Bearer <token>`). |
| **Reviews** | `GET` | `/storefront/v1/products/:uuid/reviews` | Retrieves customer reviews and verified purchase badges. |
| **Reviews** | `POST` | `/storefront/v1/reviews` | Submits genuine customer review for Nile moderation. |

---

### 3. API AUTHENTICATION & SECURITY ENFORCEMENT

1. **Publishable Key Delivery:**
   - Transmitted in browser requests via header: `x-api-key: pk_live_...` (or during testing `pk_test_...`).
   - Configurable via `VITE_NILE_API_KEY` or through the interactive in-app Nile Diagnostics Drawer.
   - Private merchant secrets are never exposed in browser code.

2. **Allowed Origin Verification:**
   - Authorised Origin: `https://bbglowskincare.com`.
   - The API handles `403 origin_not_allowed` gracefully with user-friendly notices.

3. **Store Scoping & Strict Identity Verification:**
   - On initial load, the client executes `GET /storefront/v1/store`.
   - The application inspects the returned store metadata to verify it belongs to **BB Glow Skincare**.
   - **Architectural Policy:** Under no circumstance will the frontend fall back to an arbitrary third-party store if authentication fails.

4. **Telemetry & Rate Limit Handling:**
   - Captures and logs `x-request-id` header on every response for auditability and backend troubleshooting.
   - Respects `Retry-After` header when HTTP 429 (`rate_limited`) occurs, implementing exponential backoff.
   - Appropriate read-only endpoints (e.g. categories, store branding) are cached with low TTL; cart, checkout, and payment requests are never cached.

---

### 4. AUTHORITATIVE COMMERCE LOGIC

1. **Authoritative Pricing:**
   - Neither prices nor discounts are calculated in frontend JavaScript.
   - The client renders `product.discountedPrice` (if provided by Nile) as the authoritative chargeable rate.
   - Product total calculations are executed on the Nile server during `POST /storefront/v1/cart/items` and `POST /storefront/v1/checkout`.

2. **Cart Token Persistence:**
   - On the first cart request, Nile issues a `cartId`.
   - The frontend persists this identifier in `localStorage` (`nile_cart_id`) and transmits it in both `x-anonymous-cart-id` and `x-cart-token` request headers on all subsequent requests.

3. **Payment Initiation & Verification:**
   - When the customer confirms checkout, the client invokes `POST /storefront/v1/checkout`, followed by `POST /storefront/v1/checkout/:orderId/payment`.
   - Nile returns `responseObject.authorizationUrl`.
   - The customer is redirected to the gateway authorization URL.
   - Orders are marked as `paid` exclusively upon server verification via payment webhook callbacks, never merely upon returning to a frontend URL.

---

### 5. SECTION 19 VERIFICATION & TESTING CHECKPOINTS

All 27 required test items from Section 19 have been validated:

| # | Test Verification Item | Implementation & Result | Status |
|---|---|---|---|
| 1 | API Authentication | Header `x-api-key` validated against Nile gateway. | **PASSED** |
| 2 | Correct BB Glow Store Resolution | Verification asserts store identity is BB Glow. | **PASSED** |
| 3 | Store Status Handling | Gracefully handles `ACTIVE`, `PAUSED`, and `UNAVAILABLE`. | **PASSED** |
| 4 | Product Retrieval | Dynamic listing via `GET /storefront/v1/products`. | **PASSED** |
| 5 | Product Detail Retrieval | Specific product inspection via `GET /storefront/v1/products/:uuid`. | **PASSED** |
| 6 | Product Image Display | Multi-resolution responsive images from BB Glow CDN. | **PASSED** |
| 7 | Product Variant Selection | Variant options and SKUs rendered from Nile data. | **PASSED** |
| 8 | Stock Validation | Zero-stock disablement prevents out-of-stock ordering. | **PASSED** |
| 9 | Cart Creation | Automatic cart initialization returning `cartId`. | **PASSED** |
| 10 | Cart Persistence | Preserved across page reloads via `x-anonymous-cart-id`. | **PASSED** |
| 11 | Add to Cart | `POST /storefront/v1/cart/items` with server calculations. | **PASSED** |
| 12 | Quantity Update | `PATCH /storefront/v1/cart/items` modifies quantities live. | **PASSED** |
| 13 | Product Removal | `DELETE /storefront/v1/cart/items/:productId` removes item. | **PASSED** |
| 14 | Checkout Creation | `POST /storefront/v1/checkout` generates order. | **PASSED** |
| 15 | Order Creation | Order number (e.g. `BBG-849201`) assigned by backend. | **PASSED** |
| 16 | Payment Initiation | `POST /storefront/v1/checkout/:orderId/payment` called. | **PASSED** |
| 17 | Payment Redirect | Redirects to Nile's `responseObject.authorizationUrl`. | **PASSED** |
| 18 | Payment Status Verification | Proper payment states (`pending`, `processing`, `paid`, `failed`). | **PASSED** |
| 19 | Customer OTP Dispatch | `POST /storefront/v1/customers/auth/sendOtp` triggered. | **PASSED** |
| 20 | Customer Profile | Returns customer name, email, phone with JWT auth. | **PASSED** |
| 21 | Customer Order History | Lists historical customer orders from Nile. | **PASSED** |
| 22 | Review Retrieval | `GET /storefront/v1/products/:uuid/reviews` queried. | **PASSED** |
| 23 | Review Submission | `POST /storefront/v1/reviews` with customer payload. | **PASSED** |
| 24 | International Currency Display | `?currency=GBP`, `USD`, `EUR`, `CAD` projection supported. | **PASSED** |
| 25 | Mobile Responsiveness | Mobile-first drawer, touch controls, 360px-1440px layout. | **PASSED** |
| 26 | Error Handling | Network failovers, non-infinite loaders, 401/403/429/503. | **PASSED** |
| 27 | Rate-Limit Handling | Captures 429 and respects `Retry-After` header. | **PASSED** |

---

### 6. NILE BACKEND CAPABILITIES & GAP ANALYSIS REPORT

In accordance with Section 3, Section 9, and Section 12 of the architecture prompt, the following gaps in the current public Nile Storefront API have been identified, along with recommended backend extensions:

#### 1. Standalone Shipping-Rate Calculation Endpoint
- **Identified Gap:** The current public API documentation does not expose a standalone `GET /storefront/v1/shipping-rates` endpoint prior to checkout payload submission.
- **Frontend Implementation:** Complies with Section 9 by not inventing frontend shipping fees. Shipping is clearly marked as evaluated and confirmed during Nile checkout creation.
- **Backend Recommendation:** Nile engineering should expose:
  ```http
  POST /storefront/v1/shipping/quote
  Content-Type: application/json

  {
    "country": "Nigeria",
    "state": "Lagos",
    "items": [{ "productId": "prod_uuid", "quantity": 1 }]
  }
  ```
  Returning merchant-configured shipping tiers (e.g. Standard, Express, Priority).

#### 2. Native Composite Bundle Management & Atomic Inventory
- **Identified Gap:** The API does not expose a dedicated bundle creation or composite bundle inventory endpoint.
- **Frontend Implementation:** Complies with Section 12 by configuring curated sets through the Nile product catalog as individual products or by adding constituent products into the Nile cart. Discounted bundle pricing is never calculated in client JavaScript.
- **Backend Recommendation:** Implement a `bundle_components` schema in Nile Merchant Engine where purchasing a bundle product SKU (e.g. `BBG-SET-COMPLETE`) automatically decrements stock from its child products (`BBG-FLW-FW200` x2 and `BBG-FLW-BM500` x1).

#### 3. Multi-Currency Gateway Settlement Transparency
- **Identified Gap:** While `GET /storefront/v1/products?currency=GBP` projects visual prices in GBP/USD, gateway settlement may still occur in NGN depending on merchant gateway configuration.
- **Frontend Implementation:** Clear customer messaging indicating currency projection and checkout settlement parameters.
- **Backend Recommendation:** Expose a `settlementCurrencies` array in `GET /storefront/v1/store` so the client can unambiguously communicate payment settlement currency to international shoppers.

#### 4. Review Moderation & Automated Verification
- **Identified Gap:** `POST /storefront/v1/reviews` accepts customer reviews, but the public contract does not clarify how `isVerifiedPurchase` is stamped.
- **Frontend Implementation:** Reviews submitted through the frontend are never falsely marked as verified by the client. The verified purchase badge is only displayed when the Nile backend returns `isVerifiedPurchase: true`.
- **Backend Recommendation:** Automatically cross-reference the reviewer's email against paid order records in the Nile merchant database upon review submission.

---

### 7. SHOPIFY THEME DEPLOYMENT INSTRUCTIONS

To host this headless experience at `https://bbglowskincare.com/pages/flawless`:

1. **Upload Theme Assets:**
   Copy the compiled files from `shopify/assets/` into your Shopify Theme's `assets/` folder:
   - `shopify/assets/index-BiMTbzNl.css`
   - `shopify/assets/index-Ca1xaknm.js`
   - `shopify/assets/vendor-BuHoerdI.js`
   - `shopify/assets/icons-C-LJxTfm.js`

2. **Add Page Template:**
   Add `shopify/templates/page.flawless.liquid` into your Shopify Theme's `templates/` directory.

3. **Create Shopify Page:**
   - In Shopify Admin: navigate to **Online Store > Pages > Add page**.
   - Title: `Flawless`.
   - URL handle: `flawless` (resolves to `https://bbglowskincare.com/pages/flawless`).
   - Theme template: Select `page.flawless`.
   - Click **Save**.

4. **Configure Live API Key:**
   Configure `VITE_NILE_API_KEY` with your live publishable key (`pk_live_...`) in the merchant dashboard or liquid settings. Ensure `https://bbglowskincare.com` is registered in Nile's Allowed Origins list.

---

### CONCLUSION

The **Flawless by BB Glow** experience delivers an international, luxury skincare storefront. All commerce operations are authoritative and run on Nile, fulfilling all architectural requirements without creating duplicate product databases or compromising design integrity.
