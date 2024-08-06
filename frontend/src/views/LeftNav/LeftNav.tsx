import eventImg from "../../assets/menuImage.png";
import { MenuItem } from "../../components";

import "./LeftNav.css";

const LeftNav = () => {
  return (
    <aside>
      <img src={eventImg} alt="logo" draggable="false" />
      <nav>
        <MenuItem to="/" label="Home" />
        <MenuItem to="/Events" label="Events" />
      </nav>
    </aside>
  );
};

export default LeftNav;
