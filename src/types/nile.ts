// Nile Storefront API Type Definitions
// Strictly adhering to Nile Storefront API v1 Contracts

export type StoreAvailability = 'ACTIVE' | 'PAUSED' | 'UNAVAILABLE';

export interface NileStore {
  uuid: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  currency: string;
  supportedCurrencies?: string[];
  contactEmail: string;
  contactPhone: string;
  whatsappPhone: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    twitter?: string;
  };
  address?: {
    line1: string;
    city: string;
    state: string;
    country: string;
  };
  branding?: {
    primaryColor: string;
    accentColor: string;
    fontFamily?: string;
  };
  connectedGateways: string[];
  storeNotice?: string;
  availability: StoreAvailability;
}

export interface NileStatus {
  status: StoreAvailability;
  notice?: string;
  message?: string;
  updatedAt?: string;
}

export interface NileVariant {
  uuid: string;
  title: string;
  sku?: string;
  price: number;
  discountedPrice: number | null;
  stock: number;
  options?: Record<string, string>;
}

export interface NileCategory {
  id: string | number;
  name: string;
  slug: string;
  description?: string;
}

export interface NileProduct {
  uuid: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountedPrice: number | null;
  currency: string;
  stock: number;
  status: 'ACTIVE' | 'OUT_OF_STOCK' | 'DRAFT' | 'PREORDER';
  images: string[];
  variants: NileVariant[];
  attributes: Record<string, string>;
  categories: NileCategory[];
  size?: string;
  ingredients?: string;
  benefits?: string[];
  usageInstructions?: string;
  isBundle?: boolean;
  bundleItems?: {
    productUuid: string;
    productName: string;
    quantity: number;
  }[];
}

export interface NileCartItem {
  productId: string;
  variantId?: string;
  name: string;
  image: string;
  size?: string;
  quantity: number;
  unitPrice: number;
  discountedUnitPrice: number | null;
  subtotal: number;
}

export interface NileCart {
  cartId: string;
  items: NileCartItem[];
  subtotal: number;
  totalDiscount: number;
  total: number;
  currency: string;
  itemCount: number;
}

export interface NileCartItemPayload {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface NileCartUpdatePayload {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface NileCustomerAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
}

export interface NileCheckoutPayload {
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  shippingAddress: NileCustomerAddress;
  items: {
    productId: string;
    variantId?: string;
    quantity: number;
  }[];
  note?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'paid' | 'failed' | 'cancelled';

export interface NileOrder {
  orderId: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  discountTotal: number;
  shippingTotal: number;
  total: number;
  currency: string;
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  shippingAddress?: NileCustomerAddress;
  items: NileCartItem[];
  paymentReference?: string;
  createdAt: string;
  paidAt?: string;
}

export interface NilePaymentResponse {
  orderId: string;
  authorizationUrl: string;
  reference: string;
  gateway: string;
}

export interface NileSendOtpPayload {
  email: string;
}

export interface NileSendOtpResponse {
  success: boolean;
  message: string;
  expiresInSeconds?: number;
}

export interface NileVerifyOtpPayload {
  email: string;
  otp: string;
}

export interface NileCustomerProfile {
  uuid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  createdAt: string;
}

export interface NileVerifyOtpResponse {
  accessToken: string;
  refreshToken?: string;
  customer: NileCustomerProfile;
}

export interface NileReview {
  uuid: string;
  productUuid: string;
  productName?: string;
  customerName: string;
  rating: number; // 1-5
  title?: string;
  comment: string;
  isVerifiedPurchase: boolean;
  createdAt: string;
}

export interface NileReviewPayload {
  productUuid: string;
  customerName: string;
  email: string;
  rating: number;
  title?: string;
  comment: string;
}

export interface NileApiError {
  type: string;
  code: string;
  message: string;
  requestId?: string;
  status?: number;
  retryAfter?: number;
}
