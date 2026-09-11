function ProductBasicForm({ articulo, handleChange, categories }) {
  return (
    <>
      {/* 📊 3. SECCIÓN GLOBALES (El menú que despliega todo según lo que elijas) */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "20px",
          background: "#262626",
          padding: "15px",
          color: "white",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label
            htmlFor="txt-category"
            style={{ fontSize: "12px", fontWeight: "700" }}
          >
            ¿QUÉ DESEAS AGREGAR AL CATÁLOGO?:
          </label>
          <select
            name="category"
            value={articulo.category}
            id="txt-category"
            onChange={handleChange}
            style={{
              background: "#171717",
              border: "1px solid #404040",
              color: "#ffffff",
              padding: "10px",
              width: "250px",
            }}
          >
            <option value="">-- Seleccione Categoría Primero --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {articulo.category && (
          <>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label
                htmlFor="txt-id"
                style={{ fontSize: "12px", fontWeight: "700" }}
              >
                ID / REF ÚNICA:
              </label>
              <input
                type="text"
                id="txt-id"
                name="id"
                value={articulo.id}
                onChange={handleChange}
                style={{
                  background: "#171717",
                  border: "1px solid #404040",
                  color: "#ffffff",
                  padding: "10px",
                  width: "120px",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label
                htmlFor="txt-name"
                style={{ fontSize: "12px", fontWeight: "700" }}
              >
                NOMBRE DEL PRODUCTO:
              </label>
              <input
                type="text"
                id="txt-name"
                name="name"
                value={articulo.name}
                onChange={handleChange}
                style={{
                  background: "#171717",
                  border: "1px solid #404040",
                  color: "#ffffff",
                  padding: "10px",
                  width: "250px",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label
                htmlFor="txt-price"
                style={{ fontSize: "12px", fontWeight: "700" }}
              >
                PRECIO DE VENTA:
              </label>
              <input
                type="text"
                name="price"
                id="txt-price"
                value={articulo.price}
                onChange={handleChange}
                style={{
                  background: "#171717",
                  border: "1px solid #404040",
                  color: "#ffffff",
                  padding: "10px",
                  width: "120px",
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProductBasicForm;
