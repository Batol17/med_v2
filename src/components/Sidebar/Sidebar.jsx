import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

import houseIcon from "../../assets/icons/house.svg";
import houseIcon2 from "../../assets/icons/house2.svg";

import fileTextIcon from "../../assets/icons/managOrder.svg";
import fileTextIcon2 from "../../assets/icons/managOrder2.svg";

import inventoryIcon from "../../assets/icons/inventory.svg";
import inventoryIcon2 from "../../assets/icons/inventory2.svg";

import productIcon from "../../assets/icons/product.svg";
import productIcon2 from "../../assets/icons/product2.svg";

import chatIcon from "../../assets/icons/chat.svg";
import chatIcon2 from "../../assets/icons/chat2.svg";

import "./sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  const isDataPharmacy = location.pathname === "/data-pharmacy";
  const isSuccessPage = location.pathname === "/success-verification";
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/enslogin";

  // إخفاء القائمة
  const hideMenu = isDataPharmacy || isSuccessPage || isAuthPage;

  const menu = [
    { to: "/", icon: houseIcon, iconActive: houseIcon2, label: "لوحة التحكم" },
    { to: "/orders", icon: fileTextIcon, iconActive: fileTextIcon2, label: "مدير الطلبات" },
    { to: "/inventory", icon: inventoryIcon, iconActive: inventoryIcon2, label: "مدير المخزن" },
    { to: "/products", icon: productIcon, iconActive: productIcon2, label: "مدير المنتجات" },
    { to: "/chats", icon: chatIcon, iconActive: chatIcon2, label: "الدردشات" },
  ];

  return (
    <aside
      className={`sidebar 
        ${isDataPharmacy ? "sidebar-data-pharmacy" : ""} 
        ${!isDataPharmacy && hideMenu ? "sidebar-hide" : ""}
      `}
    >
      <div>
        <NavLink to="/" className="logo-link">
          <img src={logo} className="logo" alt="MediAid logo" />
        </NavLink>

        <div className="content-logo">
          <h5 className="title-logo">MediAid</h5>

          <p className="desc">
            منصة رقمية ذكية تجمع كل ما تقدمه الصيدليات
            في تجربة واحدة آمنة وسلسة
          </p>
        </div>
      </div>

      {/* القائمة */}
      {!hideMenu && (
        <nav className="menu-grid" dir="ltr">
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <div className="icon-wrapper">
                <img src={item.icon} className="icon-default" alt="" />
                <img src={item.iconActive} className="icon-hover" alt="" />
              </div>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </aside>
  );
}