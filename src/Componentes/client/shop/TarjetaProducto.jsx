import { useState } from "react";

function TarjetaProducto({
  prod,
  AgregarAlCarrito,
  formatearPrecio,
  verProducto,
}) {
  const [fotoActivaIdx, setFotoActivaIdx] = useState(0);
  const [mensajeTalla, setMensajeTalla] = useState("");
  const [colorElegido, setColorElegido] = useState("");
  const [tallaElegida, setTallaElegida] = useState("");
  const [cantidadDeseada, setCantidadDeseada] = useState(1);

  const varianteActual = prod.variantes?.find(
    (variante) =>
      variante.color?.trim().toLowerCase() ===
        colorElegido?.trim().toLowerCase() &&
      variante.talla?.trim().toLowerCase() ===
        tallaElegida?.trim().toLowerCase(),
  );

  const stockSeleccionado = varianteActual
    ? Number(varianteActual.stock ?? 0)
    : 0;

  const precioOriginal = Number(prod.price);

  const precioFinal =
    precioOriginal - (precioOriginal * Number(prod.descuento || 0)) / 100;

  const colores = prod.color
    ? prod.color.split(",").map((col) => col.trim())
    : [];

  const obtenerColorVisual = (color) => {
    const nombre = color.toLowerCase();

    if (nombre.includes("black") || nombre.includes("negro")) {
      return "#000000";
    }

    if (nombre.includes("white") || nombre.includes("blanco")) {
      return "#ffffff";
    }

    if (nombre.includes("red") || nombre.includes("rojo")) {
      return "#ef4444";
    }

    if (nombre.includes("blue") || nombre.includes("azul")) {
      return "#2563eb";
    }

    if (nombre.includes("green") || nombre.includes("verde")) {
      return "#22c55e";
    }

    return "#9ca3af";
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "22px",
        overflow: "hidden",
        boxShadow: "0 10px 35px rgba(0,0,0,.08)",
        border: "1px solid #eef2f7",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* ================= FAVORITO ================= */}

      <div
        style={{
          position: "absolute",
          top: "18px",
          right: "18px",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,.15)",
          cursor: "pointer",
          zIndex: 20,
          fontSize: "18px",
        }}
      >
        🤍
      </div>

      {/* ================= IMAGEN ================= */}

      {prod.image ? (
        <img
          src={
            prod.image.split(",")[fotoActivaIdx]
              ? prod.image.split(",")[fotoActivaIdx].trim()
              : prod.image.split(",")[0].trim()
          }
          alt={prod.name}
          style={{
            width: "100%",
            height: "290px",
            objectFit: "contain",
            padding: "25px",
            background: "#ffffff",
            transition: ".3s",
            boxSizing: "border-box",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "290px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#94a3b8",
            fontSize: "13px",
          }}
        >
          Sin imagen
        </div>
      )}

      {/* ================= CONTENIDO ================= */}

      <div
        style={{
          padding: "0 20px 20px 20px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {/* ================= PROMOCIÓN ================= */}

        {prod.promocion && (
          <div
            style={{
              background: "#dc2626",
              color: "#ffffff",
              padding: "5px 10px",
              borderRadius: "20px",
              display: "inline-block",
              fontSize: "12px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            {prod.promocion}
          </div>
        )}

        {/* ================= NOMBRE ================= */}

        <h3
          style={{
            margin: "5px 0 8px 0",
            color: "#111827",
            fontSize: "20px",
            fontWeight: "800",
            lineHeight: "1.3",
          }}
        >
          {prod.name}
        </h3>

        {/* ================= MARCA ================= */}

        <div
          style={{
            fontSize: "14px",
            fontWeight: "700",
            color: "#374151",
            marginBottom: "18px",
          }}
        >
          🏷️ {prod.marca}
        </div>

        {/* ================= COLOR ================= */}

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "7px",
              display: "block",
            }}
          >
            Color
          </label>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {colores.length > 0 ? (
              colores.map((col, idx) => {
                const seleccionado =
                  colorElegido.trim().toLowerCase() ===
                  col.trim().toLowerCase();

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const color = col.trim();

                      setColorElegido(color);
                      setTallaElegida("");
                      setCantidadDeseada(1);
                      setMensajeTalla("");
                      setFotoActivaIdx(idx);
                    }}
                    style={{
                      padding: "8px 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "600",
                      transition: "all .15s ease",
                      border: seleccionado
                        ? "2px solid #7c3aed"
                        : "1px solid #d1d5db",
                      background: seleccionado ? "#ede9fe" : "#ffffff",
                      color: seleccionado ? "#5b21b6" : "#374151",
                      boxShadow: seleccionado
                        ? "0 6px 18px rgba(124,58,237,.25)"
                        : "0 2px 6px rgba(0,0,0,.08)",
                    }}
                  >
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        display: "inline-block",
                        marginRight: "8px",
                        border: "2px solid #d1d5db",
                        background: obtenerColorVisual(col),
                        boxSizing: "border-box",
                      }}
                    />

                    {col}
                  </button>
                );
              })
            ) : (
              <button
                type="button"
                style={{
                  padding: "8px 14px",
                  borderRadius: "20px",
                  border: "1px solid #d1d5db",
                  background: "#ffffff",
                  color: "#374151",
                }}
              >
                Estándar
              </button>
            )}
          </div>
        </div>

        {/* ================= TALLA ================= */}

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "7px",
              display: "block",
            }}
          >
            Talla
          </label>

          <select
            value={tallaElegida}
            style={{
              width: "100%",
              padding: "9px 10px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "13px",
              background: "#ffffff",
              color: "#000000",
              boxSizing: "border-box",
              cursor: "pointer",
            }}
            onChange={(e) => {
              const talla = e.target.value;

              setTallaElegida(talla);

              if (!talla) {
                setMensajeTalla("");
                return;
              }

              const varianteSeleccionada = prod.variantes?.find(
                (variante) =>
                  variante.color?.trim().toLowerCase() ===
                    colorElegido?.trim().toLowerCase() &&
                  variante.talla?.trim().toLowerCase() ===
                    talla.trim().toLowerCase(),
              );

              const stock = Number(varianteSeleccionada?.stock ?? 0);

              if (stock <= 0) {
                setMensajeTalla(
                  "❌ Esta talla se encuentra agotada en bodega.",
                );
              } else {
                setMensajeTalla(
                  `✅ ¡Talla disponible para despacho inmediato! (${stock} unidades)`,
                );
              }
            }}
          >
            <option
              value=""
              style={{
                color: "#000000",
                background: "#ffffff",
              }}
            >
              -- Elige Talla --
            </option>

            {prod.size ? (
              prod.size.split(",").map((tal, idx) => (
                <option
                  key={idx}
                  value={tal.trim()}
                  style={{
                    color: "#000000",
                    background: "#ffffff",
                  }}
                >
                  {tal.trim()}
                </option>
              ))
            ) : (
              <option
                value="Única"
                style={{
                  color: "#000000",
                  background: "#ffffff",
                }}
              >
                Única
              </option>
            )}
          </select>
        </div>

        {/* ================= MENSAJE DE TALLA ================= */}

        {mensajeTalla && (
          <p
            style={{
              margin: "8px 0 15px 0",
              fontSize: "12px",
              fontWeight: "600",
              color: mensajeTalla.includes("❌") ? "#ef4444" : "#10b981",
              background: mensajeTalla.includes("❌") ? "#fef2f2" : "#f0fdf4",
              padding: "8px",
              borderLeft: mensajeTalla.includes("❌")
                ? "3px solid #ef4444"
                : "3px solid #10b981",
              borderRadius: "4px",
            }}
          >
            {mensajeTalla}
          </p>
        )}

        {/* ================= GÉNERO ================= */}

        <p
          style={{
            margin: "0 0 12px 0",
            color: "#374151",
            fontSize: "13px",
          }}
        >
          Género: <strong>{prod.gender || "Unisex"}</strong>
        </p>

        {/* ================= PRECIO ================= */}

        <div style={{ marginBottom: "15px" }}>
          {Number(prod.descuento) > 0 ? (
            <>
              <div
                style={{
                  color: "#9ca3af",
                  textDecoration: "line-through",
                  fontSize: "15px",
                  marginBottom: "4px",
                }}
              >
                {formatearPrecio(precioOriginal)}
              </div>

              <div
                style={{
                  color: "#7c3aed",
                  fontSize: "28px",
                  fontWeight: "800",
                  marginBottom: "5px",
                }}
              >
                {formatearPrecio(precioFinal)}
              </div>

              <div
                style={{
                  background: "#ef4444",
                  color: "#ffffff",
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                {prod.descuento}% OFF
              </div>
            </>
          ) : (
            <div
              style={{
                color: "#111827",
                fontSize: "28px",
                fontWeight: "800",
              }}
            >
              {formatearPrecio(precioOriginal)}
            </div>
          )}
        </div>

        {/* ================= CANTIDAD ================= */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              color: "#6b7280",
              fontSize: "13px",
              marginRight: "auto",
            }}
          >
            {stockSeleccionado} unidades disponibles
          </div>

          <button
            type="button"
            onClick={() =>
              setCantidadDeseada((prev) => (prev > 1 ? prev - 1 : 1))
            }
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              background: "#ffffff",
              color: "#111827",
              fontSize: "20px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          ></button>

          <div
            style={{
              minWidth: "35px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "16px",
              color: "#111827",
            }}
          >
            {cantidadDeseada}
          </div>

          <button
            type="button"
            onClick={() => {
              if (cantidadDeseada < stockSeleccionado) {
                setCantidadDeseada((prev) => prev + 1);
              }
            }}
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              background: "#ffffff",
              color: "#111827",
              fontSize: "20px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            +
          </button>
        </div>

        {/* ================= VER MÁS ================= */}

        {prod.description && (
          <div style={{ marginBottom: "10px" }}>
            <button
              type="button"
              onClick={verProducto}
              style={{
                background: "#f3f4f6",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 12px",
                color: "#374151",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              Ver más →
            </button>
          </div>
        )}

        {/* ================= AGREGAR AL CARRITO ================= */}

        <button
          type="button"
          disabled={stockSeleccionado <= 0}
          onClick={() => {
            if (!colorElegido || !tallaElegida) {
              alert(
                "⚠️ Por favor, selecciona un Color y una Talla antes de agregar al carrito.",
              );
              return;
            }

            if (stockSeleccionado <= 0) {
              alert("❌ Esta combinación de color y talla está agotada.");
              return;
            }

            if (cantidadDeseada > stockSeleccionado) {
              alert(
                `❌ Solo hay ${stockSeleccionado} unidades disponibles de esta combinación.`,
              );
              return;
            }

            const precioOriginal = Number(prod.price);

            const precioFinal =
              precioOriginal -
              (precioOriginal * Number(prod.descuento || 0)) / 100;

            const productoConVariantes = {
              ...prod,
              id: `${prod.id}-${colorElegido}-${tallaElegida}`,
              color: colorElegido,
              size: tallaElegida,
              cantidad: cantidadDeseada,
              precioOriginal,
              precioFinal,
              price: precioFinal,
            };

            AgregarAlCarrito(productoConVariantes);

            alert(`🛒 Se agregaron ${cantidadDeseada} unidades al carrito.`);
          }}
          style={{
            width: "100%",
            padding: "14px",
            background: stockSeleccionado <= 0 ? "#9ca3af" : "#7c3aed",
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            cursor: stockSeleccionado <= 0 ? "not-allowed" : "pointer",
            fontWeight: "700",
            fontSize: "15px",
            marginTop: "10px",
            boxShadow:
              stockSeleccionado <= 0
                ? "none"
                : "0 4px 12px rgba(124,58,237,.35)",
          }}
        >
          {stockSeleccionado <= 0 ? "Producto agotado" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}

export default TarjetaProducto;
