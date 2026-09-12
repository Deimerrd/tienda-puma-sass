import { useState, useEffect } from "react";
import ClientView from "./ClientView";
import AdminView from "../../admin/AdminView";
import Header from "../layout/Header";
import LoginModal from "../shared/LoginModal";
import MegaMenu from "../layout/MegaMenu";

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

  const [nequiNumero, setNequiNumero] = useState(() => {
    return localStorage.getItem("company_nequi_numero") || "";
  });

  const [nequiQR, setNequiQR] = useState(() => {
    return localStorage.getItem("company_nequi_qr") || "";
  });

  useEffect(() => {
    localStorage.setItem("company_nequi_numero", nequiNumero);
  }, [nequiNumero]);

  useEffect(() => {
    localStorage.setItem("company_nequi_qr", nequiQR);
  }, [nequiQR]);

  /* ==========================================================
   LOGIN DEL ADMINISTRADOR
   ----------------------------------------------------------
   Controla la apertura y cierre del LoginModal.
========================================================== */

  const [mostrarLogin, setMostrarLogin] = useState(false);
  /* ==========================================================
   DRAWER DE CATEGORÍAS
   ----------------------------------------------------------
   Controla la apertura y cierre del menú lateral
   de categorías.

   FALSE = Cerrado

   TRUE = Abierto
========================================================== */

  const [mostrarCategorias, setMostrarCategorias] = useState(false);

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

  const productosStockCritico = products.filter(
    (prod) => Number(prod.stock) <= 5,
  );

  // C. Memoria de Categorías
  const [categories, setCategories] = useState(() => {
    try {
      const savedCats = localStorage.getItem("company_categories");

      if (savedCats) {
        const iconosPorDefecto = {
          shirt: "👕",
          shoes: "👟",
          pants: "👖",
          sweater: "🧥",
          accessories: "⌚",
          jackets: "🥼",
        };

        return JSON.parse(savedCats).map((cat) => ({
          ...cat,
          icono: cat.icono || iconosPorDefecto[cat.id] || "📦",
        }));
      }

      return [
        {
          id: "shirt",
          name: "Camisas",
          icono: "👕",

          tipos: ["Manga corta", "Manga larga", "Polo", "Oversize"],
        },

        {
          id: "shoes",
          name: "Zapatos",
          icono: "👟",

          tipos: ["Deportivo", "Casual", "Formal"],
        },

        {
          id: "pants",
          name: "Pantalones",
          icono: "👖",

          tipos: ["Jeans", "Cargo", "Jogger"],
        },

        {
          id: "sweater",
          name: "Suéteres",
          icono: "🧥",

          tipos: ["Capucha", "Cremallera", "Clásico"],
        },

        {
          id: "accessories",
          name: "Accesorios",
          icono: "⌚",

          tipos: ["Relojes", "Gorras", "Cinturones"],
        },
      ];
    } catch {
      return [];
    }
  });

  // 👇 D. NUEVA MEMORIA: CONTRASEÑA DINÁMICA DE ADMINISTRADOR
  const [claveMaestra, setClaveMaestra] = useState(() => {
    const savedClave = localStorage.getItem("company_admin_clave");
    return savedClave ? savedClave : "Admin2021"; // Clave inicial por defecto
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
  function cerrarSesionAdmin() {
    setVista("cliente");
    setMostrarLogin(false);
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

  function agregarCategoria(nombreNuevaCat, icono) {
    if (!nombreNuevaCat.trim()) return;

    const idSeguro = nombreNuevaCat.trim().toLowerCase().replace(/\s+/g, "-");

    const existe = categories.find((cat) => cat.id === idSeguro);

    if (existe) {
      alert("Esta categoría ya existe.");
      return;
    }

    setCategories((prev) => [
      ...prev,
      {
        id: idSeguro,
        name: nombreNuevaCat,
        icono: icono,
      },
    ]);

    alert(`¡Categoría "${nombreNuevaCat}" agregada!`);
  }

  function AgregarAlCarrito(productoElegido) {
    const cantidadAgregar = Number(productoElegido.cantidad || 1);

    // ==========================================================
    // IDENTIFICADOR DE LA VARIANTE
    // ==========================================================

    const varianteId =
      productoElegido.varianteId || productoElegido.variante?.id || "principal";

    const idCarrito = `${productoElegido.id}-${varianteId}`;

    // ==========================================================
    // VERIFICAR STOCK DE LA VARIANTE
    // ==========================================================

    const stockDisponible =
      productoElegido.variante?.stock ?? productoElegido.stock ?? 0;

    if (stockDisponible <= 0) {
      alert("⚠️ Esta variante ya no está disponible.");
      return;
    }

    setCart((prevCart) => {
      const existe = prevCart.find((item) => item.idCarrito === idCarrito);

      // ========================================================
      // SI YA EXISTE ESA MISMA VARIANTE EN EL CARRITO
      // ========================================================

      if (existe) {
        const nuevaCantidad = existe.cantidad + cantidadAgregar;

        if (nuevaCantidad > stockDisponible) {
          alert(
            `⚠️ Solo quedan ${stockDisponible} unidades disponibles de esta variante.`,
          );

          return prevCart;
        }

        return prevCart.map((item) =>
          item.idCarrito === idCarrito
            ? {
                ...item,
                cantidad: nuevaCantidad,
              }
            : item,
        );
      }

      // ========================================================
      // PRODUCTO NUEVO EN EL CARRITO
      // ========================================================

      if (cantidadAgregar > stockDisponible) {
        alert(
          `⚠️ Solo quedan ${stockDisponible} unidades disponibles de esta variante.`,
        );

        return prevCart;
      }

      return [
        ...prevCart,
        {
          ...productoElegido,

          // Identificador único dentro del carrito
          idCarrito,

          // Guardamos explícitamente la variante
          varianteId,

          cantidad: cantidadAgregar,
        },
      ];
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

  function finalizarCompra(nombre, cedula, telefono, direccion, correo, pago) {
    for (const item of cart) {
      const producto = products.find((p) => item.id.startsWith(p.id));

      if (!producto) continue;

      if (item.cantidad > Number(producto.stock)) {
        alert(`❌ No hay suficiente stock para ${producto.name}`);
        return;
      }
    }

    const ahora = new Date();

    const nuevaVenta = {
      idVenta: "VNT-" + Date.now(),

      fechaISO: ahora.toISOString(),

      fecha:
        ahora.getDate().toString().padStart(2, "0") +
        "/" +
        (ahora.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        ahora.getFullYear(),

      hora:
        ahora.getHours().toString().padStart(2, "0") +
        ":" +
        ahora.getMinutes().toString().padStart(2, "0"),

      dia: ahora.getDate(),
      mes: ahora.getMonth() + 1,
      anio: ahora.getFullYear(),

      cliente: nombre,
      cedula: cedula,
      telefono: telefono,
      direccion: direccion,
      correo: correo,
      metodoPago: pago,

      estado: "Pendiente",

      productos: [...cart],

      total: cart.reduce(
        (suma, item) => suma + Number(item.price) * item.cantidad,
        0,
      ),
    };

    setVentas((prev) => [...prev, nuevaVenta]);

    // DESCONTAR INVENTARIO
    setProducts((prevProducts) =>
      prevProducts.map((prod) => {
        const vendidos = cart.filter((item) => item.id.startsWith(prod.id));

        if (vendidos.length === 0) return prod;

        const cantidadVendida = vendidos.reduce(
          (total, item) => total + item.cantidad,
          0,
        );

        return {
          ...prod,
          stock: Math.max(0, Number(prod.stock) - cantidadVendida),
        };
      }),
    );

    setCart([]);

    alert("✅ Pedido registrado con éxito");
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

  function cambiarEstadoPedido(idVenta, nuevoEstado) {
    setVentas((prevVentas) =>
      prevVentas.map((venta) =>
        venta.idVenta === idVenta ? { ...venta, estado: nuevoEstado } : venta,
      ),
    );
  }
  return (
    <>
      {/* ==========================================================
       HEADER PRINCIPAL
    ========================================================== */}

      {vista === "cliente" && (
        <Header
          abrirLogin={() => setMostrarLogin(true)}
          abrirCarrito={() => console.log("Abrir carrito")}
          mostrarMegaMenu={() => setMostrarCategorias(true)}
          ocultarMegaMenu={() => setMostrarCategorias(false)}
        />
      )}

      {/* ==========================================================
       MEGA MENÚ
    ========================================================== */}

      {vista === "cliente" && mostrarCategorias && (
        <MegaMenu
          categories={categories}
          ocultarMegaMenu={() => setMostrarCategorias(false)}
          mantenerMegaMenu={() => setMostrarCategorias(true)}
        />
      )}

      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        {/* BARRA SUPERIOR ESQUINADA COMPACTA */}

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
            nequiNumero={nequiNumero}
            nequiQR={nequiQR}
          />
        ) : (
          <AdminView
            products={products}
            productosStockCritico={productosStockCritico}
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
            nequiNumero={nequiNumero}
            setNequiNumero={setNequiNumero}
            nequiQR={nequiQR}
            setNequiQR={setNequiQR}
            cambiarEstadoPedido={cambiarEstadoPedido}
            cerrarSesionAdmin={cerrarSesionAdmin}
          />
        )}

        {/* ==========================================================
   LOGIN MODAL
========================================================== */}
      </div>
      {mostrarLogin && (
        <LoginModal
          cerrar={() => setMostrarLogin(false)}
          ingresar={() => {
            setVista("admin");
            setMostrarLogin(false);
          }}
        />
      )}
    </>
  );
}

export default Shop;
