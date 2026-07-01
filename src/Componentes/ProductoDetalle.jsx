import { useState } from "react";

export default function ProductoDetalle({
  producto,
  volver,
  AgregarAlCarrito,
  formatearPrecio,
}) {
  const [fotoActivaIdx, setFotoActivaIdx] = useState(0);
  const [colorElegido, setColorElegido] = useState("");
  const [tallaElegida, setTallaElegida] = useState("");
  const [cantidad, setCantidad] = useState(1);

  if (!producto) {
    return <h2>Producto no encontrado.</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "30px auto",
        padding: "20px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <button
        onClick={volver}
        style={{
          marginBottom: "20px",
          padding: "10px 18px",
          border: "none",
          background: "#111827",
          color: "#fff",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        ← Volver
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 8px 25px rgba(0,0,0,.08)",
        }}
      >
        {/* Imagen */}
        <div>
          <img
            src={producto.image.split(",")[fotoActivaIdx].trim()}
            alt={producto.name}
            style={{
              width: "100%",
              maxHeight: "550px",
              objectFit: "contain",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            {producto.image.split(",").map((img, idx) => (
              <img
                key={idx}
                src={img.trim()}
                alt={`Vista ${idx + 1}`}
                onClick={() => setFotoActivaIdx(idx)}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "contain",
                  cursor: "pointer",
                  border:
                    fotoActivaIdx === idx
                      ? "2px solid #7c3aed"
                      : "1px solid #d1d5db",
                  borderRadius: "8px",
                  padding: "5px",
                  background: "#ffffff",
                  transition: "0.2s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Información */}
        <div>
          <h1
            style={{
              fontSize: "40px",
              fontWeight: "700",
              color: "#111827",
              lineHeight: "1.2",
              marginBottom: "25px",
            }}
          >
            {producto.name}
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "18px",
              marginBottom: "30px",
            }}
          >
            Marca: <strong>{producto.marca}</strong>
          </p>

          <h2
            style={{
              color: "#7c3aed",
              fontSize: "34px",
              fontWeight: "700",
              marginBottom: "35px",
            }}
          >
            {formatearPrecio(Number(producto.price))}
          </h2>

          {/* Selector de Color */}

          <div style={{ marginBottom: "30px" }}>
            <h3
              style={{
                fontSize: "18px",
                color: "#111827",
                marginBottom: "15px",
              }}
            >
              Color
            </h3>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {producto.color &&
                producto.color.split(",").map((col, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="color-btn"
                    onClick={() => {
                      const color = col.trim();

                      setColorElegido(color);

                      setFotoActivaIdx(idx);
                    }}
                    style={{
                      color:
                        colorElegido === col.trim() ? "#5b21b6" : "#374151",

                      padding: "10px 18px",

                      display: "flex",

                      alignItems: "center",

                      borderRadius: "22px",

                      border:
                        colorElegido === col.trim()
                          ? "2px solid #7c3aed"
                          : "1px solid #d1d5db",

                      background:
                        colorElegido === col.trim() ? "#ede9fe" : "#ffffff",

                      cursor: "pointer",

                      fontSize: "14px",

                      fontWeight: "600",

                      transition: "all .25s ease",
                    }}
                  >
                    <span
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        marginRight: "8px",
                        border: "1px solid #d1d5db",

                        background:
                          col.trim().toLowerCase().includes("black") ||
                          col.trim().toLowerCase().includes("negro")
                            ? "#000"
                            : col.trim().toLowerCase().includes("white") ||
                                col.trim().toLowerCase().includes("blanco")
                              ? "#fff"
                              : col.trim().toLowerCase().includes("red") ||
                                  col.trim().toLowerCase().includes("rojo")
                                ? "#ef4444"
                                : col.trim().toLowerCase().includes("blue") ||
                                    col.trim().toLowerCase().includes("azul")
                                  ? "#2563eb"
                                  : col
                                        .trim()
                                        .toLowerCase()
                                        .includes("green") ||
                                      col.trim().toLowerCase().includes("verde")
                                    ? "#22c55e"
                                    : "#9ca3af",
                      }}
                    />

                    {col.trim()}
                  </button>
                ))}
            </div>
          </div>
          {/* Selector de Talla */}

          <div style={{ marginBottom: "30px" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "15px",
                textAlign: "center",
              }}
            >
              Talla
            </h3>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {producto.size &&
                producto.size.split(",").map((talla, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTallaElegida(talla.trim())}
                    style={{
                      minWidth: "58px",
                      height: "48px",
                      textTransform: "uppercase",
                      borderRadius: "12px",

                      border:
                        tallaElegida === talla.trim()
                          ? "2px solid #7c3aed"
                          : "1px solid #d1d5db",

                      background:
                        tallaElegida === talla.trim() ? "#ede9fe" : "#ffffff",

                      color:
                        tallaElegida === talla.trim() ? "#5b21b6" : "#374151",

                      fontWeight: "700",

                      cursor: "pointer",

                      transition: ".25s",
                    }}
                  >
                    {talla.trim()}
                  </button>
                ))}
            </div>
          </div>
          {/* Selector de Cantidad */}
          <div
            style={{
              marginBottom: "35px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "15px",
              }}
            >
              Cantidad
            </h3>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                border: "1px solid #d1d5db",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#fff",
              }}
            >
              <button
                onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
                style={{
                  width: "50px",
                  height: "50px",
                  border: "none",
                  background: "#f3f4f6",
                  cursor: "pointer",
                  fontSize: "22px",
                  fontWeight: "700",
                }}
              >
                −
              </button>

              <div
                style={{
                  width: "60px",
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                {cantidad}
              </div>

              <button
                onClick={() => setCantidad((prev) => prev + 1)}
                style={{
                  width: "50px",
                  height: "50px",
                  border: "none",
                  background: "#f3f4f6",
                  cursor: "pointer",
                  fontSize: "22px",
                  fontWeight: "700",
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
