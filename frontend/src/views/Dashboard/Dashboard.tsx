import { Outlet } from "react-router-dom";
import { Footer, Header, LeftNav } from "../index";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div id="dashboard-container" className="dashboard-container">
      <Header title="Event Planner" />
      <div id="outlet-container" className="outlet-container">
        <LeftNav />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
