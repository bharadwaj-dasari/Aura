const db = require('../config/database');
const donor = require('../models/donor');

const addDonor = async(donorData) => {
    console.log("add donor in services");
   const {dName,email,phone,location,blood_group,preferred_notification,password} = donorData;
   const query = `INSERT INTO donor (dName,email,phone,location,blood_group,preferred_notification,password) VALUES (?,?,?,?,?,?,?)`;

   try{
    const [result] = await db.execute(query,[dName,email,phone,location,blood_group,preferred_notification,password]);
    return{id:result.insertId,...donorData};
   }catch(err){
         throw new Error(err.message);
   }
};

const getAllDonors = async() => {
    const query = `SELECT * FROM donor`;
    try{
        const [rows] = await db.execute(query);
        return rows;
    }catch(err){
        throw new Error(err.message);
    }
};
const getDonor=async(email)=>{
    try{
        const query=`select password from donor where email="${email}"`;
        const password=await db.execute(query);
        if(password.length>0){
            
            // console.log("password",password[0][0].password);
            return password[0][0].password;
        }
    }
    catch(err){
        console.log('ERROR GETTING DONOR',err);
    }
}
const findDonors = async(blood_group,location) => {
   const query = `SELECT * FROM donor WHERE blood_group = ? AND location = ?`;
   try{
    const [rows] = await db.execute(query,[blood_group,location]);
    return rows;
   }catch(err){
    throw new Error(err.message);
   }
};

const updateDonor = async(id,newData) => {
   const {dName,email,phone,location,blood_group,preffered_notification} = newData;
   const query =`UPDATE donor SET dName = ?,email = ?,phone = ?,location = ?,blood_group = ?,preffered_notification = ? WHERE id = ?`;
   try{
    const [rows] = await db.execute(query,[dName,email,phone,location,blood_group,preffered_notification,id]);
    return {id, ...newData};
   }catch(err){
    throw new Error(err.message);
   }
};

const deleteDonor = async(id) => {
    const query = `DELETE FROM donor WHERE id = ?`;
    try{
        await db.execute(query,[id]);
        return {message: "Donor deleted succesfully"};
    }catch(err){
        throw new Error(err.message);
    }
};

module.exports = {addDonor,getAllDonors,findDonors,updateDonor,deleteDonor,getDonor};
