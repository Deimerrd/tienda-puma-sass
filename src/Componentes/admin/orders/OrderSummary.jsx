function OrderSummary({
  ventas,
  entregados,
  pendientes,
  totalVendido,
  totalEntregado,
  ventasHoy,
  totalHoy,
  formatearPrecio,
}) {
  return (
    <>
      {/* CAJA GENERAL */}
      <div
        style={{
          background: "#f4f4f4",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>💰 Caja General</h2>

        <p>
          <strong>Pedidos Totales:</strong> {ventas.length}
        </p>

        <p>
          <strong>Entregados:</strong> {entregados.length}
        </p>

        <p>
          <strong>Pendientes:</strong> {pendientes.length}
        </p>

        <p>
          <strong>Total Vendido:</strong> {formatearPrecio(totalVendido)}
        </p>

        <p>
          <strong>Total Entregado:</strong> {formatearPrecio(totalEntregado)}
        </p>
      </div>

      {/* CAJA DE HOY */}
      <div
        style={{
          background: "#dbeafe",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>📅 Caja de Hoy</h2>

        <p>
          <strong>Pedidos Hoy:</strong> {ventasHoy.length}
        </p>

        <p>
          <strong>Ventas Hoy:</strong> {formatearPrecio(totalHoy)}
        </p>
      </div>
    </>
  );
}

export default OrderSummary;
