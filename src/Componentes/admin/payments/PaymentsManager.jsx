function PaymentsManager({ nequiNumero, setNequiNumero, subirQR, nequiQR }) {
  return (
    <>
      <div
        style={{
          background: "#e0f2fe",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "25px",
        }}
      >
        <h3>💳 Configuración Nequi</h3>

        <div style={{ marginBottom: "10px" }}>
          <label>Número Nequi:</label>

          <input
            type="text"
            value={nequiNumero}
            onChange={(e) => setNequiNumero(e.target.value)}
            placeholder="3001234567"
            style={{ marginLeft: "10px" }}
          />
        </div>

        <div>
          <label
            style={{
              fontWeight: "700",
              display: "block",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            🖼 Código QR
          </label>

          <input type="file" accept="image/*" onChange={subirQR} />
          {nequiQR && (
            <img
              src={nequiQR}
              alt="QR Nequi"
              style={{
                width: "180px",
                marginTop: "15px",
                borderRadius: "12px",
                border: "1px solid #ddd",
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default PaymentsManager;
