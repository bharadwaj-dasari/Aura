import React, { useEffect, useState } from 'react';
import styles from './BloodRequestForm.module.css';
import { X } from 'lucide-react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useAuth } from '../Context/AuthContext';

const BloodRequestForm = ({ onClose }) => {
  const {userEmail}=useAuth();
  const [MFData,setMFData] = useState(null);
  const email = userEmail || localStorage.getItem("email");
  const [formData, setFormData] = useState({
    blood_group: '',
    units: 1,
    urgency: '',
    type: '',
    address: '',
    contactNumber: '',
    facilityName: '',
    notes: '',
    patientName: '',
    patientAge: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(()=>{
     const fetchFacilityData = async() => {
      try{
        const res = await axios.get(`http://localhost:5000/api/facility/${email}`);
        setMFData(res.data);
        console.log("Fetched Facility Data:",res.data);
      }catch(err){
        console.error("Error fetching facility Data:",err.message);
        toast.error("no Facility data");
      }
     };
     if(email)fetchFacilityData();
  },[email]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    try{
      const facility_id= MFData?.id;
      const payload = {facility_id,...formData};
      console.log("Payload Submitting");
      if(!payload){
        toast.error("Payload is missing!");
      }
      const response = await axios.post("http://localhost:5000/api/blood-requests",payload);
      if(response.status === 201){
        toast.success("Request added successfully");
      }else{
        console.log("Error adding blood request",response.data.message);
        toast.error("Error adding Blood request.Try again!");
      }
    }catch(error){
      console.log("Error adding blood request",error);
      toast.error("Error at server.try again later");
    }
    onClose();
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2>New Blood Request </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="blood_group">Blood Group*</label>
              <select
                id="blood_group"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                required
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="units">Units Required*</label>
              <input
                type="number"
                id="units"
                name="units"
                min="1"
                value={formData.units}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="urgency">Urgency*</label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                required
              >
                <option value="">Select Urgency</option>
                <option value="Urgent">Urgent</option>
                <option value="Within 24 hours">Within 24 hours</option>
                <option value="Within 3 days">Within 3 days</option>
                <option value="Within a week">Within a week</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="type">Request Type*</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="live_blood">Live Donation</option>
                <option value="store_blood">Blood Bank</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="patientName">Patient Name*</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="patientAge">Patient Age*</label>
              <input
                type="number"
                id="patientAge"
                name="patientAge"
                min="0"
                value={formData.patientAge}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="facilityName">Facility Name*</label>
              <input
                type="text"
                id="facilityName"
                name="facilityName"
                value={formData.facilityName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="contactNumber">Contact Number*</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="address">Address*</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="notes">Additional Notes</label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <div className={styles.formActions}>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.submitButton}
            >
              Create Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BloodRequestForm;