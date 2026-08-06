export function filtrarPedidos(ventas, busquedaPedido) {
  if (!busquedaPedido.trim()) return ventas;

  const texto = busquedaPedido.toLowerCase();

  return ventas.filter((vst) => {
    return (
      String(vst.cliente || "")
        .toLowerCase()
        .includes(texto) ||
      String(vst.cedula || "")
        .toLowerCase()
        .includes(texto) ||
      String(vst.telefono || "")
        .toLowerCase()
        .includes(texto) ||
      String(vst.idVenta || "")
        .toLowerCase()
        .includes(texto)
    );
  });
}
