import { Routes, Route } from "react-router-dom";
import RegisterPage from "@/features/auth/pages/RegisterPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/registrar" element={<RegisterPage />} />
      {/* outras rotas no futuro */}
    </Routes>
  );
}

export default AppRoutes;
