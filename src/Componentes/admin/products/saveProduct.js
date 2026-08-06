export function GuardarProducto({
  articulo,
  products,
  setProducts,
  setArticulo,
}) {
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
