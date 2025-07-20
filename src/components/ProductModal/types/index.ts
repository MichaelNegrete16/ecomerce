import { IGetDataArticle } from "@/redux/slices/articles/article.api";

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: IGetDataArticle | null;
  onAddToCart?: (product: IGetDataArticle, quantity: number) => void;
  onToggleFavorite?: (product: IGetDataArticle) => void;
  isFavorite?: boolean;
}

export interface CartItem {
  id: string;
  product: IGetDataArticle;
  quantity: number;
  addedAt: Date;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
}
