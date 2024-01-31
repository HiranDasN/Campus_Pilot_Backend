const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:[3,'Must be atleast 3 character but got {VALUE}']
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value))
            {
                throw new Error('Invalid Email')
            }
        }
    },
    password:{
        type:String,
        require:true
    },
    schoolImage:{
        type:String,
        require:true
    },
    instituteName:{
        type:String,
        require:true,
        min:[3,'Must be atleast 3 character but got {VALUE}']
    },
    phoneNumber:{
        type:String,
        require:true
    },
    schoolEmail:{
        type:String,
        require:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value))
            {
                throw new Error('Invalid Email')
            }
        }
    },
    location:{
        type:String,
        require:true
    }
})

const admin = mongoose.model("admins",adminSchema)

module.exports = admin