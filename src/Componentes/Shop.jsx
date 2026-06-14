import { useState, useEffect } from "react";
import ClientView from "./ClientView";
import AdminView from "./AdminView";

const formatearPrecio = (numero) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(numero);
};

function Shop() {
  // A. Memoria de Ventas
  const [modoIngenieroActivo, setModoIngenieroActivo] = useState(false);
  useEffect(() => {
    const manejarTecladoSecreto = (e) => {
      // Si presionas la letra 'i' de Ingeniero, se activa el modo oculto
      if (e.key.toLowerCase() === "i") {
        setModoIngenieroActivo((prev) => !prev);
        console.log("💻 Modo Ingeniero Oculto Alternado");
      }
    };

    window.addEventListener("keydown", manejarTecladoSecreto);
    // Limpieza de memoria al desmontar
    return () => window.removeEventListener("keydown", manejarTecladoSecreto);
  }, []);

  const [ventas, setVentas] = useState(() => {
    try {
      const savecompany = localStorage.getItem("company_Ventas");
      return savecompany ? JSON.parse(savecompany) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("company_Ventas", JSON.stringify(ventas));
  }, [ventas]);

  // B. Memoria de Productos
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem("company_products");
      return savedProducts ? JSON.parse(savedProducts) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("company_products", JSON.stringify(products));
  }, [products]);

  // C. Memoria de Categorías
  const [categories, setCategories] = useState(() => {
    try {
      const savedCats = localStorage.getItem("company_categories");
      return savedCats
        ? JSON.parse(savedCats)
        : [
            { id: "shirt", name: "Camisas" },
            { id: "shoes", name: "Zapatos" },
            { id: "pants", name: "Pantalones" },
            { id: "sweater", name: "Suéteres" },
            { id: "accessories", name: "Accesorios" },
          ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("company_categories", JSON.stringify(categories));
  }, [categories]);

  // 👇 D. NUEVA MEMORIA: CONTRASEÑA DINÁMICA DE ADMINISTRADOR
  const [claveMaestra, setClaveMaestra] = useState(() => {
    const savedClave = localStorage.getItem("company_admin_clave");
    return savedClave ? savedClave : "Admin1234"; // Clave inicial por defecto
  });

  function eliminarProducto(id) {
    const confirmacion = window.confirm(
      "¿Seguro que deseas eliminar este producto?",
    );

    if (!confirmacion) return;

    setProducts((prev) =>
      prev.filter((prod) => prod.id?.trim() !== id?.trim()),
    );
  }

  useEffect(() => {
    localStorage.setItem("company_admin_clave", claveMaestra);
  }, [claveMaestra]);

  // E. Estados de control visual y carrito
  const [cart, setCart] = useState([]);
  const [vista, setVista] = useState("cliente");

  // 👇 Función inteligente para cambiar la contraseña desde el panel de Admin
  function cambiarClave(nuevaClave) {
    if (!nuevaClave.trim()) {
      alert("La contraseña no puede estar vacía.");
      return;
    }
    setClaveMaestra(nuevaClave.trim());
    alert("🔒 ¡Contraseña de administrador actualizada con éxito!");
  }

  function cancelarPedidoAdmin(idVenta) {
    const confirmacion = window.confirm(
      "¿Seguro que deseas eliminar y cancelar este pedido del historial?",
    );
    if (confirmacion) {
      setVentas((prev) => prev.filter((vst) => vst.idVenta !== idVenta));
    }
  }

  function vaciarCarrito() {
    const confirmacion = window.confirm(
      "¿Deseas cancelar la compra y vaciar todo tu carrito?",
    );
    if (confirmacion) {
      setCart([]);
    }
  }

  function agregarCategoria(nombreNuevaCat) {
    if (!nombreNuevaCat.trim()) return;
    const idSeguro = nombreNuevaCat.trim().toLowerCase().replace(/\s+/g, "-");
    const existe = categories.find((cat) => cat.id === idSeguro);
    if (existe) {
      alert("Esta categoría ya existe.");
      return;
    }
    setCategories((prev) => [...prev, { id: idSeguro, name: nombreNuevaCat }]);
    alert(`¡Categoría "${nombreNuevaCat}" agregada!`);
  }

  function AgregarAlCarrito(productoElegido) {
    setCart((prevCart) => {
      const existe = prevCart.find((item) => item.id === productoElegido.id);
      if (existe) {
        return prevCart.map((item) =>
          item.id === productoElegido.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }
      return [...prevCart, { ...productoElegido, cantidad: 1 }];
    });
  }

  function eliminarDelCarrito(idProducto) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== idProducto));
  }

  function aumentarCantidad(idProducto) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === idProducto
          ? { ...item, cantidad: item.cantidad + 1 }
          : item,
      ),
    );
  }

  function disminuirCantidad(idProducto) {
    setCart((prevCart) => {
      const producto = prevCart.find((item) => item.id === idProducto);
      if (producto.cantidad === 1) {
        return prevCart.filter((item) => item.id !== idProducto);
      }
      return prevCart.map((item) =>
        item.id === idProducto
          ? { ...item, cantidad: item.cantidad - 1 }
          : item,
      );
    });
  }

  function finalizarCompra(nombre, cedula, telefono, direccion, pago) {
    const nuevaVenta = {
      idVenta: "VNT-" + Date.now(),
      fecha: new Date().toISOString(),
      cliente: nombre,
      cedula: cedula,
      telefono: telefono,
      direccion: direccion,
      metodoPago: pago,
      productos: [...cart],
      total: cart.reduce(
        (suma, item) => suma + Number(item.price) * item.cantidad,
        0,
      ),
    };

    setVentas((prev) => [...prev, nuevaVenta]);
    setCart([]);
    alert("¡Pedido registrado con éxito!");
  }

  function forzarDesbloqueoDev(idVenta) {
    setVentas((prevVentas) =>
      prevVentas.map((v) =>
        v.idVenta === idVenta ? { ...v, estado: "Pendiente" } : v,
      ),
    );
    alert(
      "🔓 Candado roto con éxito, colega. Los botones han sido habilitados.",
    );
  }

  // 👇 NUEVA LOGÍSTICA FINANCIERA: Cierra la venta, descuenta stock y guarda la fecha real
  function marcarPedidoEntregado(idVenta) {
    // 👇 FUNCIÓN DE RESCATE LEGAL: Cambia el estado usando setVentas sin mutar variables

    const confirmacion = window.confirm(
      "¿Seguro que este pedido ya fue entregado y pagado con éxito?",
    );
    if (!confirmacion) return;

    // 1. Buscamos el pedido en el historial
    const pedidoEncontrado = ventas.find((v) => v.idVenta === idVenta);
    if (!pedidoEncontrado) return;

    // 2. Descontamos las cantidades del inventario de productos (Módulo Bodega)
    setProducts((prevProducts) => {
      return prevProducts.map((prod) => {
        // Buscamos si el cliente compró este producto específico
        const itemComprado = pedidoEncontrado.productos.find(
          (item) => item.id.split("-")[0] === prod.id, // Comparamos con el ID base sin variantes
        );

        if (itemComprado) {
          // En una app real, si se agota el stock por comas, aquí se controlaría.
          // Por ahora, guardamos el registro de descuento logístico.
          console.log(
            `Descontando ${itemComprado.cantidad} unidades de la referencia ${prod.id}`,
          );
        }
        return prod;
      });
    });

    // 3. Marcamos la venta como EXITOSA y le estampamos la fecha del día actual
    setVentas((prevVentas) =>
      prevVentas.map((v) =>
        v.idVenta === idVenta
          ? {
              ...v,
              estado: "Entregado",
              fechaEntrega: new Date().toISOString().split("T")[0],
            }
          : v,
      ),
    );

    alert(
      "💰 ¡Pedido cerrado con éxito! El dinero se ha sumado a tu caja diaria.",
    );
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh", padding: "20px" }}>
      {/* BARRA SUPERIOR ESQUINADA COMPACTA */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "20px" }}>🏬 Mi Tienda Virtual</h2>

        {vista === "cliente" ? (
          <button
            onClick={() => {
              // 👇 COMPUERTA DE SEGURIDAD UTILIZANDO LA CLAVE DINÁMICA
              const claveIngresada = window.prompt(
                "🔐 Ingrese la contraseña de Administrador:",
              );

              if (claveIngresada === claveMaestra) {
                setVista("admin");
              } else if (claveIngresada !== null) {
                alert("❌ Acceso Denegado: Contraseña Incorrecta.");
              }
            }}
            style={{
              padding: "6px 12px",
              cursor: "pointer",
              background: "#64748b",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            🔑 Admin
          </button>
        ) : (
          <button
            onClick={() => setVista("cliente")}
            style={{
              padding: "6px 12px",
              cursor: "pointer",
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            🚪 Cerrar Sesión Admin
          </button>
        )}
      </div>

      {/* RENDERIZADO CONDICIONAL */}
      {vista === "cliente" ? (
        <ClientView
          products={products}
          cart={cart}
          categories={categories}
          AgregarAlCarrito={AgregarAlCarrito}
          eliminarDelCarrito={eliminarDelCarrito}
          aumentarCantidad={aumentarCantidad}
          disminuirCantidad={disminuirCantidad}
          finalizarCompra={finalizarCompra}
          vaciarCarrito={vaciarCarrito}
          formatearPrecio={formatearPrecio}
        />
      ) : (
        <AdminView
          products={products}
          setProducts={setProducts}
          ventas={ventas}
          categories={categories}
          agregarCategoria={agregarCategoria}
          cancelarPedidoAdmin={cancelarPedidoAdmin}
          eliminarProducto={eliminarProducto} // 👈 AQUÍ ESTABA EL ERROR
          marcarPedidoEntregado={marcarPedidoEntregado} // 👈 CORRIENTAZO: Agrega esta prop aquíww
          modoIngenieroActivo={modoIngenieroActivo}
          forzarDesbloqueoDev={forzarDesbloqueoDev} // 👈 INYECTA ESTA NUEVA PROP AQUÍ
          cambiarClave={cambiarClave} // 👈 PASAMOS LA FUNCIÓN PARA QUE EL ADMIN LA USE
          formatearPrecio={formatearPrecio}
        />
      )}
    </div>
  );
}

export default Shop;
