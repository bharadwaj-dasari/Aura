const facilityServices = require("../services/facilityServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const createFacility = async (req, res) => {
    try {
        console.log(req.body);
        const existingFacility = await facilityServices.getFacilityByEmail(req.body.email);
        if(existingFacility){
            return res.status(409).json({message:"Facility already exists with this Email"});
        }
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const facilityData = {
            ...req.body,
            password:hashedPassword
           
        }
        console.log('facilty controller:',facilityData);
        const facility = await facilityServices.createFacility(facilityData);
        res.status(201).json({message:"Facility created Successfully",facility});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const AuthFacility = async (req,res) => {
    try{
        const {email,password} = req.body;
        const facility = await facilityServices.getFacilityByEmail(email);
        console.log(req.body);
        if(!facility){
            return res.status(400).json({message:"Invalid email or password"});
        }else{
            const passwordMatch = await bcrypt.compare(password,facility.password);
            if(!passwordMatch){
                return res.status(400).json({message:"Invalid email or password"});
            }
            const token = jwt.sign(
                {id:facility.id,email:facility.email},
                process.env.JWT_SECRET,
                {expiresIn:'7d'}
            );
            res.status(200).json({message:"Login Successful",token});
        }
    }catch(err){
        res.status(500).json({message:"Error authentication facility"});
    }
};

const getAllFacilities = async (req, res) => {
    try {
        const facilities = await facilityServices.getAllFacilities();
        res.status(200).json(facilities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getFacilityById = async (req, res) => {
    try {
        const id = req.params.id;
        const facility = await facilityServices.getFacilityById(id);
        res.status(200).json(facility);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getFacilityByEmail = async(req,res)=> {
    try{
        const email = req.params.email;
        const facility = await facilityServices.getFacilityByEmail(email);
        res.status(200).json(facility);
    }catch(error){
        res.status(400).json({error:error.message});
    }
}
const getApprovalStauts=async(req,res)=>{
    console.log("getApprovalStauts called with email:", req.params.email);
    try{
        const email = req.params.email;
        const facility = await facilityServices.getFacilityByEmail(email);
        res.status(200).json({status:facility.verified});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}
const updateFacility = async (req, res) => {
    try {
        const updatedFacility = await facilityServices.updateFacility(req.params.id, req.body);
        res.status(200).json(updatedFacility);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteFacility = async (req, res) => {
    try {
        const id = req.params.id;
        await facilityServices.deleteFacility(id);
        res.status(200).json({ message: "Facility deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createFacility,AuthFacility, getAllFacilities, getFacilityById,getFacilityByEmail, updateFacility, deleteFacility,getApprovalStauts };
