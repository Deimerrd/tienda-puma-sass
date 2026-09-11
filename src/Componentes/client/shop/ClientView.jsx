import { useState } from "react";
import ProductoDetalle from "../producto/ProductoDetalle";
import ProductoBeneficios from "../producto/ProductoBeneficios";
import HeroSlider from "../home/HeroSlider";
import TarjetaProducto from "./TarjetaProducto";
import CategoriasCliente from "./CategoriasCliente";
import FiltroGeneroCliente from "./FiltroGeneroCliente";

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
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [verDetalle, setVerDetalle] = useState(false);

  const productosFiltrados = products.filter((prod) => {
    const pasaCategoria =
      categoriaSeleccionada === "todos" ||
      prod.category === categoriaSeleccionada;
    const pasaGenero =
      generoSeleccionado === "todos" || prod.gender === generoSeleccionado;
    return pasaCategoria && pasaGenero;
  });
  if (verDetalle && productoSeleccionado) {
    return (
      <ProductoDetalle
        producto={productoSeleccionado}
        products={products}
        seleccionarProducto={(prod) => setProductoSeleccionado(prod)}
        volver={() => {
          setVerDetalle(false);
          setProductoSeleccionado(null);
        }}
        AgregarAlCarrito={AgregarAlCarrito}
        formatearPrecio={formatearPrecio}
      />
    );
  }
  return (
    <>
      <div
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
          padding: "20px",
          maxWidth: "1700px",
          margin: "0 auto",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "22px",
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(0,0,0,.08)",
            marginBottom: "30px",
          }}
        >
          <div style={{ marginBottom: "15px" }}>
            <FiltroGeneroCliente
              generoSeleccionado={generoSeleccionado}
              setGeneroSeleccionado={setGeneroSeleccionado}
            />
            {/* ================= SLIDER PRINCIPAL ================= */}
            <HeroSlider />

            {/* ================= BENEFICIOS ================= */}

            <ProductoBeneficios />
            <CategoriasCliente
              categories={categories}
              categoriaSeleccionada={categoriaSeleccionada}
              setCategoriaSeleccionada={setCategoriaSeleccionada}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px,360px))",
            justifyContent: "center",
            gap: "30px",
            marginTop: "30px",
            width: "100%",
          }}
        >
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
                verProducto={() => {
                  setProductoSeleccionado(prod);
                  setVerDetalle(true);
                }}
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
                <div>
                  <strong>Precio Unitario:</strong>

                  {item.precioOriginal && item.precioOriginal > item.price ? (
                    <>
                      <div
                        style={{
                          textDecoration: "line-through",
                          color: "#888",
                          fontSize: "13px",
                        }}
                      >
                        {formatearPrecio(item.precioOriginal)}
                      </div>

                      <div
                        style={{
                          color: "#dc2626",
                          fontWeight: "bold",
                        }}
                      >
                        {formatearPrecio(item.price)}
                      </div>
                    </>
                  ) : (
                    <div>{formatearPrecio(Number(item.price))}</div>
                  )}

                  <div>
                    <strong>Talla:</strong> {item.size}
                  </div>
                </div>
                <p>
                  Cantidad:
                  <button onClick={() => disminuirCantidad(item.id)}>
                    {" "}
                    -{" "}
                  </button>
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
                marginTop: "35px",
                background: "#ffffff",
                borderRadius: "18px",
                padding: "35px",
                boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                maxWidth: "750px",
                marginInline: "auto",
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "30px",
                  color: "#111827",
                  fontSize: "30px",
                  fontWeight: "800",
                }}
              >
                📦 Datos de envío
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "22px",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    color: "#6b7280",
                    marginBottom: "35px",
                    fontSize: "15px",
                  }}
                >
                  Completa la información para recibir tu pedido.
                </p>
                <div>
                  <div>
                    <label
                      htmlFor="txt-cliente-nombre"
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: "600",
                        color: "#374151",
                        fontSize: "15px",
                      }}
                    >
                      👤 Nombre completo
                    </label>

                    <input
                      id="txt-cliente-nombre"
                      type="text"
                      placeholder="Ingresa tu nombre completo"
                      value={nombreComprador}
                      onChange={(e) => setNombreComprador(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: "12px",
                        border: "1px solid #d1d5db",
                        fontSize: "15px",
                        outline: "none",
                        boxSizing: "border-box",
                        transition: ".2s",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Cédula */}
                <div>
                  <label
                    htmlFor="txt-cliente-cedula"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#374151",
                      fontSize: "15px",
                    }}
                  >
                    🆔 Cédula
                  </label>

                  <input
                    id="txt-cliente-cedula"
                    type="text"
                    placeholder="Número de documento"
                    value={cedulaComprador}
                    onChange={(e) => setCedulaComprador(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid #d1d5db",
                      fontSize: "15px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label
                    htmlFor="txt-cliente-telefono"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#374151",
                      fontSize: "15px",
                    }}
                  >
                    📱 Teléfono
                  </label>

                  <input
                    id="txt-cliente-telefono"
                    type="text"
                    placeholder="Número celular"
                    value={telefonoComprador}
                    onChange={(e) => setTelefonoComprador(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid #d1d5db",
                      fontSize: "15px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="txt-cliente-direccion"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#374151",
                      fontSize: "16px",
                      textAlign: "left",
                    }}
                  >
                    📍 Dirección de entrega
                  </label>

                  <input
                    id="txt-cliente-direccion"
                    type="text"
                    placeholder="Ej: Calle 10 #25-18, Barrio Centro"
                    value={direccionComprador}
                    onChange={(e) => setDireccionComprador(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px",
                      border: "1px solid #d1d5db",
                      borderRadius: "12px",
                      fontSize: "15px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#374151",
                      fontSize: "16px",
                      textAlign: "left",
                    }}
                  >
                    ✉ Correo electrónico
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px",
                      border: "1px solid #d1d5db",
                      borderRadius: "12px",
                      fontSize: "15px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>
              <div>
                <h3
                  style={{
                    textAlign: "left",
                    marginBottom: "18px",
                    color: "#111827",
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  💳 Método de pago
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: "15px",
                  }}
                >
                  <div
                    onClick={() => setMetodoPago("Nequi")}
                    style={{
                      cursor: "pointer",
                      padding: "20px",
                      borderRadius: "14px",
                      border:
                        metodoPago === "Nequi"
                          ? "2px solid #7c3aed"
                          : "1px solid #d1d5db",
                      background:
                        metodoPago === "Nequi" ? "#f5f3ff" : "#ffffff",
                      transition: ".2s",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "30px",
                        marginBottom: "10px",
                      }}
                    >
                      📱
                    </div>

                    <strong>Nequi</strong>

                    <p
                      style={{
                        marginTop: "8px",
                        color: "#6b7280",
                        fontSize: "13px",
                      }}
                    >
                      Pago inmediato
                    </p>
                  </div>

                  <div
                    onClick={() => setMetodoPago("Breve")}
                    style={{
                      cursor: "pointer",
                      padding: "20px",
                      borderRadius: "14px",
                      border:
                        metodoPago === "Breve"
                          ? "2px solid #7c3aed"
                          : "1px solid #d1d5db",
                      background:
                        metodoPago === "Breve" ? "#f5f3ff" : "#ffffff",
                      transition: ".2s",
                    }}
                  >
                    <div style={{ fontSize: "30px" }}>🏦</div>

                    <strong>Bre-B</strong>

                    <p
                      style={{
                        marginTop: "8px",
                        color: "#6b7280",
                        fontSize: "13px",
                      }}
                    >
                      Transferencia bancaria
                    </p>
                  </div>
                  <div
                    onClick={() => setMetodoPago("Contraentrega")}
                    style={{
                      cursor: "pointer",
                      padding: "20px",
                      borderRadius: "14px",
                      border:
                        metodoPago === "Contraentrega"
                          ? "2px solid #7c3aed"
                          : "1px solid #d1d5db",
                      background:
                        metodoPago === "Contraentrega" ? "#f5f3ff" : "#ffffff",
                      transition: ".2s",
                    }}
                  >
                    <div style={{ fontSize: "30px" }}>🚚</div>

                    <strong>Contraentrega</strong>

                    <p
                      style={{
                        marginTop: "8px",
                        color: "#6b7280",
                        fontSize: "13px",
                      }}
                    >
                      Paga al recibir
                    </p>
                  </div>
                </div>
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
                  <h3
                    style={{
                      marginBottom: "20px",
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#111827",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    📱 Pago con {metodoPago}
                  </h3>

                  <p
                    style={{
                      marginTop: "-10px",
                      marginBottom: "25px",
                      color: "#6b7280",
                      fontSize: "15px",
                    }}
                  >
                    Escanea el código QR o realiza la transferencia utilizando
                    los datos de abajo.
                  </p>

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
                        width: "170px",
                        height: "170px",
                        background: "#ffffff",
                        borderRadius: "16px",
                        border: "1px solid #e5e7eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "12px",
                        boxShadow: "0 8px 24px rgba(0,0,0,.08)",
                      }}
                    >
                      {/* Aquí pones un QR real de tu Nequi cuando lances la app a internet. Por ahora ponemos un marcador visual */}
                      <div style={{ textAlign: "center", padding: "5px" }}>
                        <img
                          src={nequiQR}
                          alt={metodoPago}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    </div>

                    {/* 📝 DATOS TÉCNICOS DE TRANSFERENCIA */}
                    <div
                      style={{
                        flex: "1 1 250px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "18px",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: "13px",
                            color: "#6b7280",
                          }}
                        >
                          Titular
                        </span>

                        <h3
                          style={{
                            margin: "4px 0 0",
                            color: "#111827",
                            fontSize: "22px",
                            fontWeight: "700",
                          }}
                        >
                          TIENDA PUMA PREMIUM S.A.S
                        </h3>
                      </div>

                      <div>
                        <span
                          style={{
                            fontSize: "13px",
                            color: "#6b7280",
                          }}
                        >
                          Número para transferencias
                        </span>

                        <h2
                          style={{
                            margin: "5px 0",
                            color: "#7c3aed",
                            fontSize: "28px",
                            fontWeight: "800",
                            letterSpacing: "1px",
                          }}
                        >
                          {nequiNumero}
                        </h2>
                      </div>

                      <p
                        style={{
                          margin: 0,
                          color: "#475569",
                          lineHeight: "1.7",
                          fontSize: "15px",
                        }}
                      >
                        💡 Escanea el código QR desde tu aplicación de{" "}
                        <strong>{metodoPago}</strong> o realiza la transferencia
                        al número mostrado arriba. Después de pagar, presiona
                        <strong> "Finalizar Compra"</strong> para registrar tu
                        pedido.
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
                {/* 🛒 RESUMEN DEL PEDIDO */}

                <div
                  style={{
                    marginTop: "35px",
                    background: "#ffffff",
                    borderRadius: "18px",
                    padding: "25px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 8px 25px rgba(0,0,0,.05)",
                  }}
                >
                  <h3
                    style={{
                      marginBottom: "20px",
                      fontSize: "24px",
                      color: "#111827",
                      fontWeight: "700",
                    }}
                  >
                    🛒 Resumen del pedido
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <span>Productos</span>
                    <strong>{cart.length}</strong>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <span>Envío</span>
                    <strong style={{ color: "#16a34a" }}>GRATIS</strong>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "18px",
                    }}
                  >
                    <span>Subtotal</span>

                    <strong>
                      {formatearPrecio(
                        cart.reduce(
                          (acc, item) => acc + item.price * item.cantidad,
                          0,
                        ),
                      )}
                    </strong>
                  </div>

                  <hr
                    style={{
                      border: "none",
                      borderTop: "1px solid #e5e7eb",
                      margin: "20px 0",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "22px",
                        fontWeight: "700",
                      }}
                    >
                      Total
                    </span>

                    <span
                      style={{
                        fontSize: "30px",
                        color: "#7c3aed",
                        fontWeight: "700",
                      }}
                    >
                      {formatearPrecio(
                        cart.reduce(
                          (acc, item) => acc + item.price * item.cantidad,
                          0,
                        ),
                      )}
                    </span>
                  </div>
                </div>

                {/* BOTONES */}

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
      </div>
    </>
  );
}

export default ClientView;
