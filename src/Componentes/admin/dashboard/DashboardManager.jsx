function DashboardManager({ ventas, products }) {
  const rankingProductos = {};

  ventas.forEach((venta) => {
    venta.productos.forEach((producto) => {
      const clave = `${producto.name} | ${producto.color || "Sin color"} | ${
        producto.size || "Sin talla"
      }`;

      if (!rankingProductos[clave]) {
        rankingProductos[clave] = 0;
      }

      rankingProductos[clave] += Number(producto.cantidad || 1);
    });
  });

  const topProductos = Object.entries(rankingProductos)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const rankingTallas = {};

  ventas.forEach((venta) => {
    venta.productos.forEach((producto) => {
      const talla = producto.size || "Sin talla";

      if (!rankingTallas[talla]) {
        rankingTallas[talla] = 0;
      }

      rankingTallas[talla] += Number(producto.cantidad || 1);
    });
  });

  const topTallas = Object.entries(rankingTallas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const rankingColores = {};

  ventas.forEach((venta) => {
    venta.productos.forEach((producto) => {
      const color = producto.color || "Sin color";

      if (!rankingColores[color]) {
        rankingColores[color] = 0;
      }

      rankingColores[color] += Number(producto.cantidad || 1);
    });
  });

  const topColores = Object.entries(rankingColores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

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

  const ventasPorMes = {};

  ventas.forEach((venta) => {
    if (!venta.fecha) return;

    const fecha = new Date(venta.fecha);

    const mes = fecha.toLocaleDateString("es-CO", {
      month: "long",
      year: "numeric",
    });

    if (!ventasPorMes[mes]) {
      ventasPorMes[mes] = 0;
    }

    ventasPorMes[mes] += Number(venta.total || venta.totalCompra || 0);
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

export default DashboardManager;
