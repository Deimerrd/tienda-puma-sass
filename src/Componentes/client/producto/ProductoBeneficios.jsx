function ProductoBeneficios() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "35px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          padding: "20px",
          boxShadow: "0 6px 18px rgba(0,0,0,.06)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "34px" }}>🚚</div>

        <h3 style={{ marginTop: "12px", marginBottom: "6px" }}>Envío rápido</h3>

        <p
          style={{
            color: "#777",
            margin: 0,
            fontSize: "14px",
          }}
        >
          A todo Colombia
        </p>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          padding: "20px",
          boxShadow: "0 6px 18px rgba(0,0,0,.06)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "34px" }}>🔒</div>

        <h3 style={{ marginTop: "12px", marginBottom: "6px" }}>
          Pagos seguros
        </h3>

        <p
          style={{
            color: "#777",
            margin: 0,
            fontSize: "14px",
          }}
        >
          Nequi, Bre-B y Contraentrega
        </p>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          padding: "20px",
          boxShadow: "0 6px 18px rgba(0,0,0,.06)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "34px" }}>🔄</div>

        <h3 style={{ marginTop: "12px", marginBottom: "6px" }}>
          Cambios fáciles
        </h3>

        <p
          style={{
            color: "#777",
            margin: 0,
            fontSize: "14px",
          }}
        >
          Sin complicaciones
        </p>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          padding: "20px",
          boxShadow: "0 6px 18px rgba(0,0,0,.06)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "34px" }}>⭐</div>

        <h3 style={{ marginTop: "12px", marginBottom: "6px" }}>
          Calidad Premium
        </h3>

        <p
          style={{
            color: "#777",
            margin: 0,
            fontSize: "14px",
          }}
        >
          Productos originales
        </p>
      </div>
    </div>
  );
}

export default ProductoBeneficios;
