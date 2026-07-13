import "./Header.css";
import storeConfig from "../config/storeConfig";

const abrirWhatsApp = () => {
  window.open(
    `https://wa.me/${storeConfig.whatsapp.numero}?text=${encodeURIComponent(storeConfig.whatsapp.mensaje)}`,
    "_blank",
  );
};

const abrirInstagram = () => {
  window.open(storeConfig.instagram, "_blank");
};

const abrirFacebook = () => {
  window.open(storeConfig.facebook, "_blank");
};

/* ==========================================================
   HEADER PRINCIPAL
   ----------------------------------------------------------
   Función:
   Recibe funciones desde Shop para abrir el Login y,
   próximamente, el carrito de compras.
========================================================== */

function Header({ abrirLogin, abrirCarrito }) {
  return (
    <>
      <div className="header">
        {/* ================= TOP BAR ================= */}
        <div className="topbar">
          <div className="topbar-content">
            <span>🚚 Envíos gratis desde $200.000</span>
            <span>⭐ Productos 100% originales</span>
            <div className="topbar-redes">
              <span onClick={abrirWhatsApp}>📱 WhatsApp</span>

              <span onClick={abrirInstagram}>📷 Instagram</span>

              <span onClick={abrirFacebook}>👍 Facebook</span>
            </div>{" "}
          </div>
        </div>
        <div className="header-main">
          <div className="header-content">
            <div className="header-categorias">☰ Categorías</div>
            <div style={{ textAlign: "center" }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: "64px",
                  fontWeight: "900",
                  letterSpacing: "-2px",
                  color: "#111827",
                  lineHeight: "1",
                }}
              >
                TODA MODA
              </h1>

              <p
                style={{
                  marginTop: "10px",
                  color: "#6b7280",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                Moda Premium para toda la familia
              </p>
            </div>
            {/* ==========================================================
    HEADER - ACCIONES DEL USUARIO
========================================================== */}

            <div className="header-user">
              <span
                onClick={() => {
                  console.log("Header funcionando");
                  console.log(abrirLogin);

                  if (abrirLogin) {
                    abrirLogin();
                  }
                }}
              >
                👤 Mi Cuenta
              </span>
              <span onClick={abrirCarrito}>🛒 Carrito</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="header-search">
              <div className="header-search-content">
                <input
                  type="text"
                  placeholder="🔍 Buscar productos..."
                  style={{
                    width: "400px",
                    maxWidth: "100%",
                    padding: "14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "12px",
                    fontSize: "15px",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
