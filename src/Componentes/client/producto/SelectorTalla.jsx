import { useState } from "react";

function SelectorTalla({ prod, colorElegido, tallaElegida, setTallaElegida }) {
  const [mensajeTalla, setMensajeTalla] = useState("");

  const seleccionarTalla = (talla) => {
    setTallaElegida(talla);

    if (!talla) {
      setMensajeTalla("");
      return;
    }

    const varianteSeleccionada = prod.variantes?.find(
      (variante) =>
        variante.color?.trim().toLowerCase() ===
          colorElegido?.trim().toLowerCase() &&
        variante.talla?.trim().toLowerCase() === talla.trim().toLowerCase(),
    );

    const stock = Number(varianteSeleccionada?.stock ?? 0);

    if (stock <= 0) {
      setMensajeTalla("❌ Esta talla se encuentra agotada en bodega.");
    } else {
      setMensajeTalla(
        `✅ ¡Talla disponible para despacho inmediato! (${stock} unidades)`,
      );
    }
  };

  return (
    <div>
      <label
        style={{
          fontSize: "13px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "6px",
          display: "block",
        }}
      >
        Talla
      </label>

      <select
        value={tallaElegida}
        onChange={(e) => seleccionarTalla(e.target.value)}
        style={{
          width: "100%",
          padding: "5px",
          border: "1px solid #cbd5e1",
          borderRadius: "0px",
          fontSize: "13px",
          background: "#ffffff",
          color: "#000000",
        }}
      >
        <option value="">-- Elige Talla --</option>

        {prod.size ? (
          prod.size.split(",").map((tal, idx) => (
            <option key={idx} value={tal.trim()} style={{ color: "#000000" }}>
              {tal.trim()}
            </option>
          ))
        ) : (
          <option value="Única" style={{ color: "#000000" }}>
            Única
          </option>
        )}
      </select>

      {mensajeTalla && (
        <p
          style={{
            margin: "8px 0 0 0",
            fontSize: "12px",
            fontWeight: "600",
            color: mensajeTalla.includes("❌") ? "#ef4444" : "#10b981",
            background: mensajeTalla.includes("❌") ? "#fef2f2" : "#f0fdf4",
            padding: "6px",
            borderLeft: mensajeTalla.includes("❌")
              ? "3px solid #ef4444"
              : "3px solid #10b981",
          }}
        >
          {mensajeTalla}
        </p>
      )}
    </div>
  );
}

export default SelectorTalla;
