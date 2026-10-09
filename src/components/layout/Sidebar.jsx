import { useState } from "react";
import {
  FaUsers, FaBriefcase, FaHeartbeat, FaServer, FaChartBar,
  FaCommentDots, FaBolt, FaRegCopy, FaExclamationCircle,
  FaFolder, FaAddressBook, FaTachometerAlt,
  FaChevronDown, FaChevronRight,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import "../../../public/assets/css/mainStyle.css";

const menu = [
  {
    key: "dashboards",
    label: "Dashboards",
    icon: <MdSpaceDashboard />,
    children: [
      { key: "main", label: "Main Dashboard", icon: <FaTachometerAlt /> },
      { key: "ecommerce", label: "E-Commerce", icon: <FaBriefcase /> },
      { key: "employees", label: "Employees", icon: <FaUsers /> },
      { key: "leads", label: "Leads", icon: <FaAddressBook /> },
      { key: "hr", label: "HR", icon: <FaHeartbeat /> },
      { key: "it", label: "IT Admin", icon: <FaServer /> },
    ],
  },
  { key: "hrcore", label: "HR Core", icon: <FaUsers />, children: [] },
  { key: "analytics", label: "Analytics", icon: <FaChartBar />, children: [] },
  { key: "communication", label: "Communication", icon: <FaCommentDots />, children: [] },
  { key: "operations", label: "Operations", icon: <FaBolt />, children: [] },
  { key: "pages", label: "Pages", icon: <FaRegCopy />, children: [] },
  { key: "errors", label: "Error Pages", icon: <FaExclamationCircle />, children: [] },
  { key: "files", label: "Files & Billing", icon: <FaFolder />, children: [] },
];

function Sidebar() {
  const [openMenu, setOpenMenu] = useState("dashboards");
  const [activeItem, setActiveItem] = useState("employees");

  const toggleMenu = (key) => {
    setOpenMenu((prev) => (prev === key ? "" : key));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-box">
          <FaUsers />
        </div>
        <div>
          <h5 className="brand-name">HRNexus</h5>
          <span className="brand-sub">ADMIN SUITE</span>
        </div>
      </div>

      <nav className="sidebar-content">
        {menu.map((item) => {
          const isOpen = openMenu === item.key;
          const hasActiveChild = item.children.some((c) => c.key === activeItem);

          return (
            <div key={item.key}>
              <button type="button" className={`menu-item ${isOpen && item.key === "dashboards" ? "parent-active" : ""}`} onClick={() => toggleMenu(item.key)} aria-expanded={isOpen} >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
                <span className="menu-arrow">
                  {isOpen ? <FaChevronDown size={11} /> : <FaChevronRight size={11} />}
                </span>
              </button>

              {isOpen && item.children.length > 0 && (
                <div className="submenu">
                  {item.children.map((child) => (
                    <button type="button" key={child.key} className={`menu-item child ${activeItem === child.key ? "active" : ""}`} onClick={() => setActiveItem(child.key)} >
                      <span className="menu-icon">{child.icon}</span>
                      <span className="menu-label">{child.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer"></div>
    </aside>
  );
}

export default Sidebar;