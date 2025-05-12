import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import styles from './auth.module.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";

const MFSignup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const licenseNumber = formData.get('licenseNumber');
    const facilityType = formData.get('facilityType');
    const phone = formData.get('phone');
    const 

    if (password !== confirmPassword) {
      console.log('Passwords do not match!');
      toast.error("Passwords do not match!");
    } else {
      const facility = { name, email, licenseNumber, facilityType, password ,address ,city,state,zipCode};
      console.log('Form submitted:', facility);

      try {
        const response = await axios.post("http://localhost:5000/api/facilities", facility);
        if (response.data.message === "Facility added successfully") {
          toast.success("Signup successful!");
          navigate("/facility-dashboard");
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
        <h1 className={styles.title}>Medical Facility Sign Up</h1>
        
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
              id="facilityType"
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
          <Link to="/MFLogin" className={styles.switchLink}>Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default MFSignup;
