function TopTallas({ topTallas }) {
  return (
    <div
      style={{
        background: "#dbeafe",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h2>🔥 Tallas Más Vendidas</h2>

      {topTallas.length === 0 ? (
        <p>No hay datos disponibles.</p>
      ) : (
        topTallas.map(([talla, cantidad], index) => (
          <div
            key={talla}
            style={{
              padding: "8px 0",
              borderBottom: "1px solid #ccc",
            }}
          >
            #{index + 1} — Talla {talla} → {cantidad} ventas
          </div>
        ))
      )}
    </div>
  );
}

export default TopTallas;
