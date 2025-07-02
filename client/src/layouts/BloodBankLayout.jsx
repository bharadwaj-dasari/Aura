import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from '../Context/DarkModeContext';
import { Outlet } from "react-router-dom";
import '../App.css';
import styles from '../pages/BloodBankPage.module.css'
import Footer from "../Components/Footer";
import Sidebar from "../Components/Side";
import BloodRequestForm from "../Components/BloodRequestForm";



const BloodBankLayout = () => {
  const { isDarkMode } = useDarkMode();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const toggleRequestForm = () => {
    setShowRequestForm(!showRequestForm);
  };

  return (
    <>
    <div className={`${styles.wrapper} ${isDarkMode ? 'dark' : 'light'}`}>
      <motion.div
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
      >
            <Sidebar activeView={activeView} onViewChange={handleViewChange} />

        <Outlet />
      </motion.div>
    </div>
  <Footer />
  </>
  );
};

export default BloodBankLayout;
