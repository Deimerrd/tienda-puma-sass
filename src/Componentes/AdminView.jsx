import { useState } from "react";
import jsPDF from "jspdf";

function AdminView({
  modoIngenieroActivo,
  marcarPedidoEntregado,
  products,
  productosStockCritico,
  setProducts,
  ventas,
  categories,
  agregarCategoria,
  cancelarPedidoAdmin,
  eliminarProducto,
  cambiarClave, // 👈 RECIBIMOS LA HERRAMIENTA DE CAMBIO DE CLAVE
  formatearPrecio,
  forzarDesbloqueoDev,
  nequiNumero,
  setNequiNumero,
  nequiQR,
  setNequiQR,
}) {
  const [articulo, setArticulo] = useState({
    id: "",
    name: "",
    category: "",
    color: "",
    price: "",
    marca: "",
    stock: "",
    image: "",
    gender: "",
    description: "",

    promocion: "",
    descuento: 0,
  });

  function generarFacturaPDF(vst) {
    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(18);
    doc.text("FACTURA DE VENTA", 20, y);

    y += 15;

    doc.setFontSize(12);

    doc.text(`Factura: ${vst.idVenta}`, 20, y);
    y += 10;

    doc.text(`Fecha: ${vst.fecha}`, 20, y);
    y += 10;

    doc.text(`Hora: ${vst.hora}`, 20, y);
    y += 10;

    doc.text(`Cliente: ${vst.cliente}`, 20, y);
    y += 10;

    doc.text(`Cedula: ${vst.cedula}`, 20, y);
    y += 10;

    doc.text(`Telefono: ${vst.telefono}`, 20, y);
    y += 10;

    doc.text(`Correo: ${vst.correo}`, 20, y);
    y += 10;

    doc.text(`Direccion: ${vst.direccion}`, 20, y);

    y += 20;

    doc.text("PRODUCTOS", 20, y);

    y += 10;

    vst.productos.forEach((item) => {
      doc.text(`${item.name} x${item.cantidad} - $${item.price}`, 20, y);

      y += 10;
    });

    y += 10;

    doc.text(`Metodo de pago: ${vst.metodoPago}`, 20, y);

    y += 10;

    doc.text(`TOTAL: $${vst.total}`, 20, y);

    doc.save(`Factura-${vst.idVenta}.pdf`);
  }

  const [nuevaCatNombre, setNuevaCatNombre] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState(""); // 👈 ESTADO PARA CAPTURAR LA NUEVA CLAVE
  const [busquedaProducto, setBusquedaProducto] = useState("");

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
      !articulo.stock.trim() ||
      !articulo.image.trim()
    ) {
      alert(
        "⚠️ Error: Los campos ID, Nombre, Categoría, Precio, Marca, Stock e Imagen son obligatorios.",
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
        alert("🔒 ¡La edición se ha guardado con éxito!");

        // Limpiamos el formulario
        setArticulo({
          id: "",
          name: "",
          category: "",
          color: "",
          price: "",
          marca: "",
          stock: "",
          image: "",
          gender: "",
          description: "",

          promocion: "",
          descuento: 0,
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
      stock: "",
      image: "",
      gender: "",
      description: "",
      promocion: "",
      descuento: 0,
    });
  }

  const pedidosEntregados = ventas.filter((v) => v.estado === "Entregado");

  const pedidosPendientes = ventas.filter((v) => v.estado !== "Entregado");

  const totalVendido = ventas.reduce(
    (acc, venta) => acc + Number(venta.total),
    0,
  );

  const totalEntregado = pedidosEntregados.reduce(
    (acc, venta) => acc + Number(venta.total),
    0,
  );
  const hoy = new Date();

  const ventasHoy = ventas.filter((v) => {
    const fechaVenta = new Date(v.fechaISO);

    return (
      fechaVenta.getDate() === hoy.getDate() &&
      fechaVenta.getMonth() === hoy.getMonth() &&
      fechaVenta.getFullYear() === hoy.getFullYear()
    );
  });

  const totalHoy = ventasHoy.reduce(
    (acc, venta) => acc + Number(venta.total),
    0,
  );

  const productosFiltrados = products.filter((prod) => {
    const texto = busquedaProducto.toLowerCase();

    return (
      prod.name?.toLowerCase().includes(texto) ||
      prod.id?.toLowerCase().includes(texto) ||
      prod.marca?.toLowerCase().includes(texto)
    );
  });

  function agregarStock(idProducto) {
    const cantidad = window.prompt(
      "📦 ¿Cuántas unidades deseas agregar al inventario?",
    );

    if (cantidad === null) return;

    const cantidadNumerica = Number(cantidad);

    if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
      alert("❌ Debe ingresar una cantidad válida.");
      return;
    }

    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === idProducto
          ? {
              ...prod,
              stock: Number(prod.stock) + cantidadNumerica,
            }
          : prod,
      ),
    );

    alert(`✅ Se agregaron ${cantidadNumerica} unidades al inventario.`);
  }

  function restarStock(idProducto) {
    const cantidad = window.prompt("📉 ¿Cuántas unidades deseas descontar?");

    if (cantidad === null) return;

    const cantidadNumerica = Number(cantidad);

    if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
      alert("❌ Debe ingresar una cantidad válida.");
      return;
    }

    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id !== idProducto) return prod;

        const nuevoStock = Number(prod.stock) - cantidadNumerica;

        return {
          ...prod,
          stock: Math.max(0, nuevoStock),
        };
      }),
    );
    const producto = products.find((p) => p.id === idProducto);

    if (producto) {
      alert(
        `✅ Nuevo stock de ${producto.name}: ${Math.max(
          0,
          Number(producto.stock) - cantidadNumerica,
        )} unidades`,
      );
    }
  }
  const rankingProductos = {};

  ventas.forEach((venta) => {
    venta.productos.forEach((producto) => {
      const clave = `${producto.name} | ${producto.color || "Sin color"} | ${
        producto.size || "Sin talla"
      }`;

      if (!rankingProductos[clave]) {
        rankingProductos[clave] = 0;
      }

      rankingProductos[clave] += Number(producto.cantidad || 1);
    });
  });

  const topProductos = Object.entries(rankingProductos)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const rankingTallas = {};

  ventas.forEach((venta) => {
    venta.productos.forEach((producto) => {
      const talla = producto.size || "Sin talla";

      if (!rankingTallas[talla]) {
        rankingTallas[talla] = 0;
      }

      rankingTallas[talla] += Number(producto.cantidad || 1);
    });
  });

  const topTallas = Object.entries(rankingTallas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const rankingColores = {};

  ventas.forEach((venta) => {
    venta.productos.forEach((producto) => {
      const color = producto.color || "Sin color";

      if (!rankingColores[color]) {
        rankingColores[color] = 0;
      }

      rankingColores[color] += Number(producto.cantidad || 1);
    });
  });

  const topColores = Object.entries(rankingColores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const productosReponer = products
    .map((prod) => {
      let vendidos = 0;

      ventas.forEach((venta) => {
        venta.productos.forEach((item) => {
          if (
            item.name === prod.name &&
            item.color === prod.color &&
            item.size === prod.size
          ) {
            vendidos += Number(item.cantidad || 1);
          }
        });
      });

      return {
        ...prod,
        vendidos,
      };
    })
    .filter((prod) => prod.vendidos > 0 && Number(prod.stock) <= 5)
    .sort((a, b) => b.vendidos - a.vendidos)
    .slice(0, 10);

  const ventasPorMes = {};

  ventas.forEach((venta) => {
    if (!venta.fecha) return;

    const fecha = new Date(venta.fecha);

    const mes = fecha.toLocaleDateString("es-CO", {
      month: "long",
      year: "numeric",
    });

    if (!ventasPorMes[mes]) {
      ventasPorMes[mes] = 0;
    }

    ventasPorMes[mes] += Number(venta.total || venta.totalCompra || 0);
  });

  const resumenMensual = Object.entries(ventasPorMes).map(([mes, total]) => ({
    mes,
    total,
  }));

  const ultimoMes = resumenMensual[resumenMensual.length - 1];

  const mesAnterior = resumenMensual[resumenMensual.length - 2];

  let crecimiento = 0;

  if (ultimoMes && mesAnterior && mesAnterior.total > 0) {
    crecimiento =
      ((ultimoMes.total - mesAnterior.total) / mesAnterior.total) * 100;
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

      <div
        style={{
          background: "#e0f2fe",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "25px",
        }}
      >
        <h3>💳 Configuración Nequi</h3>

        <div style={{ marginBottom: "10px" }}>
          <label>Número Nequi:</label>

          <input
            type="text"
            value={nequiNumero}
            onChange={(e) => setNequiNumero(e.target.value)}
            placeholder="3001234567"
            style={{ marginLeft: "10px" }}
          />
        </div>

        <div>
          <label>URL QR Nequi:</label>

          <input
            type="text"
            value={nequiQR}
            onChange={(e) => setNequiQR(e.target.value)}
            placeholder="https://..."
            style={{
              width: "100%",
              padding: "8px",
            }}
          />
        </div>
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
                  htmlFor="txt-stock"
                  style={{ fontSize: "12px", fontWeight: "700" }}
                >
                  📦 STOCK DISPONIBLE:
                </label>

                <input
                  type="text"
                  id="txt-stock"
                  name="stock"
                  placeholder="Cantidad disponible en inventario"
                  value={articulo.stock}
                  onChange={handleChange}
                  style={{
                    background: "#171717",
                    border: "1px solid #404040",
                    color: "#ffffff",
                    padding: "10px",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    🔥 TIPO DE PROMOCIÓN:
                  </label>

                  <select
                    name="promocion"
                    value={articulo.promocion}
                    onChange={handleChange}
                    style={{
                      background: "#171717",
                      border: "1px solid #404040",
                      color: "#ffffff",
                      padding: "10px",
                    }}
                  >
                    <option value="">Sin promoción</option>
                    <option value="🔥 Promoción del Mes">
                      🔥 Promoción del Mes
                    </option>
                    <option value="⭐ Destacado">⭐ Destacado</option>
                    <option value="💥 Oferta Especial">
                      💥 Oferta Especial
                    </option>
                    <option value="🆕 Nuevo Ingreso">🆕 Nuevo Ingreso</option>
                  </select>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    📉 DESCUENTO (%):
                  </label>

                  <input
                    type="number"
                    name="descuento"
                    min="0"
                    max="90"
                    value={articulo.descuento}
                    onChange={handleChange}
                    placeholder="Ej: 20"
                    style={{
                      background: "#171717",
                      border: "1px solid #404040",
                      color: "#ffffff",
                      padding: "10px",
                    }}
                  />
                </div>
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
      {productosStockCritico.length > 0 && (
        <div
          style={{
            background: "#fff3cd",
            border: "2px solid #f59e0b",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>⚠️ Productos por reabastecer</h3>

          {productosStockCritico.map((prod) => (
            <div
              key={prod.id}
              style={{
                padding: "5px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              {Number(prod.stock) === 0 ? (
                <span>
                  🔴 <strong>{prod.name}</strong> - AGOTADO
                </span>
              ) : (
                <span>
                  🟡 <strong>{prod.name}</strong> - Stock: {prod.stock}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      <h3 style={{ fontFamily: "sans-serif", marginTop: "30px" }}>
        Inventario de la tienda
      </h3>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="🔍 Buscar por nombre, referencia o marca..."
          value={busquedaProducto}
          onChange={(e) => setBusquedaProducto(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
      </div>
      {productosFiltrados.length === 0 ? (
        <p style={{ fontFamily: "sans-serif" }}>
          🔍 No se encontraron productos.
        </p>
      ) : (
        productosFiltrados.map((prod) => (
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
            <div>
              <p style={{ margin: 0 }}>
                <strong>[{prod.id}]</strong> {prod.name} - {prod.marca}
              </p>

              <p style={{ margin: "5px 0 0 0" }}>
                💲 {formatearPrecio(Number(prod.price))}
              </p>

              <p
                style={{
                  margin: "5px 0 0 0",
                  fontWeight: "bold",
                  color:
                    Number(prod.stock) === 0
                      ? "red"
                      : Number(prod.stock) <= 5
                        ? "orange"
                        : "#22c55e",
                }}
              >
                {Number(prod.stock) === 0
                  ? `🔴 Agotado`
                  : Number(prod.stock) <= 5
                    ? `🟡 Stock Bajo: ${prod.stock}`
                    : `🟢 Stock: ${prod.stock}`}
              </p>
            </div>

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
                onClick={() => agregarStock(prod.id)}
                style={{
                  background: "#16a34a",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                ➕ Stock
              </button>
              <button
                onClick={() => restarStock(prod.id)}
                style={{
                  background: "#ea580c",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                📉 Stock
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

      <div
        style={{
          background: "#f4f4f4",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>💰 Caja General</h2>

        <p>
          <strong>Pedidos Totales:</strong> {ventas.length}
        </p>

        <p>
          <strong>Entregados:</strong> {pedidosEntregados.length}
        </p>

        <p>
          <strong>Pendientes:</strong> {pedidosPendientes.length}
        </p>

        <p>
          <strong>Total Vendido:</strong> {formatearPrecio(totalVendido)}
        </p>

        <p>
          <strong>Total Entregado:</strong> {formatearPrecio(totalEntregado)}
        </p>
      </div>

      <div
        style={{
          background: "#dbeafe",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>📅 Caja de Hoy</h2>
        <p>
          <strong>Pedidos Hoy:</strong> {ventasHoy.length}
        </p>

        <p>
          <strong>Ventas Hoy:</strong> {formatearPrecio(totalHoy)}
        </p>
      </div>
      <div
        style={{
          background: "#fef3c7",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>🏆 Top Productos Más Vendidos</h2>

        {topProductos.length === 0 ? (
          <p>No hay ventas registradas todavía.</p>
        ) : (
          topProductos.map(([nombre, cantidad], index) => (
            <div
              key={nombre}
              style={{
                padding: "8px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <strong>#{index + 1}</strong>{" "}
              <div>
                <div>
                  <strong>#{index + 1}</strong>
                </div>

                <div>{nombre}</div>

                <div
                  style={{
                    color: "#16a34a",
                    fontWeight: "bold",
                    marginTop: "4px",
                  }}
                >
                  {cantidad} unidades vendidas
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div
        style={{
          background: "#dbeafe",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>🔥 Tallas Más Vendidas</h2>

        {topTallas.length === 0 ? (
          <p>No hay datos disponibles.</p>
        ) : (
          topTallas.map(([talla, cantidad], index) => (
            <div
              key={talla}
              style={{
                padding: "8px 0",
                borderBottom: "1px solid #ccc",
              }}
            >
              #{index + 1} — Talla {talla} → {cantidad} ventas
            </div>
          ))
        )}
      </div>

      <div
        style={{
          background: "#fce7f3",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>🎨 Colores Más Vendidos</h2>

        {topColores.length === 0 ? (
          <p>No hay datos disponibles.</p>
        ) : (
          topColores.map(([color, cantidad], index) => (
            <div
              key={color}
              style={{
                padding: "8px 0",
                borderBottom: "1px solid #ccc",
              }}
            >
              #{index + 1} — {color} → {cantidad} ventas
            </div>
          ))
        )}
      </div>

      <div
        style={{
          background: "#fee2e2",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          border: "2px solid #ef4444",
        }}
      >
        <h2>🚨 Reponer Urgente</h2>

        {productosReponer.length === 0 ? (
          <p>✅ No hay productos críticos para reabastecer.</p>
        ) : (
          productosReponer.map((prod) => (
            <div
              key={prod.id}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <div>
                <strong>{prod.name}</strong>
              </div>

              <div>
                🎨 {prod.color || "N/A"} | 📏 {prod.size || "N/A"}
              </div>

              <div>📦 Stock actual: {prod.stock}</div>

              <div
                style={{
                  color: "#dc2626",
                  fontWeight: "bold",
                }}
              >
                🔥 Vendidos: {prod.vendidos}
              </div>
            </div>
          ))
        )}
      </div>
      <div
        style={{
          background: "#dcfce7",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>📈 Ventas por Mes</h2>

        {resumenMensual.length === 0 ? (
          <p>No hay ventas registradas.</p>
        ) : (
          resumenMensual.map((item) => (
            <div
              key={item.mes}
              style={{
                padding: "8px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <strong>{item.mes}</strong>

              <div>💰 {formatearPrecio(item.total)}</div>
            </div>
          ))
        )}
      </div>

      <div
        style={{
          background: "#e0f2fe",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>📊 Crecimiento del Negocio</h2>

        {resumenMensual.length < 2 ? (
          <p>Se necesitan al menos dos meses de ventas.</p>
        ) : (
          <>
            <p>
              Mes actual:
              <strong> {formatearPrecio(ultimoMes.total)}</strong>
            </p>

            <p>
              Mes anterior:
              <strong> {formatearPrecio(mesAnterior.total)}</strong>
            </p>

            <p
              style={{
                color: crecimiento >= 0 ? "#16a34a" : "#dc2626",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {crecimiento >= 0 ? "⬆️" : "⬇️"} {crecimiento.toFixed(1)}%
            </p>
          </>
        )}
      </div>

      {/* 📋 HISTORIAL DE VENTAS */}

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
              <strong>Fecha:</strong> {vst.fecha}
            </p>

            <p>
              <strong>Hora:</strong> {vst.hora}
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
              📧 <strong>Correo:</strong> {vst.correo}
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
              <button
                onClick={() => generarFacturaPDF(vst)}
                style={{
                  padding: "10px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                📄 Descargar Factura
              </button>
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

                    if (passDev === "Admin2021") {
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
