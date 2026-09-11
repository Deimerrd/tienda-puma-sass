import "./MegaMenu.css";
import { useState } from "react";
/* ==========================================================
   MEGA MENÚ DINÁMICO
   ----------------------------------------------------------
   Ahora las categorías ya no están escritas en este archivo.

   Llegan directamente desde Shop.jsx.

   En el futuro llegarán desde Firebase.

========================================================== */

function MegaMenu({
  categories,

  ocultarMegaMenu,

  mantenerMegaMenu,
}) {
  /* ==========================================================
   CATEGORÍA SELECCIONADA
========================================================== */

  const [categoriaActiva, setCategoriaActiva] = useState(categories[0]);
  return (
    <div
      className="mega-menu"
      onMouseEnter={mantenerMegaMenu}
      onMouseLeave={() => {
        setTimeout(() => {
          ocultarMegaMenu();
        }, 250);
      }}
    >
      <div className="mega-menu-left">
        {categories.map((categoria) => (
          <div
            key={categoria.name}
            className="mega-item"
            onMouseEnter={() => setCategoriaActiva(categoria)}
          >
            <span>
              {categoria.icono} {categoria.name}
            </span>

            <span></span>
          </div>
        ))}
      </div>

      <div className="mega-menu-right">
        <h2>
          {categoriaActiva.icono} {categoriaActiva.name}
        </h2>

        {categoriaActiva.tipos.map((sub) => (
          <div key={sub} className="mega-subitem">
            {sub}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MegaMenu;
