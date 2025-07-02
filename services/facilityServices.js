const db = require("../config/database");

const ensureJSONString = (obj) =>
    typeof obj === 'string' ? obj : JSON.stringify(obj);

const validateCoordinates = (coordinates) => {
    if (
        !coordinates ||
        typeof coordinates.longitude !== 'number' ||
        typeof coordinates.latitude !== 'number' ||
        isNaN(coordinates.longitude) ||
        isNaN(coordinates.latitude)
    ) {
        throw new Error("Invalid coordinates");
    }
};


const createFacility = async (facilityData) => {
    console.log("create facility",facilityData);
    const { name, facility_type, license_number, email, password, phone,location_info, coordinates } = facilityData;
    const query = `INSERT INTO facility (name, facility_type, license_number, email, password, phone, location_info,coordinates) 
                    VALUES ( ?, ?, ?, ?, ?, ?, ?, ST_GeomFromText(?))`;
    console.log("query:",query);
    try {
        validateCoordinates(coordinates);
        const point = `POINT(${coordinates.longitude} ${coordinates.latitude})`;
        console.log("Geo Point to insert:", point);
        const [row] = await db.execute(query, [name, facility_type, license_number, email, password, phone, ensureJSONString(location_info),point]);
        return { id: row.insertId, ...facilityData };
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllFacilities = async () => {
    const query = `SELECT * FROM facility`;
    try {
        const [rows] = await db.execute(query);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getFacilityById = async (id) => {
    const query = `SELECT * FROM facility WHERE id = ?`;
    try {
        const [rows] = await db.execute(query, [id]);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getFacilityByEmail = async (email) =>{
    const query = `SELECT * FROM facility WHERE email = ?`;
    try{
        const [rows] = await db.execute(query,[email]);
        return rows[0];
    }catch(error){
        throw new Error(error.message);
    }
}

const updateFacility = async (id, newData) => {
    const { name, facility_type, license_number, email, password, confirm_password, phone, address, city, state, zip_code } = newData;
    const query = `UPDATE facility SET name = ?, facility_type = ?, license_number = ?, email = ?, password = ?, confirm_password = ?, phone = ?, address = ?, city = ?, state = ?, zip_code = ? 
                    WHERE id = ?`;
    try {
        const [rows] = await db.execute(query, [name, facility_type, license_number, email, password, confirm_password, phone, address, city, state, zip_code, id]);
        return { id, ...newData };
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteFacility = async (id) => {
    const query = `DELETE FROM facility WHERE id = ?`;
    try {
        await db.execute(query, [id]);
        return { message: "Facility deleted successfully" };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { createFacility, getAllFacilities, getFacilityById, getFacilityByEmail,updateFacility, deleteFacility };
