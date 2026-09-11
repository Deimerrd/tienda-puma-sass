function DashboardAlerts({ productosStockCritico }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "25px",
        marginBottom: "25px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <h2>⚠ Alertas del Inventario</h2>

      {productosStockCritico.length === 0 ? (
        <p style={{ color: "#10b981", fontWeight: "bold" }}>
          ✅ No existen productos con stock crítico.
        </p>
      ) : (
        productosStockCritico.map((prod) => (
          <div
            key={prod.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>{prod.name}</span>

            <strong style={{ color: "#ef4444" }}>Stock: {prod.stock}</strong>
          </div>
        ))
      )}
    </div>
  );
}

export default DashboardAlerts;
