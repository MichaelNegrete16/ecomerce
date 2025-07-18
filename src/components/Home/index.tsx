import React, { useEffect, useState } from "react";
import ProductGrid from "../ProductCard/ProductGrid";
import ProductModal from "../ProductModal";
import { Product } from "../ProductCard/types";
import { getProducts } from "../ProductCard/data/mockProducts";

const HomeAplication = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    console.log("Agregando al carrito:", product.title, "Cantidad:", quantity);
    // Aquí integrarías con Redux o tu estado global
    // Por ahora solo mostramos un mensaje de confirmación
    alert(
      `¡${product.title} agregado al carrito! (${quantity} unidad${
        quantity > 1 ? "es" : ""
      })`
    );
  };

  const handleAddToCartFromGrid = (product: Product) => {
    handleAddToCart(product, 1);
  };

  const handleViewDetails = (product: Product) => {
    console.log("Ver detalles:", product.title);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleToggleFavorite = (product: Product) => {
    setFavoriteProducts((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <ProductGrid
        products={products}
        title="Catálogo de Productos"
        subtitle="Descubre nuestra amplia selección de productos tecnológicos"
        onAddToCart={handleAddToCartFromGrid}
        onViewDetails={handleViewDetails}
        onToggleFavorite={handleToggleFavorite}
        favoriteProducts={favoriteProducts}
        loading={loading}
        emptyMessage="No hay productos disponibles en este momento"
      />

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={
          selectedProduct
            ? favoriteProducts.includes(selectedProduct.id)
            : false
        }
      />
    </>
  );
};

export default HomeAplication;
