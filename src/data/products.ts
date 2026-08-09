export interface Product {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  images?: string[];
  rating?: number;
  reviews?: number;
  isCustomizable?: boolean;
  isFeatured?: boolean;
  category: string;
  description: string;
  features: string[];
  inStock?: boolean;
  sku?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Wedding Anniversary Card',
    price: 12.99,
    compareAtPrice: 15.99,
    image: '/images/homepage/wedding-anniversary-card/Wedding_Anniversary_Card_Front_Cover.png',
    images: [
      '/images/homepage/wedding-anniversary-card/Wedding_Anniversary_Card_Front_Cover.png',
      '/images/homepage/wedding-anniversary-card/Wedding Anniversary Card Inside Left.png',
      '/images/homepage/wedding-anniversary-card/Wedding Anniversary Card Inside Right.png',
    ],
    rating: 4.8,
    reviews: 234,
    isCustomizable: true,
    isFeatured: true,
    category: 'anniversary',
    description: 'Celebrate special moments with our beautifully crafted wedding anniversary card. Features elegant typography, premium paper stock, and a modern design that\'s perfect for any age.',
    features: [
      'Premium 350gsm card stock',
      'Elegant foil accents',
      'Matching envelope included',
      'Blank interior for personal message',
      'Size: 5" x 7"',
    ],
    inStock: true,
    sku: 'AN-2024-001',
  },
  {
    id: '2',
    name: 'Wedding Congratulations',
    price: 18.99,
    image: 'https://images.pexels.com/photos/1704088/pexels-photo-1704088.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 5.0,
    reviews: 189,
    isCustomizable: true,
    category: 'wedding',
    description: 'Congratulate the happy couple with a stunning wedding card. Handcrafted with love and featuring a timeless design that commemorates their special day.',
    features: [
      'Premium 350gsm card stock',
      'Gold foil lettering',
      'Matching envelope included',
      'Customizable message inside',
      'Size: 5" x 7"',
    ],
    inStock: true,
    sku: 'WD-2024-002',
  },
  {
    id: '3',
    name: 'Holiday Season Greetings',
    price: 9.99,
    compareAtPrice: 14.99,
    image: 'https://images.pexels.com/photos/1661736/pexels-photo-1661736.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    reviews: 312,
    isCustomizable: true,
    category: 'holiday',
    description: 'Spread holiday cheer with our festive seasonal greeting card. Beautiful winter imagery and warm wishes make this the perfect card for friends and family.',
    features: [
      'Premium 300gsm card stock',
      'Festive foil accents',
      'Matching envelope included',
      'Blank interior for personal message',
      'Size: 5" x 7"',
    ],
    inStock: true,
    sku: 'HL-2024-003',
  },
  {
    id: '4',
    name: 'Thank You Floral Card',
    price: 11.99,
    image: 'https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 156,
    isCustomizable: true,
    isFeatured: true,
    category: 'thank-you',
    description: 'Show your gratitude with our elegant floral thank you card. Featuring beautiful botanical illustrations and a heartfelt message space.',
    features: [
      'Premium 350gsm card stock',
      'Botanical illustration design',
      'Matching envelope included',
      'Blank interior for personal message',
      'Size: 5" x 7"',
    ],
    inStock: true,
    sku: 'TY-2024-004',
  },
  {
    id: '5',
    name: 'Anniversary Celebration',
    price: 14.99,
    image: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 98,
    isCustomizable: true,
    category: 'anniversary',
    description: 'Mark another year of love and togetherness with our anniversary celebration card. A beautiful keepsake that captures the joy of lasting love.',
    features: [
      'Premium 350gsm card stock',
      'Romantic design accents',
      'Matching envelope included',
      'Customizable message inside',
      'Size: 5" x 7"',
    ],
    inStock: true,
    sku: 'AN-2024-005',
  },
  {
    id: '6',
    name: 'Graduation Congratulations',
    price: 13.99,
    image: 'https://images.pexels.com/photos/251847/pexels-photo-251847.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviews: 145,
    isCustomizable: true,
    category: 'graduation',
    description: 'Celebrate their big achievement with our graduation congratulations card. A perfect way to say "you did it" and wish them success in their future.',
    features: [
      'Premium 350gsm card stock',
      'Celebratory design',
      'Matching envelope included',
      'Blank interior for personal message',
      'Size: 5" x 7"',
    ],
    inStock: true,
    sku: 'GR-2024-006',
  },
  {
    id: '7',
    name: 'New Baby Celebration',
    price: 12.99,
    image: 'https://images.pexels.com/photos/1000183/pexels-photo-1000183.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 167,
    isCustomizable: true,
    category: 'baby',
    description: 'Welcome a new little one into the world with our adorable baby celebration card. Soft colors and sweet designs make this a perfect keepsake.',
    features: [
      'Premium 350gsm card stock',
      'Soft pastel design',
      'Matching envelope included',
      'Blank interior for personal message',
      'Size: 5" x 7"',
    ],
    inStock: true,
    sku: 'BB-2024-007',
  },
  {
    id: '8',
    name: 'Sympathy Card',
    price: 10.99,
    image: 'https://images.pexels.com/photos/1585973/pexels-photo-1585973.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 89,
    isCustomizable: true,
    category: 'sympathy',
    description: 'Send comfort and support with our thoughtful sympathy card. A gentle, elegant design that conveys your heartfelt condolences during difficult times.',
    features: [
      'Premium 350gsm card stock',
      'Elegant understated design',
      'Matching envelope included',
      'Blank interior for personal message',
      'Size: 5" x 7"',
    ],
    inStock: true,
    sku: 'SY-2024-008',
  },
];

export function getProductById(id: string | undefined): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(id: string | undefined, limit = 4): Product[] {
  return products.filter((p) => p.id !== id).slice(0, limit);
}
