const mongoose = require('mongoose')


const studentSchema = new mongoose.Schema({

    studentImage:{
        type:String,
        require:true
    },
    studentName:{
        type:String,
        require:true,
        min:[3,'Must be atleast 3 character but got {VALUE}']
    },
    registrationNumber:{
        type:String,
        require:true,
        unique:true
    },
    studentEmail:{
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
    studentPswd:{
        type:String,
        require:true
    },
    selectedClass:{
        type:String,
        require:true
    },
    admissionDate:{
        type:String,
        require:true
    }
})

const students = mongoose.model("students",studentSchema)



module.exports = students