export function obtenerEstadisticasPedidos(ventas) {
  const entregados = ventas.filter((v) => v.estado === "Entregado");

  const pendientes = ventas.filter((v) => v.estado !== "Entregado");

  const totalVendido = ventas.reduce(
    (acc, venta) => acc + Number(venta.total),
    0,
  );

  const totalEntregado = entregados.reduce(
    (acc, venta) => acc + Number(venta.total),
    0,
  );

  const hoy = new Date();

  const ventasHoy = ventas.filter((v) => {
    const fechaVenta = new Date(v.fechaISO);

    return (
      fechaVenta.getDate() === hoy.getDate() &&
      fechaVenta.getMonth() === hoy.getMonth() &&
      fechaVenta.getFullYear() === hoy.getFullYear()
    );
  });

  const totalHoy = ventasHoy.reduce(
    (acc, venta) => acc + Number(venta.total),
    0,
  );

  return {
    entregados,
    pendientes,
    totalVendido,
    totalEntregado,
    ventasHoy,
    totalHoy,
  };
}
