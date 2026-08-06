export function filtrarProductos(products, busquedaProducto) {
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
}
