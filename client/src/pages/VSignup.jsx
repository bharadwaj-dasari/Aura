import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import styles from './auth.module.css';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import {useAuth} from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";
const VSignup = () => {

  const navigate=useNavigate();
  const [coords, setCoords] = React.useState({ latitude: null, longitude: null });
  const {login} = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
  
    const dName = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const phone = formData.get('phone');
    const preferred_notification = formData.get('preferred_notification');
    const blood_group = formData.get('blood_group');
    const street = formData.get('street');
    const city = formData.get('city');
    const state = formData.get('state');
    const zip = formData.get('zip');
  
    if (password !== confirmPassword) {
      console.log('Passwords do not match!');
      toast.error("Passwords do not match!");
      return;
    }
    const user = {
      dName,
      email,
      phone,
      blood_group,
      preferred_notification,
      password,
      location_info : {
        street,
        city,
        state,
        zip
      },
      coordinates : {
        lat: coords.latitude,
        lng: coords.longitude
      }
    };
  
    console.log('Form submitted:', user);
  
    try {
      const response = await axios.post("http://localhost:5000/api/donors", user);
  
      if (response.status === 201) {
        const userRole = "donor";
        login(email);
        toast.success("Signup successful!");
        navigate("/donor");
      } else {
        console.log("Error signing up", response.data.message);
        toast.error("Signup failed. Please try again.");
      }
    } catch (err) {
      console.log("Signup error:", err);
      toast.error("Server error. Try again later.");
    }
  };
  
  
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const userRole = "donor";
      login(jwtDecode(credential).email,userRole);
      console.log('Google Sign Up Success:', credentialResponse);
      navigate("/google-signup", { state: credentialResponse });
    } catch (err) {
      console.log("Error during Google Sign Up redirect:", err);
      toast.error("Something went wrong with Google Sign Up");
    }
  };
  
  const handleGoogleError = () => {
    console.log('Google Sign Up Failed');
    toast.error("Google Sign Up Failed");
  };

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Please enable location access for better experience");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);
  

  return (
    <div className={styles.authContainer}>
      <motion.div 
        className={styles.formCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Volunteer Sign Up</h1>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Mobile number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.formGroup}>
             <label htmlFor="street">Street</label>
              <input
              type="text"
              id="street"
              name="street"
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.formGroup}>
             <label htmlFor="city">City</label>
             <input
              type="text"
              id="city"
              name="city"
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="zip">ZIP Code</label>
            <input
              type="text"
              id="zip"
              name="zip"
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.two}>
          <div className={styles.formGroup}>
            <label htmlFor="blood">Blood Group</label>
            <select 
            id="blood"
            name='blood_group'
            className={styles.dropDown}
            required
            >
              <option value="">-- Select --</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="O+">O+</option>
              <option value="AB+">AB+</option>
              <option value="A-">A-</option>
              <option value="B-">B-</option>
              <option value="O-">O-</option>
              <option value="AB-">AB-</option>

            </select>
          </div>
          <div className={styles.formGroup}>
           <label htmlFor="notification">Preferred Notification</label>
            <select
              id="notification"
              name="preferred_notification"
              className={styles.dropDown}
              required
            >
             <option value="">-- Select --</option>
             <option value="Email">Email</option>
             <option value="SMS">SMS</option>
             <option value="WhatsApp">WhatsApp</option>
            </select>
          </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={styles.inputField}
              required
            />
          </div>

          <motion.button 
            className={styles.submitButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            Sign Up
          </motion.button>
        </form>

        <div className={styles.divider}>
          <span>or continue with</span>
        </div>

        <div className={styles.socialButtons}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            size="large"
            width="100%"
            text="signup_with"
            shape="rectangular"
          />
        </div>

        <p className={styles.switchText}>
          Already have an account?
          <Link to="/VLogin" className={styles.switchLink}>Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default VSignup;