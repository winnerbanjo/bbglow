// Nile Storefront API Client
// Authoritative Commerce Integration for BB Glow Flawless Experience

import {
  NileStore,
  NileStatus,
  NileProduct,
  NileCategory,
  NileCart,
  NileCartItemPayload,
  NileCartUpdatePayload,
  NileCheckoutPayload,
  NileOrder,
  NilePaymentResponse,
  NileSendOtpPayload,
  NileSendOtpResponse,
  NileVerifyOtpPayload,
  NileVerifyOtpResponse,
  NileCustomerProfile,
  NileReview,
  NileReviewPayload,
  NileApiError
} from '../types/nile';
import {
  MOCK_STORE,
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  MOCK_REVIEWS
} from './mockData';

// Constants
const STORAGE_CART_ID_KEY = 'nile_cart_id';
const STORAGE_AUTH_TOKEN_KEY = 'nile_auth_token';
const STORAGE_CUSTOMER_KEY = 'nile_customer_profile';
const STORAGE_MOCK_ORDERS_KEY = 'nile_mock_orders';
const STORAGE_LOCAL_REVIEWS_KEY = 'nile_local_reviews';

export interface NileClientConfig {
  apiKey: string;
  baseUrl: string;
  allowedOrigin: string;
  storeSlug: string;
  isMockFallbackEnabled: boolean;
}

// Normalization Helpers
export function extractImages(raw: any): string[] {
  const images: string[] = [];

  const parseItem = (item: any) => {
    if (!item) return;
    if (typeof item === 'string') {
      const trimmed = item.trim();
      if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('"[') && trimmed.endsWith(']"'))) {
        try {
          let cleaned = trimmed;
          if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
            cleaned = JSON.parse(cleaned);
          }
          const parsed = typeof cleaned === 'string' ? JSON.parse(cleaned) : cleaned;
          if (Array.isArray(parsed)) {
            parsed.forEach(parseItem);
            return;
          }
        } catch {
          // not valid json
        }
      }
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
        images.push(trimmed);
      }
    } else if (Array.isArray(item)) {
      item.forEach(parseItem);
    }
  };

  parseItem(raw?.images);
  parseItem(raw?.imageUrls);
  parseItem(raw?.imageUrl);
  parseItem(raw?.productImage);

  if (images.length === 0) {
    images.push('https://bbglowskincare.com/cdn/shop/files/1001408077.png');
  }

  return Array.from(new Set(images));
}

export function extractCategories(raw: any): NileCategory[] {
  const cats: NileCategory[] = [];

  const addCat = (c: any) => {
    if (!c) return;
    const catObj = c.category || c;
    const id = catObj.id || catObj.uuid || c.categoryId || c.id;
    const name = catObj.name || c.name || 'All Products';
    const slug = catObj.slug || catObj.uuid || (name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : String(id));
    if (id && !cats.some((existing) => String(existing.id) === String(id))) {
      cats.push({
        id,
        name,
        slug,
        description: catObj.description || undefined
      });
    }
  };

  if (Array.isArray(raw?.categories)) {
    raw.categories.forEach(addCat);
  }
  if (raw?.category) {
    addCat(raw.category);
  }
  if (cats.length === 0) {
    cats.push({ id: 'all', name: 'All Products', slug: 'all' });
  }
  return cats;
}

export function extractVariants(raw: any): NileVariant[] {
  const list = raw?.variants || raw?.productVariants || [];
  if (Array.isArray(list) && list.length > 0) {
    return list.map((v: any) => ({
      uuid: v.uuid || v.id || String(Math.random()),
      title: v.title || v.name || 'Standard',
      sku: v.sku || undefined,
      price: typeof v.price === 'number' ? v.price : (raw?.price || 0),
      discountedPrice: v.discountedPrice !== undefined ? v.discountedPrice : null,
      stock: typeof v.stock === 'number' ? v.stock : (raw?.stock || 0),
      options: v.options || {}
    }));
  }
  return [
    {
      uuid: raw?.uuid || String(raw?.id || 'default'),
      title: 'Standard',
      price: typeof raw?.price === 'number' ? raw.price : 0,
      discountedPrice: raw?.discountedPrice !== undefined ? raw.discountedPrice : null,
      stock: typeof raw?.stock === 'number' ? raw.stock : 0
    }
  ];
}

export function extractStatus(raw: any): 'ACTIVE' | 'OUT_OF_STOCK' | 'DRAFT' | 'PREORDER' {
  if (raw?.isSoldOut || (typeof raw?.stock === 'number' && raw.stock <= 0)) {
    return 'OUT_OF_STOCK';
  }
  const st = (raw?.productStatus || raw?.status || raw?.publishStatus || '').toUpperCase();
  if (st === 'AVAILABLE' || st === 'ACTIVE' || st === 'PUBLISHED') {
    return 'ACTIVE';
  }
  if (st === 'OUT_OF_STOCK' || st === 'UNAVAILABLE') {
    return 'OUT_OF_STOCK';
  }
  if (st === 'PREORDER') {
    return 'PREORDER';
  }
  return 'ACTIVE';
}

export function normalizeProduct(raw: any): NileProduct {
  const images = extractImages(raw);
  const categories = extractCategories(raw);
  const variants = extractVariants(raw);
  const status = extractStatus(raw);

  return {
    uuid: raw?.uuid || String(raw?.id || ''),
    name: raw?.name || 'Flawless Skincare Product',
    slug: raw?.slug || (raw?.name ? raw.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'product'),
    description: raw?.description || '',
    price: typeof raw?.price === 'number' ? raw.price : 0,
    discountedPrice: raw?.discountedPrice !== undefined ? raw.discountedPrice : null,
    currency: raw?.currency || 'NGN',
    stock: typeof raw?.stock === 'number' ? raw.stock : 0,
    status,
    images,
    variants,
    attributes: raw?.attributes || {},
    categories,
    size: raw?.size || raw?.quantitySizes || undefined,
    ingredients: raw?.ingredients || undefined,
    benefits: raw?.benefits || undefined,
    usageInstructions: raw?.usageInstructions || undefined,
    isBundle: Boolean(raw?.isBundle || raw?.bundleItems?.length),
    bundleItems: raw?.bundleItems || undefined
  };
}

export function normalizeCategory(raw: any): NileCategory {
  const catObj = raw?.category || raw;
  const id = catObj.id || catObj.uuid || 'all';
  const name = catObj.name || 'All Products';
  const slug = catObj.slug || catObj.uuid || (name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : String(id));
  return {
    id,
    name,
    slug,
    description: catObj.description || undefined
  };
}

export function normalizeCart(raw: any): NileCart {
  const cartObj = raw?.responseObject || raw || {};
  const rawItems = Array.isArray(cartObj.items) ? cartObj.items : [];

  const items: NileCartItem[] = rawItems.map((item: any) => {
    const prod = item.product || {};
    const itemImages = extractImages({ ...prod, productImage: item.productImage });
    const unitPrice = typeof item.price === 'number' ? item.price : (prod.price || 0);
    const discountedUnitPrice = prod.discountedPrice !== undefined ? prod.discountedPrice : null;
    const effPrice = discountedUnitPrice !== null ? discountedUnitPrice : unitPrice;
    const qty = typeof item.quantity === 'number' ? item.quantity : 1;

    return {
      productId: item.productId || prod.uuid || String(prod.id || ''),
      variantId: item.variantID || item.variantId || undefined,
      name: prod.name || item.variantName || 'Skincare Product',
      image: itemImages[0] || 'https://bbglowskincare.com/cdn/shop/files/1001408077.png',
      size: prod.size || prod.quantitySizes || undefined,
      quantity: qty,
      unitPrice,
      discountedUnitPrice,
      subtotal: effPrice * qty
    };
  });

  const total = typeof cartObj.total === 'number' ? cartObj.total : items.reduce((sum, i) => sum + i.subtotal, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return {
    cartId: cartObj.cartId || '',
    items,
    subtotal: total,
    totalDiscount: 0,
    total,
    currency: cartObj.currency || 'NGN',
    itemCount
  };
}

class NileService {
  private config: NileClientConfig;
  private cartId: string | null = null;
  private authToken: string | null = null;
  private lastRequestId: string | null = null;
  private lastOriginError: string | null = null;

  constructor() {
    this.config = {
      apiKey: (import.meta.env.VITE_NILE_API_KEY as string) || '',
      baseUrl: (import.meta.env.DEV && !import.meta.env.VITE_NILE_API_BASE_URL?.includes('localhost'))
        ? '/storefront-proxy'
        : ((import.meta.env.VITE_NILE_API_BASE_URL as string) || 'https://api.nile.ng/storefront/v1'),
      allowedOrigin: (import.meta.env.VITE_ALLOWED_ORIGIN as string) || 'https://bbglowskincare.com',
      storeSlug: (import.meta.env.VITE_STORE_SLUG as string) || 'bibiglow',
      isMockFallbackEnabled: false
    };

    if (typeof window !== 'undefined') {
      this.cartId = localStorage.getItem(STORAGE_CART_ID_KEY);
      this.authToken = localStorage.getItem(STORAGE_AUTH_TOKEN_KEY);
    }
  }

  public updateConfig(newConfig: Partial<NileClientConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  public getConfig(): NileClientConfig {
    return { ...this.config };
  }

  public getLastRequestId(): string | null {
    return this.lastRequestId;
  }

  public getLastOriginError(): string | null {
    return this.lastOriginError;
  }

  public getAuthToken(): string | null {
    return this.authToken;
  }

  public setAuthToken(token: string | null) {
    this.authToken = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem(STORAGE_AUTH_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(STORAGE_AUTH_TOKEN_KEY);
        localStorage.removeItem(STORAGE_CUSTOMER_KEY);
      }
    }
  }

  public getStoredCartId(): string | null {
    return this.cartId;
  }

  public setCartId(id: string) {
    this.cartId = id;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_CART_ID_KEY, id);
    }
  }

  /**
   * Internal HTTP Request Handler with Retry & Header Logging
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    requiresAuth = false
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers as Record<string, string>)
    };

    // Attach Publishable Key
    if (this.config.apiKey) {
      headers['x-api-key'] = this.config.apiKey;
    }

    // Attach Cart Identifier
    if (this.cartId) {
      headers['x-anonymous-cart-id'] = this.cartId;
      headers['x-cart-token'] = this.cartId;
    }

    // Attach Customer Bearer Token
    if (requiresAuth && this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      // Capture request ID
      const reqId = response.headers.get('x-request-id');
      if (reqId) {
        this.lastRequestId = reqId;
      }

      // Capture any new cart token from headers
      const returnedCartToken = response.headers.get('x-cart-token') || response.headers.get('x-anonymous-cart-id');
      if (returnedCartToken && returnedCartToken !== this.cartId) {
        this.setCartId(returnedCartToken);
      }

      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After') || '5', 10);
        const err: NileApiError = {
          type: 'rate_limited',
          code: 'rate_limit_exceeded',
          message: `Too many requests. Please retry in ${retryAfter} seconds.`,
          requestId: reqId || undefined,
          status: 429,
          retryAfter
        };
        throw err;
      }

      if (!response.ok) {
        let errJson: any = null;
        try {
          errJson = await response.json();
        } catch {
          // Non-JSON response
        }

        if (errJson?.error?.code === 'origin_not_allowed') {
          this.lastOriginError = errJson.error.message || 'Domain not authorized on Nile dashboard';
        }

        const apiErr: NileApiError = {
          type: errJson?.error?.type || 'api_error',
          code: errJson?.error?.code || `http_${response.status}`,
          message: errJson?.error?.message || `Request failed with status ${response.status}: ${response.statusText}`,
          requestId: reqId || errJson?.error?.requestId,
          status: response.status
        };
        throw apiErr;
      }

      const data = await response.json();
      return (data.responseObject !== undefined ? data.responseObject : data) as T;
    } catch (error: any) {
      if (error?.code === 'origin_not_allowed') {
        this.lastOriginError = error.message;
      }
      console.warn(`[Nile API Warning] Request to ${endpoint} failed:`, error);

      // If mock fallback is enabled and we encounter connection failure or invalid key, run through simulated Nile engine
      if (this.config.isMockFallbackEnabled) {
        console.info(`[Nile Sandbox Simulation] Serving request for ${endpoint} via internal simulated engine`);
        return this.handleMockFallback<T>(endpoint, options);
      }

      throw error;
    }
  }

  // ==========================================
  // 1. STORE & STATUS ENDPOINTS
  // ==========================================

  public async getStore(): Promise<NileStore> {
    const raw: any = await this.request<any>('/store');
    const storeData = raw?.responseObject || raw;

    // Verification: Ensure the returned store is BB Glow / Bibiglow
    const storeName = (storeData.name || '').toLowerCase();
    const storeSlug = (storeData.storeUrl || storeData.slug || '').toLowerCase();
    const isBBGlow =
      storeName.includes('bb glow') ||
      storeName.includes('bbglow') ||
      storeName.includes('bibiglow') ||
      storeSlug.includes('bbglow') ||
      storeSlug.includes('bibiglow') ||
      storeSlug.includes('bb-glow');

    if (!isBBGlow) {
      throw new Error(
        `[Nile Security Violation] Store verification failed: Authenticated store "${storeData.name}" (${storeSlug}) does not belong to BB Glow Skincare.`
      );
    }

    const normalized: NileStore = {
      uuid: storeData.id || storeData.uuid || '33604b88-7c27-46ba-8b1b-af66f364ad20',
      name: 'BB Glow Skincare',
      slug: storeSlug || 'bibiglow',
      logoUrl: storeData.logo || storeData.logoUrl || 'https://bbglowskincare.com/cdn/shop/files/1001408077.png',
      description: storeData.about || storeData.description || 'Medical-grade radiance skincare formulated for hyperpigmentation-prone and delicate skin.',
      currency: typeof storeData.currency === 'object' ? storeData.currency?.base || 'NGN' : storeData.currency || 'NGN',
      supportedCurrencies: ['NGN', 'GBP', 'USD', 'EUR', 'CAD'],
      contactEmail: storeData.contact?.email || storeData.contactEmail || 'skincarebbglow@gmail.com',
      contactPhone: storeData.contact?.phone || storeData.contactPhone || '+234 803 053 7332',
      whatsappPhone: storeData.socials?.whatsappPhone || storeData.contact?.phone || '+234 803 053 7332',
      address: {
        line1: storeData.contact?.address || 'Idu industrial railway Fafu Reliable homes B 65',
        city: storeData.contact?.city || 'Abuja',
        state: storeData.contact?.state || 'FCT',
        country: storeData.contact?.country || 'Nigeria'
      },
      connectedGateways: storeData.paymentMethods?.connectedGateways?.length ? storeData.paymentMethods.connectedGateways : ['Paystack', 'Flutterwave', 'Stripe'],
      storeNotice: storeData.storeNotice || 'Experience Flawless by BB Glow — Complimentary Nationwide Delivery on Sets',
      availability: (storeData.status === 'PAUSED' ? 'PAUSED' : storeData.status === 'UNAVAILABLE' ? 'UNAVAILABLE' : 'ACTIVE')
    };

    return normalized;
  }

  public async getStatus(): Promise<NileStatus> {
    const raw: any = await this.request<any>('/status');
    const statusData = raw?.responseObject || raw;

    const rawState = (statusData.state || statusData.store?.status || statusData.status || 'ACTIVE').toUpperCase();
    const availability: StoreAvailability =
      rawState === 'PAUSED' ? 'PAUSED' :
      rawState === 'UNAVAILABLE' || rawState === 'CLOSED' ? 'UNAVAILABLE' : 'ACTIVE';

    return {
      status: availability,
      notice: statusData.store?.notice || statusData.notice,
      message: statusData.message
    };
  }

  // ==========================================
  // 2. CATALOG ENDPOINTS
  // ==========================================

  public async getProducts(params?: {
    currency?: string;
    category?: string;
    search?: string;
  }): Promise<NileProduct[]> {
    const query = new URLSearchParams();
    if (params?.currency) query.set('currency', params.currency);
    if (params?.category) query.set('category', params.category);
    if (params?.search) query.set('search', params.search);

    const qs = query.toString();
    const endpoint = `/products${qs ? `?${qs}` : ''}`;
    const raw: any = await this.request<any>(endpoint);
    const list = Array.isArray(raw) ? raw : (raw?.products || raw?.responseObject?.products || []);

    const normalized = list.map((p: any) => normalizeProduct(p));

    // Only fallback to mock products if API returned 0 products AND mock fallback is enabled AND no filter was applied
    if (normalized.length === 0 && this.config.isMockFallbackEnabled && !params?.category && !params?.search) {
      return MOCK_PRODUCTS;
    }
    return normalized;
  }

  public async getProductByUuid(uuid: string): Promise<NileProduct> {
    const raw: any = await this.request<any>(`/products/${uuid}`);
    const product = raw?.responseObject || raw;
    return normalizeProduct(product);
  }

  public async getCategories(): Promise<NileCategory[]> {
    const raw: any = await this.request<any>('/categories');
    const list = Array.isArray(raw) ? raw : (raw?.responseObject || raw?.categories || []);
    if (list.length === 0 && this.config.isMockFallbackEnabled) {
      return MOCK_CATEGORIES;
    }
    return list.map((c: any) => normalizeCategory(c));
  }

  public async getProductsByCategory(categoryId: string | number): Promise<NileProduct[]> {
    const raw: any = await this.request<any>(`/categories/${categoryId}/products`);
    const list = Array.isArray(raw) ? raw : (raw?.responseObject?.products || raw?.products || []);
    if (list.length === 0 && this.config.isMockFallbackEnabled) {
      return MOCK_PRODUCTS;
    }
    return list.map((p: any) => normalizeProduct(p));
  }

  // ==========================================
  // 3. CART ENDPOINTS
  // ==========================================

  public async getCart(): Promise<NileCart> {
    const raw: any = await this.request<any>('/cart');
    const cart = normalizeCart(raw);
    if (cart.cartId) {
      this.setCartId(cart.cartId);
    }
    return cart;
  }

  public async addToCart(payload: NileCartItemPayload): Promise<NileCart> {
    const raw: any = await this.request<any>('/cart/items', {
      method: 'POST',
      body: JSON.stringify({
        productId: payload.productId,
        variantID: payload.variantId || null,
        quantity: payload.quantity || 1
      })
    });
    const cartId = raw?.cartId || raw?.responseObject?.cartId;
    if (cartId) {
      this.setCartId(cartId);
    }
    return this.getCart();
  }

  public async updateCartItem(payload: NileCartUpdatePayload): Promise<NileCart> {
    if (payload.quantity <= 0) {
      return this.removeCartItem(payload.productId);
    }
    await this.request<any>('/cart/items', {
      method: 'PUT',
      body: JSON.stringify({
        productId: payload.productId,
        variantID: payload.variantId || null,
        quantity: payload.quantity
      })
    });
    return this.getCart();
  }

  public async removeCartItem(productId: string): Promise<NileCart> {
    await this.request<any>(`/cart/items/${productId}`, {
      method: 'DELETE'
    });
    return this.getCart();
  }

  public async clearCart(): Promise<NileCart> {
    await this.request<any>('/cart', {
      method: 'DELETE'
    });
    return this.getCart();
  }

  // ==========================================
  // 4. CHECKOUT & PAYMENT ENDPOINTS
  // ==========================================

  public async createCheckout(payload: NileCheckoutPayload): Promise<NileOrder> {
    const addressStr = typeof payload.shippingAddress === 'string'
      ? payload.shippingAddress
      : [
          payload.shippingAddress.line1,
          payload.shippingAddress.line2,
          payload.shippingAddress.city,
          payload.shippingAddress.state,
          payload.shippingAddress.country
        ].filter(Boolean).join(', ');

    const items = payload.items.map((item: any) => ({
      productId: item.productId,
      variantId: item.variantId || null,
      quantity: item.quantity,
      productName: item.productName || item.name || 'Skincare Product',
      productPrice: typeof item.productPrice === 'number'
        ? item.productPrice
        : typeof item.unitPrice === 'number'
        ? item.unitPrice
        : 0
    }));

    const raw: any = await this.request<any>('/checkout', {
      method: 'POST',
      body: JSON.stringify({
        email: payload.customer.email,
        customerEmail: payload.customer.email,
        firstName: payload.customer.firstName,
        lastName: payload.customer.lastName,
        phone: payload.customer.phone,
        customerPhone: payload.customer.phone,
        customer: {
          email: payload.customer.email,
          firstName: payload.customer.firstName,
          lastName: payload.customer.lastName,
          phone: payload.customer.phone
        },
        shippingAddress: addressStr,
        items,
        note: payload.note || undefined
      })
    });

    const orderData = raw?.responseObject || raw;
    const orderId = String(orderData.id || orderData.orderId || '');
    return {
      orderId,
      orderNumber: orderData.orderNumber || `BBG-${orderId}`,
      status: (orderData.status || 'PENDING').toLowerCase() as any,
      subtotal: orderData.subtotalAmount || orderData.subtotal || orderData.grandTotal || 0,
      discountTotal: orderData.discountAmount || 0,
      shippingTotal: orderData.shippingFee || 0,
      total: orderData.grandTotal || orderData.amountDue || 0,
      currency: orderData.currency || 'NGN',
      customer: payload.customer,
      items: (orderData.items || []).map((it: any) => ({
        productId: it.productId,
        name: it.productName || it.name || 'Skincare Item',
        image: it.productImage || 'https://bbglowskincare.com/cdn/shop/files/1001408077.png',
        quantity: it.quantity || 1,
        unitPrice: it.productPrice || it.price || 0,
        discountedUnitPrice: null,
        subtotal: (it.productPrice || it.price || 0) * (it.quantity || 1)
      })),
      createdAt: orderData.createdAt || new Date().toISOString()
    };
  }

  public async initiatePayment(orderId: string): Promise<NilePaymentResponse> {
    const raw: any = await this.request<any>(`/checkout/${orderId}/payment`, {
      method: 'POST',
      body: JSON.stringify({ orderId: Number(orderId) || orderId })
    });
    const res = raw?.responseObject || raw;
    const authUrl =
      res.authorizationUrl ||
      res.paymentLink ||
      res.initializedPayment?.paymentLink ||
      res.initializedPayment?.authorizationUrl ||
      res.paymentUrl ||
      res.checkoutUrl ||
      res.link ||
      '';
    const ref =
      res.reference ||
      res.initializedPayment?.transactionId ||
      res.paymentReference ||
      res.transactionId ||
      '';
    const gateway =
      res.gateway ||
      res.provider ||
      res.initializedPayment?.method ||
      res.paymentGateway ||
      'Paystack';

    return {
      orderId,
      authorizationUrl: authUrl,
      reference: ref,
      gateway
    };
  }

  // ==========================================
  // 5. CUSTOMER AUTHENTICATION ENDPOINTS
  // ==========================================

  public async sendOtp(payload: NileSendOtpPayload): Promise<NileSendOtpResponse> {
    return this.request<NileSendOtpResponse>('/customers/auth/sendOtp', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  public async verifyOtp(payload: NileVerifyOtpPayload): Promise<NileVerifyOtpResponse> {
    const res = await this.request<NileVerifyOtpResponse>('/customers/auth/verifyOtp', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (res.accessToken) {
      this.setAuthToken(res.accessToken);
      if (typeof window !== 'undefined' && res.customer) {
        localStorage.setItem(STORAGE_CUSTOMER_KEY, JSON.stringify(res.customer));
      }
    }
    return res;
  }

  public async getCustomerProfile(): Promise<NileCustomerProfile> {
    return this.request<NileCustomerProfile>('/customers/auth/profile', {}, true);
  }

  public async getCustomerOrders(): Promise<NileOrder[]> {
    return this.request<NileOrder[]>('/customers/auth/orders', {}, true);
  }

  public logout() {
    this.setAuthToken(null);
  }

  // ==========================================
  // 6. REVIEWS ENDPOINTS
  // ==========================================

  public async getProductReviews(productUuid: string): Promise<NileReview[]> {
    return this.request<NileReview[]>(`/products/${productUuid}/reviews`);
  }

  public async submitReview(payload: NileReviewPayload): Promise<{ success: boolean; review: NileReview }> {
    return this.request<{ success: boolean; review: NileReview }>('/reviews', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  // =========================================================================
  // SIMULATED NILE STOREFRONT SANDBOX (Used for testing and offline fallback)
  // Strictly mirrors the exact Nile server schema, discounts, and responses
  // =========================================================================

  private async handleMockFallback<T>(endpoint: string, options: RequestInit): Promise<T> {
    // Artificial slight network latency for authentic feel
    await new Promise((resolve) => setTimeout(resolve, 180));

    const method = (options.method || 'GET').toUpperCase();
    this.lastRequestId = `req_mock_${Math.random().toString(36).substring(2, 10)}`;

    // Store & Status
    if (endpoint === '/store' && method === 'GET') {
      return MOCK_STORE as unknown as T;
    }
    if (endpoint === '/status' && method === 'GET') {
      return { status: 'ACTIVE', message: 'BB Glow Storefront is operating normally' } as unknown as T;
    }

    // Categories
    if (endpoint === '/categories' && method === 'GET') {
      return MOCK_CATEGORIES as unknown as T;
    }

    // Products
    if (endpoint.startsWith('/products') && method === 'GET') {
      if (endpoint === '/products' || endpoint.startsWith('/products?')) {
        const urlObj = new URL(`http://localhost${endpoint}`);
        const search = urlObj.searchParams.get('search')?.toLowerCase();
        const category = urlObj.searchParams.get('category');
        const currency = urlObj.searchParams.get('currency')?.toUpperCase() || 'NGN';

        let list = [...MOCK_PRODUCTS];
        if (search) {
          list = list.filter((p) => p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search));
        }
        if (category) {
          list = list.filter((p) => p.categories.some((c) => String(c.id) === category || c.slug === category));
        }

        // Apply supported currency projection
        if (currency !== 'NGN') {
          const rates: Record<string, number> = { USD: 0.00067, GBP: 0.00052, EUR: 0.00061, CAD: 0.00092 };
          const rate = rates[currency] || 1;
          list = list.map((p) => ({
            ...p,
            currency,
            price: Math.round(p.price * rate),
            discountedPrice: p.discountedPrice ? Math.round(p.discountedPrice * rate) : null
          }));
        }

        return list as unknown as T;
      }

      // Check specific product UUID
      const match = endpoint.match(/\/products\/([^\/]+)$/);
      if (match) {
        const uuid = match[1];
        const product = MOCK_PRODUCTS.find((p) => p.uuid === uuid || p.slug === uuid);
        if (product) return product as unknown as T;
        throw { type: 'invalid_request_error', code: 'product_not_found', message: `Product ${uuid} not found`, status: 404 };
      }

      // Reviews for product
      const reviewMatch = endpoint.match(/\/products\/([^\/]+)\/reviews$/);
      if (reviewMatch) {
        const uuid = reviewMatch[1];
        const storedReviews = this.getStoredReviews();
        const allReviews = [...MOCK_REVIEWS, ...storedReviews];
        const productReviews = allReviews.filter((r) => r.productUuid === uuid);
        return productReviews as unknown as T;
      }
    }

    // Cart Operations
    if (endpoint.startsWith('/cart')) {
      const currentCart = this.getMockCart();

      if (endpoint === '/cart' && method === 'GET') {
        return currentCart as unknown as T;
      }

      if (endpoint === '/cart/items' && method === 'POST') {
        const payload: NileCartItemPayload = JSON.parse((options.body as string) || '{}');
        const product = MOCK_PRODUCTS.find((p) => p.uuid === payload.productId);
        if (!product) throw { message: 'Product not found', status: 404 };

        const unitPrice = product.discountedPrice || product.price;
        const existingIdx = currentCart.items.findIndex(
          (i) => i.productId === payload.productId && i.variantId === payload.variantId
        );

        if (existingIdx >= 0) {
          currentCart.items[existingIdx].quantity += payload.quantity;
          currentCart.items[existingIdx].subtotal = currentCart.items[existingIdx].quantity * unitPrice;
        } else {
          currentCart.items.push({
            productId: product.uuid,
            variantId: payload.variantId,
            name: product.name,
            image: product.images[0] || '',
            size: product.size,
            quantity: payload.quantity,
            unitPrice: product.price,
            discountedUnitPrice: product.discountedPrice,
            subtotal: payload.quantity * unitPrice
          });
        }

        this.recalculateMockCart(currentCart);
        this.saveMockCart(currentCart);
        return currentCart as unknown as T;
      }

      if (endpoint === '/cart/items' && method === 'PATCH') {
        const payload: NileCartUpdatePayload = JSON.parse((options.body as string) || '{}');
        const idx = currentCart.items.findIndex(
          (i) => i.productId === payload.productId && (payload.variantId ? i.variantId === payload.variantId : true)
        );

        if (idx >= 0) {
          if (payload.quantity <= 0) {
            currentCart.items.splice(idx, 1);
          } else {
            currentCart.items[idx].quantity = payload.quantity;
            const price = currentCart.items[idx].discountedUnitPrice || currentCart.items[idx].unitPrice;
            currentCart.items[idx].subtotal = currentCart.items[idx].quantity * price;
          }
        }
        this.recalculateMockCart(currentCart);
        this.saveMockCart(currentCart);
        return currentCart as unknown as T;
      }

      if (endpoint.startsWith('/cart/items/') && method === 'DELETE') {
        const prodId = endpoint.replace('/cart/items/', '');
        currentCart.items = currentCart.items.filter((i) => i.productId !== prodId);
        this.recalculateMockCart(currentCart);
        this.saveMockCart(currentCart);
        return currentCart as unknown as T;
      }

      if (endpoint === '/cart' && method === 'DELETE') {
        currentCart.items = [];
        this.recalculateMockCart(currentCart);
        this.saveMockCart(currentCart);
        return currentCart as unknown as T;
      }
    }

    // Checkout
    if (endpoint === '/checkout' && method === 'POST') {
      const payload: NileCheckoutPayload = JSON.parse((options.body as string) || '{}');
      const cart = this.getMockCart();
      const orderId = `ord_${Math.random().toString(36).substring(2, 9)}`;
      const orderNumber = `BBG-${Math.floor(100000 + Math.random() * 900000)}`;

      const order: NileOrder = {
        orderId,
        orderNumber,
        status: 'pending',
        subtotal: cart.subtotal,
        discountTotal: cart.totalDiscount,
        shippingTotal: 0, // In compliance with Section 9 note
        total: cart.total,
        currency: cart.currency,
        customer: payload.customer,
        shippingAddress: payload.shippingAddress,
        items: [...cart.items],
        createdAt: new Date().toISOString()
      };

      this.saveMockOrder(order);
      // Empty cart upon checkout
      this.clearCart();
      return order as unknown as T;
    }

    // Payment Gateway Initiation
    if (endpoint.includes('/payment') && method === 'POST') {
      const orderId = endpoint.split('/')[2];
      const ref = `pay_${Math.random().toString(36).substring(2, 12)}`;
      
      // Update order to processing or simulate gateway redirect
      const paymentRes: NilePaymentResponse = {
        orderId,
        authorizationUrl: '',
        reference: ref,
        gateway: 'Paystack'
      };
      return paymentRes as unknown as T;
    }

    // Customer OTP
    if (endpoint === '/customers/auth/sendOtp' && method === 'POST') {
      return { success: true, message: 'Verification code sent to your email', expiresInSeconds: 600 } as unknown as T;
    }

    if (endpoint === '/customers/auth/verifyOtp' && method === 'POST') {
      const { email } = JSON.parse((options.body as string) || '{}');
      const customer: NileCustomerProfile = {
        uuid: `cust_${Math.random().toString(36).substring(2, 8)}`,
        email: email || 'customer@bbglowskincare.com',
        firstName: 'Valued',
        lastName: 'Customer',
        phone: '+234 800 000 0000',
        createdAt: new Date().toISOString()
      };
      const token = `jwt_mock_${Math.random().toString(36).substring(2, 15)}`;
      this.setAuthToken(token);
      return { accessToken: token, customer } as unknown as T;
    }

    if (endpoint === '/customers/auth/profile' && method === 'GET') {
      const stored = localStorage.getItem(STORAGE_CUSTOMER_KEY);
      if (stored) return JSON.parse(stored) as unknown as T;
      return {
        uuid: 'cust_default',
        email: 'customer@bbglowskincare.com',
        firstName: 'Valued',
        lastName: 'Client',
        createdAt: new Date().toISOString()
      } as unknown as T;
    }

    if (endpoint === '/customers/auth/orders' && method === 'GET') {
      return this.getMockOrders() as unknown as T;
    }

    // Review Submission
    if (endpoint === '/reviews' && method === 'POST') {
      const payload: NileReviewPayload = JSON.parse((options.body as string) || '{}');
      const newReview: NileReview = {
        uuid: `rev_${Date.now()}`,
        productUuid: payload.productUuid,
        customerName: payload.customerName,
        rating: payload.rating,
        title: payload.title,
        comment: payload.comment,
        isVerifiedPurchase: false, // In compliance with Section 11: backend controls verification
        createdAt: new Date().toISOString()
      };

      const stored = this.getStoredReviews();
      stored.unshift(newReview);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_LOCAL_REVIEWS_KEY, JSON.stringify(stored));
      }
      return { success: true, review: newReview } as unknown as T;
    }

    throw { message: `Simulated endpoint ${endpoint} not handled`, status: 404 };
  }

  // Local Storage Helpers for Sandbox Testing
  private getMockCart(): NileCart {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('nile_mock_cart_data') : null;
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // Corrupted
      }
    }
    const defaultCart: NileCart = {
      cartId: this.cartId || `cart_${Math.random().toString(36).substring(2, 9)}`,
      items: [],
      subtotal: 0,
      totalDiscount: 0,
      total: 0,
      currency: 'NGN',
      itemCount: 0
    };
    if (!this.cartId) {
      this.setCartId(defaultCart.cartId);
    }
    return defaultCart;
  }

  private saveMockCart(cart: NileCart) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nile_mock_cart_data', JSON.stringify(cart));
    }
  }

  private recalculateMockCart(cart: NileCart) {
    let subtotal = 0;
    let totalDiscount = 0;
    let itemCount = 0;

    cart.items.forEach((item) => {
      itemCount += item.quantity;
      const baseSubtotal = item.quantity * item.unitPrice;
      const effectiveSubtotal = item.discountedUnitPrice
        ? item.quantity * item.discountedUnitPrice
        : baseSubtotal;

      subtotal += baseSubtotal;
      totalDiscount += baseSubtotal - effectiveSubtotal;
      item.subtotal = effectiveSubtotal;
    });

    cart.subtotal = subtotal;
    cart.totalDiscount = totalDiscount;
    cart.total = subtotal - totalDiscount;
    cart.itemCount = itemCount;
  }

  private getMockOrders(): NileOrder[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_MOCK_ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private saveMockOrder(order: NileOrder) {
    const orders = this.getMockOrders();
    orders.unshift(order);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_MOCK_ORDERS_KEY, JSON.stringify(orders));
    }
  }

  private getStoredReviews(): NileReview[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_LOCAL_REVIEWS_KEY);
    return raw ? JSON.parse(raw) : [];
  }
}

export const nile = new NileService();
