import { useState } from "react";

export default function ProductoDetalle({
  producto,
  products,
  seleccionarProducto,

  volver,
  AgregarAlCarrito,
  formatearPrecio,
}) {
  const [fotoActivaIdx, setFotoActivaIdx] = useState(0);
  const [colorElegido, setColorElegido] = useState("");
  const [tallaElegida, setTallaElegida] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
  const [mostrarEspecificaciones, setMostrarEspecificaciones] = useState(false);
  const obtenerEstadoStock = (stock) => {
    const cantidad = Number(stock);

    if (cantidad <= 0) {
      return {
        texto: "🔴 Agotado",
        color: "#dc2626",
      };
    }

    if (cantidad <= 5) {
      return {
        texto: "🟡 Últimas unidades",
        color: "#f59e0b",
      };
    }

    return {
      texto: "🟢 Disponible",
      color: "#16a34a",
    };
  };

  // ✅ AQUÍ AFUERA
  const estadoStock = obtenerEstadoStock(producto.stock);

  // ✅ AQUÍ AFUERA
  const compartirProducto = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: producto.name,
          text: `Mira este producto: ${producto.name}`,
          url,
        });
      } catch (error) {
        console.log("Compartir cancelado");
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("✅ Enlace copiado al portapapeles.");
      } catch {
        alert("❌ No fue posible copiar el enlace.");
      }
    }
  };

  if (!producto) {
    return <h2>Producto no encontrado.</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "20px auto",
        padding: "15px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <button
        onClick={volver}
        style={{
          marginBottom: "15px",
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
          gap: "25px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "20px",
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
              marginTop: "15px",
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
              marginBottom: "10px",
            }}
          >
            {producto.name}
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                color: "#fbbf24",
                fontSize: "20px",
                letterSpacing: "2px",
              }}
            >
              ★★★★★
            </span>

            <span
              style={{
                fontSize: "15px",
                color: "#374151",
                fontWeight: "600",
              }}
            >
              4.8
            </span>

            <span
              style={{
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              (128 opiniones)
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "25px",
            }}
          >
            <button
              onClick={compartirProducto}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                border: "1px solid #d1d5db",
                borderRadius: "10px",
                background: "#ffffff",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "600",
                color: "#374151",
                transition: ".25s",
              }}
            >
              🔗 Compartir
            </button>
          </div>

          <p
            style={{
              color: "#6b7280",
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            Marca: <strong>{producto.marca}</strong>
          </p>

          <h2
            style={{
              color: "#7c3aed",
              fontSize: "34px",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            {formatearPrecio(Number(producto.price))}
          </h2>

          <div style={{ marginBottom: "10px" }}>
            <p
              style={{
                color: estadoStock.color,
                fontWeight: "700",
                fontSize: "18px",
                marginBottom: "5px",
              }}
            >
              {estadoStock.texto}
            </p>

            <p
              style={{
                color: "#6b7280",
                fontSize: "15px",
              }}
            >
              {producto.stock} unidades disponibles
            </p>
          </div>

          {/* Selector de Color */}

          <div style={{ marginBottom: "10px" }}>
            <h3
              style={{
                fontSize: "18px",
                color: "#111827",
                marginBottom: "8px",
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

                      padding: "10px 10px",

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

                      fontSize: "12px",

                      fontWeight: "600",

                      transition: "all .25s ease",
                    }}
                  >
                    <span
                      style={{
                        width: "16px",
                        height: "15px",
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

          <div style={{ marginBottom: "15px" }}>
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
                gap: "10px",
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
              marginTop: "15px",
              marginBottom: "20px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "10px",
              }}
            >
              Cantidad
            </h3>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "170px",
                border: "1px solid #d1d5db",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#ffffff",
              }}
            >
              <button
                onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
                style={{
                  width: "55px",
                  height: "40px",
                  border: "none",
                  background: "#f5f3ff",
                  color: "#7c3aed",
                  cursor: "pointer",
                  fontSize: "24px",
                  fontWeight: "700",
                  transition: "0.25s",
                }}
              >
                −
              </button>

              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "black",
                }}
              >
                {cantidad}
              </div>

              <button
                onClick={() =>
                  setCantidad((prev) =>
                    Math.min(Number(producto.stock), prev + 1),
                  )
                }
                style={{
                  width: "55px",
                  height: "45px",
                  border: "none",
                  background: "#f5f3ff",
                  color: "#7c3aed",
                  cursor: "pointer",
                  fontSize: "24px",
                  fontWeight: "700",
                  transition: "0.25s",
                }}
              >
                +
              </button>
            </div>
          </div>
          <button
            disabled={Number(producto.stock) <= 0}
            onClick={() => {
              if (!colorElegido || !tallaElegida) {
                alert("⚠️ Por favor selecciona un color y una talla.");
                return;
              }

              if (Number(producto.stock) <= 0) {
                alert("❌ Este producto está agotado.");
                return;
              }

              AgregarAlCarrito({
                ...producto,
                color: colorElegido,
                talla: tallaElegida,
                cantidad,
              });

              alert("✅ Producto agregado al carrito.");
            }}
            style={{
              width: "100%",
              marginTop: "12px",
              padding: "15px",
              border: "none",
              borderRadius: "14px",
              background: Number(producto.stock) <= 0 ? "#9ca3af" : "#7c3aed",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "700",
              cursor: Number(producto.stock) <= 0 ? "not-allowed" : "pointer",
              transition: ".25s",
            }}
          >
            {Number(producto.stock) <= 0
              ? "Producto agotado"
              : "Agregar al carrito"}
          </button>

          <div
            style={{
              marginTop: "25px",
              marginBottom: "25px",
              background: "#fafafa",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "18px",
            }}
          >
            {/* Envío */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
              <span style={{ fontSize: "22px" }}>🚚</span>

              <div>
                <div
                  style={{
                    fontWeight: "700",
                    color: "#111827",
                  }}
                >
                  Envío gratis
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                  }}
                >
                  Compras superiores a $150.000
                </div>
              </div>
            </div>

            {/* Tiempo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
              <span style={{ fontSize: "22px" }}>📦</span>

              <div>
                <div
                  style={{
                    fontWeight: "700",
                    color: "#111827",
                  }}
                >
                  Entrega estimada
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                  }}
                >
                  2 a 5 días hábiles
                </div>
              </div>
            </div>

            {/* Compra segura */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{ fontSize: "22px" }}>🔒</span>

              <div>
                <div
                  style={{
                    fontWeight: "700",
                    color: "#111827",
                  }}
                >
                  Compra segura
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                  }}
                >
                  Pago protegido y garantía de satisfacción.
                </div>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div
            style={{
              marginTop: "12px",
              borderTop: "1px solid #e5e7eb",
              paddingTop: "10px",
            }}
          >
            <div
              onClick={() => setMostrarDescripcion(!mostrarDescripcion)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                padding: "10px 0",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                📄 Descripción
              </h3>

              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#7c3aed",
                }}
              >
                {mostrarDescripcion ? "▲" : "▼"}
              </span>
            </div>

            {mostrarDescripcion && (
              <div
                style={{
                  marginTop: "13px",
                  padding: "15px",
                  background: "#f9fafb",
                  borderRadius: "12px",
                  color: "#4b5563",
                  lineHeight: "1.8",
                }}
              >
                {producto.description}
              </div>
            )}
            {/* Especificaciones */}

            <div
              style={{
                marginTop: "15px",
                borderTop: "1px solid #e5e7eb",
                paddingTop: "15px",
              }}
            >
              <div
                onClick={() =>
                  setMostrarEspecificaciones(!mostrarEspecificaciones)
                }
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "10px 0",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#111827",
                  }}
                >
                  📋 Especificaciones
                </h3>

                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#7c3aed",
                  }}
                >
                  {mostrarEspecificaciones ? "▲" : "▼"}
                </span>
              </div>

              {mostrarEspecificaciones && (
                <div
                  style={{
                    marginTop: "15px",
                    padding: "22px",
                    background: "#f9fafb",
                    borderRadius: "15px",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            padding: "10px",
                            fontWeight: "700",
                            color: "#374151",
                            width: "40%",
                          }}
                        >
                          Marca
                        </td>

                        <td
                          style={{
                            padding: "10px",
                            color: "#6b7280",
                          }}
                        >
                          {producto.marca}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            padding: "10px",
                            fontWeight: "700",
                            color: "#374151",
                          }}
                        >
                          Categoría
                        </td>

                        <td
                          style={{
                            padding: "10px",
                            color: "#6b7280",
                          }}
                        >
                          {producto.category}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            padding: "10px",
                            fontWeight: "700",
                            color: "#374151",
                          }}
                        >
                          Género
                        </td>

                        <td
                          style={{
                            padding: "10px",
                            color: "#6b7280",
                          }}
                        >
                          {producto.gender}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            padding: "10px",
                            fontWeight: "700",
                            color: "#374151",
                          }}
                        >
                          Colores
                        </td>

                        <td
                          style={{
                            padding: "10px",
                            color: "#6b7280",
                          }}
                        >
                          {producto.color}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            padding: "10px",
                            fontWeight: "700",
                            color: "#374151",
                          }}
                        >
                          Tallas
                        </td>

                        <td
                          style={{
                            padding: "10px",
                            color: "#6b7280",
                          }}
                        >
                          {producto.size}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          {/* ================= PRODUCTOS RELACIONADOS ================= */}

          <div
            style={{
              marginTop: "50px",
            }}
          >
            <h2
              style={{
                fontSize: "30px",
                fontWeight: "700",
                marginBottom: "25px",
                color: "#111827",
              }}
            >
              También te puede interesar
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
                gap: "20px",
              }}
            >
              {products
                .filter(
                  (item) =>
                    item.id !== producto.id &&
                    item.category === producto.category,
                )
                .slice(0, 4)
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      seleccionarProducto(item);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    style={{
                      background: "#fff",
                      borderRadius: "16px",
                      padding: "15px",
                      boxShadow: "0 5px 18px rgba(0,0,0,.08)",
                      cursor: "pointer",
                      transition: ".25s",
                    }}
                  >
                    <img
                      src={item.image.split(",")[0].trim()}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "contain",
                      }}
                    />

                    <h4
                      style={{
                        marginTop: "12px",
                        fontSize: "18px",
                        color: "#111827",
                      }}
                    >
                      {item.name}
                    </h4>

                    <p
                      style={{
                        color: "#7c3aed",
                        fontWeight: "700",
                        fontSize: "22px",
                      }}
                    >
                      {formatearPrecio(item.price)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
