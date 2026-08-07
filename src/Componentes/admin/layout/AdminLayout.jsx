import "./AdminLayout.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AdminLayout({
  children,
  moduloActivo,
  setModuloActivo,
  cerrarSesionAdmin,
  volverTienda,
}) {
  return (
    <div className="admin-layout">
      <Sidebar moduloActivo={moduloActivo} setModuloActivo={setModuloActivo} />

      <div className="admin-content">
        <Topbar
          cerrarSesionAdmin={cerrarSesionAdmin}
          volverTienda={volverTienda}
        />

        <main className="admin-page">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
