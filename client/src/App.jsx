import "./App.css";
import { Routes, Route } from "react-router-dom";
import VLogin from "./pages/VLogin";
import VSignup from "./pages/VSignup";
import MFLogin from "./pages/MFLogin";
import MFSignup from "./pages/MFSignup";
import Land from './pages/Lander'
import DonorHome from './pages/DonorHome.jsx'
import BloodBankPage from "./pages/BloodBankPage";
import DonorProfile from './pages/donor_profile.jsx'
import DonorHistory from "./pages/donor_history.jsx";
import BloodRequests from "./pages/BloodRequests.jsx";
import DonorsList from "./pages/DonorsList.jsx";
import Analytics from "./pages/Analytics.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import GoogleSignup from "./pages/GoogleSignup.jsx";
import Layout from "./layouts/Layout.jsx";
import BloodBankLayout from "./layouts/BloodBankLayout.jsx";
import Approval from "./pages/Approval";
import { AuthProvider } from "./Context/AuthContext.jsx";
function App() {
  return (
      <AuthProvider>
        <Routes>
        <Route path="/" element={<Land />} />
        <Route path="donor" element={<Layout />}>
          <Route index element={<DonorHome />} />
          <Route path="donationHistory" element={<DonorHistory />} />
          <Route path="donorProfile" element={<DonorProfile />} />
        </Route>
          <Route path = "bloodbank" element={<BloodBankPage />} />
          <Route path="bloodRequests" element={<BloodRequests />} />
          <Route path="donorsList" element={<DonorsList />} />
          <Route path="analytics" element={<Analytics />} />
        <Route path="/VLogin" element={<VLogin />} />
        <Route path="/MFLogin" element={<MFLogin />} />
        <Route path="/MFSignup" element={<MFSignup />} />
        <Route path="/approval" element={<Approval/>} />
        <Route path="/VSignup" element={<VSignup />} />
        <Route path="/google-signup" element={<GoogleSignup />} />
      </Routes>
      </AuthProvider>
  );
}

export default App;
