import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

function OrderManager({
  ventas,
  ventasFiltradas,
  busquedaPedido,
  setBusquedaPedido,
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
  formatearPrecio,
  marcarPedidoEntregado,
  cambiarEstadoPedido,
  cancelarPedidoAdmin,
  generarFacturaPDF,
  modoIngenieroActivo,
  forzarDesbloqueoDev,
}) {
  return (
    <>
      <input
        type="text"
        placeholder="🔍 Buscar pedido..."
        value={busquedaPedido}
        onChange={(e) => setBusquedaPedido(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      {/* 📋 SECCIÓN B: HISTORIAL DE PEDIDOS CONTRAENTREGA */}
      <h3
        style={{ marginTop: "40px", color: "green", fontFamily: "sans-serif" }}
      >
        📋 Historial de Pedidos
      </h3>

      <div
        style={{
          background: "#f4f4f4",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>💰 Caja General</h2>

        <p>
          <strong>Pedidos Totales:</strong> {ventas.length}
        </p>

        <p>
          <strong>Entregados:</strong> {entregados.length}
        </p>

        <p>
          <strong>Pendientes:</strong> {pendientes.length}
        </p>

        <p>
          <strong>Total Vendido:</strong> {formatearPrecio(totalVendido)}
        </p>

        <p>
          <strong>Total Entregado:</strong> {formatearPrecio(totalEntregado)}
        </p>
      </div>

      <div
        style={{
          background: "#dbeafe",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>📅 Caja de Hoy</h2>
        <p>
          <strong>Pedidos Hoy:</strong> {ventasHoy.length}
        </p>

        <p>
          <strong>Ventas Hoy:</strong> {formatearPrecio(totalHoy)}
        </p>
      </div>
      <div
        style={{
          background: "#fef3c7",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>🏆 Top Productos Más Vendidos</h2>

        {topProductos.length === 0 ? (
          <p>No hay ventas registradas todavía.</p>
        ) : (
          topProductos.map(([nombre, cantidad], index) => (
            <div
              key={nombre}
              style={{
                padding: "8px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <strong>#{index + 1}</strong>{" "}
              <div>
                <div>{nombre}</div>

                <div
                  style={{
                    color: "#16a34a",
                    fontWeight: "bold",
                    marginTop: "4px",
                  }}
                >
                  {cantidad} unidades vendidas
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div
        style={{
          background: "#dbeafe",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>🔥 Tallas Más Vendidas</h2>

        {topTallas.length === 0 ? (
          <p>No hay datos disponibles.</p>
        ) : (
          topTallas.map(([talla, cantidad], index) => (
            <div
              key={talla}
              style={{
                padding: "8px 0",
                borderBottom: "1px solid #ccc",
              }}
            >
              #{index + 1} — Talla {talla} → {cantidad} ventas
            </div>
          ))
        )}
      </div>

      <div
        style={{
          background: "#fce7f3",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>🎨 Colores Más Vendidos</h2>

        {topColores.length === 0 ? (
          <p>No hay datos disponibles.</p>
        ) : (
          topColores.map(([color, cantidad], index) => (
            <div
              key={color}
              style={{
                padding: "8px 0",
                borderBottom: "1px solid #ccc",
              }}
            >
              #{index + 1} — {color} → {cantidad} ventas
            </div>
          ))
        )}
      </div>

      <div
        style={{
          background: "#fee2e2",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          border: "2px solid #ef4444",
        }}
      >
        <h2>🚨 Reponer Urgente</h2>

        {productosReponer.length === 0 ? (
          <p>✅ No hay productos críticos para reabastecer.</p>
        ) : (
          productosReponer.map((prod) => (
            <div
              key={prod.id}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <div>
                <strong>{prod.name}</strong>
              </div>

              <div>
                🎨 {prod.color || "N/A"} | 📏 {prod.size || "N/A"}
              </div>

              <div>📦 Stock actual: {prod.stock}</div>

              <div
                style={{
                  color: "#dc2626",
                  fontWeight: "bold",
                }}
              >
                🔥 Vendidos: {prod.vendidos}
              </div>
            </div>
          ))
        )}
      </div>
      <div
        style={{
          background: "#dcfce7",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>📈 Ventas por Mes</h2>

        {resumenMensual.length === 0 ? (
          <p>No hay ventas registradas.</p>
        ) : (
          resumenMensual.map((item) => (
            <div
              key={item.mes}
              style={{
                padding: "8px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <strong>{item.mes}</strong>

              <div>💰 {formatearPrecio(item.total)}</div>
            </div>
          ))
        )}
      </div>

      <div
        style={{
          background: "#e0f2fe",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>📊 Crecimiento del Negocio</h2>

        {resumenMensual.length < 2 ? (
          <p>Se necesitan al menos dos meses de ventas.</p>
        ) : (
          <>
            <p>
              Mes actual:
              <strong> {formatearPrecio(ultimoMes.total)}</strong>
            </p>

            <p>
              Mes anterior:
              <strong> {formatearPrecio(mesAnterior.total)}</strong>
            </p>

            <p
              style={{
                color: crecimiento >= 0 ? "#16a34a" : "#dc2626",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {crecimiento >= 0 ? "⬆️" : "⬇️"} {crecimiento.toFixed(1)}%
            </p>
          </>
        )}
      </div>

      {/* 📋 HISTORIAL DE VENTAS */}
      <h2
        style={{
          marginTop: "40px",
          marginBottom: "20px",
          fontFamily: "sans-serif",
        }}
      >
        📈 Ventas por Mes
      </h2>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={datosGrafica}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                }).format(value)
              }
            />
            <Bar dataKey="ventas" maxBarSize={120} />
          </BarChart>
        </ResponsiveContainer>
      </div>

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
              📞 <strong>Teléfono:</strong> {vst.telefono} <br />
              📍 <strong>Dirección:</strong> {vst.direccion} <br />
              📧 <strong>Correo:</strong> {vst.correo}
              💰 <strong>Método:</strong> {vst.metodoPago}
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
                // Tomamos la primera URL de la lista por si el administrador registró varias imágenes separadas por comas
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
                    {/* 👇 MINIATURA LOGÍSTICA DE LA FOTO DEL PRODUCTO */}
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
                        <span style={{ fontSize: "9px", color: "#94a3b8" }}>
                          Sin foto
                        </span>
                      )}
                    </div>

                    {/* Información técnica desglosada al lado de la imagen */}
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

            {/* 🔒 REEMPLAZA TU BLOQUE DE BOTONES EN EL HISTORIAL POR ESTE COMPORTAMIENTO SEGURO */}
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

              {/* Botón Eliminar Orden Tradicional (Se bloquea si ya fue entregado) */}
              <button
                disabled={vst.estado === "Entregado"} // 👈 CANDADO: Si ya se entregó, el botón se apaga solo
                onClick={() => cancelarPedidoAdmin(vst.idVenta)}
                style={{
                  background:
                    vst.estado === "Entregado" ? "#404040" : "#ef4444", // Si está bloqueado se pone gris oscuro
                  color: vst.estado === "Entregado" ? "#a3a3a3" : "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor:
                    vst.estado === "Entregado" ? "not-allowed" : "pointer", // Cambia el cursor a un símbolo de prohibido
                  fontWeight: "bold",
                }}
              >
                🗑️ Eliminar Orden
              </button>

              {/* 👇 COMPUERTA EXCLUSIVA DEL PROGRAMADOR: El botón oculto de rescate */}
              {vst.estado === "Entregado" && modoIngenieroActivo && (
                <button
                  onClick={() => {
                    const passDev = window.prompt(
                      "💻 MÓDULO INGENIERO: Ingrese la clave de desarrollador para romper el candado:",
                    );

                    if (passDev === "Admin2021") {
                      // 👇 REEMPLAZO LOGÍSTICO COMPACTO: Llamamos a la función legal prop pasándole el ID
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

export default OrderManager;
