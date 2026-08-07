function InventoryCard({
  prod,
  formatearPrecio,
  setArticulo,
  agregarStock,
  restarStock,
  eliminarProducto,
}) {
  return (
    <div
      style={{
        border: "1px solid red",
        padding: "15px",
        margin: "10px 0",
        background: "#171717",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      {/* Detalles técnicos del producto */}
      <div>
        <p style={{ margin: 0 }}>
          <strong>[{prod.id}]</strong> {prod.name} - {prod.marca}
        </p>

        <p style={{ margin: "5px 0 0 0" }}>
          💲 {formatearPrecio(Number(prod.price))}
        </p>

        <p
          style={{
            margin: "5px 0 0 0",
            fontWeight: "bold",
            color:
              Number(prod.stock) === 0
                ? "red"
                : Number(prod.stock) <= 5
                  ? "orange"
                  : "#22c55e",
          }}
        >
          {Number(prod.stock) === 0
            ? "🔴 Agotado"
            : Number(prod.stock) <= 5
              ? `🟡 Stock Bajo: ${prod.stock}`
              : `🟢 Stock: ${prod.stock}`}
        </p>
      </div>

      {/* Botones de administración */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => {
            setArticulo(prod);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ✏️ Editar
        </button>

        <button
          onClick={() => agregarStock(prod.id)}
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ➕ Stock
        </button>

        <button
          onClick={() => restarStock(prod.id)}
          style={{
            background: "#ea580c",
            color: "white",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          📉 Stock
        </button>

        <button
          onClick={() => eliminarProducto(prod.id)}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}

export default InventoryCard;
