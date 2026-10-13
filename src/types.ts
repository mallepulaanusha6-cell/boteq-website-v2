export type CategoryId = 
  | 'sarees'
  | 'half-sarees'
  | 'blouses'
  | 'kurtis'
  | 'tops'
  | 'ethnic-wear'
  | 'bridal-wear'
  | 'party-wear';

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  image: string;
  iconName: string;
  count: number;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  originalPrice?: number;
  image: string;
  gallery?: string[];
  fabric: string;
  description: string;
  occasion: string;
  workType: string;
  sizes: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
  recommendedProductId?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  occasion: string;
  text: string;
  rating: number;
  outfit: string;
  date: string;
}
