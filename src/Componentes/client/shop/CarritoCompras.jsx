function CarritoCompras({
  cart,
  formatearPrecio,
  disminuirCantidad,
  aumentarCantidad,
  eliminarDelCarrito,
}) {
  return (
    <>
      <h2>Tddu carrito de Compradxddsddsdd</h2>
      {cart.length === 0 ? (
        <p>Elsd carrito está svacío.</p>
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
        </div>
      )}
    </>
  );
}

export default CarritoCompras;
