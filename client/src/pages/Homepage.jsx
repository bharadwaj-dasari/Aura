import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Homepage.module.css";
import {Link} from 'react-router-dom';

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [dropdown, setDropdown] = useState(null);
  const [activeTab, setActiveTab] = useState("donors");

  useEffect(() => {
    document.title = "AuraHP - Home";
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          setActiveSection(section.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>AuraHP</div>
        <ul className={styles.navLinks}>
          {[
            "Why AuraHP",
            "Our Practices",
            "About Us",
            "Careers",
            "Insights",
          ].map((item, index) => (
            <li
              key={index}
              className={`${styles.navItem} ${
                activeSection === item.toLowerCase().replace(/ /g, "-")
                  ? styles.active
                  : ""
              }`}
              onMouseEnter={() => setDropdown(item)}
              onMouseLeave={() => setDropdown(null)}
            >
              {item} <span className={styles.dropdownArrow}>▼</span>
              {dropdown === item && (
                <motion.div
                  className={styles.dropdownMenu}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>Submenu 1</p>
                  <p>Submenu 2</p>
                  <p>Submenu 3</p>
                </motion.div>
              )}
            </li>
          ))}
        </ul>
        <button className={styles.ctaButton}><span>Donate</span></button>
      </nav>

      <motion.section
        id="hero"
        className={styles.hero}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className={styles.title}>One <span className={styles.highlight}>drop</span> at a time</h1>
        <p className={styles.subtitle}>AuraHP is your trusted partner for blood donation.</p>
        <motion.button
          className={styles.ctaButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
            <span>
                <a href='#first-impressions'>Show Me How</a>
          </span>
        </motion.button>
      </motion.section>

      <motion.section
        id="first-impressions"
        className={styles.darkSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.sectionTitle}>First Impressions</h2>
        <div className={styles.toggleContainer}>
          <span
            className={activeTab === "donors" ? styles.activeTab : ""}
            onClick={() => setActiveTab("donors")}
          >
            Supporting Blood Donors
          </span>
          <span
            className={activeTab === "facilities" ? styles.activeTab : ""}
            onClick={() => setActiveTab("facilities")}
          >
            Helping Medical Facilities
          </span>
        </div>
        <p className={styles.sectionText}>
          {activeTab === "donors"
            ? "AuraHP empowers blood donors by connecting them to those in need, ensuring a smooth donation process."
            : "AuraHP assists hospitals and medical facilities by providing a reliable blood donor network for urgent needs."}
        </p>
        <div className={styles.buttonContainer}>
          <motion.button
            className={styles.ctadarkButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
           <Link to = '/VLogin'> AuraHP for Donors </Link>
          </motion.button>
          <motion.button
            className={styles.ctadarkButtonAlt}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to='/MFLogin'
            >AuraHP for Facilities</Link>
          </motion.button>
        </div>
      </motion.section>

      <motion.section
        id="business-support"
        className={styles.lightSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.sectionTitle}>Expert Business Support</h2>
        <p className={styles.sectionText}>Empowering healthcare professionals to focus on patient care.</p>
      </motion.section>

      <motion.footer
        className={styles.footer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.footerContent}>
          <div>
            <h3>Contact Us</h3>
            <p>Email: info@aurahp.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <p>Why AuraHP</p>
            <p>Our Practices</p>
            <p>Careers</p>
          </div>
        </div>
        <p className={styles.copyright}>© AuraHP 2024</p>
      </motion.footer>
    </div>
  );
}
