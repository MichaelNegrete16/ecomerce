import {
  IGetDataArticle,
  useCreateArticleMutation,
  useLazyGetArticlesQuery,
} from "@/redux/slices/articles/article.api";
import React, { useEffect, useState } from "react";
import styles from "./admin.module.css";
import {
  IGetAllTransactions,
  useLazyGetAllTransactionsQuery,
} from "@/redux/slices/cart/cart.api";

interface LoginForm {
  username: string;
  password: string;
}

interface ProductForm {
  title: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  badge: string;
  discount: number;
}

const AdminModule = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [products, setProducts] = useState<IGetDataArticle[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [productForm, setProductForm] = useState<ProductForm>({
    title: "",
    description: "",
    category: "",
    price: 0,
    originalPrice: 0,
    image: "",
    images: [""],
    badge: "",
    discount: 0,
  });
  const [dataTransaction, setDataTransaction] = useState<IGetAllTransactions[]>(
    []
  );
  const [getAllArticles] = useLazyGetArticlesQuery();
  const [createArticle] = useCreateArticleMutation();
  const [getAllTransactions] = useLazyGetAllTransactionsQuery();

  useEffect(() => {
    // Verificar si ya está autenticado
    const authStatus = localStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      loadProducts();
    }
  }, []);

  const loadProducts = async () => {
    // Cargar productos desde localStorage o usar mockProducts por defecto
    const savedProducts = localStorage.getItem("adminProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      try {
        const productsData = await getAllArticles().unwrap();
        setProducts(productsData);
        const transaction = await getAllTransactions().unwrap();
        setDataTransaction(transaction);
      } catch (error) {
        console.log("Error loading products:", error);
      }
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === "admin" && loginForm.password === "admin") {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
      loadProducts();
      alert("¡Bienvenido al panel de administración!");
    } else {
      alert("Credenciales incorrectas. Usuario: admin, Contraseña: admin");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuth");
    setLoginForm({ username: "", password: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setProductForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setProductForm((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setProductForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...productForm.images];
    newImages[index] = value;
    setProductForm((prev) => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setProductForm((prev) => ({
      ...prev,
      images: [...prev.images, `${Date.now()}`],
    }));
  };

  const removeImageField = (index: number) => {
    if (productForm.images.length > 1) {
      const newImages = productForm.images.filter((_, i) => i !== index);
      setProductForm((prev) => ({ ...prev, images: newImages }));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1>Panel de Administración</h1>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Usuario:</label>
              <input
                type="text"
                id="username"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                placeholder="admin"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder="admin"
                required
              />
            </div>
            <button type="submit" className={styles.loginButton}>
              Iniciar Sesión
            </button>
          </form>
          <p className={styles.credentials}>
            Credenciales: <strong>admin / admin</strong>
          </p>
        </div>
      </div>
    );
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createArticle({
        ...productForm,
        price: productForm.price.toString(),
        originalPrice: productForm.originalPrice.toString(),
        rating: {
          rate: 4.5,
          count: 120,
        },
        discount: productForm.discount.toString() ?? "0",
        stock: 1,
      }).unwrap();
      setProducts((prev) => [...prev, response]);
      setProductForm({
        title: "",
        description: "",
        category: "",
        price: 0,
        originalPrice: 0,
        image: "",
        images: [""],
        badge: "",
        discount: 0,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error al crear el producto. Ver consola para más detalles.");
      return;
    }
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1>Panel de Administración</h1>
        <div className={styles.headerActions}>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className={styles.createButton}
          >
            {showCreateForm ? "Cancelar" : "Crear Producto"}
          </button>
          <button
            onClick={() => setShowTransactions(!showTransactions)}
            className={styles.createButton}
          >
            {showTransactions ? "Ocultar Transacciones" : "Ver Transacciones"}
          </button>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {showCreateForm && (
        <div className={styles.createForm}>
          <h2>Crear Nuevo Producto</h2>
          <form onSubmit={handleProductSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="title">Título:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={productForm.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="category">Categoría:</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={productForm.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Descripción:</label>
              <textarea
                id="description"
                name="description"
                value={productForm.description}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="price">Precio:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={productForm.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="originalPrice">Precio Original:</label>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  value={productForm.originalPrice}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="discount">Descuento (%):</label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={productForm.discount}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="image">Imagen Principal (URL):</label>
              <input
                type="url"
                id="image"
                name="image"
                value={productForm.image}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <span className={styles.fieldLabel}>
                Galería de Imágenes (URLs):
              </span>
              {productForm.images.map((image, index) => (
                <div
                  key={image || `empty-${index}`}
                  className={styles.imageInput}
                >
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder={`URL de imagen ${index + 1}`}
                  />
                  {productForm.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className={styles.removeImageButton}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className={styles.addImageButton}
              >
                + Agregar Imagen
              </button>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="badge">Badge:</label>
                <select
                  id="badge"
                  name="badge"
                  value={productForm.badge}
                  onChange={handleInputChange}
                >
                  <option value="">Sin badge</option>
                  <option value="sale">Sale</option>
                  <option value="new">New</option>
                  <option value="featured">Featured</option>
                </select>
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              Crear Producto
            </button>
          </form>
        </div>
      )}

      {showTransactions && (
        <div className={styles.transactionsSection}>
          <h2>Transacciones ({dataTransaction.length})</h2>
          {dataTransaction.length === 0 ? (
            <p className={styles.noTransactions}>
              No hay transacciones registradas
            </p>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.transactionsTable}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Referencia</th>
                    <th>Estado</th>
                    <th>Mensaje</th>
                    <th>Monto</th>
                    <th>Moneda</th>
                    <th>Email Cliente</th>
                    <th>Bill ID</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTransaction.map((transaction) => {
                    let statusClass = styles.unknown;
                    if (transaction.status === "APPROVED") {
                      statusClass = styles.approved;
                    } else if (transaction.status === "PENDING") {
                      statusClass = styles.pending;
                    } else if (transaction.status === "ERROR") {
                      statusClass = styles.declined;
                    }

                    return (
                      <tr key={transaction.id}>
                        <td className={styles.reference}>{transaction.id}</td>
                        <td className={styles.reference}>
                          {transaction.reference}
                        </td>
                        <td>
                          <span className={`${styles.status} ${statusClass}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className={styles.message}>
                          {transaction.status_message || "N/A"}
                        </td>
                        <td className={styles.amount}>
                          $
                          {(
                            parseInt(transaction.amount_in_cents) / 100
                          ).toFixed(2)}
                        </td>
                        <td className={styles.reference}>
                          {transaction.currency}
                        </td>
                        <td className={styles.email}>
                          {transaction.customer_email || "N/A"}
                        </td>
                        <td className={styles.billId}>
                          {transaction.bill_id || "N/A"}
                        </td>
                        <td className={styles.date}>
                          {transaction.created_at
                            ? new Date(
                                transaction.created_at
                              ).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "N/A"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className={styles.productsSection}>
        <h2>Productos ({products.length})</h2>
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                src={product.image}
                alt={product.title}
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <h3>{product.title}</h3>
                <p className={styles.productCategory}>{product.category}</p>
                <p className={styles.productPrice}>${product.price}</p>
                <div className={styles.productBadges}>
                  {product.badge && (
                    <span className={styles.badge}>{product.badge}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminModule;
