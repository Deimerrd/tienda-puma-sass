import "./Header.css";
import storeConfig from "../../../config/storeConfig";

const abrirWhatsApp = () => {
  window.open(
    `https://wa.me/${storeConfig.whatsapp.numero}?text=${encodeURIComponent(
      storeConfig.whatsapp.mensaje,
    )}`,
    "_blank",
  );
};

const abrirInstagram = () => {
  window.open(storeConfig.instagram, "_blank");
};

const abrirFacebook = () => {
  window.open(storeConfig.facebook, "_blank");
};

function Header({ abrirLogin, abrirCarrito, mostrarMegaMenu }) {
  return (
    <>
      {/* ==========================================================
          TOP BAR
      ========================================================== */}

      <div className="header-top">
        <div className="header-top-content">
          <div>
            <span>🚚 Envíos gratis desde $200.000</span>
            <span>⭐ Productos 100% originales</span>
          </div>

          <div>
            <span onClick={abrirWhatsApp} style={{ cursor: "pointer" }}>
              📱 WhatsApp
            </span>

            <span onClick={abrirInstagram} style={{ cursor: "pointer" }}>
              📷 Instagram
            </span>

            <span onClick={abrirFacebook} style={{ cursor: "pointer" }}>
              👍 Facebook
            </span>
          </div>
        </div>
      </div>

      {/* ==========================================================
          HEADER PRINCIPAL
      ========================================================== */}

      <div className="header-main">
        <div className="header-content">
          {/* ======================================================
              BOTÓN CATEGORÍAS
          ====================================================== */}

          <button
            onClick={mostrarMegaMenu}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "700",
            }}
          >
            ☰ Categorías
          </button>

          {/* ======================================================
              LOGO
          ====================================================== */}

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

          {/* ======================================================
              ACCIONES DEL USUARIO
          ====================================================== */}

          <div className="header-user">
            <span
              onClick={() => {
                if (abrirLogin) {
                  abrirLogin();
                }
              }}
            >
              👤 Mi Cuenta
            </span>

            <span
              onClick={abrirCarrito}
              style={{
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              🛒 Carrito
            </span>
          </div>
        </div>

        {/* ======================================================
            BUSCADOR
        ====================================================== */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
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
    </>
  );
}

export default Header;
