import { useState } from "react";
import { generarFacturaPDF } from "./admin/orders/pdfGenerator";
import { obtenerEstadisticasPedidos } from "./admin/orders/orderStats";
import { filtrarPedidos } from "./admin/orders/filterOrders";
import { filtrarProductos } from "./admin/inventory/filterInventory";
import AdminLayout from "./admin/layout/AdminLayout";
import AdminModules from "./admin/AdminModules";
import DashboardManager from "./admin/dashboard/DashboardManager";
import { GuardarProducto } from "./admin/products/saveProduct";
import {
  handleChange,
  agregarStock,
  restarStock,
} from "./admin/products/productLogic";

function AdminView({
  modoIngenieroActivo,
  marcarPedidoEntregado,
  products,
  productosStockCritico,
  setProducts,
  cambiarEstadoPedido,
  cerrarSesionAdmin,
  ventas,
  categories,
  agregarCategoria,
  cancelarPedidoAdmin,
  eliminarProducto,
  cambiarClave,
  formatearPrecio,
  forzarDesbloqueoDev,
  nequiNumero,
  setNequiNumero,
  nequiQR,
}) {
  const subirQR = (e) => {
    console.log(e.target.files[0]);
  };
  const [articulo, setArticulo] = useState({
    id: "",
    name: "",
    category: "",
    color: "",
    size: "", // ← IMPORTANTE
    marca: "",
    price: "",
    stock: "",
    image: "",
    gender: "",
    description: "",
    rating: 5,
    reviews: 0,
    promocion: "",
    descuento: 0,
  });
  const [busquedaPedido, setBusquedaPedido] = useState("");
  const [nuevaCatNombre, setNuevaCatNombre] = useState("");
  const [iconoCategoria, setIconoCategoria] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState(""); // 👈 ESTADO PARA CAPTURAR LA NUEVA CLAVE
  const [busquedaProducto, setBusquedaProducto] = useState("");
  const estadisticas = obtenerEstadisticasPedidos(ventas);

  const {
    entregados,
    pendientes,
    totalVendido,
    totalEntregado,
    ventasHoy,
    totalHoy,
  } = estadisticas;

  const productosFiltrados = filtrarProductos(products, busquedaProducto);
  const ventasFiltradas = filtrarPedidos(ventas, busquedaPedido);
  const [moduloActivo, setModuloActivo] = useState("dashboard");
  const {
    topProductos,
    topTallas,
    topColores,
    productosReponer,
    resumenMensual,
    ultimoMes,
    mesAnterior,
    crecimiento,
    datosGrafica,
  } = DashboardManager({
    ventas,
    products,
  });
  return (
    <AdminLayout
      moduloActivo={moduloActivo}
      setModuloActivo={setModuloActivo}
      cerrarSesionAdmin={cerrarSesionAdmin}
      volverTienda={cerrarSesionAdmin}
    >
      <AdminModules
        moduloActivo={moduloActivo}
        // Dashboard
        ventas={ventas}
        products={products}
        productosStockCritico={productosStockCritico}
        formatearPrecio={formatearPrecio}
        topProductos={topProductos}
        // Productos
        articulo={articulo}
        handleChange={(e) => handleChange(e, articulo, setArticulo)}
        categories={categories}
        Guardar={() =>
          GuardarProducto({
            articulo,
            products,
            setProducts,
            setArticulo,
          })
        }
        // Categorías
        nuevaCatNombre={nuevaCatNombre}
        setNuevaCatNombre={setNuevaCatNombre}
        iconoCategoria={iconoCategoria}
        setIconoCategoria={setIconoCategoria}
        agregarCategoria={agregarCategoria}
        // Inventario
        productosFiltrados={productosFiltrados}
        busquedaProducto={busquedaProducto}
        setBusquedaProducto={setBusquedaProducto}
        setArticulo={setArticulo}
        agregarStock={(idProducto) =>
          agregarStock(idProducto, products, setProducts)
        }
        restarStock={(idProducto) =>
          restarStock(idProducto, products, setProducts)
        }
        eliminarProducto={eliminarProducto}
        // Pedidos
        ventasFiltradas={ventasFiltradas}
        busquedaPedido={busquedaPedido}
        setBusquedaPedido={setBusquedaPedido}
        entregados={entregados}
        pendientes={pendientes}
        totalVendido={totalVendido}
        totalEntregado={totalEntregado}
        ventasHoy={ventasHoy}
        totalHoy={totalHoy}
        topTallas={topTallas}
        topColores={topColores}
        productosReponer={productosReponer}
        resumenMensual={resumenMensual}
        ultimoMes={ultimoMes}
        mesAnterior={mesAnterior}
        crecimiento={crecimiento}
        datosGrafica={datosGrafica}
        marcarPedidoEntregado={marcarPedidoEntregado}
        cambiarEstadoPedido={cambiarEstadoPedido}
        cancelarPedidoAdmin={cancelarPedidoAdmin}
        generarFacturaPDF={generarFacturaPDF}
        modoIngenieroActivo={modoIngenieroActivo}
        forzarDesbloqueoDev={forzarDesbloqueoDev}
        // Pagos
        nequiNumero={nequiNumero}
        setNequiNumero={setNequiNumero}
        subirQR={subirQR}
        nequiQR={nequiQR}
        // Seguridad
        nuevaContrasena={nuevaContrasena}
        setNuevaContrasena={setNuevaContrasena}
        cambiarClave={cambiarClave}
      />
    </AdminLayout>
  );
}

export default AdminView;
