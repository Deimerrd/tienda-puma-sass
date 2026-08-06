import jsPDF from "jspdf";

export function generarFacturaPDF(vst) {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(18);
  doc.text("FACTURA DE VENTA", 20, y);

  y += 15;

  doc.setFontSize(12);

  doc.text(`Factura: ${vst.idVenta}`, 20, y);
  y += 10;

  doc.text(`Fecha: ${vst.fecha}`, 20, y);
  y += 10;

  doc.text(`Hora: ${vst.hora}`, 20, y);
  y += 10;

  doc.text(`Cliente: ${vst.cliente}`, 20, y);
  y += 10;

  doc.text(`Cedula: ${vst.cedula}`, 20, y);
  y += 10;

  doc.text(`Telefono: ${vst.telefono}`, 20, y);
  y += 10;

  doc.text(`Correo: ${vst.correo}`, 20, y);
  y += 10;

  doc.text(`Direccion: ${vst.direccion}`, 20, y);

  y += 20;

  doc.text("PRODUCTOS", 20, y);

  y += 10;

  vst.productos.forEach((item) => {
    doc.text(`${item.name} x${item.cantidad} - $${item.price}`, 20, y);
    y += 10;
  });

  y += 10;

  doc.text(`Metodo de pago: ${vst.metodoPago}`, 20, y);

  y += 10;

  doc.text(`TOTAL: $${vst.total}`, 20, y);

  doc.save(`Factura-${vst.idVenta}.pdf`);
}
