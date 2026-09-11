function VentasPorMes({ resumenMensual, formatearPrecio }) {
  return (
    <div
      style={{
        background: "#dcfce7",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      {" "}
      <h2>📈 Ventas por Mes</h2>
      {resumenMensual.length === 0 ? (
        <p>No hay ventas registradas.</p>
      ) : (
        resumenMensual.map((item) => (
          <div
            key={item.mes}
            style={{
              padding: "8px 0",
              borderBottom: "1px solid #ddd",
            }}
          >
            <strong>{item.mes}</strong>

            <div>💰 {formatearPrecio(item.total)}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default VentasPorMes;
