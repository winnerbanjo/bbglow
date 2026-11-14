// BB Glow Flawless Initial Catalog & Store Data
// Used for fallback/test sandbox and contract verification when testing against Nile Storefront API v1

import { NileProduct, NileStore, NileReview, NileCategory } from '../types/nile';

export const MOCK_STORE: NileStore = {
  uuid: 'store_bbglow_ng_001',
  name: 'BB Glow Skincare',
  slug: 'bbglow',
  logoUrl: 'https://bbglowskincare.com/cdn/shop/files/1001408077.png',
  description: 'Pure, medical-grade brightening and radiant skincare formulations crafted for luminous, healthy skin.',
  currency: 'NGN',
  supportedCurrencies: ['NGN', 'GBP', 'USD', 'EUR', 'CAD'],
  contactEmail: 'support@bbglowskincare.com',
  contactPhone: '+234 704 2061 009',
  whatsappPhone: '+234 704 2061 009',
  socialLinks: {
    instagram: 'https://instagram.com/bbglowskincare',
    facebook: 'https://facebook.com/bbglowskincare',
    tiktok: 'https://tiktok.com/@bbglowskincare'
  },
  address: {
    line1: 'Victoria Island',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria'
  },
  branding: {
    primaryColor: '#C9A45C',
    accentColor: '#2C221E',
    fontFamily: 'Playfair Display'
  },
  connectedGateways: ['Paystack', 'Flutterwave', 'Stripe'],
  storeNotice: 'Special Campaign: Experience the new Flawless Collection with complimentary nationwide delivery on complete sets.',
  availability: 'ACTIVE'
};

export const MOCK_CATEGORIES: NileCategory[] = [
  { id: 'cat_flawless', name: 'Flawless Collection', slug: 'flawless', description: 'Our signature radiant skin clarifying and tone-unifying system' },
  { id: 'cat_cleanser', name: 'Face Wash & Cleansers', slug: 'cleansers', description: 'Gentle clarifying facial washes' },
  { id: 'cat_body', name: 'Body Care & Lotions', slug: 'body-care', description: 'Hydrating body milks and glowing lotions' },
  { id: 'cat_bundles', name: 'Curated Sets & Bundles', slug: 'bundles', description: 'Complete beauty routines with verified savings' }
];

export const MOCK_PRODUCTS: NileProduct[] = [
  {
    uuid: 'prod_flawless_facewash_200ml',
    name: 'Flawless Face Wash – 200ml',
    slug: 'flawless-face-wash-200m',
    description: 'A gentle yet deeply purifying facial cleanser formulated with botanical extracts, niacinamide, and mild fruit acids. Effortlessly removes impurities, excess sebum, and makeup while balancing the skin’s natural moisture barrier for a luminous, refreshed complexion.',
    price: 20000,
    discountedPrice: 18500,
    currency: 'NGN',
    stock: 45,
    status: 'ACTIVE',
    images: [
      '/images/flawless-face-wash-front.jpg',
      '/images/flawless-face-wash-back.jpg'
    ],
    variants: [
      {
        uuid: 'var_facewash_200ml',
        title: '200ml Standard',
        sku: 'BBG-FLW-FW200',
        price: 20000,
        discountedPrice: 18500,
        stock: 45,
        options: { Size: '200ml' }
      }
    ],
    attributes: {
      'Skin Type': 'All skin types, hyperpigmentation-prone, dull skin',
      'Volume': '200ml / 6.76 fl oz',
      'Formulation': 'Silky Gel Cleanser',
      'pH Level': '5.5 Balanced'
    },
    categories: [MOCK_CATEGORIES[0], MOCK_CATEGORIES[1]],
    size: '200ml',
    ingredients: 'Aqua (Deionized Water), Cocamidopropyl Betaine, Sodium Lauroyl Sarcosinate, Niacinamide (Vitamin B3), Glycerin, Glycolic Acid, Licorice Root Extract, Morus Alba (White Mulberry) Extract, Aloe Barbadensis Leaf Juice, Tocopheryl Acetate (Vitamin E), Phenoxyethanol, Ethylhexylglycerin, Allantoin, Natural Botanical Essence.',
    benefits: [
      'Deep pore purification without depleting essential lipids',
      'Visibly clarifies, refines texture, and revitalizes tired skin',
      'Helps diminish post-blemish dark marks and discoloration',
      'Prepares skin for high-efficiency absorption of body milk and serums'
    ],
    usageInstructions: 'Dispense 1–2 pumps onto damp palms. Gently massage over face and neck in upward circular motions for 60 seconds. Rinse thoroughly with lukewarm water and pat dry with a soft cloth. Use morning and evening.',
    isBundle: false
  },
  {
    uuid: 'prod_flawless_bodymilk_500ml',
    name: 'Flawless Body Milk – Brightening Body Lotion 500ml',
    slug: 'flawless-body-milk-brightening-radiance-body-lotion-500ml',
    description: 'Deeply nourishes the skin, brightening its complexion. Enriched with Niacinamide, Glutathione, Alpha-Arbutin, Retinol, Vitamin C & Vitamin E to leave skin soft, luminous, and revitalised with a supple, bouncy texture. Verified NAFDAC Reg. No. A2-030.',
    price: 40000,
    discountedPrice: 36000,
    currency: 'NGN',
    stock: 38,
    status: 'ACTIVE',
    images: [
      '/images/flawless-body-milk-front.jpg',
      '/images/flawless-body-milk-lifestyle.webp',
      '/images/flawless-body-milk-back.jpg'
    ],
    variants: [
      {
        uuid: 'var_bodymilk_500ml',
        title: '500ml Luxury Gold Pump Bottle',
        sku: 'BBG-FLW-BM500',
        price: 40000,
        discountedPrice: 36000,
        stock: 38,
        options: { Size: '500ml' }
      }
    ],
    attributes: {
      'Skin Type': 'All skin types, hyperpigmentation-prone, dry body skin',
      'Volume': 'NET 500ml',
      'Regulatory': 'NAFDAC REGN* A2-030',
      'Barcode': '156000 557311',
      'Key Bio-Actives': 'Niacinamide, Glutathione, Alpha-Arbutin, Retinol, 3-O-Ethyl Ascorbic Acid, Nonapeptide-1, Zinc PCA, Hyaluronic Acid',
      'UV Protection': 'Enriched with Ethylhexyl Methoxycinnamate UV filter'
    },
    categories: [MOCK_CATEGORIES[0], MOCK_CATEGORIES[2]],
    size: '500ml',
    ingredients: 'AQUA, PARAFFINUM LIQUIDUM, ETHYLHEXYL METHOXYCINNAMATE, BHT, GLYCERIN, BUTYLENE GLYCOL, AQUA, CI 77891, GLYCERYL STEARATE, PEG-100 STEARATE, CETYL ETHYLHEXANOATE, FRAGRANCE, CETEARYL ALCOHOL, NIACINAMIDE, POLYACRYLAMIDE, C13-14 ISOPARAFFIN, LAURETH-7, AQUA, PHENOXYETHANOL, TOCOPHERYL ACETATE, 3-O-ETHYL ASCORBIC ACID, DIMETHYL ISOSORBIDE, RETINOL, CAPRYLIC/CAPRIC TRIGLYCERIDE, TOCOPHEROL, AQUA, 1,2-HEXANEDIOL, NONAPEPTIDE-1, ALPHA-ARBUTIN, ZINC PCA, CARBOMER, CHLORPHENESIN, SODIUM HYALURONATE, POTASSIUM HYDROXIDE, HYDROXYETHYLCELLULOSE, DISODIUM PHOSPHATE, SODIUM PHOSPHATE, POLYSORBATE 60, DISODIUM EDTA, CI 16255.',
    benefits: [
      'Deeply nourishes the skin, brightening its complexion',
      'Enriched with Niacinamide, Glutathione, Alpha-Arbutin, Retinol, and Vitamin C & E',
      'Promotes cellular rejuvenation and fades stubborn hyperpigmented patches',
      'Leaves skin soft, luminous, and revitalised with a supple, bouncy texture',
      'Includes built-in UV protection with gentle daily non-greasy absorption'
    ],
    usageInstructions: 'Apply a suitable amount to the body and massage gently until fully absorbed. For optimal luminous results, apply immediately after bathing to seal in hydration. Avoid contact with eyes.',
    isBundle: false
  },
  {
    uuid: 'prod_flawless_toner_200ml',
    name: 'Flawless Toner – 200ml',
    slug: 'flawless-toner-200ml',
    description: 'Refresh and tone your complexion with a formula designed to cleanse, tone and promote brighter-looking skin. Restores optimal skin pH balance, tightens pores, and primes the skin barrier for enhanced nutrient absorption.',
    price: 22000,
    discountedPrice: 20000,
    currency: 'NGN',
    stock: 40,
    status: 'ACTIVE',
    images: [
      '/images/flawless-face-wash-front.jpg',
      '/images/flawless-face-wash-back.jpg'
    ],
    variants: [
      {
        uuid: 'var_toner_200ml',
        title: '200ml Bottle',
        sku: 'BBG-FLW-TN200',
        price: 22000,
        discountedPrice: 20000,
        stock: 40,
        options: { Size: '200ml' }
      }
    ],
    attributes: {
      'Skin Type': 'All skin types, dull, uneven tone',
      'Volume': '200ml',
      'Function': 'Cleanse, Tone & Refresh',
      'Texture': 'Weightless Hydrating Water'
    },
    categories: [MOCK_CATEGORIES[0]],
    size: '200ml',
    ingredients: 'Aqua, Witch Hazel Extract, Niacinamide, Glycerin, Rosewater, Glutathione, Allantoin, Panthenol (Pro-Vitamin B5), Citric Acid, Phenoxyethanol.',
    benefits: [
      'Refreshes and tones complexion instantly',
      'Gently sweeps away lingering micro-impurities',
      'Prepares skin for optimal moisture retention and cellular rejuvenation',
      'Helps promote clearer, visibly brighter facial tone'
    ],
    usageInstructions: 'After cleansing with Flawless Face Wash, dispense onto a cotton pad or palms and gently press over face and neck. Allow to absorb before applying moisturiser.',
    isBundle: false
  },
  {
    uuid: 'prod_flawless_facecream_50g',
    name: 'Flawless Face Cream – 50g',
    slug: 'flawless-face-cream-50g',
    description: 'Complete your facial skincare routine with a moisturising cream designed to support clear, radiant-looking skin. Locks in deep moisture, fortifies skin barrier resilience, and imparts a silky, luminous glow without greasiness.',
    price: 25000,
    discountedPrice: 23000,
    currency: 'NGN',
    stock: 35,
    status: 'ACTIVE',
    images: [
      '/images/flawless-body-milk-lifestyle.webp',
      '/images/flawless-body-milk-front.jpg'
    ],
    variants: [
      {
        uuid: 'var_facecream_50g',
        title: '50g Luxury Jar',
        sku: 'BBG-FLW-FC50',
        price: 25000,
        discountedPrice: 23000,
        stock: 35,
        options: { Size: '50g' }
      }
    ],
    attributes: {
      'Skin Type': 'All skin types, hyperpigmentation-prone face',
      'Net Weight': '50g / 1.76 oz',
      'Function': 'Moisturise & Radiance Support',
      'Finish': 'Velvet Glow, Non-Greasy'
    },
    categories: [MOCK_CATEGORIES[0]],
    size: '50g',
    ingredients: 'Aqua, Caprylic/Capric Triglyceride, Niacinamide, Glutathione, Shea Butter, Alpha-Arbutin, Sodium Hyaluronate, Vitamin E (Tocopheryl Acetate), Licorice Extract, Dimethicone, Cetearyl Olivate, Phenoxyethanol.',
    benefits: [
      'Deeply moisturises and locks in long-lasting facial hydration',
      'Supports clear, luminous, and radiant-looking skin',
      'Fortifies and protects the delicate facial skin barrier',
      'Lightweight velvet emulsion suitable under makeup or sunscreen'
    ],
    usageInstructions: 'Smooth a dime-sized amount over clean face and neck every morning and evening following toner. During daytime, finish with broad-spectrum sunscreen.',
    isBundle: false
  },
  {
    uuid: 'prod_flawless_starter_set',
    name: 'Flawless Starter Set — Daily Face & Body Glow Duo',
    slug: 'flawless-starter-set',
    description: 'The essential two-step daily radiance ritual. Features the full-size Flawless Face Wash (200ml) to purify and prep, paired with the iconic Flawless Body Milk (500ml) for head-to-toe luminous hydration.',
    price: 60000,
    discountedPrice: 51500,
    currency: 'NGN',
    stock: 25,
    status: 'ACTIVE',
    images: [
      '/images/flawless-body-milk-front.jpg',
      'https://bbglowskincare.com/cdn/shop/files/1001613909.png?v=1789391214',
      '/images/flawless-body-milk-lifestyle.webp'
    ],
    variants: [
      {
        uuid: 'var_starter_set_full',
        title: 'Starter Set (Face Wash 200ml + Body Milk 500ml)',
        sku: 'BBG-SET-STARTER',
        price: 60000,
        discountedPrice: 51500,
        stock: 25,
        options: { Set: 'Duo' }
      }
    ],
    attributes: {
      'Routine Step': 'Step 1: Cleanse + Step 2: Hydrate & Glow',
      'Includes': 'Flawless Face Wash (200ml) + Flawless Body Milk (500ml)',
      'Savings': '₦8,500 Duo Savings'
    },
    categories: [MOCK_CATEGORIES[0], MOCK_CATEGORIES[3]],
    size: '2-Piece Set',
    ingredients: 'Refer to individual product packaging for Flawless Face Wash (200ml) and Flawless Body Milk (500ml).',
    benefits: [
      'Comprehensive 2-step radiance routine for face and body',
      'Noticeably more radiant skin tone within 14 days',
      'Includes verified promotional bundle pricing',
      'Complete with luxury BB Glow campaign gift packaging'
    ],
    usageInstructions: 'Step 1: Cleanse face and neck with Flawless Face Wash. Step 2: After bathing, smooth Flawless Body Milk over the entire body while skin is still slightly damp.',
    isBundle: true,
    bundleItems: [
      { productUuid: 'prod_flawless_facewash_200ml', productName: 'Flawless Face Wash – 200ml', quantity: 1 },
      { productUuid: 'prod_flawless_bodymilk_500ml', productName: 'Flawless Body Milk – 500ml', quantity: 1 }
    ]
  },
  {
    uuid: 'prod_flawless_complete_set',
    name: 'Flawless Radiance 4-Piece Skincare Set by BB Glow',
    slug: 'flawless-radiance-4-piece-skincare-set-by-bb',
    description: 'The Flawless Set offers incredible value by combining your essential routine into one complete, long-lasting system that protects their skin barrier. Includes Flawless Face Wash (200ml), Flawless Toner (200ml), Flawless Face Cream (50g), and Flawless Body Milk (500ml). Four essentials. One beautiful glow.',
    price: 107000,
    discountedPrice: 70000,
    currency: 'NGN',
    stock: 20,
    status: 'ACTIVE',
    images: [
      '/images/flawless-4piece-set.webp',
      '/images/flawless-body-milk-front.jpg',
      '/images/flawless-face-wash-front.jpg',
      '/images/flawless-body-milk-lifestyle.webp'
    ],
    variants: [
      {
        uuid: 'var_complete_set_master',
        title: 'Complete 4-Piece Radiance Set',
        sku: 'BBG-SET-4PIECE',
        price: 107000,
        discountedPrice: 70000,
        stock: 20,
        options: { Set: '4-Piece Complete' }
      }
    ],
    attributes: {
      'Collection': 'Complete 4-Piece Radiance System',
      'Includes': 'Face Wash (200ml) + Toner (200ml) + Face Cream (50g) + Body Milk (500ml)',
      'Savings': '₦37,000 Complete Set Savings + Free Priority Dispatch',
      'Routine': 'Simple 4-Step Everyday Self-Care Ritual'
    },
    categories: [MOCK_CATEGORIES[0], MOCK_CATEGORIES[3]],
    size: '4-Piece Complete Collection',
    ingredients: 'Refer to individual product packaging: Face Wash (200ml), Toner (200ml), Face Cream (50g), Body Milk (500ml). Enriched with Niacinamide, Glutathione, Vitamin E, Alpha-Arbutin & Retinol.',
    benefits: [
      'Complete face and body care in one convenient luxury bundle',
      'A simple, harmonious four-step skincare routine',
      'Supports brighter, smoother and more radiant-looking skin',
      'Helps cleanse, refresh, moisturise and protect your skin barrier',
      'Suitable for all skin types',
      'Exceptional value at ₦70,000'
    ],
    usageInstructions: 'Step 1: Cleanse with Flawless Face Wash. Step 2: Tone with Flawless Toner. Step 3: Moisturise with Flawless Face Cream. Step 4: Nourish body with Flawless Body Milk after bathing. During the day, finish with a broad-spectrum sunscreen.',
    isBundle: true,
    bundleItems: [
      { productUuid: 'prod_flawless_facewash_200ml', productName: 'Flawless Face Wash – 200ml', quantity: 1 },
      { productUuid: 'prod_flawless_toner_200ml', productName: 'Flawless Toner – 200ml', quantity: 1 },
      { productUuid: 'prod_flawless_facecream_50g', productName: 'Flawless Face Cream – 50g', quantity: 1 },
      { productUuid: 'prod_flawless_bodymilk_500ml', productName: 'Flawless Body Milk – 500ml', quantity: 1 }
    ]
  }
];

export const MOCK_REVIEWS: NileReview[] = [
  {
    uuid: 'rev_001',
    productUuid: 'prod_flawless_bodymilk_500ml',
    productName: 'Flawless Body Milk – 500ml',
    customerName: 'Amina O. (Lagos)',
    rating: 5,
    title: 'Transformative glow without greasy heaviness',
    comment: 'I have tried numerous body lotions in Lagos humidity, and most either leave a sticky film or do nothing. Flawless Body Milk absorbs like a dream and my chest and shoulders have a consistent golden glow. Already on my second 500ml bottle.',
    isVerifiedPurchase: true,
    createdAt: '2026-10-18T14:22:00Z'
  },
  {
    uuid: 'rev_002',
    productUuid: 'prod_flawless_facewash_200ml',
    productName: 'Flawless Face Wash – 200ml',
    customerName: 'Chiamaka N. (Enugu)',
    rating: 5,
    title: 'Clean, gentle and noticeably brightens',
    comment: 'The face wash doesn’t strip my skin or leave it tight. After 3 weeks my acne blemishes have faded and my face feels baby soft. The texture and scent are so luxurious. The gold pump bottle also looks gorgeous on my vanity.',
    isVerifiedPurchase: true,
    createdAt: '2026-10-24T09:15:00Z'
  },
  {
    uuid: 'rev_003',
    productUuid: 'prod_flawless_starter_set',
    productName: 'Flawless Starter Set',
    customerName: 'Folake T. (Abuja)',
    rating: 5,
    title: 'The best investment for my wedding skincare prep',
    comment: 'Got the starter duo for my wedding countdown. Everyone commented on how bright and even my skin looked in our bridal photos. Checkout was seamless and fast delivery to Abuja within 48 hours.',
    isVerifiedPurchase: true,
    createdAt: '2026-11-01T16:40:00Z'
  },
  {
    uuid: 'rev_004',
    productUuid: 'prod_flawless_bodymilk_500ml',
    productName: 'Flawless Body Milk – 500ml',
    customerName: 'Zainab B. (Kano)',
    rating: 5,
    title: 'Exceptional texture and hydration for dry skin',
    comment: 'The 500ml bottle is generous and the pump dispenser is very convenient. My knees and elbows are so much smoother. The niacinamide and glutathione combination really works without any harsh irritation.',
    isVerifiedPurchase: true,
    createdAt: '2026-11-03T11:05:00Z'
  },
  {
    uuid: 'rev_005',
    productUuid: 'prod_flawless_complete_set',
    productName: 'Flawless Complete Set',
    customerName: 'Dr. Kemi A. (Victoria Island, Lagos)',
    rating: 5,
    title: 'As an aesthetician, this clinical formulation impresses me',
    comment: 'I examine ingredient decks rigorously. Seeing Niacinamide, Alpha-Arbutin, Retinol, and Vitamin C in a stable formulation with NAFDAC A2-030 verification is rare in this market. My clients love the unified complexion result.',
    isVerifiedPurchase: true,
    createdAt: '2026-11-04T08:30:00Z'
  },
  {
    uuid: 'rev_006',
    productUuid: 'prod_flawless_bodymilk_500ml',
    productName: 'Flawless Body Milk – 500ml',
    customerName: 'Ngozi E. (London, UK)',
    rating: 5,
    title: 'Dispatched to London via DHL in 4 days! Glass skin result',
    comment: 'Ordered from the UK using the GBP currency selector. Payment with my UK card went through without issues. The body milk keeps my skin radiant even in London cold weather. Will definitely be ordering the full set.',
    isVerifiedPurchase: true,
    createdAt: '2026-11-05T13:45:00Z'
  },
  {
    uuid: 'rev_007',
    productUuid: 'prod_flawless_facewash_200ml',
    productName: 'Flawless Face Wash – 200ml',
    customerName: 'Halima S. (Port Harcourt)',
    rating: 5,
    title: 'Faded stubborn sun tan lines within 3 weeks',
    comment: 'Very gentle on sensitive skin. Foams lightly, removes makeup cleanly, and leaves a dewy finish without stripping. My hyperpigmentation on my forehead has reduced drastically.',
    isVerifiedPurchase: true,
    createdAt: '2026-11-05T19:20:00Z'
  },
  {
    uuid: 'rev_008',
    productUuid: 'prod_flawless_complete_set',
    productName: 'Flawless Complete Set',
    customerName: 'Stephanie & Tolu (Ibadan)',
    rating: 5,
    title: 'Worth every single Naira. The presentation box is luxury',
    comment: 'Unboxing this set felt like Christmas. The gold packaging, the treatment sponge, and the smell of the lotion are 10/10. My skin has never looked so uniform and silky.',
    isVerifiedPurchase: true,
    createdAt: '2026-11-06T10:15:00Z'
  },
  {
    uuid: 'rev_009',
    productUuid: 'prod_flawless_bodymilk_500ml',
    productName: 'Flawless Body Milk – 500ml',
    customerName: 'Blessing M. (Atlanta, USA)',
    rating: 5,
    title: 'Legit and authentic BB Glow formula! Verified purchase',
    comment: 'I was hesitant about ordering online from the US, but the tracking was active and package arrived safely. The lotion texture is unmatched. You see an immediate healthy glow right out of the shower.',
    isVerifiedPurchase: true,
    createdAt: '2026-11-06T15:00:00Z'
  },
  {
    uuid: 'rev_010',
    productUuid: 'prod_flawless_facewash_200ml',
    productName: 'Flawless Face Wash – 200ml',
    customerName: 'Adewale R. (Lekki, Lagos)',
    rating: 5,
    title: 'My wife and I both use this daily',
    comment: 'Usually skincare cleansers dry my face out, but this one cleans deeply and balances oil. Highly recommend grabbing 2 bottles at once because it finishes fast when shared!',
    isVerifiedPurchase: true,
    createdAt: '2026-11-07T07:10:00Z'
  }
];
