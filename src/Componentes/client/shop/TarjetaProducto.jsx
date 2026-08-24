import { useState } from "react";
import SelectorColor from "./SelectorColor";
import SelectorTalla from "./SelectorTalla";

function TarjetaProducto({
  prod,
  AgregarAlCarrito,
  formatearPrecio,
  verProducto,
}) {
  const [fotoActivaIdx, setFotoActivaIdx] = useState(0);
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
    : Number(prod.stock ?? 0);

  const precioOriginal = Number(prod.price);

  const precioFinal =
    precioOriginal - (precioOriginal * Number(prod.descuento || 0)) / 100;

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "22px",
        overflow: "hidden",
        boxShadow: "0 10px 35px rgba(0,0,0,.08)",
        transition: "all .30s ease",
        border: "1px solid #eef2f7",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "20px",
      }}
    >
      {/* FAVORITO */}
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

      {/* IMAGEN */}
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
            background: "#fff",
            transition: ".3s",
          }}
        />
      ) : (
        <div style={{ color: "#94a3b8", fontSize: "13px" }}></div>
      )}

      {/* PROMOCIÓN */}
      {prod.promocion && (
        <div
          style={{
            background: "#dc2626",
            color: "white",
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

      {/* NOMBRE */}
      <h3>{prod.name}</h3>

      {/* MARCA */}
      <div
        style={{
          fontSize: "14px",
          fontWeight: "700",
          color: "#374151",
          marginBottom: "12px",
        }}
      >
        🏷️ {prod.marca}
      </div>

      {/* COLOR */}
      <SelectorColor
        colores={prod.color ? prod.color.split(",") : []}
        colorElegido={colorElegido}
        setColorElegido={setColorElegido}
        setFotoActivaIdx={setFotoActivaIdx}
      />

      {/* TALLA */}
      <SelectorTalla
        prod={prod}
        colorElegido={colorElegido}
        tallaElegida={tallaElegida}
        setTallaElegida={setTallaElegida}
      />

      {/* GÉNERO */}
      <p>
        Género: <strong>{prod.gender || "Unisex"}</strong>
      </p>

      {/* PRECIO */}
      <div style={{ marginBottom: "10px" }}>
        {Number(prod.descuento) > 0 ? (
          <>
            <div
              style={{
                color: "#9ca3af",
                textDecoration: "line-through",
                fontSize: "16px",
                marginBottom: "5px",
              }}
            >
              {formatearPrecio(precioOriginal)}
            </div>

            <div
              style={{
                color: "#7c3aed",
                fontSize: "30px",
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
              fontSize: "30px",
              fontWeight: "800",
            }}
          >
            {formatearPrecio(precioOriginal)}
          </div>
        )}
      </div>

      {/* STOCK Y CANTIDAD */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <div>
          <div
            style={{
              color: "#6b7280",
              fontSize: "13px",
            }}
          >
            {stockSeleccionado} unidades disponibles
          </div>
        </div>

        <button
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
          type="button"
          onClick={() =>
            setCantidadDeseada((prev) => (prev > 1 ? prev - 1 : 1))
          }
        >
          -
        </button>

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
          type="button"
          onClick={() => {
            if (cantidadDeseada < stockSeleccionado) {
              setCantidadDeseada((prev) => prev + 1);
            }
          }}
        >
          +
        </button>
      </div>

      {/* VER PRODUCTO */}
      {prod.description && (
        <div style={{ marginBottom: "10px" }}>
          <button
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

      {/* AGREGAR AL CARRITO */}
      <button
        disabled={stockSeleccionado <= 0}
        onClick={() => {
          if (!colorElegido || !tallaElegida) {
            alert(
              "⚠️ Por favor, selecciona un Color y una Talla antes de agregar al carrito.",
            );
            return;
          }

          const varianteSeleccionada = prod.variantes?.find(
            (variante) =>
              variante.color?.trim().toLowerCase() ===
                colorElegido?.trim().toLowerCase() &&
              variante.talla?.trim().toLowerCase() ===
                tallaElegida?.trim().toLowerCase(),
          );

          const stock = varianteSeleccionada
            ? Number(varianteSeleccionada.stock || 0)
            : Number(prod.stock || 0);

          if (stock <= 0) {
            alert(
              `❌ No puedes agregar "${prod.name}" porque la combinación ${colorElegido} / ${tallaElegida} está agotada.`,
            );
            return;
          }

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
              : "0 4px 12px rgba(124, 58, 237, 0.35)",
        }}
      >
        {stockSeleccionado <= 0 ? "Producto agotado" : "Agregar al carrito"}
      </button>
    </div>
  );
}

export default TarjetaProducto;
