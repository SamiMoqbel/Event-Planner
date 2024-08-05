import { Routes, Route } from "react-router-dom";
import { Dashboard, Error404, Event, Home } from "./views";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="Events" element={<Event />} />
      </Route>
      <Route
        path="/Whatever"
        element={
          <h1 className="h-full text-3xl font-extrabold flex items-center justify-center">
            WHATEVER PAGE IS THIS
          </h1>
        }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
