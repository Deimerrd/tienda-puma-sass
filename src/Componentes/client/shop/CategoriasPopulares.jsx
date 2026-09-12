function CategoriasPopulares({
  categories,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
}) {
  return (
    <div style={{ marginBottom: "35px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "800",
            color: "#111827",
          }}
        >
          Categorías Populares
        </h2>

        <span
          style={{
            color: "#7c3aed",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          Ver todas →
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px,1fr))",
          gap: "18px",
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setCategoriaSeleccionada(cat.id)}
            style={{
              background:
                categoriaSeleccionada === cat.id ? "#ede9fe" : "#ffffff",
              border:
                categoriaSeleccionada === cat.id
                  ? "2px solid #7c3aed"
                  : "1px solid #e5e7eb",
              borderRadius: "18px",
              padding: "22px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all .25s ease",
              boxShadow: "0 5px 18px rgba(0,0,0,.05)",
            }}
          >
            <div
              style={{
                fontSize: "40px",
                marginBottom: "12px",
              }}
            >
              {cat.icono || "📦"}
            </div>

            <strong
              style={{
                color: "#111827",
                fontSize: "15px",
              }}
            >
              {cat.name}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriasPopulares;
