import { Routes, Route } from "react-router-dom";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import LoginPage from "@/features/auth/pages/LoginPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/registrar" element={<RegisterPage />} />
      <Route path='/entrar' element={<LoginPage />} />
      {/* outras rotas no futuro */}
    </Routes>
  );
}

export default AppRoutes;
