function FormularioEnvio({
  nombreComprador,
  setNombreComprador,
  cedulaComprador,
  setCedulaComprador,
  telefonoComprador,
  setTelefonoComprador,
  direccionComprador,
  setDireccionComprador,
  correo,
  setCorreo,
  metodoPago,
  setMetodoPago,
  nequiNumero,
  nequiQR,
}) {
  return (
    <div
      style={{
        marginTop: "35px",
        background: "#ffffff",
        borderRadius: "18px",
        padding: "35px",
        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        maxWidth: "750px",
        marginInline: "auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#111827",
          fontSize: "30px",
          fontWeight: "800",
        }}
      >
        📦 Datos de envío
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "22px",
        }}
      >
        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "35px",
            fontSize: "15px",
          }}
        >
          Completa la información para recibir tu pedido.
        </p>
        <div>
          <div>
            <label
              htmlFor="txt-cliente-nombre"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "15px",
              }}
            >
              👤 Nombre completo
            </label>

            <input
              id="txt-cliente-nombre"
              type="text"
              placeholder="Ingresa tu nombre completo"
              value={nombreComprador}
              onChange={(e) => setNombreComprador(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "12px",
                border: "1px solid #d1d5db",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                transition: ".2s",
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {/* Cédula */}
        <div>
          <label
            htmlFor="txt-cliente-cedula"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#374151",
              fontSize: "15px",
            }}
          >
            🆔 Cédula
          </label>

          <input
            id="txt-cliente-cedula"
            type="text"
            placeholder="Número de documento"
            value={cedulaComprador}
            onChange={(e) => setCedulaComprador(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Teléfono */}
        <div>
          <label
            htmlFor="txt-cliente-telefono"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#374151",
              fontSize: "15px",
            }}
          >
            📱 Teléfono
          </label>

          <input
            id="txt-cliente-telefono"
            type="text"
            placeholder="Número celular"
            value={telefonoComprador}
            onChange={(e) => setTelefonoComprador(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="txt-cliente-direccion"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#374151",
              fontSize: "16px",
              textAlign: "left",
            }}
          >
            📍 Dirección de entrega
          </label>

          <input
            id="txt-cliente-direccion"
            type="text"
            placeholder="Ej: Calle 10 #25-18, Barrio Centro"
            value={direccionComprador}
            onChange={(e) => setDireccionComprador(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #d1d5db",
              borderRadius: "12px",
              fontSize: "15px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#374151",
              fontSize: "16px",
              textAlign: "left",
            }}
          >
            ✉ Correo electrónico
          </label>

          <input
            id="email"
            type="email"
            placeholder="ejemplo@correo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #d1d5db",
              borderRadius: "12px",
              fontSize: "15px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>
      <div>
        <h3
          style={{
            textAlign: "left",
            marginBottom: "18px",
            color: "#111827",
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          💳 Método de pago
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "15px",
          }}
        >
          <div
            onClick={() => setMetodoPago("Nequi")}
            style={{
              cursor: "pointer",
              padding: "20px",
              borderRadius: "14px",
              border:
                metodoPago === "Nequi"
                  ? "2px solid #7c3aed"
                  : "1px solid #d1d5db",
              background: metodoPago === "Nequi" ? "#f5f3ff" : "#ffffff",
              transition: ".2s",
            }}
          >
            <div
              style={{
                fontSize: "30px",
                marginBottom: "10px",
              }}
            >
              📱
            </div>

            <strong>Nequi</strong>

            <p
              style={{
                marginTop: "8px",
                color: "#6b7280",
                fontSize: "13px",
              }}
            >
              Pago inmediato
            </p>
          </div>

          <div
            onClick={() => setMetodoPago("Breve")}
            style={{
              cursor: "pointer",
              padding: "20px",
              borderRadius: "14px",
              border:
                metodoPago === "Breve"
                  ? "2px solid #7c3aed"
                  : "1px solid #d1d5db",
              background: metodoPago === "Breve" ? "#f5f3ff" : "#ffffff",
              transition: ".2s",
            }}
          >
            <div style={{ fontSize: "30px" }}>🏦</div>

            <strong>Bre-B</strong>

            <p
              style={{
                marginTop: "8px",
                color: "#6b7280",
                fontSize: "13px",
              }}
            >
              Transferencia bancaria
            </p>
          </div>
          <div
            onClick={() => setMetodoPago("Contraentrega")}
            style={{
              cursor: "pointer",
              padding: "20px",
              borderRadius: "14px",
              border:
                metodoPago === "Contraentrega"
                  ? "2px solid #7c3aed"
                  : "1px solid #d1d5db",
              background:
                metodoPago === "Contraentrega" ? "#f5f3ff" : "#ffffff",
              transition: ".2s",
            }}
          >
            <div style={{ fontSize: "30px" }}>🚚</div>

            <strong>Contraentrega</strong>

            <p
              style={{
                marginTop: "8px",
                color: "#6b7280",
                fontSize: "13px",
              }}
            >
              Paga al recibir
            </p>
          </div>
        </div>
      </div>

      {/* 👇 PASO 1: PASARELA DINÁMICA DE PAGOS LOCALES COLOMBIANOS */}
      {metodoPago && metodoPago !== "Contraentrega" && (
        <div
          style={{
            marginTop: "15px",
            padding: "20px",
            background: "#f8fafc",
            border: "2px solid #000000", // Estilo recto minimalista Puma
            fontFamily: "sans-serif",
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
              fontSize: "24px",
              fontWeight: "700",
              color: "#111827",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            📱 Pago con {metodoPago}
          </h3>

          <p
            style={{
              marginTop: "-10px",
              marginBottom: "25px",
              color: "#6b7280",
              fontSize: "15px",
            }}
          >
            Escanea el código QR o realiza la transferencia utilizando los datos
            de abajo.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              alignItems: "center",
            }}
          >
            {/* 📷 CONTENEDOR DEL CÓDIGO QR DE TU NEGOCIO */}
            <div
              style={{
                width: "170px",
                height: "170px",
                background: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,.08)",
              }}
            >
              {/* Aquí pones un QR real de tu Nequi cuando lances la app a internet. Por ahora ponemos un marcador visual */}
              <div style={{ textAlign: "center", padding: "5px" }}>
                <img
                  src={nequiQR}
                  alt={metodoPago}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>

            {/* 📝 DATOS TÉCNICOS DE TRANSFERENCIA */}
            <div
              style={{
                flex: "1 1 250px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "18px",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                  }}
                >
                  Titular
                </span>

                <h3
                  style={{
                    margin: "4px 0 0",
                    color: "#111827",
                    fontSize: "22px",
                    fontWeight: "700",
                  }}
                >
                  TIENDA PUMA PREMIUM S.A.S
                </h3>
              </div>

              <div>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                  }}
                >
                  Número para transferencias
                </span>

                <h2
                  style={{
                    margin: "5px 0",
                    color: "#7c3aed",
                    fontSize: "28px",
                    fontWeight: "800",
                    letterSpacing: "1px",
                  }}
                >
                  {nequiNumero}
                </h2>
              </div>

              <p
                style={{
                  margin: 0,
                  color: "#475569",
                  lineHeight: "1.7",
                  fontSize: "15px",
                }}
              >
                💡 Escanea el código QR desde tu aplicación de{" "}
                <strong>{metodoPago}</strong> o realiza la transferencia al
                número mostrado arriba. Después de pagar, presiona
                <strong> "Finalizar Compra"</strong> para registrar tu pedido.
              </p>
            </div>
          </div>
          {/* BOTÓN INTERACTIVO COMPLEMENTARIO PARA CELULARES */}
          <button
            type="button"
            onClick={() => {
              if (metodoPago === "Nequi") {
                window.open("https://nequi.com.co", "_blank");
              } else {
                alert(
                  "Abre la app de tu banco y transfiere al número de celular de arriba.",
                );
              }
            }}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "15px",
              background: "#ffffff",
              color: "#000000",
              border: "1px solid #000000",
              fontWeight: "700",
              textTransform: "uppercase",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            🚀 Abrir Plataforma {metodoPago} en Celular
          </button>
        </div>
      )}
    </div>
  );
}

export default FormularioEnvio;
