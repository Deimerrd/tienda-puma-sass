function CrecimientoNegocio({
  resumenMensual,
  ultimoMes,
  mesAnterior,
  crecimiento,
  formatearPrecio,
}) {
  return (
    <div
      style={{
        background: "#e0f2fe",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      {" "}
      <h2>📊 Crecimiento del Negocio</h2>
      {resumenMensual.length < 2 ? (
        <p>Se necesitan al menos dos meses de ventas.</p>
      ) : (
        <>
          <p>
            Mes actual:
            <strong> {formatearPrecio(ultimoMes.total)}</strong>
          </p>

          <p>
            Mes anterior:
            <strong> {formatearPrecio(mesAnterior.total)}</strong>
          </p>

          <p
            style={{
              color: crecimiento >= 0 ? "#16a34a" : "#dc2626",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            {crecimiento >= 0 ? "⬆️" : "⬇️"} {crecimiento.toFixed(1)}%
          </p>
        </>
      )}
    </div>
  );
}

export default CrecimientoNegocio;
