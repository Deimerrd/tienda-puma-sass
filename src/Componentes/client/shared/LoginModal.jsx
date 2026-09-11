import "./LoginModal.css";
import { useState, useEffect } from "react";

/* ==========================================================
   LOGIN MODAL
   ----------------------------------------------------------
   Función:
   Ventana de acceso para el administrador.

   Futuro:
   Este componente será conectado con Firebase Authentication.
========================================================== */

/* ==========================================================
   LOGIN MODAL
   ----------------------------------------------------------
   Recibe las funciones para cerrar el modal y acceder al
   panel administrativo.
========================================================== */

function LoginModal({ cerrar, ingresar }) {
  /* ==========================================================
   ESTADOS DEL LOGIN
   ----------------------------------------------------------
   Controlan los datos digitados por el administrador.

   IMPORTANTE:
   Esta validación es TEMPORAL.

   Cuando implementemos Firebase Authentication,
   estos estados seguirán existiendo pero la validación
   será realizada por Firebase.
========================================================== */

  const [usuario, setUsuario] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  /* ==========================================================
   VISIBILIDAD DE LA CONTRASEÑA
   ----------------------------------------------------------
   Permite mostrar u ocultar la contraseña del administrador.
========================================================== */

  const [mostrarPassword, setMostrarPassword] = useState(false);
  /* ==========================================================
   LOGIN TEMPORAL
   ----------------------------------------------------------
   Credenciales provisionales.

   Usuario:
   admin

   Contraseña:
   123456

   ESTE CÓDIGO SERÁ REEMPLAZADO POR FIREBASE.
========================================================== */

  const iniciarSesion = () => {
    if (usuario === "admin" && password === "123456") {
      ingresar();
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  /* ==========================================================
       ATAJO ENTER
       ----------------------------------------------------------
       Permite iniciar sesión presionando ENTER.
    ========================================================== */

  const manejarEnter = (e) => {
    if (e.key === "Enter") {
      iniciarSesion();
    }
  };
  /* ==========================================================
   ESTRUCTURA DEL LOGIN
   ----------------------------------------------------------
   Modal principal del Administrador.
========================================================== */
  /* ==========================================================
   ATAJO DE TECLADO
   ----------------------------------------------------------
   Permite cerrar el Login con la tecla ESC.
========================================================== */
  useEffect(() => {
    const cerrarConEscape = (e) => {
      if (e.key === "Escape") {
        cerrar();
      }
    };

    window.addEventListener("keydown", cerrarConEscape);

    return () => window.removeEventListener("keydown", cerrarConEscape);
  }, [cerrar]);

  return (
    <div className="login-overlay" onClick={cerrar}>
      <div className="login-card" onClick={(e) => e.stopPropagation()}>
        {/* ======================================================
          LOGO
      ====================================================== */}

        <h1 className="login-logo">TODA MODA</h1>

        <p className="login-subtitulo">Panel Administrativo</p>

        {/* ======================================================
          FORMULARIO
      ====================================================== */}

        <div className="login-form">
          <label>Usuario</label>

          <input
            type="text"
            placeholder="Ingrese su usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            onKeyDown={manejarEnter}
          />

          <label>Contraseña</label>
          {/* ==========================================================
    CAMPO CONTRASEÑA
========================================================== */}

          <div className="password-container">
            <input
              type={mostrarPassword ? "text" : "password"}
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={manejarEnter}
            />

            <button
              type="button"
              className="toggle-password"
              onClick={() => setMostrarPassword(!mostrarPassword)}
            >
              {mostrarPassword ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        {/* ==========================================================
    MENSAJE DE ERROR
========================================================== */}

        {error && (
          <p
            style={{
              color: "#ef4444",

              fontWeight: "600",

              marginTop: "-10px",

              marginBottom: "15px",

              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}

        {/* ======================================================
          BOTONES
      ====================================================== */}

        <div className="login-buttons">
          <button className="btn-cancelar" onClick={iniciarSesion}>
            Abrir
          </button>
          <button className="btn-cancelar" onClick={cerrar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
