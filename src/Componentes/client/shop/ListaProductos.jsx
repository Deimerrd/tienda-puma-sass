import TarjetaProducto from "./TarjetaProducto";

function ListaProductos({
  productosFiltrados,
  resetTrigger,
  AgregarAlCarrito,
  formatearPrecio,
  setProductoSeleccionado,
  setVerDetalle,
}) {
  return (
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
  );
}

export default ListaProductos;
