function InventoryManager({
  productosStockCritico,
  productosFiltrados,
  busquedaProducto,
  setBusquedaProducto,
  formatearPrecio,
  setArticulo,
  agregarStock,
  restarStock,
  eliminarProducto,
}) {
  return (
    <>
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
    </>
  );
}

export default InventoryManager;
