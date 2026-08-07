import InventoryCard from "./InventoryCard";

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
      {/* 📦 SECCIÓN A: PRODUCTOS POR REABASTECER */}
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

      {/* 📦 INVENTARIO */}
      <h3 style={{ fontFamily: "sans-serif", marginTop: "30px" }}>
        Inventario de la tienda
      </h3>

      {/* 🔍 BUSCADOR */}
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

      {/* 📋 LISTA DE PRODUCTOS */}
      {productosFiltrados.length === 0 ? (
        <p style={{ fontFamily: "sans-serif" }}>
          🔍 No se encontraron productos.
        </p>
      ) : (
        productosFiltrados.map((prod) => (
          <InventoryCard
            key={prod.id}
            prod={prod}
            formatearPrecio={formatearPrecio}
            setArticulo={setArticulo}
            agregarStock={agregarStock}
            restarStock={restarStock}
            eliminarProducto={eliminarProducto}
          />
        ))
      )}
    </>
  );
}

export default InventoryManager;
