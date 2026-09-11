function SecurityManager({
  nuevaContrasena,
  setNuevaContrasena,
  cambiarClave,
}) {
  return (
    <div
      style={{
        background: "#ffedd5",
        padding: "15px",
        border: "1px solid #f97316",
        borderRadius: "8px",
        marginBottom: "25px",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", color: "#c2410c" }}>
        🔒 Configuración de Seguridad{" "}
      </h3>

      <label htmlFor="txt-nueva-clave">Nueva Contraseña Maestra:</label>

      <input
        id="txt-nueva-clave"
        type="password"
        placeholder="Escriba su nueva contraseña"
        value={nuevaContrasena}
        onChange={(e) => setNuevaContrasena(e.target.value)}
      />

      <button
        onClick={() => {
          cambiarClave(nuevaContrasena);
          setNuevaContrasena("");
        }}
        style={{
          marginLeft: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🔐 Actualizar Clave
      </button>
    </div>
  );
}

export default SecurityManager;
