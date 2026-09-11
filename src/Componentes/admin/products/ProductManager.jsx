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
  // OBTENER PRODUCTOS VENDIDOS
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
  // OBTENER STOCK TOTAL
  //
  // Si el producto tiene variantes:
  // suma el stock de todas las variantes.
  //
  // Si es un producto antiguo:
  // utiliza producto.stock.
  // ==========================================================

  const obtenerStock = (producto) => {
    if (Array.isArray(producto.variantes) && producto.variantes.length > 0) {
      return producto.variantes.reduce(
        (total, variante) => total + Number(variante.stock || 0),
        0,
      );
    }

    return Number(producto.stock || 0);
  };

  // ==========================================================
  // OBTENER VENDIDOS DE VARIANTES
  // ==========================================================

  const obtenerVendidosVariantes = (producto) => {
    if (!Array.isArray(producto.variantes) || producto.variantes.length === 0) {
      return obtenerVendidos(producto);
    }

    return producto.variantes.reduce(
      (total, variante) => total + Number(variante.vendidos || 0),
      0,
    );
  };

  // ==========================================================
  // OBTENER ESTADO DEL PRODUCTO
  // ==========================================================

  const obtenerEstado = (producto) => {
    const stock = obtenerStock(producto);

    if (stock <= 0) {
      return {
        agotado: true,
        texto: "🔴 AGOTADO",
        color: "#ef4444",
      };
    }

    return {
      agotado: false,
      texto: "🟢 DISPONIBLE",
      color: "#22c55e",
    };
  };

  // ==========================================================
  // FILTRAR PRODUCTOS
  // ==========================================================

  const productosFiltrados = products.filter((producto) => {
    const textoBusqueda = busqueda.toLowerCase().trim();

    const coincideBusqueda =
      producto.id?.toString().toLowerCase().includes(textoBusqueda) ||
      producto.name?.toLowerCase().includes(textoBusqueda);

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

      // Si el producto antiguo no tiene variantes,
      // inicializamos una lista vacía.
      variantes: Array.isArray(producto.variantes) ? producto.variantes : [],
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
        setArticulo={setArticulo}
      />

      {/* ======================================================
          LISTADO DE PRODUCTOS
      ====================================================== */}

      <div
        style={{
          background: "#171717",
          color: "white",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "30px",
        }}
      >
        {/* ==================================================
            ENCABEZADO
        ================================================== */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "18px",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#f97316",
              fontSize: "22px",
            }}
          >
            📦 Productos registrados
          </h2>

          <div
            style={{
              fontSize: "13px",
              color: "#9ca3af",
            }}
          >
            Total: <strong style={{ color: "#fff" }}>{products.length}</strong>
          </div>
        </div>

        {/* ==================================================
            BUSCADOR Y FILTRO
        ================================================== */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(250px, 1fr) 220px",
            gap: "10px",
            marginBottom: "18px",
          }}
        >
          <input
            type="text"
            placeholder="🔎 Buscar por código o nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "11px 13px",
              background: "#222",
              color: "#fff",
              border: "1px solid #404040",
              borderRadius: "7px",
              outline: "none",
            }}
          />

          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            style={{
              padding: "11px",
              background: "#222",
              color: "#fff",
              border: "1px solid #404040",
              borderRadius: "7px",
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
            marginBottom: "15px",
            fontSize: "13px",
            color: "#9ca3af",
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
              padding: "35px",
              textAlign: "center",
              background: "#222",
              borderRadius: "8px",
              color: "#9ca3af",
            }}
          >
            📦 No se encontraron productos.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
              gap: "14px",
            }}
          >
            {productosFiltrados.map((producto) => {
              const stock = obtenerStock(producto);

              const vendidos = obtenerVendidosVariantes(producto);

              const estado = obtenerEstado(producto);

              const categoria = categories.find(
                (cat) => cat.id === producto.category,
              );

              const tieneVariantes =
                Array.isArray(producto.variantes) &&
                producto.variantes.length > 0;

              return (
                <div
                  key={producto.id}
                  style={{
                    background: "#242424",
                    borderRadius: "9px",
                    overflow: "hidden",
                    border: `1px solid ${
                      estado.agotado ? "#7f1d1d" : "#383838"
                    }`,
                    opacity: estado.agotado ? 0.65 : 1,
                  }}
                >
                  {/* ==================================================
                      IMAGEN PEQUEÑA
                  ================================================== */}

                  {producto.image ? (
                    <img
                      src={producto.image.split(",")[0].trim()}
                      alt={producto.name}
                      style={{
                        width: "100%",
                        height: "130px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "130px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#111",
                        fontSize: "40px",
                      }}
                    >
                      📦
                    </div>
                  )}

                  {/* ==================================================
                      INFORMACIÓN
                  ================================================== */}

                  <div
                    style={{
                      padding: "13px",
                    }}
                  >
                    {/* ESTADO */}

                    <div
                      style={{
                        color: estado.color,
                        fontWeight: "bold",
                        fontSize: "12px",
                        marginBottom: "7px",
                      }}
                    >
                      {estado.texto}
                    </div>

                    {/* REFERENCIA */}

                    <div
                      style={{
                        fontSize: "11px",
                        color: "#888",
                        marginBottom: "3px",
                      }}
                    >
                      REF: {producto.id}
                    </div>

                    {/* NOMBRE */}

                    <h3
                      style={{
                        margin: "4px 0",
                        fontSize: "16px",
                        lineHeight: "1.25",
                        color: "#fff",
                      }}
                    >
                      {producto.name}
                    </h3>

                    {/* CATEGORÍA */}

                    <div
                      style={{
                        color: "#f97316",
                        fontSize: "12px",
                        marginBottom: "8px",
                      }}
                    >
                      {categoria?.icono || "📦"}{" "}
                      {categoria?.name || producto.category}
                    </div>

                    {/* PRECIO */}

                    <div
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      {formatearPrecio(Number(producto.price || 0))}
                    </div>

                    {/* ==================================================
                        ESTADÍSTICAS
                    ================================================== */}

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "6px",
                        marginBottom: "10px",
                      }}
                    >
                      <div
                        style={{
                          background: "#171717",
                          padding: "7px",
                          borderRadius: "6px",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "10px",
                            color: "#999",
                          }}
                        >
                          📦 Disponible
                        </div>

                        <strong
                          style={{
                            display: "block",
                            fontSize: "17px",
                            color: stock <= 0 ? "#ef4444" : "#22c55e",
                          }}
                        >
                          {stock}
                        </strong>
                      </div>

                      <div
                        style={{
                          background: "#171717",
                          padding: "7px",
                          borderRadius: "6px",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "10px",
                            color: "#999",
                          }}
                        >
                          🛒 Vendidos
                        </div>

                        <strong
                          style={{
                            display: "block",
                            fontSize: "17px",
                            color: "#f97316",
                          }}
                        >
                          {vendidos}
                        </strong>
                      </div>
                    </div>

                    {/* ==================================================
                        VARIANTES
                    ================================================== */}

                    {tieneVariantes && (
                      <div
                        style={{
                          marginTop: "8px",
                          marginBottom: "10px",
                          padding: "8px",
                          background: "#1b1b1b",
                          borderRadius: "6px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#aaa",
                            marginBottom: "6px",
                            fontWeight: "bold",
                          }}
                        >
                          🎨 VARIANTES
                        </div>

                        {producto.variantes.map((variante) => {
                          const stockVariante = Number(variante.stock || 0);

                          const agotada = stockVariante <= 0;

                          return (
                            <div
                              key={variante.id}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "4px 0",
                                fontSize: "11px",
                                color: agotada ? "#777" : "#ddd",
                              }}
                            >
                              <span>
                                {variante.color || "Sin color"} /{" "}
                                {variante.talla || "Sin talla"}
                              </span>

                              <strong
                                style={{
                                  color: agotada ? "#ef4444" : "#22c55e",
                                }}
                              >
                                {agotada ? "Agotado" : variante.stock}
                              </strong>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* PRODUCTOS ANTIGUOS */}

                    {!tieneVariantes && producto.color && (
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#ccc",
                          marginBottom: "4px",
                        }}
                      >
                        🎨 {producto.color}
                      </div>
                    )}

                    {!tieneVariantes && producto.size && (
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#ccc",
                          marginBottom: "10px",
                        }}
                      >
                        📏 {producto.size}
                      </div>
                    )}

                    {/* ==================================================
                        BOTONES
                    ================================================== */}

                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                      }}
                    >
                      <button
                        onClick={() => editarProducto(producto)}
                        style={{
                          flex: 1,
                          padding: "8px",
                          background: "#2563eb",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        ✏️ Editar
                      </button>

                      <button
                        onClick={() => eliminarProducto(producto.id)}
                        style={{
                          flex: 1,
                          padding: "8px",
                          background: "#dc2626",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "12px",
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
