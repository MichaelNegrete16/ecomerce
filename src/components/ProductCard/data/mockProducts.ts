import { Product } from "../types";

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Smartphone Premium Galaxy X",
    description:
      "Smartphone de última generación con cámara de 108MP, pantalla AMOLED de 6.8 pulgadas y procesador octa-core.",
    category: "Electrónicos",
    price: 1199.99,
    originalPrice: 2199.99,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop&crop=center",
    ],
    rating: {
      rate: 4.5,
      count: 342,
    },
    badge: "sale",
    discount: 25,
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    title: "Camiseta Básica Algodón Premium",
    description:
      "Camiseta de algodón 100% orgánico, corte clásico, disponible en múltiples colores. Perfecta para uso diario.",
    category: "Ropa",
    price: 89.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop&crop=center",
    ],
    rating: {
      rate: 4.6,
      count: 238,
    },
    badge: "featured",
    discount: 31,
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    title: "Auriculares Bluetooth Pro",
    description:
      "Auriculares inalámbricos con cancelación de ruido activa, 30 horas de batería y sonido Hi-Fi.",
    category: "Audio",
    price: 1199.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=400&fit=crop&crop=center",
    ],
    rating: {
      rate: 4.3,
      count: 789,
    },
    badge: "new",
    inStock: true,
    featured: false,
  },
];

export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 1000);
  });
};

export const getFeaturedProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts.filter((product) => product.featured));
    }, 800);
  });
};

export const getProductsByCategory = (category: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        mockProducts.filter((product) =>
          product.category.toLowerCase().includes(category.toLowerCase())
        )
      );
    }, 600);
  });
};
