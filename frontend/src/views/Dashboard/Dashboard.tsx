import { Outlet } from "react-router-dom";
import { Footer, Header, LeftNav } from "../";

import "./Dashboard.scss";

export const Dashboard = () => {
  return (
    <div id="dashboard-container" className="dashboard-container">
      <Header>Event Planner</Header>
      <div id="outlet-container" className="outlet-container">
        <LeftNav />
        <Outlet />
      </div>
      <Footer>Event Planner@2024 By Sami Moqbel Supervised By George Khoury</Footer>
    </div>
  );
};

