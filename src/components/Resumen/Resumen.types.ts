export interface IItems {
  id: string;
  product: {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    originalPrice: number;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
    badge: string;
    discount: number;
    inStock: boolean;
    featured: boolean;
  };
  quantity: number;
  addedAt: string;
}

export interface TransactionData {
  id: string;
  amount: number;
  items: IItems[];
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  cardLastFour: string;
  date: string;
  status: string;
}
