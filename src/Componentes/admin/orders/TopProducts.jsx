function TopProducts({ topProductos }) {
  return (
    <div
      style={{
        background: "#fef3c7",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h2>🏆 Top Productos Más Vendidos</h2>

      {topProductos.length === 0 ? (
        <p>No hay ventas registradas todavía.</p>
      ) : (
        topProductos.map(([nombre, cantidad], index) => (
          <div
            key={nombre}
            style={{
              padding: "8px 0",
              borderBottom: "1px solid #ddd",
            }}
          >
            <strong>#{index + 1}</strong>

            <div>
              <div>{nombre}</div>

              <div
                style={{
                  color: "#16a34a",
                  fontWeight: "bold",
                  marginTop: "4px",
                }}
              >
                {cantidad} unidades vendidas
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TopProducts;
