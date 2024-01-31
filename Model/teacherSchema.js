const mongoose = require('mongoose')


const teacherSchema = new mongoose.Schema({

    teacherImage:{
        type:String,
        require:true
    },
    teacherName:{
        type:String,
        require:true,
        min:[3,'Must be atleast 3 character but got {VALUE}']
    },
    teacherEmail:{
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
    teacherPswd:{
        type:String,
        require:true
    },
    mobileNumber:{
        type:String,
        require:true,
        unique:true
    },
    joiningDate:{
        type:String,
        require:true
    },
    monthlySalary:{
        type:Number,
        require:true
    }
})

const teachers = mongoose.model("teachers",teacherSchema)




module.exports = teachers