import { NavLink } from "react-router-dom";

import "./MenuItem.css";

const MenuItem: React.FC<{ to: string; label: string }> = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `menu-item ${isActive ? "selected" : ""}`}
    >
      {label}
    </NavLink>
  );
};

export default MenuItem;
