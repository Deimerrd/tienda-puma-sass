import { useEffect, useState } from "react";
import "./CategoryDrawer.css";

/* ==========================================================
   DRAWER DE CATEGORÍAS
   ----------------------------------------------------------
   Menú lateral principal.

   Preparado para:

   ✔ Firebase
   ✔ Responsive
   ✔ Animaciones
========================================================== */

function CategoryDrawer({ abierto, cerrar }) {
  /* ==========================================================
     ESTADO DE ANIMACIÓN
  ========================================================== */

  const [animarSalida, setAnimarSalida] = useState(false);

  /* ==========================================================
     BLOQUEAR SCROLL DEL BODY
  ========================================================== */

  useEffect(() => {
    if (abierto) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [abierto]);

  /* ==========================================================
     CERRAR CON ESC
  ========================================================== */

  const cerrarDrawer = () => {
    setAnimarSalida(true);

    setTimeout(() => {
      setAnimarSalida(false);
      cerrar();
    }, 280);
  };

  useEffect(() => {
    const teclaEscape = (e) => {
      if (e.key === "Escape") {
        setAnimarSalida(true);

        setTimeout(() => {
          setAnimarSalida(false);

          cerrar();
        }, 280);
      }
    };

    window.addEventListener("keydown", teclaEscape);

    return () => window.removeEventListener("keydown", teclaEscape);
  }, [cerrar]);

  /* ==========================================================
     CIERRE ANIMADO
  ========================================================== */

  if (!abierto) return null;

  return (
    <div
      className={`drawer-overlay ${animarSalida ? "overlay-close" : ""}`}
      onClick={cerrarDrawer}
    >
      <div
        className={`drawer ${animarSalida ? "drawer-close" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ======================================================
            TÍTULO
        ====================================================== */}

        <div className="drawer-title">☰ Categorías</div>

        {/* ======================================================
            CATEGORÍAS
        ====================================================== */}

        <div className="drawer-item">👟 Calzado</div>

        <div className="drawer-item">👕 Camisas</div>

        <div className="drawer-item">👖 Jeans</div>

        <div className="drawer-item">👗 Vestidos</div>

        <div className="drawer-item">🧥 Chaquetas</div>

        <div className="drawer-item">👜 Bolsos</div>

        <div className="drawer-item">⌚ Accesorios</div>

        <div className="drawer-item">🎒 Morrales</div>

        <div className="drawer-item">🏷 Ofertas</div>
      </div>
    </div>
  );
}

export default CategoryDrawer;
