import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import styles from './auth.module.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../Context/AuthContext.jsx';
import toast from 'react-hot-toast';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const MFSignup = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  // location fetching
  const coordinates={latitude:"",longitude:""};
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coordinates.latitude = position.coords.latitude;
        coordinates.longitude = position.coords.longitude;
        
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const license_number = formData.get('licenseNumber');
    const facility_type = formData.get('facilityType');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const city = formData.get('city');
    const state = formData.get('state');
    const zipCode = formData.get('zipCode');  
  

    if (password !== confirmPassword) {
      console.log('Passwords do not match!');
      toast.error("Passwords do not match!");
    } else {
      const location_info={address,city,zipCode,state};
      const facility = { name, email, license_number, facility_type,phone, password ,location_info,coordinates};
      console.log('Form submitted:', facility);

      try {
        const response = await axios.post("http://localhost:5000/api/facilities", facility);
        if (response.status ===  201) {
          const userRole = "bloodbank";
          login(email,userRole);
          toast.success("Signup successful!");
          navigate("/approval");
        } else {
          console.log("error signing up", response.data.message);
          toast.error("Signup failed. Please try again.");
        }
      } catch (err) {
        console.log("Signup error:", err);
        toast.error("Server error. Try again later.");
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const userRole = "bloodbank";
      login(jwtDecode(credentialResponse).email,userRole);
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

  return (
    <div className={styles.authContainer}>
      <motion.div 
        className={styles.formCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Registration</h1>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Organization Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="facilityType">Facility Type</label>
            <select
              id={styles.facilityType}
              name="facilityType"
              className={styles.select}
              required
            >
              <option value="">Select Facility Type</option>
              <option value="Hospital">Hospital</option>
              <option value="Clinic">Clinic</option>
              <option value="Blood Bank">Blood Bank</option>
              <option value="NGO">NGO</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="licenseNumber"> NIN-2-HFI</label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
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
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input
             type="text"
             id="phone"
             name="phone"
             className={styles.inputField}
             required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <input
             type="text"
             id="address"
             name="address"
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
            <label htmlFor="zipCode">Zip Code</label>
            <input
             type="text"
             id="zipCode"
             name="zipCode"
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
            Register
          </motion.button>

        </form>

        {/* <div className={styles.divider}>
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
        </div> */}

        <p className={styles.switchText}>
          Already have an account?
          <Link to="/MFLogin" className={styles.switchLink}>Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default MFSignup;