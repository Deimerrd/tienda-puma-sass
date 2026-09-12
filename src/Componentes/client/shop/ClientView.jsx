import { useState } from "react";
import ProductoDetalle from "../producto/ProductoDetalle";
import ProductoBeneficios from "../producto/ProductoBeneficios";
import HeroSlider from "../home/HeroSlider";
import TarjetaProducto from "./TarjetaProducto";
import CategoriasCliente from "./CategoriasCliente";
import FiltroGeneroCliente from "./FiltroGeneroCliente";
import CarritoCompras from "./CarritoCompras";
import FormularioEnvio from "./FormularioEnvio";
import AccionesCompra from "./AccionesCompra";

function ClientView({
  products,
  cart,
  categories,
  AgregarAlCarrito,
  eliminarDelCarrito,
  finalizarCompra,
  vaciarCarrito,
  formatearPrecio,
  nequiNumero,
  nequiQR,
}) {
  const [nombreComprador, setNombreComprador] = useState("");
  const [resetTrigger, setResetTrigger] = useState(0);
  const [cedulaComprador, setCedulaComprador] = useState("");
  const [telefonoComprador, setTelefonoComprador] = useState("");
  const [direccionComprador, setDireccionComprador] = useState("");
  const [correo, setCorreo] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [generoSeleccionado, setGeneroSeleccionado] = useState("todos");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [verDetalle, setVerDetalle] = useState(false);

  const productosFiltrados = products.filter((prod) => {
    const pasaCategoria =
      categoriaSeleccionada === "todos" ||
      prod.category === categoriaSeleccionada;
    const pasaGenero =
      generoSeleccionado === "todos" || prod.gender === generoSeleccionado;
    return pasaCategoria && pasaGenero;
  });
  if (verDetalle && productoSeleccionado) {
    return (
      <ProductoDetalle
        producto={productoSeleccionado}
        products={products}
        seleccionarProducto={(prod) => setProductoSeleccionado(prod)}
        volver={() => {
          setVerDetalle(false);
          setProductoSeleccionado(null);
        }}
        AgregarAlCarrito={AgregarAlCarrito}
        formatearPrecio={formatearPrecio}
      />
    );
  }
  return (
    <>
      <div
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
          padding: "20px",
          maxWidth: "1700px",
          margin: "0 auto",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "22px",
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(0,0,0,.08)",
            marginBottom: "30px",
          }}
        >
          <div style={{ marginBottom: "15px" }}>
            <FiltroGeneroCliente
              generoSeleccionado={generoSeleccionado}
              setGeneroSeleccionado={setGeneroSeleccionado}
            />
            {/* ================= SLIDER PRINCIPAL ================= */}
            <HeroSlider />

            {/* ================= BENEFICIOS ================= */}

            <ProductoBeneficios />
            <CategoriasCliente
              categories={categories}
              categoriaSeleccionada={categoriaSeleccionada}
              setCategoriaSeleccionada={setCategoriaSeleccionada}
            />
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px,360px))",
            justifyContent: "center",
            gap: "30px",
            marginTop: "30px",
            width: "100%",
          }}
        >
          {productosFiltrados.length === 0 ? (
            <p style={{ color: "gray", fontStyle: "italic" }}>
              No hay artículos registrados que coincidan con esta búsqueda.
            </p>
          ) : (
            productosFiltrados.map((prod) => (
              <TarjetaProducto
                key={`${prod.id}-${resetTrigger}`}
                prod={prod}
                AgregarAlCarrito={AgregarAlCarrito}
                formatearPrecio={formatearPrecio}
                verProducto={() => {
                  setProductoSeleccionado(prod);
                  setVerDetalle(true);
                }}
              />
            ))
          )}
        </div>
        <CarritoCompras
          cart={cart}
          formatearPrecio={formatearPrecio}
          eliminarDelCarrito={eliminarDelCarrito}
        />

        {/* 👇 CONDICIÓN DE ORO: Si el carrito está vacío, oculta TODO lo que está aquí adentro */}
        {cart.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            {/* 1. Formulario de Envío (Ahora protegido por la condición) */}
            <FormularioEnvio
              nombreComprador={nombreComprador}
              setNombreComprador={setNombreComprador}
              cedulaComprador={cedulaComprador}
              setCedulaComprador={setCedulaComprador}
              telefonoComprador={telefonoComprador}
              setTelefonoComprador={setTelefonoComprador}
              direccionComprador={direccionComprador}
              setDireccionComprador={setDireccionComprador}
              correo={correo}
              setCorreo={setCorreo}
              metodoPago={metodoPago}
              setMetodoPago={setMetodoPago}
              nequiNumero={nequiNumero}
              nequiQR={nequiQR}
            />

            {/* 2. Resumen del Pedido */}
            <div
              style={{
                marginTop: "35px",
                background: "#ffffff",
                borderRadius: "18px",
                padding: "25px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 8px 25px rgba(0,0,0,.05)",
              }}
            >
              <h3
                style={{
                  marginBottom: "20px",
                  fontSize: "24px",
                  color: "#111827",
                  fontWeight: "700",
                }}
              >
                🛒 Resumen del pedido
              </h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <span>Productos</span>
                <strong>{cart.length}</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <span>Envío</span>
                <strong style={{ color: "#16a34a" }}>GRATIS</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "18px",
                }}
              >
                <span>Subtotal</span>
                <strong>
                  {formatearPrecio(
                    cart.reduce(
                      (acc, item) => acc + item.price * item.cantidad,
                      0,
                    ),
                  )}
                </strong>
              </div>

              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #e5e7eb",
                  margin: "20px 0",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "22px", fontWeight: "700" }}>
                  Total
                </span>
                <span
                  style={{
                    fontSize: "30px",
                    color: "#7c3aed",
                    fontWeight: "700",
                  }}
                >
                  {formatearPrecio(
                    cart.reduce(
                      (acc, item) => acc + item.price * item.cantidad,
                      0,
                    ),
                  )}
                </span>
              </div>
            </div>

            {/* 3. Botones de Acción */}
            <AccionesCompra
              nombreComprador={nombreComprador}
              cedulaComprador={cedulaComprador}
              telefonoComprador={telefonoComprador}
              direccionComprador={direccionComprador}
              correo={correo}
              metodoPago={metodoPago}
              finalizarCompra={finalizarCompra}
              setResetTrigger={setResetTrigger}
              setNombreComprador={setNombreComprador}
              setCedulaComprador={setCedulaComprador}
              setTelefonoComprador={setTelefonoComprador}
              setDireccionComprador={setDireccionComprador}
              setCorreo={setCorreo}
              setMetodoPago={setMetodoPago}
              vaciarCarrito={vaciarCarrito}
              cart={cart} // 👈 ¡AGREGA ESTA LÍNEA AQUÍ!
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ClientView;
