import { useState } from "react";
import { generarFacturaPDF } from "./admin/orders/pdfGenerator";
import { obtenerEstadisticasPedidos } from "./admin/orders/orderStats";
import { filtrarPedidos } from "./admin/orders/filterOrders";
import { filtrarProductos } from "./admin/inventory/filterInventory";
import AdminLayout from "./admin/layout/AdminLayout";
import SecurityManager from "./admin/settings/SecurityManager";
import PaymentsManager from "./admin/payments/PaymentsManager";
import CategoryManager from "./admin/categories/CategoryManager";
import ProductManager from "./admin/products/ProductManager";
import InventoryManager from "./admin/inventory/InventoryManager";
import OrdersManager from "./admin/orders/OrdersManager";
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
  const {
    entregados,
    pendientes,
    totalVendido,
    totalEntregado,
    ventasHoy,
    totalHoy,
  } = obtenerEstadisticasPedidos(ventas);

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
    <AdminLayout moduloActivo={moduloActivo} setModuloActivo={setModuloActivo}>
      <SecurityManager
        nuevaContrasena={nuevaContrasena}
        setNuevaContrasena={setNuevaContrasena}
        cambiarClave={cambiarClave}
      />
      <PaymentsManager
        nequiNumero={nequiNumero}
        setNequiNumero={setNequiNumero}
        subirQR={subirQR}
        nequiQR={nequiQR}
      />
      <CategoryManager
        nuevaCatNombre={nuevaCatNombre}
        setNuevaCatNombre={setNuevaCatNombre}
        iconoCategoria={iconoCategoria}
        setIconoCategoria={setIconoCategoria}
        agregarCategoria={agregarCategoria}
      />
      <ProductManager
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
      />
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
    </AdminLayout>
  );
}

export default AdminView;
