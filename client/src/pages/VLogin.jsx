import { useContext,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import styles from './auth.module.css';
import { motion } from 'framer-motion';
import {  useAuth } from '../Context/AuthContext';
import {jwtDecode} from "jwt-decode";
import axios from 'axios';
import toast from 'react-hot-toast';
const VLogin = () => {
  //const [email,setEmailInput] = useState('');
 
  console.log(window.location.href);
  const navigate = useNavigate();
  const {login}=useAuth();
  //const [valid,setValid]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const emailInput = formdata.get("email").trim();
    const password = formdata.get("password").trim();
  
  
    try {
      const response = await axios.post("http://localhost:5000/api/donors/authdonor", { email: emailInput, password });
      console.log("Login Response:", response.data);
      if (response.status === 200) {
        const userRole = "donor";
        login(emailInput,userRole); 
        toast.success("Login Successful");
        navigate("/donor");
      console.log("✅ Login Response:", response.data);
       } else {
        toast.error("Invalid Credentials");
      }
    }catch (err) {
      if (err.response) {
        toast.error(`Error: ${err.response.data.message}`);
        toast.error(`Error: ${err.response.data.message}`);
      } else if (err.request) {
        toast.error("No response from server");
      } else {

        toast.error("Request setup error");
        toast.error("Request setup error");
      }
    }
  };

  const handleGoogleSuccess =async (credentialResponse) => {
    try{
    console.log('Google Sign In Success:', credentialResponse);
    const credential=credentialResponse.credential;
    const response=await axios.post("http://localhost:5000/api/googleAuth",{credential});
    console.log("response",response);

      if (response.data.message === "success") {
        const userRole = "donor";
        login(jwtDecode(credential).email,userRole);
        toast.success('Login Successful');
        navigate('/donor');
      } else {
        console.error("Error login using google", response.data.message);
        toast.error("Google Login failed");
      }
    } catch (err) {
      toast.error("Something went wrong with Google Login");
      console.error(err);
    }
  };

  const handleGoogleError = () => {
    console.error('Google Sign In Failed');
    toast.error('Google Sign In Failed');
  };

  return (
    <div className={styles.authContainer}>
      <motion.div 
        className={styles.formCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Volunteer Sign In</h1>
        
        <form onSubmit={handleSubmit}>
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

          <motion.button 
            className={styles.submitButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            Sign In
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
            width="100vh"
            text="signin_with"
            shape="rectangular"
            useOneTap
            ux_mode="popup"
          />
        </div>

        <p className={styles.switchText}>
          Don't have an account?
          <Link to="/VSignup" className={styles.switchLink}>Sign Up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default VLogin;