function ProductosReponer({ productosReponer }) {
  return (
    <div
      style={{
        background: "#fee2e2",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        border: "2px solid #ef4444",
      }}
    >
      {" "}
      <h2>🚨 Reponer Urgente</h2>
      {productosReponer.length === 0 ? (
        <p>✅ No hay productos críticos para reabastecer.</p>
      ) : (
        productosReponer.map((prod) => (
          <div
            key={prod.id}
            style={{
              padding: "10px 0",
              borderBottom: "1px solid #ddd",
            }}
          >
            <div>
              <strong>{prod.name}</strong>
            </div>

            <div>
              🎨 {prod.color || "N/A"} | 📏 {prod.size || "N/A"}
            </div>

            <div>📦 Stock actual: {prod.stock}</div>

            <div
              style={{
                color: "#dc2626",
                fontWeight: "bold",
              }}
            >
              🔥 Vendidos: {prod.vendidos}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductosReponer;
