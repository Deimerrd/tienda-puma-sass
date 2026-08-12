import { useState } from "react";
import "./TarjetaProducto.css";
import ProductoDetalle from "../producto/ProductoDetalle";
import HeroSlider from "../home/HeroSlider";

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
            {/* ================= SLIDER PRINCIPAL ================= */}
            <HeroSlider />

            {/* ================= BENEFICIOS ================= */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "20px",
                marginBottom: "35px",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "18px",
                  padding: "20px",
                  boxShadow: "0 6px 18px rgba(0,0,0,.06)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "34px" }}>🚚</div>

                <h3 style={{ marginTop: "12px", marginBottom: "6px" }}>
                  Envío rápido
                </h3>

                <p
                  style={{
                    color: "#777",
                    margin: 0,
                    fontSize: "14px",
                  }}
                >
                  A todo Colombia
                </p>
              </div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "18px",
                  padding: "20px",
                  boxShadow: "0 6px 18px rgba(0,0,0,.06)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "34px" }}>🔒</div>

                <h3 style={{ marginTop: "12px", marginBottom: "6px" }}>
                  Pagos seguros
                </h3>

                <p
                  style={{
                    color: "#777",
                    margin: 0,
                    fontSize: "14px",
                  }}
                >
                  Nequi, Bre-B y Contraentrega
                </p>
              </div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "18px",
                  padding: "20px",
                  boxShadow: "0 6px 18px rgba(0,0,0,.06)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "34px" }}>🔄</div>

                <h3 style={{ marginTop: "12px", marginBottom: "6px" }}>
                  Cambios fáciles
                </h3>

                <p
                  style={{
                    color: "#777",
                    margin: 0,
                    fontSize: "14px",
                  }}
                >
                  Sin complicaciones
                </p>
              </div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "18px",
                  padding: "20px",
                  boxShadow: "0 6px 18px rgba(0,0,0,.06)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "34px" }}>⭐</div>

                <h3 style={{ marginTop: "12px", marginBottom: "6px" }}>
                  Calidad Premium
                </h3>

                <p
                  style={{
                    color: "#777",
                    margin: 0,
                    fontSize: "14px",
                  }}
                >
                  Productos originales
                </p>
              </div>
            </div>
            {/* ================= CATEGORÍAS POPULARES ================= */}

            <div style={{ marginBottom: "35px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "18px",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "28px",
                    fontWeight: "800",
                    color: "#111827",
                  }}
                >
                  Categorías Populares
                </h2>

                <span
                  style={{
                    color: "#7c3aed",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                >
                  Ver todas →
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(170px,1fr))",
                  gap: "18px",
                }}
              >
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setCategoriaSeleccionada(cat.id)}
                    style={{
                      background:
                        categoriaSeleccionada === cat.id
                          ? "#ede9fe"
                          : "#ffffff",

                      border:
                        categoriaSeleccionada === cat.id
                          ? "2px solid #7c3aed"
                          : "1px solid #e5e7eb",

                      borderRadius: "18px",

                      padding: "22px",

                      textAlign: "center",

                      cursor: "pointer",

                      transition: "all .25s ease",

                      boxShadow: "0 5px 18px rgba(0,0,0,.05)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "40px",
                        marginBottom: "12px",
                      }}
                    >
                      {cat.icono || "📦"}
                    </div>

                    <strong
                      style={{
                        color: "#111827",
                        fontSize: "15px",
                      }}
                    >
                      {cat.name}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
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

function TarjetaProducto({
  prod,
  AgregarAlCarrito,
  formatearPrecio,
  verProducto,
}) {
  const [fotoActivaIdx, setFotoActivaIdx] = useState(0);
  // Por defecto muestra la primera foto (posición 0)
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

      {prod.image ? (
        <img
          // Rompe el texto por comas y toma la foto correspondiente al color seleccionado 👇
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

      <h3>{prod.name}</h3>

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
      <div>
        <label
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "6px",
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
            marginBottom: "12px",
          }}
        >
          {prod.color ? (
            prod.color.split(",").map((col, idx) => (
              <button
                className={`color-btn ${
                  colorElegido === col.trim() ? "active" : ""
                }`}
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
                  color: colorElegido === col.trim() ? "#5b21b6" : "#374151",

                  border:
                    colorElegido === col.trim()
                      ? "2px solid #7c3aed"
                      : "1px solid #d1d5db",
                  background:
                    colorElegido === col.trim() ? "#ede9fe" : "#ffffff",
                }}
              >
                <>
                  <span
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "8px",
                      border: "2px solid #d1d5db",
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
                                : col.trim().toLowerCase().includes("green") ||
                                    col.trim().toLowerCase().includes("verde")
                                  ? "#22c55e"
                                  : "#9ca3af",
                    }}
                  />

                  {col.trim()}
                </>
              </button>
            ))
          ) : (
            <button
              type="button"
              style={{
                padding: "8px 14px",
                borderRadius: "20px",
              }}
            >
              Estándar
            </button>
          )}
        </div>
      </div>
      <div>
        <label
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "6px",
            display: "block",
          }}
        >
          Talla
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
              setMensajeTalla("❌ Esta talla se encuentra agotada en bodega.");
            } else {
              setMensajeTalla(
                `✅ ¡Talla disponible para despacho inmediato! (${stock} unidades)`,
              );
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
          ) : prod.size ? (
            prod.size.split(",").map((tal, idx) => (
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
            </div>{" "}
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
            "Ver más →"
          </button>
        </div>
      )}

      <button
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
              : "0 4px 12px rgba(124, 58, 237, 0.35)",
        }}
      >
        {stockSeleccionado <= 0 ? "Producto agotado" : "Agregar al carrito"}
      </button>
    </div>
  );
}

export default ClientView;
