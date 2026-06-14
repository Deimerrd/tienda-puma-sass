import { useState } from "react";

function AdminView({
  modoIngenieroActivo,
  marcarPedidoEntregado,
  products,
  setProducts,
  ventas,
  categories,
  agregarCategoria,
  cancelarPedidoAdmin,
  eliminarProducto,
  cambiarClave, // 👈 RECIBIMOS LA HERRAMIENTA DE CAMBIO DE CLAVE
  formatearPrecio,
  forzarDesbloqueoDev,
}) {
  const [articulo, setArticulo] = useState({
    id: "",
    name: "",
    category: "",
    color: "",
    price: "",
    marca: "",
    image: "",
    gender: "",
    description: "",
  });

  const [nuevaCatNombre, setNuevaCatNombre] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState(""); // 👈 ESTADO PARA CAPTURAR LA NUEVA CLAVE

  function handleChange(e) {
    setArticulo({ ...articulo, [e.target.name]: e.target.value });
  }

  function Guardar() {
    // 1. Escudo de validación contra campos vacíos prioritarios
    if (
      !articulo.id.trim() ||
      !articulo.name.trim() ||
      !articulo.category.trim() ||
      !articulo.price.trim() ||
      !articulo.marca.trim() ||
      !articulo.image.trim()
    ) {
      alert(
        "⚠️ Error: Los campos ID, Nombre, Categoría, Precio, Marca e Imagen son obligatorios.",
      );
      return;
    }

    // 2. Escudo contra precios con letras o negativos
    const precioNumerico = Number(articulo.price);
    if (isNaN(precioNumerico)) {
      alert("⚠️ Error Ilógico: El precio debe ser un número válido.");
      return;
    }
    if (precioNumerico <= 0) {
      alert("⚠️ Error Ilógico: El precio debe ser mayor a $0.");
      return;
    }

    // 3. LA MAGIA LOGÍSTICA: Verificamos si el ID ya existe abajo en el inventario
    const idExiste = products.find(
      (prod) => prod.id.trim() === articulo.id.trim(),
    );

    if (idExiste) {
      // 👇 MODO EDICIÓN: Si el ID ya existe, sobreescribimos los datos de ese producto viejo
      const confirmacion = window.confirm(
        `¿Deseas guardar los cambios editados para el producto "${articulo.name}"?`,
      );

      if (confirmacion) {
        setProducts((prev) =>
          prev.map((prod) =>
            prod.id.trim() === articulo.id.trim() ? articulo : prod,
          ),
        );
        alert("🔒 ¡La edición se ha guardado con éxito!");
        // Limpiamos el formulario
        setArticulo({
          id: "",
          name: "",
          category: "",
          color: "",
          price: "",
          marca: "",
          image: "",
          gender: "",
          description: "",
        });
      }
      return; // Detiene la función aquí para que no intente duplicarlo abajo
    }

    // 👇 MODO REGISTRO NUEVO: Si el ID no existe, se guarda como un producto nuevo normal
    setProducts((prev) => [...prev, articulo]);
    alert("¡El nuevo producto se ha guardado con éxito!");
    setArticulo({
      id: "",
      name: "",
      category: "",
      color: "",
      price: "",
      marca: "",
      image: "",
      gender: "",
      description: "",
    });
  }

  return (
    <>
      {/* 🔐 1. AJUSTES DE SEGURIDAD CONTRASEÑA */}
      <div
        style={{
          background: "#ffedd5",
          padding: "15px",
          border: "1px solid #f97316",
          borderRadius: "8px",
          marginBottom: "25px",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", color: "#c2410c" }}>
          🔒 Configuración de Seguridad
        </h3>
        <label htmlFor="txt-nueva-clave">Nueva Contraseña Maestra: </label>
        <input
          id="txt-nueva-clave"
          type="password"
          placeholder="Escriba su nueva contraseña"
          value={nuevaContrasena}
          onChange={(e) => setNuevaContrasena(e.target.value)}
        />
        <button
          onClick={() => {
            cambiarClave(nuevaContrasena);
            setNuevaContrasena("");
          }}
          style={{ marginLeft: "10px", cursor: "pointer", fontWeight: "bold" }}
        >
          🔐 Actualizar Clave
        </button>
      </div>

      {/* 🛠️ 2. CREADOR DE CATEGORÍAS DINÁMICAS */}
      <div
        style={{
          background: "#fef08a",
          padding: "15px",
          border: "1px solid #eab308",
          borderRadius: "8px",
          marginBottom: "25px",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", color: "#854d0e" }}>
          🛠️ Creador de Categorías Dinámicas
        </h3>
        <label htmlFor="txt-nueva-cat">Nombre de la nueva categoría: </label>
        <input
          id="txt-nueva-cat"
          type="text"
          placeholder="Ej: Gorras"
          value={nuevaCatNombre}
          onChange={(e) => setNuevaCatNombre(e.target.value)}
        />
        <button
          onClick={() => {
            agregarCategoria(nuevaCatNombre);
            setNuevaCatNombre("");
          }}
          style={{ marginLeft: "10px", cursor: "pointer" }}
        >
          ➕ Crear Categoría
        </button>
      </div>

      {/* 📊 3. SECCIÓN GLOBALES (El menú que despliega todo según lo que elijas) */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "20px",
          background: "#262626",
          padding: "15px",
          color: "white",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label
            htmlFor="txt-category"
            style={{ fontSize: "12px", fontWeight: "700" }}
          >
            ¿QUÉ DESEAS AGREGAR AL CATÁLOGO?:
          </label>
          <select
            name="category"
            value={articulo.category}
            id="txt-category"
            onChange={handleChange}
            style={{
              background: "#171717",
              border: "1px solid #404040",
              color: "#ffffff",
              padding: "10px",
              width: "250px",
            }}
          >
            <option value="">-- Seleccione Categoría Primero --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {articulo.category && (
          <>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label
                htmlFor="txt-id"
                style={{ fontSize: "12px", fontWeight: "700" }}
              >
                ID / REF ÚNICA:
              </label>
              <input
                type="text"
                id="txt-id"
                name="id"
                value={articulo.id}
                onChange={handleChange}
                style={{
                  background: "#171717",
                  border: "1px solid #404040",
                  color: "#ffffff",
                  padding: "10px",
                  width: "120px",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label
                htmlFor="txt-name"
                style={{ fontSize: "12px", fontWeight: "700" }}
              >
                NOMBRE DEL PRODUCTO:
              </label>
              <input
                type="text"
                id="txt-name"
                name="name"
                value={articulo.name}
                onChange={handleChange}
                style={{
                  background: "#171717",
                  border: "1px solid #404040",
                  color: "#ffffff",
                  padding: "10px",
                  width: "250px",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label
                htmlFor="txt-price"
                style={{ fontSize: "12px", fontWeight: "700" }}
              >
                PRECIO DE VENTA:
              </label>
              <input
                type="text"
                name="price"
                id="txt-price"
                value={articulo.price}
                onChange={handleChange}
                style={{
                  background: "#171717",
                  border: "1px solid #404040",
                  color: "#ffffff",
                  padding: "10px",
                  width: "120px",
                }}
              />
            </div>
          </>
        )}
      </div>

      {/* ⚡ 4. FORMULARIO DINÁMICO INTELIGENTE POR CATEGORÍA */}
      {articulo.category && (
        <div
          style={{
            background: "#262626",
            borderLeft: "4px solid #f97316",
            padding: "20px",
            marginBottom: "30px",
            color: "white",
          }}
        >
          {/* Si es calzado (Zapatos), abre la matriz avanzada de tallas */}
          {articulo.category === "shoes" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <h4
                style={{
                  margin: "0",
                  color: "#f97316",
                  textTransform: "uppercase",
                }}
              >
                👟 Configuración Técnica de Calzado
              </h4>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  htmlFor="txt-color"
                  style={{ fontSize: "12px", fontWeight: "700" }}
                >
                  MATRIZ DE COLORES Y TALLAS:
                </label>
                <input
                  type="text"
                  id="txt-color"
                  name="color"
                  placeholder="Ej: Negro(39,40), Rojo(38,40)"
                  value={articulo.color}
                  onChange={handleChange}
                  style={{
                    background: "#171717",
                    border: "1px solid #404040",
                    color: "#ffffff",
                    padding: "10px",
                  }}
                />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  htmlFor="txt-gender"
                  style={{ fontSize: "12px", fontWeight: "700" }}
                >
                  GÉNERO PÚBLICO:
                </label>
                <select
                  name="gender"
                  value={articulo.gender}
                  id="txt-gender"
                  onChange={handleChange}
                  style={{
                    background: "#171717",
                    border: "1px solid #404040",
                    color: "#ffffff",
                    padding: "10px",
                    width: "200px",
                  }}
                >
                  <option value="Unisex">Unisex</option>
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                  <option value="Niño">Niño</option>
                  <option value="Niña">Niña</option>
                </select>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  htmlFor="txt-marca"
                  style={{ fontSize: "12px", fontWeight: "700" }}
                >
                  MARCA:
                </label>

                <input
                  type="text"
                  id="txt-marca"
                  name="marca"
                  placeholder="Ej: Puma"
                  value={articulo.marca}
                  onChange={handleChange}
                  style={{
                    background: "#171717",
                    border: "1px solid #404040",
                    color: "#ffffff",
                    padding: "10px",
                  }}
                />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  htmlFor="txt-size"
                  style={{ fontSize: "12px", fontWeight: "700" }}
                >
                  TALLAS DISPONIBLES:
                </label>

                <input
                  type="text"
                  id="txt-size"
                  name="size"
                  placeholder="Ej: 39,40,41,42"
                  value={articulo.size || ""}
                  onChange={handleChange}
                  style={{
                    background: "#171717",
                    border: "1px solid #404040",
                    color: "#ffffff",
                    padding: "10px",
                  }}
                />
              </div>
            </div>
          )}

          {/* Si es Gorras, Accesorios, etc., esconde las tallas de zapato */}
          {articulo.category !== "shoes" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <h4
                style={{
                  margin: "0",
                  color: "#f97316",
                  textTransform: "uppercase",
                }}
              >
                ✨ Configuración de Prenda / Accesorio Corto
              </h4>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  htmlFor="txt-color"
                  style={{ fontSize: "12px", fontWeight: "700" }}
                >
                  COLORES DISPONIBLES (Separados por comas):
                </label>
                <input
                  type="text"
                  id="txt-color"
                  name="color"
                  placeholder="Ej: Negro, Azul, Blanco"
                  value={articulo.color}
                  onChange={handleChange}
                  style={{
                    background: "#171717",
                    border: "1px solid #404040",
                    color: "#ffffff",
                    padding: "10px",
                  }}
                />
              </div>
              {(articulo.category === "shirt" ||
                articulo.category === "sweater" ||
                articulo.category === "pants") && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label
                    htmlFor="txt-marca"
                    style={{ fontSize: "12px", fontWeight: "700" }}
                  >
                    TALLAS DISPONIBLES DE ROPA:
                  </label>
                  <input
                    type="text"
                    name="marca"
                    id="txt-marca"
                    placeholder="Ej: S, M, L, XL"
                    value={articulo.marca}
                    onChange={handleChange}
                    style={{
                      background: "#171717",
                      border: "1px solid #404040",
                      color: "#ffffff",
                      padding: "10px",
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* CAMPOS COMUNES DE FOTO Y DESCRIPCIÓN */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              marginTop: "15px",
            }}
          >
            <label
              htmlFor="image"
              style={{ fontSize: "12px", fontWeight: "700" }}
            >
              ENLACES DE IMÁGENES DE INTERNET:
            </label>
            <input
              id="image"
              type="text"
              name="image"
              placeholder="Enlaces de fotos separados por comas..."
              value={articulo.image}
              onChange={handleChange}
              style={{
                background: "#171717",
                border: "1px solid #404040",
                color: "#ffffff",
                padding: "10px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              marginTop: "15px",
            }}
          >
            <label
              htmlFor="txt-description"
              style={{ fontSize: "12px", fontWeight: "700" }}
            >
              DESCRIPCIÓN PERSUASIVA DE CONVENCIMIENTO:
            </label>
            <textarea
              id="txt-description"
              name="description"
              placeholder="Escribe el Copywriting que enamorará al cliente..."
              value={articulo.description}
              onChange={handleChange}
              rows="4"
              style={{
                background: "#171717",
                border: "1px solid #404040",
                color: "#ffffff",
                padding: "10px",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            onClick={Guardar}
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginTop: "20px",
              background: "#f97316",
              color: "#ffffff",
              border: "none",
              fontWeight: "700",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            🚀 Registrar en Catálogo Comercial
          </button>
        </div>
      )}

      {/* 🚫 A PARTIR DE AQUÍ ABAJO COMIENZA TU HISTORIAL Y TU INVENTARIO ROJO DE SIEMPRE (No los borres, déjalos quietos abajo) */}

      {/* 📦 SECCIÓN A: INVENTARIO DE LA TIENDA CON BOTONES LOGÍSTICOS */}
      <h3 style={{ fontFamily: "sans-serif", marginTop: "30px" }}>
        Inventario de la tienda
      </h3>
      {products.length === 0 ? (
        <p style={{ fontFamily: "sans-serif" }}>
          No hay artículos registrados.
        </p>
      ) : (
        products.map((prod) => (
          <div
            key={prod.id}
            style={{
              border: "1px solid red",
              padding: "15px",
              margin: "10px 0",
              background: "#171717",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "sans-serif",
            }}
          >
            {/* Detalles técnicos rápidos del producto */}
            <p style={{ margin: 0 }}>
              <strong>[{prod.id}]</strong> {prod.name} - {prod.marca} (
              {formatearPrecio(Number(prod.price))})
            </p>

            {/* Botonera comercial de administración */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => {
                  // Sube de forma automática todos los datos del producto a los inputs de arriba
                  setArticulo(prod);
                  // Desplaza la pantalla suavemente hacia el formulario para editar de una vez
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                ✏️ Editar
              </button>

              <button
                onClick={() => eliminarProducto(prod.id)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))
      )}

      {/* 📋 SECCIÓN B: HISTORIAL DE PEDIDOS CONTRAENTREGA */}
      <h3
        style={{ marginTop: "40px", color: "green", fontFamily: "sans-serif" }}
      >
        📋 Historial de Pedidos
      </h3>
      {ventas.length === 0 ? (
        <p style={{ fontFamily: "sans-serif" }}>No hay ventas registradas.</p>
      ) : (
        ventas.map((vst) => (
          <div
            key={vst.idVenta}
            style={{
              border: "2px solid green",
              padding: "15px",
              margin: "15px 0",
              background: "#f0fdf4",
              borderRadius: "6px",
              fontFamily: "sans-serif",
            }}
          >
            <p>
              <strong>Pedido:</strong> {vst.idVenta}
            </p>
            <div
              style={{
                background: "#fff",
                padding: "10px",
                border: "1px solid #ccc",
                marginBottom: "10px",
                color: "#333",
              }}
            >
              👤 <strong>Cliente:</strong> {vst.cliente} | 💳{" "}
              <strong>Cédula:</strong> {vst.cedula}
              <br />
              📞 <strong>Teléfono:</strong> {vst.telefono} <br />
              📍 <strong>Dirección:</strong> {vst.direccion} <br />
              💰 <strong>Método:</strong> {vst.metodoPago}
            </div>
            <h4 style={{ color: "#333" }}>Compró:</h4>
            <h4>Compró:</h4>
            <ul
              style={{
                listStyleType: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {vst.productos.map((item, idx) => {
                // Tomamos la primera URL de la lista por si el administrador registró varias imágenes separadas por comas
                const fotoProducto = item.image
                  ? item.image.split(",")[0].trim()
                  : "";

                return (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      background: "#ffffff",
                      padding: "10px",
                      border: "1px solid #cbd5e1",
                      color: "#333333",
                      borderRadius: "4px",
                    }}
                  >
                    {/* 👇 MINIATURA LOGÍSTICA DE LA FOTO DEL PRODUCTO */}
                    <div
                      style={{
                        width: "55px",
                        height: "55px",
                        overflow: "hidden",
                        background: "#f8fafc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #cbd5e1",
                      }}
                    >
                      {fotoProducto ? (
                        <img
                          src={fotoProducto}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: "9px", color: "#94a3b8" }}>
                          Sin foto
                        </span>
                      )}
                    </div>

                    {/* Información técnica desglosada al lado de la imagen */}
                    <div>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          display: "block",
                        }}
                      >
                        {item.name}
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#64748b",
                          display: "block",
                          marginTop: "2px",
                        }}
                      >
                        Ref: <strong>{item.id}</strong> | Color:{" "}
                        {item.color || "Estándar"} | Talla:{" "}
                        <strong>{item.size || "Única"}</strong>
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#000000",
                          display: "block",
                          marginTop: "2px",
                        }}
                      >
                        Cantidad: {item.cantidad} uds
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p
              style={{
                fontWeight: "bold",
                textAlign: "right",
                color: "darkgreen",
                margin: "0 0 10px 0",
                fontSize: "16px",
              }}
            >
              Total: {formatearPrecio(vst.total)}
            </p>
            <button
              // 🔒 CANDADO DE AUDITORÍA: Si ya se entregó, este botón también se congela solo
              disabled={vst.estado === "Entregado"}
              onClick={() => cancelarPedidoAdmin(vst.idVenta)}
              style={{
                background: vst.estado === "Entregado" ? "#404040" : "#ef4444", // Gris si está bloqueado, rojo si está activo
                color: vst.estado === "Entregado" ? "#a3a3a3" : "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "4px",
                cursor: vst.estado === "Entregado" ? "not-allowed" : "pointer", // Cursor de prohibido
                fontWeight: "bold",
              }}
            >
              🗑️ Cancelar / Eliminar Pedido
            </button>
            {/* 🔒 REEMPLAZA TU BLOQUE DE BOTONES EN EL HISTORIAL POR ESTE COMPORTAMIENTO SEGURO */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              {vst.estado === "Entregado" ? (
                <span
                  style={{
                    background: "#069663",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  ✅ PROCESO FINALIZADO CON ÉXITO ({vst.fechaEntrega})
                </span>
              ) : (
                <button
                  onClick={() => marcarPedidoEntregado(vst.idVenta)}
                  style={{
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  📦 Marcar como Entregado
                </button>
              )}

              {/* Botón Eliminar Orden Tradicional (Se bloquea si ya fue entregado) */}
              <button
                disabled={vst.estado === "Entregado"} // 👈 CANDADO: Si ya se entregó, el botón se apaga solo
                onClick={() => cancelarPedidoAdmin(vst.idVenta)}
                style={{
                  background:
                    vst.estado === "Entregado" ? "#404040" : "#ef4444", // Si está bloqueado se pone gris oscuro
                  color: vst.estado === "Entregado" ? "#a3a3a3" : "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor:
                    vst.estado === "Entregado" ? "not-allowed" : "pointer", // Cambia el cursor a un símbolo de prohibido
                  fontWeight: "bold",
                }}
              >
                🗑️ Eliminar Orden
              </button>

              {/* 👇 COMPUERTA EXCLUSIVA DEL PROGRAMADOR: El botón oculto de rescate */}
              {vst.estado === "Entregado" && modoIngenieroActivo && (
                <button
                  onClick={() => {
                    const passDev = window.prompt(
                      "💻 MÓDULO INGENIERO: Ingrese la clave de desarrollador para romper el candado:",
                    );

                    if (passDev === "DevPass2026") {
                      // 👇 REEMPLAZO LOGÍSTICO COMPACTO: Llamamos a la función legal prop pasándole el ID
                      forzarDesbloqueoDev(vst.idVenta);
                    } else if (passDev !== null) {
                      alert("❌ Error: Clave incorrecta.");
                    }
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#f97316",
                    cursor: "pointer",
                    fontSize: "12px",
                    textDecoration: "underline",
                    padding: "0",
                    fontWeight: "bold",
                  }}
                >
                  🛠️ Forzar desbloqueo (Solo Desarrollador)
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default AdminView;
