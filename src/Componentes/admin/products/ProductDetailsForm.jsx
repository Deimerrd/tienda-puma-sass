import ProductVariants from "./ProductVariants";

function ProductDetailsForm({ articulo, handleChange, Guardar, setArticulo }) {
  return (
    <>
      {/* ⚡ 4. FORMULARIO DINÁMICO INTELIGENTE POR CATEGORÍA */}
      {articulo.category && (
        <div
          style={{
            background: "#262626",
            borderLeft: "4px solid #f97316",
            padding: "20px",
            marginBottom: "30px",
            color: "white",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <label
                htmlFor="txt-marca"
                style={{ fontSize: "12px", fontWeight: "700" }}
              >
                MARCA:
              </label>
            </div>

            <input
              type="text"
              id="txt-marca"
              name="marca"
              placeholder="Ej: Puma"
              value={articulo.marca || ""}
              onChange={handleChange}
              style={{
                background: "#171717",
                border: "1px solid #404040",
                color: "#ffffff",
                padding: "10px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <label
              htmlFor="txt-gender"
              style={{ fontSize: "12px", fontWeight: "700" }}
            >
              GÉNERO PÚBLICO:
            </label>

            <select
              id="txt-gender"
              name="gender"
              value={articulo.gender}
              onChange={handleChange}
              style={{
                background: "#171717",
                border: "1px solid #404040",
                color: "#ffffff",
                padding: "10px",
              }}
            >
              <option value="">Seleccionar</option>
              <option value="Unisex">Unisex</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Niño">Niño</option>
              <option value="Niña">Niña</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label
              htmlFor="txt-stock"
              style={{ fontSize: "12px", fontWeight: "700" }}
            >
              📦 STOCK DISPONIBLE:
            </label>

            <input
              type="text"
              id="txt-stock"
              name="stock"
              placeholder="Cantidad disponible en inventario"
              value={articulo.stock}
              onChange={handleChange}
              style={{
                background: "#171717",
                border: "1px solid #404040",
                color: "#ffffff",
                padding: "10px",
              }}
            />
            <ProductVariants articulo={articulo} setArticulo={setArticulo} />

            <div>
              <label>Calificación</label>

              <input
                type="number"
                name="rating"
                value={articulo.rating}
                onChange={handleChange}
                min="1"
                max="5"
                step="0.1"
                placeholder="Ej: 4.8"
                style={{
                  background: "#171717",
                  border: "1px solid #404040",
                  color: "#fff",
                  padding: "10px",
                }}
              />
            </div>

            <div>
              <label>Número de opiniones</label>

              <input
                type="number"
                name="reviews"
                value={articulo.reviews}
                onChange={handleChange}
                min="0"
                placeholder="Ej: 125"
                style={{
                  background: "#171717",
                  border: "1px solid #404040",
                  color: "#fff",
                  padding: "10px",
                }}
              />
            </div>
          </div>

          {/* Si es calzado (Zapatos), abre la matriz avanzada de tallas */}
          {articulo.category === "shoes" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <h4
                style={{
                  margin: "0",
                  color: "#f97316",
                  textTransform: "uppercase",
                }}
              >
                👟 Configuración Técnica de Calzado
              </h4>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  htmlFor="txt-color"
                  style={{ fontSize: "12px", fontWeight: "700" }}
                >
                  MATRIZ DE COLORES
                </label>
                <input
                  type="text"
                  id="txt-color"
                  name="color"
                  placeholder="Ej: Negro(39,40), Rojo(38,40)"
                  value={articulo.color}
                  onChange={handleChange}
                  style={{
                    background: "#171717",
                    border: "1px solid #404040",
                    color: "#ffffff",
                    padding: "10px",
                  }}
                />
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    🔥 TIPO DE PROMOCIÓN:
                  </label>

                  <select
                    name="promocion"
                    value={articulo.promocion}
                    onChange={handleChange}
                    style={{
                      background: "#171717",
                      border: "1px solid #404040",
                      color: "#ffffff",
                      padding: "10px",
                    }}
                  >
                    <option value="">Sin promoción</option>
                    <option value="🔥 Promoción del Mes">
                      🔥 Promoción del Mes
                    </option>
                    <option value="⭐ Destacado">⭐ Destacado</option>
                    <option value="💥 Oferta Especial">
                      💥 Oferta Especial
                    </option>
                    <option value="🆕 Nuevo Ingreso">🆕 Nuevo Ingreso</option>
                  </select>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    📉 DESCUENTO (%):
                  </label>

                  <input
                    type="number"
                    name="descuento"
                    min="0"
                    max="90"
                    value={articulo.descuento}
                    onChange={handleChange}
                    placeholder="Ej: 20"
                    style={{
                      background: "#171717",
                      border: "1px solid #404040",
                      color: "#ffffff",
                      padding: "10px",
                    }}
                  />
                </div>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  htmlFor="txt-size"
                  style={{ fontSize: "12px", fontWeight: "700" }}
                >
                  TALLAS DISPONIBLES:
                </label>

                <input
                  type="text"
                  id="txt-size"
                  name="size"
                  placeholder="Ej: S,M,L,XL"
                  value={articulo.size || ""}
                  onChange={handleChange}
                  style={{
                    background: "#171717",
                    border: "1px solid #404040",
                    color: "#ffffff",
                    padding: "10px",
                  }}
                />
              </div>
            </div>
          )}

          {/* Si es Gorras, Accesorios, etc., esconde las tallas de zapato */}
          {articulo.category !== "shoes" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                🔥 TIPO DE PROMOCIÓN:
              </label>

              <select
                name="promocion"
                value={articulo.promocion}
                onChange={handleChange}
                style={{
                  background: "#171717",
                  border: "1px solid #404040",
                  color: "#ffffff",
                  padding: "10px",
                }}
              >
                <option value="">Sin promoción</option>
                <option value="🔥 Promoción del Mes">
                  🔥 Promoción del Mes
                </option>
                <option value="⭐ Destacado">⭐ Destacado</option>
                <option value="💥 Oferta Especial">💥 Oferta Especial</option>
                <option value="🆕 Nuevo Ingreso">🆕 Nuevo Ingreso</option>
              </select>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                📉 DESCUENTO (%):
              </label>

              <input
                type="number"
                name="descuento"
                min="0"
                max="90"
                value={articulo.descuento}
                onChange={handleChange}
                placeholder="Ej: 20"
                style={{
                  background: "#171717",
                  border: "1px solid #404040",
                  color: "#ffffff",
                  padding: "10px",
                }}
              />

              <h4
                style={{
                  margin: "0",
                  color: "#f97316",
                  textTransform: "uppercase",
                }}
              >
                ✨ Configuración de Prenda / Accesorio Corto
              </h4>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  htmlFor="txt-color"
                  style={{ fontSize: "12px", fontWeight: "700" }}
                >
                  COLORES DISPONIBLES (Separados por comas):
                </label>
                <input
                  type="text"
                  id="txt-color"
                  name="color"
                  placeholder="Ej: Negro, Azul, Blanco"
                  value={articulo.color}
                  onChange={handleChange}
                  style={{
                    background: "#171717",
                    border: "1px solid #404040",
                    color: "#ffffff",
                    padding: "10px",
                  }}
                />
              </div>

              {(articulo.category === "shirt" ||
                articulo.category === "sweater" ||
                articulo.category === "pants") && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label
                    htmlFor="txt-marca"
                    style={{ fontSize: "12px", fontWeight: "700" }}
                  >
                    TALLAS DISPONIBLES DE ROPA:
                  </label>
                  <input
                    type="text"
                    name="size"
                    id="txt-size"
                    placeholder="Ej: S, M, L, XL"
                    value={articulo.size}
                    onChange={handleChange}
                    style={{
                      background: "#171717",
                      border: "1px solid #404040",
                      color: "#ffffff",
                      padding: "10px",
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* CAMPOS COMUNES DE FOTO Y DESCRIPCIÓN */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              marginTop: "15px",
            }}
          >
            <label
              htmlFor="image"
              style={{ fontSize: "12px", fontWeight: "700" }}
            >
              ENLACES DE IMÁGENES DE INTERNET:
            </label>
            <input
              id="image"
              type="text"
              name="image"
              placeholder="Enlaces de fotos separados por comas..."
              value={articulo.image}
              onChange={handleChange}
              style={{
                background: "#171717",
                border: "1px solid #404040",
                color: "#ffffff",
                padding: "10px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              marginTop: "15px",
            }}
          >
            <label
              htmlFor="txt-description"
              style={{ fontSize: "12px", fontWeight: "700" }}
            >
              DESCRIPCIÓN PERSUASIVA DE CONVENCIMIENTO:
            </label>
            <textarea
              id="txt-description"
              name="description"
              placeholder="Escribe el Copywriting que enamorará al cliente..."
              value={articulo.description}
              onChange={handleChange}
              rows="4"
              style={{
                background: "#171717",
                border: "1px solid #404040",
                color: "#ffffff",
                padding: "10px",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            onClick={Guardar}
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginTop: "20px",
              background: "#f97316",
              color: "#ffffff",
              border: "none",
              fontWeight: "700",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            🚀 Registrar en Catálogo Comercial
          </button>
        </div>
      )}
    </>
  );
}

export default ProductDetailsForm;
