function Topbar({ cerrarSesionAdmin, volverTienda }) {
  return (
    <header className="admin-topbar">
      <div>
        <strong>Panel de Administración</strong>
      </div>

      <div className="topbar-right">
        <button className="btn-ver-tienda" onClick={volverTienda}>
          🛍 Ver Tienda
        </button>

        <div className="admin-user">
          <div className="avatar">A</div>

          <div>
            <strong>Administrador</strong>
            <br />
            <small>En línea</small>
          </div>
        </div>

        <button
          onClick={cerrarSesionAdmin}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🚪 Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Topbar;
