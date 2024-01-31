//logic for resolving request

    const admin = require('../Model/adminSchema')

    const jwt = require('jsonwebtoken')
 

//register request
exports.register  = async(req,res)=>{

    console.log('inside the Admin_Controller - register function');

    const {username,email,password} = req.body

    try{const existAdmin = await admin.findOne({email})
    if(existAdmin){
        res.status(406).json('Account Already Exists.... Please Login')
    }
    else{
        const newAdmin = new admin({
            username,
            email,
            password,
            schoolImage:"",
            instituteName:"",
            phoneNumber:"",
            schoolEmail:"",
            location:""
        })
        await newAdmin.save()

        res.status(200).json(newAdmin)
    }
}catch(err){
    res.status(401).json(`Registration Failed due to ${err}`)
}


   

    

}

//login request
exports.login =async (req,res)=>{

    const {email,password} = req.body
try{
    const existingAdmin =await admin.findOne({email,password})
    console.log(existingAdmin);

    if(existingAdmin){

        //jwt
        const token = jwt.sign({adminId:existingAdmin._id},"supersecretkey12345")
        res.status(200).json({existingAdmin,token})
    }
    else{
        res.status(404).json('Invalid Email or Password')
    }
    }catch(err){
        res.status(401).json(`login request failed due to : ${err}`);
    }
}

//edit Admin Profile
exports.editAdminProfile = async(req,res)=>{
    const adminId = req.payload
    const {username,email,password,schoolImage,instituteName,phoneNumber,schoolEmail,location} = req.body
    const uploadImage = req.file?req.file.filename:schoolImage
    try {
 
        const updateAdminProfile = await admin.findByIdAndUpdate({_id:adminId},{username,email,password,schoolImage:uploadImage,instituteName,phoneNumber,schoolEmail,location},{new:true})
 
        await updateAdminProfile.save()
        res.status(200).json(updateAdminProfile)
 
        
    } catch (err) {
        res.status(401).json(err)
    }
 
 }


 //update Admin Login Info
 exports.editAdminInfo = async(req,res)=>{
    const adminId = req.payload
    const {email,password} = req.body


    try {
        const updateAdminInfo = await admin.findByIdAndUpdate({_id:adminId},
            {email,password},{new:true})

        await updateAdminInfo.save()
        res.status(200).json(updateAdminInfo)
        
    } catch (err) {       
        res.status(401).json(err) 
    }
}

//delete admin
exports.deleteAdmin = async(req,res)=>{
    const {id} = req.params
    try{
        const removeAdmin = await admin.findByIdAndDelete({_id:id})
        res.status(200).json(removeAdmin)
    }catch(err){
        res.status(401).json(err)
    }

}

//get admin info
exports.getAdminInfo = async(req,res)=>{
    try{
        const adminInfo = await admin.find()
        res.status(200).json(adminInfo)
    }
    catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}