const db = require("../config/database");

const donorTable = `
CREATE TABLE IF NOT EXISTS donor (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dName VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(15) NOT NULL,
  location VARCHAR(255) NOT NULL,
  blood_group ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-") NOT NULL,
  password VARCHAR(30) ,
  preferred_notification ENUM("Email", "SMS", "Whatsapp") NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const createDonorTable = async () => {
  try {
    await db.execute(donorTable);
  } catch (err) {
    console.error("Error creating donor table:", err.message);
  }
};

module.exports = { createDonorTable};

