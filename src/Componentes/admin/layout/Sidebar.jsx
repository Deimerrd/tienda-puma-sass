import MenuButton from "./MenuButton";

function Sidebar({ moduloActivo, setModuloActivo }) {
  const menus = [
    { id: "dashboard", icono: "📊", titulo: "Dashboard" },
    { id: "productos", icono: "📦", titulo: "Productos" },
    { id: "inventario", icono: "📦", titulo: "Inventario" },
    { id: "categorias", icono: "📂", titulo: "Categorías" },
    { id: "pedidos", icono: "📋", titulo: "Pedidos" },
    { id: "reportes", icono: "📈", titulo: "Reportes" },
    { id: "pagos", icono: "💳", titulo: "Pagos" },
    { id: "seguridad", icono: "🔒", titulo: "Seguridad" },
  ];

  return (
    <aside className="admin-sidebar">
      <div>
        <div className="sidebar-logo">
          <h2>TODA MODA</h2>

          <span>Panel Administrativo</span>
        </div>

        <div className="sidebar-menu">
          {menus.map((menu) => (
            <MenuButton
              key={menu.id}
              icono={menu.icono}
              titulo={menu.titulo}
              activo={moduloActivo === menu.id}
              onClick={() => setModuloActivo(menu.id)}
            />
          ))}
        </div>
      </div>

      <div className="sidebar-footer">Versión 2.0</div>
    </aside>
  );
}

export default Sidebar;
