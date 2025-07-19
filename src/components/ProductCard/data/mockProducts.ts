import { Product } from "../types";

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Smartphone Premium Galaxy X",
    description:
      "Smartphone de última generación con cámara de 108MP, pantalla AMOLED de 6.8 pulgadas y procesador octa-core.",
    category: "Electrónicos",
    price: 112899.99,
    originalPrice: 1199.99,
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
    title: "Laptop Gaming Pro RTX",
    description:
      "Laptop gaming con RTX 4070, 32GB RAM, SSD 1TB y pantalla 144Hz perfecta para gaming profesional.",
    category: "Computadoras",
    price: 4221499.99,
    originalPrice: 1799.99,
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center",
    ],
    rating: {
      rate: 4.8,
      count: 156,
    },
    badge: "featured",
    discount: 17,
    inStock: false,
    featured: true,
  },
  {
    id: "3",
    title: "Auriculares Bluetooth Pro",
    description:
      "Auriculares inalámbricos con cancelación de ruido activa, 30 horas de batería y sonido Hi-Fi.",
    category: "Audio",
    price: 5123199.99,
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
