import OrderSummary from "./OrderSummary";
import TopProducts from "./TopProducts";
import TopTallas from "./TopTallas";
import TopColores from "./TopColores";
import ProductosReponer from "./ProductosReponer";
import VentasPorMes from "./VentasPorMes";
import CrecimientoNegocio from "./CrecimientoNegocio";
import GraficaVentas from "./GraficaVentas";
import HistorialPedidos from "./HistorialPedidos";

function OrderManager({
  ventas,
  ventasFiltradas,
  busquedaPedido,
  setBusquedaPedido,
  entregados,
  pendientes,
  totalVendido,
  totalEntregado,
  ventasHoy,
  totalHoy,
  topProductos,
  topTallas,
  topColores,
  productosReponer,
  resumenMensual,
  ultimoMes,
  mesAnterior,
  crecimiento,
  datosGrafica,
  formatearPrecio,
  marcarPedidoEntregado,
  cambiarEstadoPedido,
  cancelarPedidoAdmin,
  generarFacturaPDF,
  modoIngenieroActivo,
  forzarDesbloqueoDev,
}) {
  return (
    <>
      <input
        type="text"
        placeholder="🔍 Buscar pedido..."
        value={busquedaPedido}
        onChange={(e) => setBusquedaPedido(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
        }}
      />
      {/* 📋 SECCIÓN B: HISTORIAL DE PEDIDOS CONTRAENTREGA */}
      <h3
        style={{ marginTop: "40px", color: "green", fontFamily: "sans-serif" }}
      >
        📋 Historial de Pedidos
      </h3>
      <OrderSummary
        ventas={ventas}
        entregados={entregados}
        pendientes={pendientes}
        totalVendido={totalVendido}
        totalEntregado={totalEntregado}
        ventasHoy={ventasHoy}
        totalHoy={totalHoy}
        formatearPrecio={formatearPrecio}
      />
      <TopProducts topProductos={topProductos} />
      <TopTallas topTallas={topTallas} /> <TopColores topColores={topColores} />{" "}
      <ProductosReponer productosReponer={productosReponer} />
      <VentasPorMes
        resumenMensual={resumenMensual}
        formatearPrecio={formatearPrecio}
      />
      <CrecimientoNegocio
        resumenMensual={resumenMensual}
        ultimoMes={ultimoMes}
        mesAnterior={mesAnterior}
        crecimiento={crecimiento}
        formatearPrecio={formatearPrecio}
      />
      <GraficaVentas datosGrafica={datosGrafica} />{" "}
      <HistorialPedidos
        ventasFiltradas={ventasFiltradas}
        formatearPrecio={formatearPrecio}
        cambiarEstadoPedido={cambiarEstadoPedido}
        marcarPedidoEntregado={marcarPedidoEntregado}
        cancelarPedidoAdmin={cancelarPedidoAdmin}
        generarFacturaPDF={generarFacturaPDF}
        modoIngenieroActivo={modoIngenieroActivo}
        forzarDesbloqueoDev={forzarDesbloqueoDev}
      />
    </>
  );
}

export default OrderManager;
