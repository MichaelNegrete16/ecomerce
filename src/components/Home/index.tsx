import React, { useEffect, useState } from "react";
import { addToCart } from "../../redux/slices/cart/cartSlice";
import ProductGrid from "../ProductCard/ProductGrid";
import ProductModal from "../ProductModal";
import useAppDispatch from "@/redux/useAppDisppatch";
import {
  IGetDataArticle,
  useLazyGetArticlesQuery,
} from "@/redux/slices/articles/article.api";

const HomeAplication = () => {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<IGetDataArticle[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<IGetDataArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getAllArticles, { isLoading }] = useLazyGetArticlesQuery();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllArticles().unwrap();
        setProducts(productsData);
      } catch (error) {
        console.log("Error loading products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: IGetDataArticle, quantity: number = 1) => {
    dispatch(addToCart({ product, quantity }));
    console.log(
      "Producto agregado al carrito:",
      product.title,
      "Cantidad:",
      quantity
    );
  };

  const handleAddToCartFromGrid = (product: IGetDataArticle) => {
    handleAddToCart(product, 1);
  };

  const handleViewDetails = (product: IGetDataArticle) => {
    console.log("Ver detalles:", product.title);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleToggleFavorite = (product: IGetDataArticle) => {
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
        loading={isLoading}
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
