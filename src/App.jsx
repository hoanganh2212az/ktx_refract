import React from "react";
import { Routes, Route } from "react-router-dom";
import { BillnPayment } from "./view/BillnPayment";
import { PowerMonitoring } from "./view/PowerMonitoring";
import { Reports } from "./view/Reports";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BillnPayment />} />
      <Route path="/billnpayment" element={<BillnPayment />} />
      <Route path="/power-monitoring" element={<PowerMonitoring />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
}

export default App;