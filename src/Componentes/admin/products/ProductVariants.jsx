function ProductVariants({ articulo, setArticulo }) {
  const variantes = articulo.variantes || [];

  function agregarVariante() {
    setArticulo((prev) => ({
      ...prev,
      variantes: [
        ...(prev.variantes || []),
        {
          id: `VAR-${Date.now()}`,
          color: "",
          talla: "",
          stock: 0,
          vendidos: 0,
        },
      ],
    }));
  }

  function actualizarVariante(id, campo, valor) {
    setArticulo((prev) => ({
      ...prev,
      variantes: (prev.variantes || []).map((variante) =>
        variante.id === id
          ? {
              ...variante,
              [campo]: campo === "stock" ? Math.max(0, Number(valor)) : valor,
            }
          : variante,
      ),
    }));
  }

  function eliminarVariante(id) {
    setArticulo((prev) => ({
      ...prev,
      variantes: (prev.variantes || []).filter(
        (variante) => variante.id !== id,
      ),
    }));
  }

  const stockTotal = variantes.reduce(
    (total, variante) => total + Number(variante.stock || 0),
    0,
  );

  const vendidosTotal = variantes.reduce(
    (total, variante) => total + Number(variante.vendidos || 0),
    0,
  );

  return (
    <div
      style={{
        marginTop: "25px",
        padding: "20px",
        background: "#171717",
        border: "1px solid #404040",
        borderRadius: "10px",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          color: "#f97316",
        }}
      >
        📦 Variantes e inventario
      </h3>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <strong>Stock total</strong>
          <div
            style={{
              fontSize: "24px",
              color: "#22c55e",
              fontWeight: "bold",
            }}
          >
            {stockTotal}
          </div>
        </div>

        <div>
          <strong>Total vendidos</strong>
          <div
            style={{
              fontSize: "24px",
              color: "#f97316",
              fontWeight: "bold",
            }}
          >
            {vendidosTotal}
          </div>
        </div>

        <div>
          <strong>Variantes</strong>
          <div
            style={{
              fontSize: "24px",
              color: "#60a5fa",
              fontWeight: "bold",
            }}
          >
            {variantes.length}
          </div>
        </div>
      </div>

      {variantes.map((variante) => (
        <div
          key={variante.id}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 120px auto",
            gap: "10px",
            alignItems: "end",
            padding: "15px",
            marginBottom: "10px",
            background: "#262626",
            borderRadius: "8px",
          }}
        >
          <div>
            <label>🎨 Color</label>

            <input
              type="text"
              value={variante.color}
              placeholder="Ej: Azul"
              onChange={(e) =>
                actualizarVariante(variante.id, "color", e.target.value)
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label>📏 Talla</label>

            <input
              type="text"
              value={variante.talla}
              placeholder="Ej: 40"
              onChange={(e) =>
                actualizarVariante(variante.id, "talla", e.target.value)
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label>📦 Stock</label>

            <input
              type="number"
              min="0"
              value={variante.stock}
              onChange={(e) =>
                actualizarVariante(variante.id, "stock", e.target.value)
              }
              style={inputStyle}
            />
          </div>

          <button
            type="button"
            onClick={() => eliminarVariante(variante.id)}
            style={{
              background: "#dc2626",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            🗑
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={agregarVariante}
        style={{
          background: "#f97316",
          color: "#fff",
          border: "none",
          padding: "12px 18px",
          borderRadius: "7px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        ➕ Agregar variante
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  marginTop: "5px",
  padding: "10px",
  background: "#171717",
  border: "1px solid #404040",
  color: "#fff",
  borderRadius: "5px",
};

export default ProductVariants;
