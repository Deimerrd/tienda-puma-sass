import ProductManager from "./products/ProductManager";
import CategoryManager from "./categories/CategoryManager";
import InventoryManager from "./inventory/InventoryManager";
import OrdersManager from "./orders/OrdersManager";
import PaymentsManager from "./payments/PaymentsManager";
import SecurityManager from "./settings/SecurityManager";

function AdminModules({
  moduloActivo,

  // Dashboard
  ventas,
  products,
  productosStockCritico,
  formatearPrecio,
  topProductos,

  // Productos
  articulo,
  handleChange,
  categories,
  Guardar,

  // Categorías
  nuevaCatNombre,
  setNuevaCatNombre,
  iconoCategoria,
  setIconoCategoria,
  agregarCategoria,

  // Inventario
  productosFiltrados,
  busquedaProducto,
  setBusquedaProducto,
  setArticulo,
  agregarStock,
  restarStock,
  eliminarProducto,

  // Pedidos
  ventasFiltradas,
  busquedaPedido,
  setBusquedaPedido,
  entregados,
  pendientes,
  totalVendido,
  totalEntregado,
  ventasHoy,
  totalHoy,
  topTallas,
  topColores,
  productosReponer,
  resumenMensual,
  ultimoMes,
  mesAnterior,
  crecimiento,
  datosGrafica,
  marcarPedidoEntregado,
  cambiarEstadoPedido,
  cancelarPedidoAdmin,
  generarFacturaPDF,
  modoIngenieroActivo,
  forzarDesbloqueoDev,

  // Pagos
  nequiNumero,
  setNequiNumero,
  subirQR,
  nequiQR,

  // Seguridad
  nuevaContrasena,
  setNuevaContrasena,
  cambiarClave,
}) {
  switch (moduloActivo) {
    case "dashboard":
      return (
        <div>
          <h2>📊 Dashboard</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginBottom: "25px",
            }}
          >
            <div
              style={{
                background: "#262626",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>💰 Ventas Totales</h3>
              <strong>{formatearPrecio(totalVendido)}</strong>
            </div>

            <div
              style={{
                background: "#262626",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>🛒 Pedidos</h3>
              <strong>{ventas.length}</strong>
            </div>

            <div
              style={{
                background: "#262626",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>📦 Productos</h3>
              <strong>{products.length}</strong>
            </div>

            <div
              style={{
                background: "#262626",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>⚠️ Stock Crítico</h3>
              <strong>{productosStockCritico.length}</strong>
            </div>
          </div>

          <div
            style={{
              background: "#262626",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>🏆 Productos Más Vendidos</h3>

            {topProductos.length === 0 ? (
              <p>No hay ventas registradas todavía.</p>
            ) : (
              topProductos.map(([nombre, cantidad], index) => (
                <div
                  key={nombre}
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid #404040",
                  }}
                >
                  <strong>
                    #{index + 1} — {nombre}
                  </strong>

                  <div>{cantidad} unidades vendidas</div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    case "productos":
      return (
        <ProductManager
          articulo={articulo}
          handleChange={handleChange}
          categories={categories}
          Guardar={Guardar}
          products={products}
          ventas={ventas}
          setArticulo={setArticulo}
          eliminarProducto={eliminarProducto}
          formatearPrecio={formatearPrecio}
        />
      );

    case "inventario":
      return (
        <InventoryManager
          productosStockCritico={productosStockCritico}
          productosFiltrados={productosFiltrados}
          busquedaProducto={busquedaProducto}
          setBusquedaProducto={setBusquedaProducto}
          formatearPrecio={formatearPrecio}
          setArticulo={setArticulo}
          agregarStock={agregarStock}
          restarStock={restarStock}
          eliminarProducto={eliminarProducto}
        />
      );

    case "categorias":
      return (
        <CategoryManager
          nuevaCatNombre={nuevaCatNombre}
          setNuevaCatNombre={setNuevaCatNombre}
          iconoCategoria={iconoCategoria}
          setIconoCategoria={setIconoCategoria}
          agregarCategoria={agregarCategoria}
        />
      );

    case "pedidos":
      return (
        <OrdersManager
          ventas={ventas}
          ventasFiltradas={ventasFiltradas}
          busquedaPedido={busquedaPedido}
          setBusquedaPedido={setBusquedaPedido}
          entregados={entregados}
          pendientes={pendientes}
          totalVendido={totalVendido}
          totalEntregado={totalEntregado}
          ventasHoy={ventasHoy}
          totalHoy={totalHoy}
          topProductos={topProductos}
          topTallas={topTallas}
          topColores={topColores}
          productosReponer={productosReponer}
          resumenMensual={resumenMensual}
          ultimoMes={ultimoMes}
          mesAnterior={mesAnterior}
          crecimiento={crecimiento}
          datosGrafica={datosGrafica}
          formatearPrecio={formatearPrecio}
          marcarPedidoEntregado={marcarPedidoEntregado}
          cambiarEstadoPedido={cambiarEstadoPedido}
          cancelarPedidoAdmin={cancelarPedidoAdmin}
          generarFacturaPDF={generarFacturaPDF}
          modoIngenieroActivo={modoIngenieroActivo}
          forzarDesbloqueoDev={forzarDesbloqueoDev}
        />
      );

    case "reportes":
      return (
        <div>
          <h2>📈 Reportes</h2>
          <p>Módulo de reportes en preparación.</p>
        </div>
      );

    case "pagos":
      return (
        <PaymentsManager
          nequiNumero={nequiNumero}
          setNequiNumero={setNequiNumero}
          subirQR={subirQR}
          nequiQR={nequiQR}
        />
      );

    case "seguridad":
      return (
        <SecurityManager
          nuevaContrasena={nuevaContrasena}
          setNuevaContrasena={setNuevaContrasena}
          cambiarClave={cambiarClave}
        />
      );

    default:
      return null;
  }
}

export default AdminModules;
