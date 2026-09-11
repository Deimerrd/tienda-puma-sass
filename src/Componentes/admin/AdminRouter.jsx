import DashboardManager from "./DashboardManager";
import ProductManager from "./products/ProductManager";
import CategoryManager from "./categories/CategoryManager";
import InventoryManager from "./inventory/InventoryManager";
import OrderManager from "./OrderManager";
import ReportsManager from "./ReportsManager";
import SecurityManager from "./SecurityManager";

function AdminRouter({
  moduloActivo,

  // Dashboard
  dashboardProps,

  // Productos
  productProps,

  // Categorías
  categoryProps,

  // Inventario
  inventoryProps,

  // Pedidos
  orderProps,

  // Reportes
  reportProps,

  // Seguridad
  securityProps,
}) {
  switch (moduloActivo) {
    case "dashboard":
      return <DashboardManager {...dashboardProps} />;

    case "productos":
      return <ProductManager {...productProps} />;

    case "categorias":
      return <CategoryManager {...categoryProps} />;

    case "inventario":
      return <InventoryManager {...inventoryProps} />;

    case "pedidos":
      return <OrderManager {...orderProps} />;

    case "reportes":
      return <ReportsManager {...reportProps} />;

    case "seguridad":
      return <SecurityManager {...securityProps} />;

    default:
      return <DashboardManager {...dashboardProps} />;
  }
}

export default AdminRouter;
