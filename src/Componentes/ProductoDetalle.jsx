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
              fontSize: "48px",
              fontWeight: "700",
              marginBottom: "35px",
            }}
          >
            {formatearPrecio(Number(producto.price))}
          </h2>
        </div>
      </div>
    </div>
  );
}
