import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/DashBoard";
import Sidebar from "./components/Sidebar";
import ChoroplethMapPage from "./pages/ChorplethMapPage";
import DataTablePage from "./pages/TablesPage";
import GroupBarPage from "./pages/GroupBarPage";

const App = () =>{
  return (
  
    <Router>
    <div className="min-h-screen pl-64 my-4">
      <Sidebar/>
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/group-bar-chart" element={<GroupBarPage />} />
            <Route path="/map" element={<ChoroplethMapPage />} />
            <Route path="/tables" element={<DataTablePage />} />
            {/* Add routes for other charts here */}
      </Routes>
      </div>
      </Router>

  );
}

export default App;
