function ProductoGaleria({ producto, fotoActivaIdx, setFotoActivaIdx }) {
  const imagenes = producto?.image
    ? producto.image
        .split(",")
        .map((img) => img.trim())
        .filter(Boolean)
    : [];

  if (imagenes.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          height: "550px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f9fafb",
          borderRadius: "12px",
          color: "#9ca3af",
          fontSize: "60px",
        }}
      >
        📦
      </div>
    );
  }

  const indiceSeguro =
    fotoActivaIdx >= 0 && fotoActivaIdx < imagenes.length ? fotoActivaIdx : 0;

  return (
    <div>
      {/* IMAGEN PRINCIPAL */}
      <img
        src={imagenes[indiceSeguro]}
        alt={producto.name}
        style={{
          width: "100%",
          maxHeight: "550px",
          objectFit: "contain",
        }}
      />

      {/* MINIATURAS */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
          flexWrap: "wrap",
        }}
      >
        {imagenes.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Vista ${idx + 1}`}
            onClick={() => setFotoActivaIdx(idx)}
            style={{
              width: "70px",
              height: "70px",
              objectFit: "contain",
              cursor: "pointer",
              border:
                indiceSeguro === idx
                  ? "2px solid #7c3aed"
                  : "1px solid #d1d5db",
              borderRadius: "8px",
              padding: "5px",
              background: "#ffffff",
              transition: "0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductoGaleria;
