import DashboardManager from "./DashboardManager";
import ProductManager from "./ProductManager";
import CategoryManager from "./CategoryManager";
import InventoryManager from "./InventoryManager";
import OrdersManager from "./OrderManager";

function AdminModules({
  moduloActivo,

  // Dashboard
  ventas,
  products,
  productosStockCritico,
  formatearPrecio,

  // Productos
  setProducts,
  categories,
  eliminarProducto,

  // Categorías
  agregarCategoria,

  // Inventario
  productosFiltrados,
  busquedaProducto,
  setBusquedaProducto,
  setArticulo,
  agregarStock,
  restarStock,

  // Pedidos
  marcarPedidoEntregado,
  cambiarEstadoPedido,
  cancelarPedidoAdmin,
}) {
  switch (moduloActivo) {
    case "dashboard":
      return (
        <DashboardManager
          ventas={ventas}
          products={products}
          productosStockCritico={productosStockCritico}
          formatearPrecio={formatearPrecio}
        />
      );

    case "productos":
      return (
        <ProductManager
          products={products}
          setProducts={setProducts}
          categories={categories}
          eliminarProducto={eliminarProducto}
          formatearPrecio={formatearPrecio}
        />
      );

    case "categorias":
      return (
        <CategoryManager
          categories={categories}
          agregarCategoria={agregarCategoria}
        />
      );

    case "inventario":
      return (
        <InventoryManager
          products={products}
          productosFiltrados={productosFiltrados}
          busquedaProducto={busquedaProducto}
          setBusquedaProducto={setBusquedaProducto}
          productosStockCritico={productosStockCritico}
          formatearPrecio={formatearPrecio}
          setArticulo={setArticulo}
          eliminarProducto={eliminarProducto}
          agregarStock={agregarStock}
          restarStock={restarStock}
        />
      );

    case "pedidos":
      return (
        <OrdersManager
          ventas={ventas}
          marcarPedidoEntregado={marcarPedidoEntregado}
          cambiarEstadoPedido={cambiarEstadoPedido}
          cancelarPedidoAdmin={cancelarPedidoAdmin}
        />
      );

    case "reportes":
      return <h2>📈 Reportes (Próximamente)</h2>;

    case "pagos":
      return <h2>💳 Pagos (Próximamente)</h2>;

    case "seguridad":
      return <h2>🔒 Seguridad (Próximamente)</h2>;

    default:
      return <DashboardManager />;
  }
}

export default AdminModules;
