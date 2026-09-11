function DashboardCards({
  totalVentas,
  totalProductos,
  totalPedidos,
  stockCritico,
  formatearPrecio,
}) {
  const cards = [
    {
      titulo: "Ventas",
      icono: "💰",
      valor: formatearPrecio(totalVentas),
      color: "#10b981",
    },
    {
      titulo: "Productos",
      icono: "📦",
      valor: totalProductos,
      color: "#3b82f6",
    },
    {
      titulo: "Pedidos",
      icono: "🛒",
      valor: totalPedidos,
      color: "#8b5cf6",
    },
    {
      titulo: "Stock Bajo",
      icono: "⚠️",
      valor: stockCritico,
      color: "#ef4444",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.titulo}
          style={{
            background: "#fff",
            borderRadius: "15px",
            padding: "25px",
            boxShadow: "0 10px 25px rgba(0,0,0,.08)",
            borderLeft: `6px solid ${card.color}`,
          }}
        >
          <div style={{ fontSize: "32px" }}>{card.icono}</div>

          <h4>{card.titulo}</h4>

          <h2>{card.valor}</h2>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
