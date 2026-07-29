import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import AdminLayout from "./admin/layout/AdminLayout";
import SecurityManager from "./admin/settings/SecurityManager";
import PaymentsManager from "./admin/payments/PaymentsManager";
import CategoryManager from "./admin/categories/CategoryManager";
import ProductManager from "./admin/products/ProductManager";
import InventoryManager from "./admin/inventory/InventoryManager";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminView({
  modoIngenieroActivo,
  marcarPedidoEntregado,
  products,
  productosStockCritico,
  setProducts,
  cambiarEstadoPedido,
  ventas,
  categories,
  agregarCategoria,
  cancelarPedidoAdmin,
  eliminarProducto,
  cambiarClave,
  formatearPrecio,
  forzarDesbloqueoDev,
  nequiNumero,
  setNequiNumero,
  nequiQR,
}) {
  const subirQR = (e) => {
    console.log(e.target.files[0]);
  };
  const [articulo, setArticulo] = useState({
    id: "",
    name: "",
    category: "",
    color: "",
    size: "", // ← IMPORTANTE
    marca: "",
    price: "",
    stock: "",
    image: "",
    gender: "",
    description: "",
    rating: 5,
    reviews: 0,
    promocion: "",
    descuento: 0,
  });
  const [busquedaPedido, setBusquedaPedido] = useState("");

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
  const [iconoCategoria, setIconoCategoria] = useState("");
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
        // Limpiamos el formulario
        alert("🔒 ¡La edición se ha guardado con éxito!");

        // Limpiamos el formulario
        setArticulo({
          id: "",
          name: "",
          category: "",
          color: "",
          size: "",
          price: "",
          marca: "",
          stock: "",
          image: "",
          gender: "",
          description: "",
          rating: 5,
          reviews: 0,
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
      size: "",
      price: "",
      marca: "",
      stock: "",
      image: "",
      gender: "",
      description: "",
      rating: 5,
      reviews: 0,
      promocion: "",
      descuento: 0,
    });
  }

  const estadisticasPedidos = useMemo(() => {
    const entregados = ventas.filter((v) => v.estado === "Entregado");

    const pendientes = ventas.filter((v) => v.estado !== "Entregado");

    return {
      entregados,
      pendientes,
    };
  }, [ventas]);
  const { entregados, pendientes } = estadisticasPedidos;

  const totalVendido = ventas.reduce(
    (acc, venta) => acc + Number(venta.total),
    0,
  );
  const totalEntregado = entregados.reduce(
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

  const productosFiltrados = useMemo(() => {
    const texto = busquedaProducto.toLowerCase();

    return products.filter((prod) => {
      return (
        String(prod.name || "")
          .toLowerCase()
          .includes(texto) ||
        String(prod.id || "")
          .toLowerCase()
          .includes(texto) ||
        String(prod.marca || "")
          .toLowerCase()
          .includes(texto)
      );
    });
  }, [products, busquedaProducto]);
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

  const ventasPorMesGrafica = {};

  ventas.forEach((venta) => {
    const fechaVenta = new Date(venta.fecha);

    const numeroMes = fechaVenta.getMonth() + 1;

    const nombreMes = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ][numeroMes - 1];

    ventasPorMesGrafica[nombreMes] =
      (ventasPorMesGrafica[nombreMes] || 0) + Number(venta.total);
  });
  const datosGrafica = Object.keys(ventasPorMesGrafica).map((mes) => ({
    mes,

    ventas: ventasPorMesGrafica[mes],
  }));

  const ventasFiltradas = useMemo(() => {
    if (!busquedaPedido.trim()) return ventas;

    const texto = busquedaPedido.toLowerCase();

    return ventas.filter((vst) => {
      return (
        String(vst.cliente || "")
          .toLowerCase()
          .includes(texto) ||
        String(vst.cedula || "")
          .toLowerCase()
          .includes(texto) ||
        String(vst.telefono || "")
          .toLowerCase()
          .includes(texto) ||
        String(vst.idVenta || "")
          .toLowerCase()
          .includes(texto)
      );
    });
  }, [ventas, busquedaPedido]);
  const [moduloActivo, setModuloActivo] = useState("dashboard");
  return (
    <AdminLayout moduloActivo={moduloActivo} setModuloActivo={setModuloActivo}>
      <SecurityManager
        nuevaContrasena={nuevaContrasena}
        setNuevaContrasena={setNuevaContrasena}
        cambiarClave={cambiarClave}
      />
      <PaymentsManager
        nequiNumero={nequiNumero}
        setNequiNumero={setNequiNumero}
        subirQR={subirQR}
        nequiQR={nequiQR}
      />
      <CategoryManager
        nuevaCatNombre={nuevaCatNombre}
        setNuevaCatNombre={setNuevaCatNombre}
        iconoCategoria={iconoCategoria}
        setIconoCategoria={setIconoCategoria}
        agregarCategoria={agregarCategoria}
      />
      <ProductManager
        articulo={articulo}
        handleChange={handleChange}
        categories={categories}
        Guardar={Guardar}
      />
      <InventoryManager
        productosStockCritico={productosStockCritico}
        productosFiltrados={productosFiltrados}
        busquedaProducto={busquedaProducto}
        setBusquedaProducto={setBusquedaProducto}
        formatearPrecio={formatearPrecio}
        setArticulo={setArticulo}
        agregarStock={agregarStock}
        restarStock={restarStock}
        eliminarProducto={eliminarProducto}
      />

      <input
        type="text"
        placeholder="🔍 Buscar pedido..."
        value={busquedaPedido}
        onChange={(e) => setBusquedaPedido(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

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
          <strong>Entregados:</strong> {entregados.length}
        </p>

        <p>
          <strong>Pendientes:</strong> {pendientes.length}
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
      <h2
        style={{
          marginTop: "40px",
          marginBottom: "20px",
          fontFamily: "sans-serif",
        }}
      >
        📈 Ventas por Mes
      </h2>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={datosGrafica}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                }).format(value)
              }
            />
            <Bar dataKey="ventas" maxBarSize={120} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p>Total de ventas encontradas: {ventasFiltradas.length}</p>
      {ventasFiltradas.length === 0 ? (
        <p style={{ fontFamily: "sans-serif" }}>No hay ventas registradas.</p>
      ) : (
        ventasFiltradas.map((vst) => (
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

            {/* 🔒 REEMPLAZA TU BLOQUE DE BOTONES EN EL HISTORIAL POR ESTE COMPORTAMIENTO SEGURO */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <strong>Estado:</strong>

                <select
                  value={vst.estado}
                  onChange={(e) =>
                    cambiarEstadoPedido(vst.idVenta, e.target.value)
                  }
                  style={{
                    marginLeft: "10px",
                    padding: "5px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                  }}
                >
                  <option value="Pendiente">🟡 Pendiente</option>
                  <option value="Preparando">🔵 Preparando</option>
                  <option value="Enviado">🟣 Enviado</option>
                  <option value="Entregado">🟢 Entregado</option>
                  <option value="Cancelado">🔴 Cancelado</option>
                </select>
              </div>
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
    </AdminLayout>
  );
}

export default AdminView;
