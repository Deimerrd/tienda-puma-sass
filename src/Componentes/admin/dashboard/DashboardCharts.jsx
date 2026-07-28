function DashboardCharts() {
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
      <h2>📈 Ventas por Mes</h2>

      <div
        style={{
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#888",
        }}
      >
        Aquí irá la gráfica de ventas.
      </div>
    </div>
  );
}

export default DashboardCharts;
