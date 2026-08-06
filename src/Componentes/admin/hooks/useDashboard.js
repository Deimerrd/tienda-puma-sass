import { useMemo } from "react";

export default function useDashboard(ventas, products) {
  // Estadísticas generales
  const estadisticasPedidos = useMemo(() => {
    const entregados = ventas.filter((v) => v.estado === "Entregado");
    const pendientes = ventas.filter((v) => v.estado !== "Entregado");

    return { entregados, pendientes };
  }, [ventas]);

  const { entregados, pendientes } = estadisticasPedidos;

  const totalVendido = ventas.reduce(
    (acc, venta) => acc + Number(venta.total),
    0,
  );

  const totalEntregado = entregados.reduce(
    (acc, venta) => acc + Number(venta.total),
    0,
  );

  // Caja de hoy
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

  // Top productos
  const rankingProductos = {};

  ventas.forEach((venta) => {
    venta.productos.forEach((producto) => {
      const clave = `${producto.name} | ${producto.color || "Sin color"} | ${
        producto.size || "Sin talla"
      }`;

      rankingProductos[clave] =
        (rankingProductos[clave] || 0) + Number(producto.cantidad || 1);
    });
  });

  const topProductos = Object.entries(rankingProductos)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Top tallas
  const rankingTallas = {};

  ventas.forEach((venta) => {
    venta.productos.forEach((producto) => {
      const talla = producto.size || "Sin talla";

      rankingTallas[talla] =
        (rankingTallas[talla] || 0) + Number(producto.cantidad || 1);
    });
  });

  const topTallas = Object.entries(rankingTallas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Top colores
  const rankingColores = {};

  ventas.forEach((venta) => {
    venta.productos.forEach((producto) => {
      const color = producto.color || "Sin color";

      rankingColores[color] =
        (rankingColores[color] || 0) + Number(producto.cantidad || 1);
    });
  });

  const topColores = Object.entries(rankingColores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Productos por reponer
  const productosReponer = products
    .map((prod) => {
      let vendidos = 0;

      ventas.forEach((venta) => {
        venta.productos.forEach((item) => {
          if (
            item.name === prod.name &&
            item.color === prod.color &&
            item.size === prod.size
          ) {
            vendidos += Number(item.cantidad || 1);
          }
        });
      });

      return {
        ...prod,
        vendidos,
      };
    })
    .filter((prod) => prod.vendidos > 0 && Number(prod.stock) <= 5)
    .sort((a, b) => b.vendidos - a.vendidos)
    .slice(0, 10);

  // Resumen mensual
  const ventasPorMes = {};

  ventas.forEach((venta) => {
    if (!venta.fecha) return;

    const fecha = new Date(venta.fecha);

    const mes = fecha.toLocaleDateString("es-CO", {
      month: "long",
      year: "numeric",
    });

    ventasPorMes[mes] =
      (ventasPorMes[mes] || 0) + Number(venta.total || venta.totalCompra || 0);
  });

  const resumenMensual = Object.entries(ventasPorMes).map(([mes, total]) => ({
    mes,
    total,
  }));

  const ultimoMes = resumenMensual[resumenMensual.length - 1];

  const mesAnterior = resumenMensual[resumenMensual.length - 2];

  let crecimiento = 0;

  if (ultimoMes && mesAnterior && mesAnterior.total > 0) {
    crecimiento =
      ((ultimoMes.total - mesAnterior.total) / mesAnterior.total) * 100;
  }

  // Datos gráfica
  const ventasPorMesGrafica = {};

  ventas.forEach((venta) => {
    const fechaVenta = new Date(venta.fecha);

    const numeroMes = fechaVenta.getMonth() + 1;

    const nombreMes = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ][numeroMes - 1];

    ventasPorMesGrafica[nombreMes] =
      (ventasPorMesGrafica[nombreMes] || 0) + Number(venta.total);
  });

  const datosGrafica = Object.keys(ventasPorMesGrafica).map((mes) => ({
    mes,
    ventas: ventasPorMesGrafica[mes],
  }));

  return {
    entregados,
    pendientes,
    totalVendido,
    totalEntregado,
    ventasHoy,
    totalHoy,
    topProductos,
    topTallas,
    topColores,
    productosReponer,
    resumenMensual,
    ultimoMes,
    mesAnterior,
    crecimiento,
    datosGrafica,
  };
}
