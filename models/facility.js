const db = require("../config/database");

const facilityTable = `
 CREATE TABLE IF NOT EXISTS facility (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   facility_type VARCHAR(255) NOT NULL,
   license_number VARCHAR(255) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   phone VARCHAR(15) NOT NULL,
   location_info JSON,
   coordinates POINT NOT NULL,
   verified BOOLEAN DEFAULT FALSE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   SPATIAL INDEX (coordinates)
 );
`;

const createFacilityTable = async () => {
    try {
        await db.execute(facilityTable);
    } catch (error) {
        console.error("Error creating facility table:", error.message);
    }
}

module.exports = { createFacilityTable };
