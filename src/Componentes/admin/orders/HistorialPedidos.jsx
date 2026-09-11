function HistorialPedidos({
  ventasFiltradas,
  formatearPrecio,
  cambiarEstadoPedido,
  marcarPedidoEntregado,
  cancelarPedidoAdmin,
  generarFacturaPDF,
  modoIngenieroActivo,
  forzarDesbloqueoDev,
}) {
  return (
    <>
      <p>Total de ventas encontradas: {ventasFiltradas.length}</p>

      {ventasFiltradas.length === 0 ? (
        <p style={{ fontFamily: "sans-serif" }}>No hay ventas registradas.</p>
      ) : (
        ventasFiltradas.map((vst) => (
          <div
            key={vst.idVenta}
            style={{
              border: "2px solid green",
              padding: "15px",
              margin: "15px 0",
              background: "#f0fdf4",
              borderRadius: "6px",
              fontFamily: "sans-serif",
            }}
          >
            <p>
              <strong>Fecha:</strong> {vst.fecha}
            </p>

            <p>
              <strong>Hora:</strong> {vst.hora}
            </p>

            <div
              style={{
                background: "#fff",
                padding: "10px",
                border: "1px solid #ccc",
                marginBottom: "10px",
                color: "#333",
              }}
            >
              👤 <strong>Cliente:</strong> {vst.cliente} | 💳{" "}
              <strong>Cédula:</strong> {vst.cedula}
              <br />
              📞 <strong>Teléfono:</strong> {vst.telefono}
              <br />
              📍 <strong>Dirección:</strong> {vst.direccion}
              <br />
              📧 <strong>Correo:</strong> {vst.correo} 💰{" "}
              <strong>Método:</strong> {vst.metodoPago}
            </div>

            <h4 style={{ color: "#333" }}>Compró:</h4>

            <ul
              style={{
                listStyleType: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <button
                onClick={() => generarFacturaPDF(vst)}
                style={{
                  padding: "10px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                📄 Descargar Factura
              </button>

              {vst.productos.map((item, idx) => {
                const fotoProducto = item.image
                  ? item.image.split(",")[0].trim()
                  : "";

                return (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      background: "#ffffff",
                      padding: "10px",
                      border: "1px solid #cbd5e1",
                      color: "#333333",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: "55px",
                        height: "55px",
                        overflow: "hidden",
                        background: "#f8fafc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #cbd5e1",
                      }}
                    >
                      {fotoProducto ? (
                        <img
                          src={fotoProducto}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            fontSize: "9px",
                            color: "#94a3b8",
                          }}
                        >
                          Sin foto
                        </span>
                      )}
                    </div>

                    <div>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          display: "block",
                        }}
                      >
                        {item.name}
                      </span>

                      <span
                        style={{
                          fontSize: "12px",
                          color: "#64748b",
                          display: "block",
                          marginTop: "2px",
                        }}
                      >
                        Ref: <strong>{item.id}</strong> | Color:{" "}
                        {item.color || "Estándar"} | Talla:{" "}
                        <strong>{item.size || "Única"}</strong>
                      </span>

                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#000000",
                          display: "block",
                          marginTop: "2px",
                        }}
                      >
                        Cantidad: {item.cantidad} uds
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p
              style={{
                fontWeight: "bold",
                textAlign: "right",
                color: "darkgreen",
                margin: "0 0 10px 0",
                fontSize: "16px",
              }}
            >
              Total: {formatearPrecio(vst.total)}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <strong>Estado:</strong>

                <select
                  value={vst.estado}
                  onChange={(e) =>
                    cambiarEstadoPedido(vst.idVenta, e.target.value)
                  }
                  style={{
                    marginLeft: "10px",
                    padding: "5px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                  }}
                >
                  <option value="Pendiente">🟡 Pendiente</option>
                  <option value="Preparando">🔵 Preparando</option>
                  <option value="Enviado">🟣 Enviado</option>
                  <option value="Entregado">🟢 Entregado</option>
                  <option value="Cancelado">🔴 Cancelado</option>
                </select>
              </div>

              {vst.estado === "Entregado" ? (
                <span
                  style={{
                    background: "#069663",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  ✅ PROCESO FINALIZADO CON ÉXITO ({vst.fechaEntrega})
                </span>
              ) : (
                <button
                  onClick={() => marcarPedidoEntregado(vst.idVenta)}
                  style={{
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  📦 Marcar como Entregado
                </button>
              )}

              <button
                disabled={vst.estado === "Entregado"}
                onClick={() => cancelarPedidoAdmin(vst.idVenta)}
                style={{
                  background:
                    vst.estado === "Entregado" ? "#404040" : "#ef4444",
                  color: vst.estado === "Entregado" ? "#a3a3a3" : "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor:
                    vst.estado === "Entregado" ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                }}
              >
                🗑️ Eliminar Orden
              </button>

              {vst.estado === "Entregado" && modoIngenieroActivo && (
                <button
                  onClick={() => {
                    const passDev = window.prompt(
                      "💻 MÓDULO INGENIERO: Ingrese la clave de desarrollador para romper el candado:",
                    );

                    if (passDev === "Admin2021") {
                      forzarDesbloqueoDev(vst.idVenta);
                    } else if (passDev !== null) {
                      alert("❌ Error: Clave incorrecta.");
                    }
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#f97316",
                    cursor: "pointer",
                    fontSize: "12px",
                    textDecoration: "underline",
                    padding: "0",
                    fontWeight: "bold",
                  }}
                >
                  🛠️ Forzar desbloqueo (Solo Desarrollador)
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default HistorialPedidos;
