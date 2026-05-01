import { useState } from "react";
import { useWallet } from "../WalletContext";
import RoleSelection from "./RoleSelection";
import DashboardLayout from "./DashboardLayout";
import StudentDashboard from "./StudentDashboard";
import VerifyCertificate from "./VerifyCertificate";
import IssueCertificate from "./IssueCertificate";
import MyCertificates from "./MyCertificates";
import Institutions from "./Institutions";
import Settings from "./Settings";
import Achievements from "./Achievements";

export default function Dashboard({ onLogout }) {
  const { publicKey, disconnect } = useWallet();
  const [role, setRole] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [prevPublicKey, setPrevPublicKey] = useState(null);

  if (publicKey !== prevPublicKey) {
    setPrevPublicKey(publicKey);
    const saved = publicKey ? localStorage.getItem(`educhain_role_${publicKey}`) : null;
    setRole(saved || null);
  }

  const handleLogout = () => {
    disconnect();
    onLogout();
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSwitchRole = () => {
    // Clear saved role so selection screen shows again
    localStorage.removeItem(`educhain_role_${publicKey}`);
    setRole(null);
    setActivePage("dashboard");
  };

  // No role yet — show role selection
  if (!role) {
    return <RoleSelection onSelectRole={handleRoleSelect} />;
  }

  // Render page content based on activePage
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <StudentDashboard onNavigate={setActivePage} role={role} />;
      case "certificates":
        return <MyCertificates role={role} />;
      case "achievements":
        return <Achievements />;
      case "issue":
        return <IssueCertificate />;
      case "verify":
        return <VerifyCertificate />;
      case "institutions":
        return <Institutions />;
      case "settings":
        return <Settings role={role} onSwitchRole={handleSwitchRole} onLogout={handleLogout} />;
      default:
        return <StudentDashboard onNavigate={setActivePage} />;
    }
  };

  return (
    <DashboardLayout
      role={role}
      activePage={activePage}
      onNavigate={setActivePage}
      onLogout={handleLogout}
      onSwitchRole={handleSwitchRole}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
