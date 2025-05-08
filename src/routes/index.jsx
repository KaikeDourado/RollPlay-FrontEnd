import { Routes, Route } from "react-router-dom";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import HomePage from "@/features/home/HomePage";
import ProfilePage from "@/features/profile/ProfilePage";
import SheetPage from "@/features/sheet/SheetPage"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/registrar" element={<RegisterPage />} />
      <Route path='/entrar' element={<LoginPage />} />
      <Route path='/perfil' element={<ProfilePage />} />
      <Route path='/sheet' element={<SheetPage />} />
      {/* outras rotas no futuro */}
    </Routes>
  );
}

export default AppRoutes;
