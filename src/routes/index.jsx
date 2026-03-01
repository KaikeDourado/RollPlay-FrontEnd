import { Routes, Route } from "react-router-dom";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import HomePage from "@/features/home/HomePage";
import ProfilePage from "@/features/profile/ProfilePage";
import SheetPage from "@/features/sheet/SheetPage";
import ProfileSessionPage from "@/features/profileSession/ProfileSessionPage";
import TermsPage from "@/features/legal/TermsPage";
import PrivacyPage from "@/features/legal/PrivacyPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/registrar" element={<RegisterPage />} />
      <Route path="/entrar" element={<LoginPage />} />
      <Route path="/perfil" element={<ProfilePage />} />
      <Route path="/sheet/:id" element={<SheetPage />} />
      <Route path="/profile-session/:campaignUid" element={<ProfileSessionPage />} />
      <Route path="/termos" element={<TermsPage />} />
      <Route path="/privacidade" element={<PrivacyPage />} />
    </Routes>
  );
}

export default AppRoutes;
