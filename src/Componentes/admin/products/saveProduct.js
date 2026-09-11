export function GuardarProducto({
  articulo,
  products,
  setProducts,
  setArticulo,
}) {
  // ==========================================================
  // 1. VALIDACIÓN DE CAMPOS OBLIGATORIOS
  // ==========================================================

  if (
    !articulo.id?.trim() ||
    !articulo.name?.trim() ||
    !articulo.category?.trim() ||
    !articulo.price?.toString().trim() ||
    !articulo.marca?.trim() ||
    !articulo.image?.trim()
  ) {
    alert(
      "⚠️ Error: Los campos ID, Nombre, Categoría, Precio, Marca e Imagen son obligatorios.",
    );
    return;
  }

  // ==========================================================
  // 2. VALIDAR PRECIO
  // ==========================================================

  const precioNumerico = Number(articulo.price);

  if (isNaN(precioNumerico)) {
    alert("⚠️ El precio debe ser un número válido.");
    return;
  }

  if (precioNumerico <= 0) {
    alert("⚠️ El precio debe ser mayor que $0.");
    return;
  }

  // ==========================================================
  // 3. NORMALIZAR VARIANTES
  // ==========================================================

  const variantesNormalizadas = (articulo.variantes || []).map((variante) => ({
    ...variante,

    id:
      variante.id ||
      `VAR-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,

    color: variante.color?.trim() || "",

    talla: variante.talla?.trim() || "",

    stock: Math.max(0, Number(variante.stock || 0)),

    vendidos: Math.max(0, Number(variante.vendidos || 0)),
  }));

  // ==========================================================
  // 4. CALCULAR STOCK TOTAL
  // ==========================================================

  const stockVariantes = variantesNormalizadas.reduce(
    (total, variante) => total + Number(variante.stock || 0),
    0,
  );

  /*
   * Si existen variantes, el stock general será
   * la suma de todas las variantes.
   *
   * Ejemplo:
   *
   * Azul 40 = 2
   * Azul 41 = 3
   * Blanco 40 = 1
   *
   * STOCK TOTAL = 6
   */

  const productoFinal = {
    ...articulo,

    price: precioNumerico,

    variantes: variantesNormalizadas,

    stock:
      variantesNormalizadas.length > 0
        ? stockVariantes
        : Math.max(0, Number(articulo.stock || 0)),
  };

  // ==========================================================
  // 5. BUSCAR SI EL PRODUCTO YA EXISTE
  // ==========================================================

  const idExiste = products.find(
    (prod) =>
      prod.id?.trim().toLowerCase() === articulo.id.trim().toLowerCase(),
  );

  // ==========================================================
  // 6. MODO EDICIÓN
  // ==========================================================

  if (idExiste) {
    const confirmacion = window.confirm(
      `¿Deseas guardar los cambios realizados en "${articulo.name}"?`,
    );

    if (!confirmacion) return;

    setProducts((prev) =>
      prev.map((prod) =>
        prod.id?.trim().toLowerCase() === articulo.id.trim().toLowerCase()
          ? productoFinal
          : prod,
      ),
    );

    alert("✅ Los cambios del producto fueron guardados correctamente.");

    // Limpiar formulario
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
      variantes: [],
    });

    return;
  }

  // ==========================================================
  // 7. REGISTRAR PRODUCTO NUEVO
  // ==========================================================

  setProducts((prev) => [...prev, productoFinal]);

  alert("✅ El nuevo producto fue registrado correctamente.");

  // ==========================================================
  // 8. LIMPIAR FORMULARIO
  // ==========================================================

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
    variantes: [],
  });
}
