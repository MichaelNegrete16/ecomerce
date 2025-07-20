import { IGetDataArticle } from "@/redux/slices/articles/article.api";

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
  product: IGetDataArticle;
  onAddToCart?: (product: IGetDataArticle) => void;
  onViewDetails?: (product: IGetDataArticle) => void;
  onToggleFavorite?: (product: IGetDataArticle) => void;
  isFavorite?: boolean;
  showActions?: boolean;
  className?: string;
}

export interface ProductGridProps {
  products: IGetDataArticle[];
  title?: string;
  subtitle?: string;
  onAddToCart?: (product: IGetDataArticle) => void;
  onViewDetails?: (product: IGetDataArticle) => void;
  onToggleFavorite?: (product: IGetDataArticle) => void;
  favoriteProducts?: number[];
  loading?: boolean;
  emptyMessage?: string;
}
