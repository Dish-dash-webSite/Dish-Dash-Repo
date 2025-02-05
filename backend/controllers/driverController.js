// driverController.js

const { Driver, User,Customer } = require('../database/associations'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || '1234';
const expiresIn = '10h';
const saltRounds = 10;

const register = async(req,res)=>{
    try{
        const {firstName,lastName, email, password,phoneNumber,vehicleType,role,licenseNumber,deliveryAddress} = req.body;
        if(!firstName || !lastName || !email || !password || !phoneNumber || !vehicleType || !role || !licenseNumber||!deliveryAddress){
            return res.status(400).json({error: "All fields are required"});
        }
        const existingUser= await User.findOne({ where: { email } })
        if(!existingUser){
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = await User.create({email:email,password:hashedPassword,phoneNumber:phoneNumber,role:role})
            const newDriver = await Driver.create({ firstName:firstName,lastName:lastName,vehicleType:vehicleType,licenseNumber:licenseNumber,userId:newUser.id})
            const newCustomer = await Customer.create({firstName:firstName,lastName:lastName,deliveryAddress:deliveryAddress,userId:newUser.id,})
            const token = jwt.sign(
                { userId: newUser.id, role: newUser.role, driverId: newDriver.id ,customerId:newCustomer.id},
                JWT_SECRET,
                { expiresIn: expiresIn }
            );
            
            res.status(201).json({ token });
        }else {
            const checkDriver = await Driver.findOne({where:{userId:existingUser.id}})
            if(checkDriver){
                return res.status(400).json({error:"User already exists"})
        }
        const checkCustomer = await Customer.findOne({where:{userId:existingUser.id}})
        if(!checkCustomer){
            const newCustomer = await Customer.create({firstName:firstName,lastName:lastName,deliveryAddress:deliveryAddress,userId:existingUser.id,})
        }
            const newDriver = await Driver.create({ firstName:firstName,lastName:lastName,vehicleType:vehicleType,licenseNumber:licenseNumber,userId:existingUser.id})
    }
        
    }catch(err){
        res.status(500).json({ error: err.message || "Internal Server Error" });

    }
}