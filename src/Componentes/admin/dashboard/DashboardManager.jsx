import DashboardCards from "./DashboardCards";
import DashboardCharts from "./DashboardCharts";
import DashboardAlerts from "./DashboardAlerts";

function DashboardManager({
  ventas,
  products,
  productosStockCritico,
  formatearPrecio,
}) {
  const totalVentas = ventas.reduce(
    (acc, venta) => acc + Number(venta.total || 0),
    0,
  );

  return (
    <>
      <DashboardCards
        totalVentas={totalVentas}
        totalProductos={products.length}
        totalPedidos={ventas.length}
        stockCritico={productosStockCritico.length}
        formatearPrecio={formatearPrecio}
      />

      <DashboardCharts />

      <DashboardAlerts productosStockCritico={productosStockCritico} />
    </>
  );
}

export default DashboardManager;
