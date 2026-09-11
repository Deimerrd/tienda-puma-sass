import { useState } from "react";
import "./TarjetaProducto.css";

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

  // =========================================================
  // VARIANTE ACTUAL
  // =========================================================

  const varianteActual = prod.variantes?.find(
    (variante) =>
      variante.color?.trim().toLowerCase() ===
        colorElegido?.trim().toLowerCase() &&
      variante.talla?.trim().toLowerCase() ===
        tallaElegida?.trim().toLowerCase(),
  );

  // null = todavía no se ha seleccionado una combinación
  const stockSeleccionado = varianteActual
    ? Number(varianteActual.stock ?? 0)
    : null;

  // =========================================================
  // PRECIOS
  // =========================================================

  const precioOriginal = Number(prod.price);

  const precioFinal =
    precioOriginal - (precioOriginal * Number(prod.descuento || 0)) / 100;

  // =========================================================
  // COLORES
  // =========================================================

  const colores = prod.color
    ? prod.color.split(",").map((color) => color.trim())
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

    if (nombre.includes("yellow") || nombre.includes("amarillo")) {
      return "#eab308";
    }

    if (nombre.includes("pink") || nombre.includes("rosado")) {
      return "#ec4899";
    }

    if (nombre.includes("purple") || nombre.includes("morado")) {
      return "#8b5cf6";
    }

    if (nombre.includes("orange") || nombre.includes("naranja")) {
      return "#f97316";
    }

    return "#9ca3af";
  };

  // =========================================================
  // TALLAS
  // =========================================================

  const tallas = prod.size
    ? prod.size.split(",").map((talla) => talla.trim())
    : [];

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <article className="tarjeta-producto">
      {/* =====================================================
          FAVORITO
      ====================================================== */}

      <button
        type="button"
        className="tarjeta-favorito"
        aria-label="Agregar a favoritos"
      >
        🤍
      </button>

      {/* =====================================================
          IMAGEN
      ====================================================== */}

      <div className="tarjeta-imagen-contenedor">
        {prod.image ? (
          <img
            src={
              prod.image.split(",")[fotoActivaIdx]
                ? prod.image.split(",")[fotoActivaIdx].trim()
                : prod.image.split(",")[0].trim()
            }
            alt={prod.name}
            className="tarjeta-imagen"
          />
        ) : (
          <div className="tarjeta-sin-imagen">Sin imagen</div>
        )}
      </div>

      {/* =====================================================
          CONTENIDO
      ====================================================== */}

      <div className="tarjeta-contenido">
        {/* PROMOCIÓN */}

        {prod.promocion && (
          <div className="tarjeta-promocion">🔥 {prod.promocion}</div>
        )}

        {/* NOMBRE */}

        <h3 className="tarjeta-nombre">{prod.name}</h3>

        {/* MARCA */}

        <div className="tarjeta-marca">🏷️ {prod.marca}</div>

        {/* =================================================
            COLOR
        ================================================== */}

        <div className="tarjeta-seccion">
          <label className="tarjeta-label">Color</label>

          <div className="tarjeta-colores">
            {colores.length > 0 ? (
              colores.map((col, idx) => {
                const seleccionado =
                  colorElegido.trim().toLowerCase() ===
                  col.trim().toLowerCase();

                return (
                  <button
                    key={idx}
                    type="button"
                    className={`tarjeta-color-btn ${
                      seleccionado ? "activo" : ""
                    }`}
                    onClick={() => {
                      const color = col.trim();

                      setColorElegido(color);
                      setTallaElegida("");
                      setCantidadDeseada(1);
                      setMensajeTalla("");
                      setFotoActivaIdx(idx);
                    }}
                  >
                    <span
                      className="tarjeta-color-circulo"
                      style={{
                        backgroundColor: obtenerColorVisual(col),
                      }}
                    />

                    <span>{col}</span>
                  </button>
                );
              })
            ) : (
              <button type="button" className="tarjeta-color-btn">
                Estándar
              </button>
            )}
          </div>
        </div>

        {/* =================================================
            TALLA
        ================================================== */}

        <div className="tarjeta-seccion">
          <label className="tarjeta-label">Talla</label>

          <select
            value={tallaElegida}
            className="tarjeta-select-talla"
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
            <option value="">-- Elige Talla --</option>

            {tallas.length > 0 ? (
              tallas.map((talla, idx) => (
                <option key={idx} value={talla}>
                  {talla}
                </option>
              ))
            ) : (
              <option value="Única">Única</option>
            )}
          </select>
        </div>

        {/* =================================================
            MENSAJE DE TALLA
        ================================================== */}

        {mensajeTalla && (
          <p
            className={`tarjeta-mensaje-talla ${
              mensajeTalla.includes("❌") ? "agotado" : "disponible"
            }`}
          >
            {mensajeTalla}
          </p>
        )}

        {/* =================================================
            GÉNERO
        ================================================== */}

        <p className="tarjeta-genero">
          Género: <strong>{prod.gender || "Unisex"}</strong>
        </p>

        {/* =================================================
            PRECIO
        ================================================== */}

        <div className="tarjeta-precio-contenedor">
          {Number(prod.descuento) > 0 ? (
            <>
              <div className="tarjeta-precio-original">
                {formatearPrecio(precioOriginal)}
              </div>

              <div className="tarjeta-precio-final">
                {formatearPrecio(precioFinal)}
              </div>

              <div className="tarjeta-descuento">
                {Number(prod.descuento)}% OFF
              </div>
            </>
          ) : (
            <div className="tarjeta-precio-normal">
              {formatearPrecio(precioOriginal)}
            </div>
          )}
        </div>

        {/* =================================================
            STOCK + CANTIDAD
        ================================================== */}

        <div className="tarjeta-cantidad">
          <div className="tarjeta-stock">
            {stockSeleccionado === null
              ? "Selecciona color y talla"
              : `${stockSeleccionado} unidades disponibles`}
          </div>

          <div className="tarjeta-controles">
            <button
              type="button"
              className="tarjeta-cantidad-btn"
              onClick={() =>
                setCantidadDeseada((prev) => (prev > 1 ? prev - 1 : 1))
              }
            >
              -
            </button>

            <span className="tarjeta-cantidad-numero">{cantidadDeseada}</span>

            <button
              type="button"
              className="tarjeta-cantidad-btn"
              onClick={() => {
                if (
                  stockSeleccionado !== null &&
                  cantidadDeseada < stockSeleccionado
                ) {
                  setCantidadDeseada((prev) => prev + 1);
                }
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* =================================================
            VER MÁS
        ================================================== */}

        {prod.description && (
          <button
            type="button"
            className="tarjeta-ver-mas"
            onClick={verProducto}
          >
            Ver más →
          </button>
        )}

        {/* =================================================
            AGREGAR AL CARRITO
        ================================================== */}

        <button
          type="button"
          disabled={stockSeleccionado !== null && stockSeleccionado <= 0}
          className={`tarjeta-carrito-btn ${
            stockSeleccionado !== null && stockSeleccionado <= 0
              ? "agotado"
              : ""
          }`}
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
        >
          {stockSeleccionado !== null && stockSeleccionado <= 0
            ? "Producto agotado"
            : "Agregar al carrito"}
        </button>
      </div>
    </article>
  );
}

export default TarjetaProducto;
