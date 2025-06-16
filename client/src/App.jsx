import Dashboard from "./components/DashBoard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen pl-64">
      <Sidebar/>
      <Dashboard />
    </div>
  );
}

export default App;
