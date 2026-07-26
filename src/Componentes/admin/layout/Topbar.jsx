function Topbar() {
  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <h1>Panel de Administración</h1>
      </div>

      <div className="topbar-right">
        <button className="btn-ver-tienda">🛍 Ver Tienda</button>

        <div className="admin-user">
          <div className="avatar">A</div>

          <div>
            <strong>Administrador</strong>
            <br />
            <small>En línea</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
