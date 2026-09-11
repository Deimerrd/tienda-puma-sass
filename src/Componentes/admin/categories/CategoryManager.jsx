function CategoryManager({
  nuevaCatNombre,
  setNuevaCatNombre,
  iconoCategoria,
  setIconoCategoria,
  agregarCategoria,
}) {
  return (
    <>
      {/*
     🛠️ 2. CREADOR DE CATEGORÍAS DINÁMICAS */}
      <div
        style={{
          background: "#fef08a",
          padding: "15px",
          border: "1px solid #eab308",
          borderRadius: "8px",
          marginBottom: "25px",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", color: "#854d0e" }}>
          🛠️ Creador de Categorías Dinámicas
        </h3>
        <label htmlFor="txt-nueva-cat">Nombre de la nueva categoría: </label>
        <input
          id="txt-nueva-cat"
          type="text"
          placeholder="Ej: Gorras"
          value={nuevaCatNombre}
          onChange={(e) => setNuevaCatNombre(e.target.value)}
        />
        <label
          style={{
            display: "block",
            marginTop: "12px",
            marginBottom: "5px",
            fontWeight: "700",
          }}
        >
          Icono de la categoría
        </label>

        <select
          value={iconoCategoria}
          onChange={(e) => setIconoCategoria(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            width: "220px",
          }}
        >
          <option value="👕">👕 Camisas</option>
          <option value="👟">👟 Zapatos</option>
          <option value="👖">👖 Pantalones</option>
          <option value="🧥">🧥 Chaquetas</option>
          <option value="🧶">🧶 Suéteres</option>
          <option value="⌚">⌚ Accesorios</option>
        </select>

        <button
          onClick={() => {
            agregarCategoria(nuevaCatNombre, iconoCategoria);
            setNuevaCatNombre("");
            setIconoCategoria("👕");
          }}
          style={{ marginLeft: "10px", cursor: "pointer" }}
        >
          ➕ Crear Categoría
        </button>
      </div>
    </>
  );
}

export default CategoryManager;
