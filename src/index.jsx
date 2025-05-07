import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BillnPayment } from "./view/BillnPayment";
import { PowerMonitoring } from "./view/PowerMonitoring";
import { Reports } from "./view/Reports";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<BillnPayment />} />
        <Route path="/billnpayment" element={<BillnPayment />} />
        <Route path="/power-monitoring" element={<PowerMonitoring />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  </StrictMode>
);