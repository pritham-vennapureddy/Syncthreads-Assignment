import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import MapView from "./components/MapView"

import "./App.css"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map/:id" element={<MapView/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

