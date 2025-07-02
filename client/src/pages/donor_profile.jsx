import React, { useState, useEffect } from 'react';
import { User, Award, Edit } from 'lucide-react';
import styles from './donor_profile.module.css';
import DonationHistory from './donor_history';
import { useAuth } from '../Context/AuthContext.jsx';
import axios from 'axios';

const DonorProfile = () => {
  const { userEmail } = useAuth();
  const [donorData, setDonorData] = useState(null);

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/donors/${userEmail}`);
        if(res.status === 200)setDonorData(res.data); 
      } catch (err) {
        console.error("Error fetching the donor data:", err.message);
      }
    };
    if (userEmail) fetchDonorData();
  }, [userEmail]);

  if (!donorData) return <>Loading....</>;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.profilePicSection}>
          <div className={styles.profilePic}>
            <User size={40} />
          </div>
          <button className={styles.editButton}>
            <Edit size={16} />
            Edit Profile
          </button>
        </div>
        <div className={styles.bloodBadge}>{donorData.blood_group}</div>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoHeader}>
            <User size={20} />
            <h3>Personal Information</h3>
          </div>
          <div className={styles.infoContent}>
            <p><strong>Name:</strong> {donorData.dName}</p>
            <p><strong>Email:</strong> {donorData.email}</p>
            <p><strong>Phone:</strong> {donorData.phone}</p>
            <p><strong>Address:</strong> {donorData.permanent_location}</p>
          </div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoHeader}>
            <Award size={20} />
            <h3>Donation Status</h3>
          </div>
          <div className={styles.infoContent}>
            <p><strong>Donor Level:</strong> Silver</p>
            <p><strong>Total Donations:</strong> --</p>
            <p><strong>Last Donation:</strong> --</p>
            <p><strong>Member Since:</strong> --</p>
          </div>
        </div>
      </div>

      <div className={styles.achievementsSection}>
        <h3>Achievements</h3>
        <div className={styles.achievementGrid}>
          {[1, 2, 3].map((_, index) => (
            <div key={index} className={styles.achievementCard}>
              <Award size={24} />
              <h4>First Time Donor</h4>
              <p>Completed first blood donation</p>
            </div>
          ))}
        </div>
      </div>
      <DonationHistory />
    </div>
  );
};

export default DonorProfile;
