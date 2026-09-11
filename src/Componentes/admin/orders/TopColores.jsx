function TopColores({ topColores }) {
  return (
    <div
      style={{
        background: "#fce7f3",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h2>🎨 Colores Más Vendidos</h2>

      {topColores.length === 0 ? (
        <p>No hay datos disponibles.</p>
      ) : (
        topColores.map(([color, cantidad], index) => (
          <div
            key={color}
            style={{
              padding: "8px 0",
              borderBottom: "1px solid #ccc",
            }}
          >
            #{index + 1} — {color} → {cantidad} ventas
          </div>
        ))
      )}
    </div>
  );
}

export default TopColores;
