function FiltroGeneroCliente({ generoSeleccionado, setGeneroSeleccionado }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <strong style={{ marginRight: "10px" }}>Sección:</strong>

      <button
        onClick={() => setGeneroSeleccionado("todos")}
        style={{
          marginRight: "8px",
          padding: "8px 14px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontWeight: generoSeleccionado === "todos" ? "800" : "500",
          textTransform: "uppercase",
          borderBottom:
            generoSeleccionado === "todos"
              ? "2px solid #111827"
              : "2px solid transparent",
        }}
      >
        🛍️ Todo Público
      </button>

      <button
        onClick={() => setGeneroSeleccionado("Hombre")}
        style={{
          marginRight: "8px",
          padding: "8px 14px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontWeight: generoSeleccionado === "Hombre" ? "800" : "500",
          textTransform: "uppercase",
          borderBottom:
            generoSeleccionado === "Hombre"
              ? "2px solid #111827"
              : "2px solid transparent",
        }}
      >
        👨 Hombre
      </button>

      <button
        onClick={() => setGeneroSeleccionado("Mujer")}
        style={{
          marginRight: "8px",
          padding: "8px 14px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontWeight: generoSeleccionado === "Mujer" ? "800" : "500",
          textTransform: "uppercase",
          borderBottom:
            generoSeleccionado === "Mujer"
              ? "2px solid #111827"
              : "2px solid transparent",
        }}
      >
        👩 Mujer
      </button>

      <button
        onClick={() => setGeneroSeleccionado("Niño")}
        style={{
          marginRight: "8px",
          padding: "8px 14px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontWeight: generoSeleccionado === "Niño" ? "800" : "500",
          textTransform: "uppercase",
          borderBottom:
            generoSeleccionado === "Niño"
              ? "2px solid #111827"
              : "2px solid transparent",
        }}
      >
        👦 Niño
      </button>

      <button
        onClick={() => setGeneroSeleccionado("Niña")}
        style={{
          padding: "8px 14px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontWeight: generoSeleccionado === "Niña" ? "800" : "500",
          textTransform: "uppercase",
          borderBottom:
            generoSeleccionado === "Niña"
              ? "2px solid #111827"
              : "2px solid transparent",
        }}
      >
        👧 Niña
      </button>
    </div>
  );
}

export default FiltroGeneroCliente;
