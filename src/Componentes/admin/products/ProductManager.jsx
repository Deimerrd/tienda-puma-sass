import { useState } from "react";

import ProductBasicForm from "./ProductBasicForm";
import ProductDetailsForm from "./ProductDetailsForm";

function ProductManager({
  articulo,
  handleChange,
  categories,
  Guardar,
  products,
  ventas,
  setArticulo,
  eliminarProducto,
  formatearPrecio,
}) {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");

  // ==========================================================
  // CALCULAR CUÁNTAS UNIDADES SE HAN VENDIDO
  // ==========================================================

  const obtenerVendidos = (producto) => {
    let cantidadVendida = 0;

    ventas.forEach((venta) => {
      if (!venta.productos) return;

      venta.productos.forEach((item) => {
        if (item.id === producto.id || item.id?.startsWith(`${producto.id}-`)) {
          cantidadVendida += Number(item.cantidad || 1);
        }
      });
    });

    return cantidadVendida;
  };

  // ==========================================================
  // FILTRAR PRODUCTOS
  // ==========================================================

  const productosFiltrados = products.filter((producto) => {
    const coincideBusqueda =
      producto.id?.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.name?.toLowerCase().includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoriaFiltro === "todas" || producto.category === categoriaFiltro;

    return coincideBusqueda && coincideCategoria;
  });

  // ==========================================================
  // EDITAR PRODUCTO
  // ==========================================================

  const editarProducto = (producto) => {
    setArticulo({
      ...producto,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ======================================================
          FORMULARIO
      ====================================================== */}

      <ProductBasicForm
        articulo={articulo}
        handleChange={handleChange}
        categories={categories}
      />

      <ProductDetailsForm
        articulo={articulo}
        handleChange={handleChange}
        Guardar={Guardar}
      />

      {/* ======================================================
          LISTADO DE PRODUCTOS
      ====================================================== */}

      <div
        style={{
          background: "#171717",
          color: "white",
          padding: "25px",
          borderRadius: "12px",
          marginTop: "30px",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: "20px",
            color: "#f97316",
          }}
        >
          📦 Productos registrados
        </h2>

        {/* ==================================================
            BUSCADOR Y FILTRO
        ================================================== */}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          {/* BUSCADOR */}

          <input
            type="text"
            placeholder="🔎 Buscar por código o nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "12px",
              background: "#262626",
              color: "white",
              border: "1px solid #404040",
              borderRadius: "8px",
            }}
          />

          {/* CATEGORÍA */}

          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            style={{
              padding: "12px",
              background: "#262626",
              color: "white",
              border: "1px solid #404040",
              borderRadius: "8px",
              minWidth: "200px",
            }}
          >
            <option value="todas">📂 Todas las categorías</option>

            {categories.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.icono} {categoria.name}
              </option>
            ))}
          </select>
        </div>

        {/* ==================================================
            CONTADOR
        ================================================== */}

        <div
          style={{
            marginBottom: "20px",
            color: "#d1d5db",
          }}
        >
          Mostrando{" "}
          <strong style={{ color: "#f97316" }}>
            {productosFiltrados.length}
          </strong>{" "}
          producto(s)
        </div>

        {/* ==================================================
            PRODUCTOS
        ================================================== */}

        {productosFiltrados.length === 0 ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              background: "#262626",
              borderRadius: "10px",
              color: "#9ca3af",
            }}
          >
            📦 No se encontraron productos.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {productosFiltrados.map((producto) => {
              const vendidos = obtenerVendidos(producto);

              const stock = Number(producto.stock || 0);

              const agotado = stock <= 0;

              const categoria = categories.find(
                (cat) => cat.id === producto.category,
              );

              return (
                <div
                  key={producto.id}
                  style={{
                    background: "#262626",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: agotado ? "1px solid #7f1d1d" : "1px solid #404040",

                    opacity: agotado ? 0.55 : 1,

                    transition: "0.2s",
                  }}
                >
                  {/* FOTO */}

                  {producto.image ? (
                    <img
                      src={producto.image.split(",")[0].trim()}
                      alt={producto.name}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#111",
                        fontSize: "60px",
                      }}
                    >
                      📦
                    </div>
                  )}

                  {/* INFORMACIÓN */}

                  <div style={{ padding: "18px" }}>
                    {/* ESTADO */}

                    <div
                      style={{
                        marginBottom: "10px",
                        fontWeight: "bold",
                        color: agotado ? "#ef4444" : "#22c55e",
                      }}
                    >
                      {agotado ? "🔴 AGOTADO / VENDIDO" : "🟢 DISPONIBLE"}
                    </div>

                    {/* CÓDIGO */}

                    <div
                      style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "5px",
                      }}
                    >
                      REF: {producto.id}
                    </div>

                    {/* NOMBRE */}

                    <h3
                      style={{
                        margin: "5px 0",
                        color: "white",
                      }}
                    >
                      {producto.name}
                    </h3>

                    {/* CATEGORÍA */}

                    <div
                      style={{
                        color: "#f97316",
                        fontSize: "14px",
                        marginBottom: "10px",
                      }}
                    >
                      {categoria?.icono || "📦"}{" "}
                      {categoria?.name || producto.category}
                    </div>

                    {/* PRECIO */}

                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "15px",
                      }}
                    >
                      {formatearPrecio(Number(producto.price || 0))}
                    </div>

                    {/* ESTADÍSTICAS */}

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "10px",
                        marginBottom: "15px",
                      }}
                    >
                      <div
                        style={{
                          background: "#171717",
                          padding: "10px",
                          borderRadius: "8px",
                          textAlign: "center",
                        }}
                      >
                        <small>📦 Disponible</small>

                        <strong
                          style={{
                            display: "block",
                            fontSize: "20px",
                            color: agotado ? "#ef4444" : "#22c55e",
                          }}
                        >
                          {stock}
                        </strong>
                      </div>

                      <div
                        style={{
                          background: "#171717",
                          padding: "10px",
                          borderRadius: "8px",
                          textAlign: "center",
                        }}
                      >
                        <small>🛒 Vendidos</small>

                        <strong
                          style={{
                            display: "block",
                            fontSize: "20px",
                            color: "#f97316",
                          }}
                        >
                          {vendidos}
                        </strong>
                      </div>
                    </div>

                    {/* COLOR */}

                    {producto.color && (
                      <div
                        style={{
                          fontSize: "13px",
                          marginBottom: "5px",
                        }}
                      >
                        🎨 <strong>Color:</strong> {producto.color}
                      </div>
                    )}

                    {/* TALLA */}

                    {producto.size && (
                      <div
                        style={{
                          fontSize: "13px",
                          marginBottom: "15px",
                        }}
                      >
                        📏 <strong>Talla:</strong> {producto.size}
                      </div>
                    )}

                    {/* BOTONES */}

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <button
                        onClick={() => editarProducto(producto)}
                        style={{
                          flex: 1,
                          padding: "10px",
                          background: "#2563eb",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        ✏️ Editar
                      </button>

                      <button
                        onClick={() => eliminarProducto(producto.id)}
                        style={{
                          flex: 1,
                          padding: "10px",
                          background: "#dc2626",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default ProductManager;
