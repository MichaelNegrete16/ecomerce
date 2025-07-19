import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import ProductGrid from "../ProductCard/ProductGrid";
import ProductModal from "../ProductModal";
import { Product } from "../ProductCard/types";
import { getProducts } from "../ProductCard/data/mockProducts";

const HomeAplication = () => {
  const dispatch = useDispatch();
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
    dispatch(addToCart({ product, quantity }));
    console.log(
      "Producto agregado al carrito:",
      product.title,
      "Cantidad:",
      quantity
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
