import { useState } from "react";

function ClientView({
  products,
  cart,
  categories,
  AgregarAlCarrito,
  eliminarDelCarrito,
  aumentarCantidad,
  disminuirCantidad,
  finalizarCompra,
  vaciarCarrito,
  formatearPrecio,
  nequiNumero,
  nequiQR,
}) {
  const [nombreComprador, setNombreComprador] = useState("");
  const [resetTrigger, setResetTrigger] = useState(0);
  const [cedulaComprador, setCedulaComprador] = useState("");
  const [telefonoComprador, setTelefonoComprador] = useState("");
  const [direccionComprador, setDireccionComprador] = useState("");
  const [correo, setCorreo] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [generoSeleccionado, setGeneroSeleccionado] = useState("todos");

  const productosFiltrados = products.filter((prod) => {
    const pasaCategoria =
      categoriaSeleccionada === "todos" ||
      prod.category === categoriaSeleccionada;
    const pasaGenero =
      generoSeleccionado === "todos" || prod.gender === generoSeleccionado;
    return pasaCategoria && pasaGenero;
  });

  return (
    <>
      <h1>Catálogo de la Tienda</h1>

      <div
        style={{
          background: "#ffffff",
          borderBottom: "2px solid #000000",
          padding: "15px 0px",
          marginBottom: "30px",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <strong style={{ marginRight: "10px" }}>Sección:</strong>
          <button
            onClick={() => setGeneroSeleccionado("todos")}
            style={{
              padding: "8px 20px",
              cursor: "pointer",
              border: "none",
              background: "none",
              fontSize: "14px",
              textTransform: "uppercase", // Pone el texto en mayúsculas solo
              color: "#000000",
              // Si está seleccionado le pone una línea negra abajo, si no, es invisible 👇
              borderBottom:
                generoSeleccionado === "todos"
                  ? "3px solid #000000"
                  : "3px solid transparent",
              fontWeight: generoSeleccionado === "todos" ? "700" : "500",
            }}
          >
            🛍️ Todo Público
          </button>
          <button
            onClick={() => setGeneroSeleccionado("Hombre")}
            style={{
              padding: "8px 20px",
              cursor: "pointer",
              border: "none",
              background: "none",
              fontSize: "14px",
              textTransform: "uppercase",
              color: "#000000",
              borderBottom:
                generoSeleccionado === "Hombre"
                  ? "3px solid #000000"
                  : "3px solid transparent",
              fontWeight: generoSeleccionado === "Hombre" ? "700" : "500",
            }}
          >
            👨 Hombre
          </button>
          <button
            onClick={() => setGeneroSeleccionado("Mujer")}
            style={{
              padding: "8px 20px",
              cursor: "pointer",
              border: "none",
              background: "none",
              fontSize: "14px",
              textTransform: "uppercase",
              color: "#000000",
              borderBottom:
                generoSeleccionado === "Mujer"
                  ? "3px solid #000000"
                  : "3px solid transparent",
              fontWeight: generoSeleccionado === "Mujer" ? "700" : "500",
            }}
          >
            👩 Mujer
          </button>
          <button
            onClick={() => setGeneroSeleccionado("Niño")}
            style={{
              padding: "8px 20px",
              cursor: "pointer",
              border: "none",
              background: "none",
              fontSize: "14px",
              textTransform: "uppercase",
              color: "#000000",
              borderBottom:
                generoSeleccionado === "Niño"
                  ? "3px solid #000000"
                  : "3px solid transparent",
              fontWeight: generoSeleccionado === "Niño" ? "700" : "500",
            }}
          >
            👦 Niño
          </button>
          <button
            onClick={() => setGeneroSeleccionado("Niña")}
            style={{
              padding: "8px 20px",
              cursor: "pointer",
              border: "none",
              background: "none",
              fontSize: "14px",
              textTransform: "uppercase",
              color: "#000000",
              borderBottom:
                generoSeleccionado === "Niña"
                  ? "3px solid #000000"
                  : "3px solid transparent",
              fontWeight: generoSeleccionado === "Niña" ? "700" : "500",
            }}
          >
            👧 Niña
          </button>
        </div>

        <div>
          <strong style={{ marginRight: "10px" }}>Prenda:</strong>
          <button
            onClick={() => setCategoriaSeleccionada("todos")}
            style={{
              margin: "0 5px",
              fontWeight: categoriaSeleccionada === "todos" ? "bold" : "normal",
            }}
          >
            ✨ Ver Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaSeleccionada(cat.id)}
              style={{
                padding: "8px 18px",
                cursor: "pointer",
                border: "1px solid #cbd5e1", // Borde gris delgado
                borderRadius: "0px", // 🚨 CLAVE PUMA: Bordes rectos sin curvas
                fontSize: "13px",
                fontWeight: "600",
                textTransform: "uppercase",
                // Si está seleccionado se vuelve negro con letras blancas, si no, al revés 👇
                background:
                  categoriaSeleccionada === "todos" ? "#000000" : "#ffffff",
                color:
                  categoriaSeleccionada === "todos" ? "#ffffff" : "#000000",
                transition: "all 0.15s ease",
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "block" }}>
        {productosFiltrados.length === 0 ? (
          <p style={{ color: "gray", fontStyle: "italic" }}>
            No hay artículos registrados que coincidan con esta búsqueda.
          </p>
        ) : (
          productosFiltrados.map((prod) => (
            <TarjetaProducto
              key={`${prod.id}-${resetTrigger}`}
              prod={prod}
              AgregarAlCarrito={AgregarAlCarrito}
              formatearPrecio={formatearPrecio}
            />
          ))
        )}
      </div>

      <h2>Tu carrito de Compra</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px dashed gray",
                padding: "10px",
                margin: "5px 0",
              }}
            >
              <h4>
                [{item.id}] - {item.name}
              </h4>
              <p>
                Precio Unitario: {formatearPrecio(Number(item.price))} | Talla:{" "}
                {item.size}
              </p>
              <p>
                Cantidad:
                <button onClick={() => disminuirCantidad(item.id)}> - </button>
                <strong style={{ margin: "0 10px" }}>{item.cantidad}</strong>
                <button onClick={() => aumentarCantidad(item.id)}> + </button>
              </p>
              <button
                onClick={() => eliminarDelCarrito(item.id)}
                style={{ color: "red", cursor: "pointer" }}
              >
                🗑️ Quitar
              </button>
            </div>
          ))}

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#f9f9f9",
              border: "1px solid #ccc",
            }}
          >
            <h3>Datos de Envío y Facturación</h3>
            <label htmlFor="txt-cliente-nombre">Nombre Completo: </label>
            <input
              id="txt-cliente-nombre"
              type="text"
              value={nombreComprador}
              onChange={(e) => setNombreComprador(e.target.value)}
            />
            <br />
            <br />
            <label htmlFor="txt-cliente-cedula">Cédula: </label>
            <input
              id="txt-cliente-cedula"
              type="text"
              value={cedulaComprador}
              onChange={(e) => setCedulaComprador(e.target.value)}
            />
            <br />
            <br />
            <label htmlFor="txt-cliente-telefono">Teléfono: </label>
            <input
              id="txt-cliente-telefono"
              type="text"
              value={telefonoComprador}
              onChange={(e) => setTelefonoComprador(e.target.value)}
            />
            <br />
            <br />
            <label htmlFor="txt-cliente-direccion">Dirección de Envío: </label>
            <input
              id="txt-cliente-direccion"
              type="text"
              style={{ width: "300px" }}
              value={direccionComprador}
              onChange={(e) => setDireccionComprador(e.target.value)}
            />
            <br />
            <br />
            <label htmlFor="email">correo electronico</label>

            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

            <br />
            <br />
            <div
              style={{
                padding: "10px",
                background: "#fff",
                border: "1px solid #ddd",
              }}
            >
              <label htmlFor="select-pago" style={{ fontWeight: "bold" }}>
                Método de Pago:{" "}
              </label>
              <select
                id="select-pago"
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
              >
                <option value="">-- Elige un método --</option>
                <option value="Nequi">Nequi</option>
                <option value="Breve">Breve</option>
                <option value="Contraentrega">Pago Contraentrega</option>
              </select>
            </div>

            {/* 👇 PASO 1: PASARELA DINÁMICA DE PAGOS LOCALES COLOMBIANOS */}
            {metodoPago && metodoPago !== "Contraentrega" && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "20px",
                  background: "#f8fafc",
                  border: "2px solid #000000", // Estilo recto minimalista Puma
                  fontFamily: "sans-serif",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 15px 0",
                    textTransform: "uppercase",
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                  }}
                >
                  📱 Instrucciones de Pago Electrónico Seguro
                </h4>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  {/* 📷 CONTENEDOR DEL CÓDIGO QR DE TU NEGOCIO */}
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      background: "#ffffff",
                      border: "1px solid #cbd5e1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Aquí pones un QR real de tu Nequi cuando lances la app a internet. Por ahora ponemos un marcador visual */}
                    <div style={{ textAlign: "center", padding: "5px" }}>
                      <img
                        // 👇 REEMPLAZA EL COMPORTAMIENTO DEL SRC POR ESTAS DOS URLS REALES VERIFICADAS:
                        src={nequiQR}
                        alt={metodoPago}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          padding: "8px",
                        }}
                      />
                    </div>
                  </div>

                  {/* 📝 DATOS TÉCNICOS DE TRANSFERENCIA */}
                  <div style={{ flex: "1 1 200px" }}>
                    <p style={{ margin: "0 0 8px 0", fontSize: "13px" }}>
                      Titular: <strong>TIENDA PUMA PREMIUM S.A.S</strong>
                    </p>
                    <p style={{ margin: "0 0 8px 0", fontSize: "13px" }}>
                      Celular Cuenta:{" "}
                      <strong style={{ color: "#000000", fontSize: "15px" }}>
                        {nequiNumero}{" "}
                      </strong>
                    </p>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "12px",
                        color: "#64748b",
                        fontStyle: "italic",
                      }}
                    >
                      💡 Escanea el código QR desde tu app de {metodoPago} o
                      transfiere directamente al número de celular. Una vez
                      realizado el pago, confirma tu pedido abajo.
                    </p>
                  </div>
                </div>

                {/* BOTÓN INTERACTIVO COMPLEMENTARIO PARA CELULARES */}
                <button
                  type="button"
                  onClick={() => {
                    if (metodoPago === "Nequi") {
                      window.open("https://nequi.com.co", "_blank"); // Enlace simulado que abre pasarela o app
                    } else {
                      alert(
                        "Abre la app de tu banco y transfiere al número de celular de arriba.",
                      );
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "15px",
                    background: "#ffffff",
                    color: "#000000",
                    border: "1px solid #000000",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  🚀 Abrir Plataforma {metodoPago} en Celular
                </button>
              </div>
            )}

            <div style={{ marginTop: "15px" }}>
              {/* 👇 BOTÓN VERDE CORREGIDO: YA NO TIENE WINDOW.OPEN NI MENSAJES DE WHATSAPP */}
              <button
                onClick={() => {
                  if (
                    !nombreComprador.trim() ||
                    !cedulaComprador.trim() ||
                    !telefonoComprador.trim() ||
                    !direccionComprador.trim() ||
                    !metodoPago
                  ) {
                    alert("Por favor, rellene todos los campos.");
                    return;
                  }

                  // Se ejecuta el guardado directo en la base de datos de Shop.jsx de inmediato
                  finalizarCompra(
                    nombreComprador,
                    cedulaComprador,
                    telefonoComprador,
                    direccionComprador,
                    metodoPago,
                  );
                  setResetTrigger((prev) => prev + 1);

                  // Blanqueamos los inputs del comprador localmente
                  setNombreComprador("");
                  setCedulaComprador("");
                  setTelefonoComprador("");
                  setDireccionComprador("");
                  setMetodoPago("");
                }}
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  cursor: "pointer",
                  background: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                ✅ Finalizar Compra
              </button>

              <button
                onClick={vaciarCarrito}
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  cursor: "pointer",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: "bold",
                }}
              >
                ❌ Cancelar Compra y Vaciar Carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TarjetaProducto({ prod, AgregarAlCarrito, formatearPrecio }) {
  const [verDescripcion, setVerDescripcion] = useState(false);
  const [fotoActivaIdx, setFotoActivaIdx] = useState(0);
  // Por defecto muestra la primera foto (posición 0)
  const [mensajeTalla, setMensajeTalla] = useState("");
  const [colorElegido, setColorElegido] = useState("");
  const [tallaElegida, setTallaElegida] = useState("");
  const [cantidadDeseada, setCantidadDeseada] = useState(1);

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "10px",
        width: "220px",
        display: "inline-block",
        verticalAlign: "top",
      }}
    >
      {prod.image ? (
        <img
          // Rompe el texto por comas y toma la foto correspondiente al color seleccionado 👇
          src={
            prod.image.split(",")[fotoActivaIdx]
              ? prod.image.split(",")[fotoActivaIdx].trim()
              : prod.image.split(",")[0].trim()
          }
          alt={prod.name}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ) : (
        <div style={{ color: "#94a3b8", fontSize: "13px" }}></div>
      )}
      <h3>{prod.name}</h3>

      {prod.description && (
        <div style={{ marginBottom: "10px" }}>
          <button
            onClick={() => setVerDescripcion(!verDescripcion)}
            style={{
              background: "none",
              border: "none",
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
              padding: "0",
              fontSize: "13px",
            }}
          >
            {verDescripcion
              ? "🔼 Ocultar descripción"
              : "👁️ Ver descripción persuasiva"}
          </button>
          {verDescripcion && (
            <p
              style={{
                fontStyle: "italic",
                color: "#475569",
                fontSize: "13px",
                background: "#f8fafc",
                padding: "8px",
                borderRadius: "4px",
                marginTop: "5px",
                border: "1px solid #e2e8f0",
              }}
            >
              📢 {prod.description}
            </p>
          )}
        </div>
      )}

      <p>Marca: {prod.marca}</p>
      <div>
        <label
          style={{
            fontSize: "12px",
            fontWeight: "700",
            color: "#767676",
            display: "block",
            marginBottom: "3px",
          }}
        >
          COLOR:
        </label>

        <select
          style={{
            width: "100%",
            padding: "5px",
            border: "1px solid #cbd5e1",
            borderRadius: "0px",
            fontSize: "13px",
          }}
          onChange={(e) => {
            setColorElegido(e.target.value);

            // Conectamos la lógica para que cambie la foto según el color elegido 👇
            const idxSeleccionado = prod.color
              .split(",")
              .map((c) => c.trim())
              .indexOf(e.target.value);
            if (idxSeleccionado !== -1) {
              setFotoActivaIdx(idxSeleccionado);
            }
          }}
        >
          <option value="">-- Elige Color --</option>
          {prod.color ? (
            prod.color.split(",").map((col, idx) => (
              <option key={idx} value={col.trim()}>
                {col.trim()}
              </option>
            ))
          ) : (
            <option value="Estándar">Estándar</option>
          )}
        </select>
      </div>
      <div>
        <label
          style={{
            fontSize: "12px",
            fontWeight: "700",
            color: "#767676",
            display: "block",
            marginBottom: "3px",
          }}
        >
          TALLA:
        </label>
        <select
          style={{
            width: "100%",
            padding: "5px",
            border: "1px solid #cbd5e1",
            borderRadius: "0px",
            fontSize: "13px",
            background: "#ffffff", // Fondo blanco puro
            color: "#000000", // 🚨 ¡LÍNEA CLAVE!: Obliga a que la opción elegida se pinte en negro nítido
          }}
          onChange={(e) => {
            const tallaElegida = e.target.value;
            setTallaElegida(tallaElegida); // Guardamos en memoria

            if (!tallaElegida) {
              setMensajeTalla("");
              return;
            }

            if (tallaElegida === "38") {
              setMensajeTalla("❌ Esta talla se encuentra agotada en bodega.");
            } else {
              setMensajeTalla("✅ ¡Talla disponible para despacho inmediato!");
            }
          }}
        >
          <option value="" style={{ color: "#000000", background: "#ffffff" }}>
            -- Elige Talla --
          </option>
          {prod.category === "shoes" ? (
            prod.size &&
            prod.size.split(",").map((tal, idx) => (
              <option
                key={idx}
                value={tal.trim()}
                style={{ color: "#000000" }} // 👈 AQUÍ FORZAMOS EL COLOR NEGRO
              >
                {tal.trim()}
              </option>
            ))
          ) : prod.marca ? (
            prod.marca.split(",").map((tal, idx) => (
              <option
                key={idx}
                value={tal.trim()}
                style={{ color: "#000000" }} // 👈 AQUÍ TAMBIÉN FORZAMOS EL COLOR NEGRO
              >
                {tal.trim()}
              </option>
            ))
          ) : (
            <option value="Única" style={{ color: "#000000" }}>
              Única
            </option>
          )}
        </select>
      </div>
      {mensajeTalla && (
        <p
          style={{
            margin: "8px 0 0 0",
            fontSize: "12px",
            fontWeight: "600",
            color: mensajeTalla.includes("❌") ? "#ef4444" : "#10b981",
            background: mensajeTalla.includes("❌") ? "#fef2f2" : "#f0fdf4",
            padding: "6px",
            borderLeft: mensajeTalla.includes("❌")
              ? "3px solid #ef4444"
              : "3px solid #10b981",
          }}
        >
          {mensajeTalla}
        </p>
      )}
      <p>
        Género: <strong>{prod.gender || "Unisex"}</strong>
      </p>
      <p style={{ fontWeight: "bold" }}>
        Precio: {formatearPrecio(Number(prod.price))}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <button
          type="button"
          onClick={() =>
            setCantidadDeseada((prev) => (prev > 1 ? prev - 1 : 1))
          }
        >
          -
        </button>

        <strong>{cantidadDeseada}</strong>

        <button
          type="button"
          onClick={() => setCantidadDeseada((prev) => prev + 1)}
        >
          +
        </button>
      </div>

      <button
        onClick={() => {
          // 1. Candado de seguridad: No deja avanzar si el cliente olvidó elegir talla o color
          if (!colorElegido || !tallaElegida) {
            alert(
              "⚠️ Por favor, selecciona un Color y una Talla antes de agregar al carrito.",
            );
            return;
          }

          // 2. Candado logístico: Si la talla seleccionada es la 38 (agotada), bloquea la compra
          if (tallaElegida === "38") {
            alert(
              "❌ No puedes agregar este artículo porque la talla seleccionada está agotada.",
            );
            return;
          }

          // 3. Empaquetado comercial: Clonamos el producto inyectándole la talla y color exactos que eligió
          const productoConVariantes = {
            ...prod,
            id: `${prod.id}-${colorElegido}-${tallaElegida}`,
            color: colorElegido,
            size: tallaElegida,
            cantidad: cantidadDeseada,
          };

          // 4. Despachamos el paquete modificado al carrito general de la tienda
          AgregarAlCarrito(productoConVariantes);
          alert(
            "🛒 ¡Artículo agregado al carrito con tu talla y color favoritos!",
          );
        }}
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default ClientView;
