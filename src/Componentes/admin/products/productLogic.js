export function handleChange(e, articulo, setArticulo) {
  setArticulo({
    ...articulo,
    [e.target.name]: e.target.value,
  });
}

export function agregarStock(idProducto, products, setProducts) {
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

export function restarStock(idProducto, products, setProducts) {
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
