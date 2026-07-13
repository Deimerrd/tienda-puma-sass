import "./MegaMenu.css";
import { useState } from "react";

const categorias = [
  {
    nombre: "Calzado",
    icono: "👟",
    subcategorias: ["Hombre", "Mujer", "Niño", "Niña", "Deportivo", "Casual"],
  },

  {
    nombre: "Camisas",
    icono: "👕",
    subcategorias: ["Manga corta", "Manga larga", "Polo", "Oversize"],
  },

  {
    nombre: "Jeans",
    icono: "👖",
    subcategorias: ["Slim", "Skinny", "Recto", "Cargo"],
  },

  {
    nombre: "Vestidos",
    icono: "👗",
    subcategorias: ["Casual", "Elegante", "Fiesta"],
  },

  {
    nombre: "Chaquetas",
    icono: "🧥",
    subcategorias: ["Cuero", "Jean", "Impermeable"],
  },

  {
    nombre: "Bolsos",
    icono: "👜",
    subcategorias: ["Mano", "Viaje", "Escolar"],
  },

  {
    nombre: "Accesorios",
    icono: "⌚",
    subcategorias: ["Relojes", "Gorras", "Cinturones"],
  },
];

function MegaMenu({ ocultarMegaMenu, mantenerMegaMenu }) {
  const [categoriaActiva, setCategoriaActiva] = useState(categorias[0]);
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
        {categorias.map((categoria) => (
          <div
            key={categoria.nombre}
            className="mega-item"
            onMouseEnter={() => setCategoriaActiva(categoria)}
          >
            <span>
              {categoria.icono} {categoria.nombre}
            </span>

            <span></span>
          </div>
        ))}
      </div>

      <div className="mega-menu-right">
        <h2>
          {categoriaActiva.icono} {categoriaActiva.nombre}
        </h2>

        {categoriaActiva.subcategorias.map((sub) => (
          <div key={sub} className="mega-subitem">
            {sub}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MegaMenu;
