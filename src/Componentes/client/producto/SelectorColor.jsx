function SelectorColor({
  colores,
  colorElegido,
  setColorElegido,
  setFotoActivaIdx,
}) {
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
        Color
      </label>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        {colores.map((col, idx) => (
          <button
            className={`color-btn ${
              colorElegido === col.trim() ? "active" : ""
            }`}
            key={idx}
            type="button"
            onClick={() => {
              const color = col.trim();

              setColorElegido(color);
              setFotoActivaIdx(idx);
            }}
          >
            {col.trim()}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelectorColor;
