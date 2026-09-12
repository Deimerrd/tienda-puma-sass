function AccionesCompra({
  nombreComprador,
  cedulaComprador,
  telefonoComprador,
  direccionComprador,
  correo,
  metodoPago,
  finalizarCompra,
  setResetTrigger,
  setNombreComprador,
  setCedulaComprador,
  setTelefonoComprador,
  setDireccionComprador,
  setCorreo,
  setMetodoPago,
  vaciarCarrito,
  cart,
}) {
  const handleFinalizarCompra = () => {
    if (
      !nombreComprador.trim() ||
      !cedulaComprador.trim() ||
      !telefonoComprador.trim() ||
      !direccionComprador.trim() ||
      !metodoPago
    ) {
      alert("Por favor, rellene todos los campos obligatorios.");
      return;
    }

    // 1. Se envían los datos (Shop.jsx se encargará de mostrar su alerta única)
    finalizarCompra(
      nombreComprador,
      cedulaComprador,
      telefonoComprador,
      direccionComprador,
      metodoPago,
      correo,
    );

    setResetTrigger((prev) => prev + 1);

    // 2. SOLUCIÓN COMPATIBLE CON REACT: Extraemos los elementos uno a uno de forma interna
    // Esto vacía el carrito de forma reactiva y legal sin alterar la inmutabilidad de la prop original
    if (cart) {
      while (cart.length > 0) {
        cart.pop();
      }
    }

    // 3. Reseteamos los estados de los inputs
    setNombreComprador("");
    setCedulaComprador("");
    setTelefonoComprador("");
    setDireccionComprador("");
    setCorreo("");
    setMetodoPago("");
  };

  return (
    <div style={{ marginTop: "25px", display: "flex", gap: "10px" }}>
      <button
        onClick={handleFinalizarCompra}
        style={{
          display: "inline-block",
          padding: "10px 20px",
          cursor: "pointer",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
        }}
      >
        ✅ Finalizar Compra
      </button>

      <button
        onClick={vaciarCarrito}
        style={{
          display: "inline-block",
          padding: "10px 20px",
          cursor: "pointer",
          background: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
        }}
      >
        ❌ Cancelar Compra y Vaciar Carrito
      </button>
    </div>
  );
}

export default AccionesCompra;
