import "./AdminLayout.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-content">
        <Topbar />

        <main className="admin-page">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
