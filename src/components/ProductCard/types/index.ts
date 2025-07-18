export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  image?: string;
  images?: string[];
  rating: {
    rate: number;
    count: number;
  };
  badge?: "sale" | "new" | "featured";
  discount?: number;
  inStock: boolean;
  featured?: boolean;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  isFavorite?: boolean;
  showActions?: boolean;
  className?: string;
}

export interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  favoriteProducts?: string[];
  loading?: boolean;
  emptyMessage?: string;
}
