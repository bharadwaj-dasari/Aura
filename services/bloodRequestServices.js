const db = require("../config/database");

const BloodRequestsService = {
  async createBloodRequest({ facility_id, blood_group, units, urgency, type, address, contactNumber, facilityName, notes = null, patientName, patientAge }) {
    try {
      const [result] = await db.execute(
        `INSERT INTO bloodRequests 
         (facility_id, blood_group, units, urgency, type, address, contactNumber, facilityName, notes, patientName, patientAge) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [facility_id, blood_group, units, urgency, type, address, contactNumber, facilityName, notes, patientName, patientAge]
      );
      return { id: result.insertId, facility_id, blood_group, units, urgency, type, address, contactNumber, facilityName, notes, patientName, patientAge };
    } catch (error) {
      throw new Error("Failed to create blood request: " + error.message);
    }
  },

  async getAllBloodRequests() {
    try {
      const [rows] = await db.execute(`SELECT * FROM bloodRequests`);
      return rows;
    } catch (error) { 
      throw new Error("Failed to fetch blood requests: " + error.message);
    }
  },

  async getBloodRequestById(id) {
    try {
      const [rows] = await db.execute(`SELECT * FROM bloodRequests WHERE id = ?`, [id]);
      return rows[0];
    } catch (error) {
      throw new Error("Failed to fetch blood request: " + error.message);
    }
  },

  async deleteBloodRequest(id) {
    try {
      await db.execute(`DELETE FROM bloodRequests WHERE id = ?`, [id]);
      return { message: "Blood request deleted successfully" };
    } catch (error) {
      throw new Error("Failed to delete blood request: " + error.message);
    }
  },

  async getBloodRequestsByFacilityId(facility_id){
    try{
      const [rows] = await db.execute(`SELECT * FROM bloodRequests WHERE facility_id = ?`,[facility_id]);
      return rows[0];
    }catch(error){
      throw new Error("Failed to fetch blood request: "+ error.message);
    }
  }
};

module.exports = BloodRequestsService;
