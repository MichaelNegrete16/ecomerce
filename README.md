# 🛒 E-commerce Project

Un proyecto completo de e-commerce desarrollado con **Next.js 14**, **Redux Toolkit**, **TypeScript** y **CSS Modules**. Este proyecto incluye un sistema de carrito de compras, checkout, procesamiento de pagos y un panel de administración para gestionar productos.

## 🚀 Características Principales

- ✅ **Catálogo de productos** con grid responsivo
- ✅ **Sistema de carrito** con Redux Toolkit
- ✅ **Modal de producto** con galería de imágenes
- ✅ **Proceso de checkout** completo
- ✅ **Validación de tarjetas de crédito** (Visa, MasterCard, Amex)
- ✅ **Página de resumen de pago** con funcionalidad de impresión
- ✅ **Panel de administración** para gestión de productos
- ✅ **Diseño responsivo** mobile-first
- ✅ **Persistencia de datos** con localStorage
- ✅ **Componetización avanzada** con TypeScript

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estado Global**: Redux Toolkit
- **Estilos**: CSS Modules (CSS puro)
- **Iconos**: SVG personalizados
- **Utilidades**: Ramda para programación funcional

## 📦 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm, yarn, pnpm o bun

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd ecomerce
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   # o
   pnpm install
   # o
   yarn install
   ```

3. **Ejecutar el servidor de desarrollo**

   ```bash
   npm run dev
   # o
   pnpm dev
   # o
   yarn dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:4001
   ```

## 🎯 Uso del Proyecto

### Navegación Principal

- **Página Principal** (`/`): Catálogo de productos con funcionalidad de búsqueda
- **Checkout** (`/checkout`): Proceso de compra con formulario de datos y pago
- **Resumen de Pago** (`/payment-summary`): Confirmación de transacción
- **Panel Admin** (`/admin`): Gestión de productos (ver sección de administración)

### Funcionalidades del Carrito

1. **Agregar productos**: Click en el botón "+" en cualquier producto
2. **Ver carrito**: Click en el icono del carrito en la navbar
3. **Gestionar cantidades**: Usar los botones +/- en el sidebar del carrito
4. **Eliminar productos**: Click en el botón de eliminar
5. **Proceder al checkout**: Click en "Proceder al Pago"

### Proceso de Checkout

1. **Información del Usuario**

   - Nombre completo
   - Email
   - Teléfono
   - Dirección de envío

2. **Método de Pago**

   - Número de tarjeta (auto-detecta tipo: Visa, MasterCard, Amex)
   - Fecha de expiración (formato automático MM/AA)
   - CVV
   - Nombre del titular

3. **Confirmación y Pago**
   - Revisar productos y totales
   - Aceptar términos y condiciones
   - Procesar pago (simulación con loading)

## 🔧 Panel de Administración

### Acceso al Admin

**URL**: `/admin`

**Credenciales de acceso**:

- **Usuario**: `admin`
- **Contraseña**: `admin`

> ⚠️ **Nota Importante**: Este panel de administración es una implementación básica para desarrollo y testing. No cuenta con autenticación segura ni conexión a backend. Su propósito es facilitar la inserción rápida y eficiente de productos durante el desarrollo.

### Funcionalidades del Admin

1. **Autenticación Simple**

   - Login con credenciales básicas
   - Sesión persistente en localStorage

2. **Gestión de Productos**

   - ➕ **Crear productos** con formulario completo
   - 👁️ **Ver lista** de todos los productos
   - 🗑️ **Eliminar productos** de la base de datos

3. **Campos del Producto**
   - Nombre del producto
   - Precio
   - Imagen (URL)
   - Categoría
   - Descripción
   - Stock disponible
   - Calificación (1-5 estrellas)

### Uso del Panel Admin

1. **Acceder**: Ir a `/admin` e ingresar credenciales
2. **Crear Producto**:

   - Completar todos los campos del formulario
   - Click en "Crear Producto"
   - El producto aparecerá inmediatamente en el catálogo principal

3. **Gestionar Productos**:
   - Ver lista completa de productos
   - Eliminar productos con el botón correspondiente
   - Los cambios se reflejan inmediatamente en toda la aplicación

## 📱 Diseño Responsivo

El proyecto implementa un diseño mobile-first con los siguientes breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 768px
- **Desktop**: 768px - 1024px
- **Large Desktop**: > 1024px

### Características Responsivas

- Navbar adaptable con menú hamburguesa en mobile
- Grid de productos que se ajusta según el tamaño de pantalla
- Modal de producto optimizado para dispositivos móviles
- Carrito sidebar responsivo
- Formularios de checkout adaptables

## 🗂️ Estructura del Proyecto

```
src/
├── app/                          # App Router de Next.js
│   ├── admin/                    # Panel de administración
│   ├── checkout/                 # Página de checkout
│   ├── payment-summary/          # Resumen de pago
│   └── page.tsx                  # Página principal
├── components/
│   ├── Admin/                    # Componentes del admin
│   ├── Checkout/                 # Componentes del checkout
│   ├── Home/                     # Componentes de la página principal
│   ├── Navbar/                   # Navegación principal
│   ├── ProductCard/              # Tarjetas de producto
│   ├── ProductModal/             # Modal de producto
│   └── Resumen/                  # Componente de resumen
├── redux/
│   ├── slices/                   # Slices de Redux
│   ├── store.ts                  # Configuración del store
│   └── provider.tsx              # Provider de Redux
└── utils/                        # Utilidades y helpers
```

## 🔄 Estado Global (Redux)

### Cart Slice

El estado del carrito maneja:

- **items**: Array de productos en el carrito
- **isOpen**: Estado del sidebar del carrito
- **total**: Total de la compra
- **itemCount**: Cantidad total de items

### Acciones Disponibles

```typescript
-addToCart(product) - // Agregar producto al carrito
  removeFromCart(id) - // Eliminar producto del carrito
  updateQuantity({ id, quantity }) - // Actualizar cantidad
  clearCart() - // Vaciar carrito
  toggleCart(); // Abrir/cerrar sidebar
```

## 🎨 Estilos y CSS

- **CSS Modules**: Cada componente tiene su archivo de estilos
- **Variables CSS**: Colores y espaciados consistentes
- **Flexbox y Grid**: Para layouts responsivos
- **Hover Effects**: Interacciones suaves
- **Transitions**: Animaciones CSS puras

## 🧪 Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo (puerto 4001)
npm run build      # Build de producción
npm run start      # Servidor de producción
npm run lint       # Linter de código
```

---

**Desarrollado con ❤️ by me Michael Negrete**
