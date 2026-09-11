function ProductoVariantes({
  producto,
  colorElegido,
  tallaElegida,
  setColorElegido,
  setTallaElegida,
}) {
  const variantes = producto?.variantes || [];
  console.log("VARIANTES QUE RECIBE CLIENTE:", variantes);

  // ==========================================================
  // COLORES DISPONIBLES
  // Solo mostramos colores que tengan al menos una variante
  // con stock disponible.
  // ==========================================================
  const coloresDisponibles = [
    ...new Set(
      variantes.map((variante) => variante.color?.trim()).filter(Boolean),
    ),
  ];

  // ==========================================================
  // VARIANTES DEL COLOR SELECCIONADO
  // ==========================================================

  const variantesColor = variantes.filter(
    (variante) =>
      variante.color?.trim().toLowerCase() ===
      colorElegido?.trim().toLowerCase(),
  );

  // ==========================================================
  // TALLAS DISPONIBLES PARA EL COLOR
  // ==========================================================
  const tallasDisponibles = [
    ...new Set(
      variantesColor.map((variante) => variante.talla?.trim()).filter(Boolean),
    ),
  ];

  return (
    <div>
      {/* =====================================================
          COLORES
      ===================================================== */}

      {coloresDisponibles.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3
            style={{
              fontSize: "18px",
              color: "#111827",
              marginBottom: "10px",
            }}
          >
            Color
          </h3>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {coloresDisponibles.map((color) => {
              const seleccionado =
                colorElegido?.toLowerCase() === color.toLowerCase();

              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setColorElegido(color);

                    // Al cambiar de color,
                    // eliminamos la talla seleccionada anteriormente.
                    setTallaElegida("");
                  }}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "22px",
                    border: seleccionado
                      ? "2px solid #7c3aed"
                      : "1px solid #d1d5db",
                    background: seleccionado ? "#ede9fe" : "#ffffff",
                    color: seleccionado ? "#5b21b6" : "#374151",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================
          TALLAS
      ===================================================== */}

      {colorElegido && (
        <div style={{ marginBottom: "20px" }}>
          <h3
            style={{
              fontSize: "18px",
              color: "#111827",
              marginBottom: "10px",
            }}
          >
            Talla
          </h3>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {tallasDisponibles.length === 0 ? (
              <p style={{ color: "#dc2626" }}>
                ❌ No hay tallas disponibles para este color.
              </p>
            ) : (
              tallasDisponibles.map((talla) => {
                const variante = variantesColor.find(
                  (item) =>
                    item.talla?.trim().toLowerCase() === talla.toLowerCase(),
                );

                const stock = Number(variante?.stock || 0);

                const agotada = stock <= 0;

                const seleccionado = tallaElegida === talla;

                return (
                  <button
                    key={talla}
                    type="button"
                    disabled={agotada}
                    onClick={() => {
                      if (!agotada) {
                        setTallaElegida(talla);
                      }
                    }}
                    style={{
                      minWidth: "70px",
                      minHeight: "48px",
                      padding: "8px 12px",
                      borderRadius: "12px",

                      border: agotada
                        ? "1px solid #d1d5db"
                        : seleccionado
                          ? "2px solid #7c3aed"
                          : "1px solid #d1d5db",

                      background: agotada
                        ? "#f3f4f6"
                        : seleccionado
                          ? "#ede9fe"
                          : "#ffffff",

                      color: agotada
                        ? "#9ca3af"
                        : seleccionado
                          ? "#5b21b6"
                          : "#374151",

                      fontWeight: "700",

                      cursor: agotada ? "not-allowed" : "pointer",

                      opacity: agotada ? 0.65 : 1,

                      textDecoration: agotada ? "line-through" : "none",
                    }}
                  >
                    <div>{talla}</div>

                    {agotada && (
                      <small
                        style={{
                          display: "block",
                          fontSize: "10px",
                          color: "#dc2626",
                          marginTop: "2px",
                          textDecoration: "none",
                        }}
                      >
                        Agotado
                      </small>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductoVariantes;
