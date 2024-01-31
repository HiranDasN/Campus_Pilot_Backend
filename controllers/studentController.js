const students = require('../Model/studentSchema')

const jwt = require('jsonwebtoken')



exports.registerStudent = async(req,res)=>{
    console.log('inside Student register controller ');


    const studentImage = req.file.filename
    console.log(studentImage);

    const {studentName,registrationNumber,studentEmail,studentPswd,selectedClass,admissionDate} = req.body
    console.log(`${studentImage},${studentName},${registrationNumber},${studentEmail},${studentPswd},${selectedClass},${admissionDate}`);

    try{
        const ExistingStudent = await students.findOne({studentEmail})
        if(ExistingStudent){
            res.status(406).json('Student Already Exist...Please register another Student')
        }
        else{
            const newStudent = new students({
                studentImage,studentName,registrationNumber,studentEmail,studentPswd,selectedClass,admissionDate
            })
            
            await newStudent.save()
            res.status(200).json(newStudent)
        }


        
    }catch(err){
        res.status(401).json(`Student already Exists.... please try again ${err}`)
    }


}



exports.getallStudents = async(req,res)=>{

    const  stdntsearch = req.query.studentsearch
    console.log(stdntsearch);

    const query ={
        registrationNumber:{
            $regex:stdntsearch,$options:'i'
        }
    }

    try{
        const allStudents = await students.find(query)
        res.status(200).json(allStudents)
    }
    catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}


exports.editStudentInfo = async(req,res)=>{
    const {id}=req.params
    const adminId = req.payload
    const {studentImage,studentName,registrationNumber,selectedClass} = req.body
    const uploadedStudentImage = req.file?req.file.filename:studentImage

    try {
        const updateStudent = await students.findByIdAndUpdate({_id:id},
            {studentImage:uploadedStudentImage,studentName,registrationNumber,selectedClass,adminId},{new:true})

        await updateStudent.save()
        res.status(200).json(updateStudent)
        
    } catch (err) {       
        res.status(401).json(err) 
    }
}



exports.deleteStudent = async(req,res)=>{
    const {id} = req.params
    try{
        const removeStudent = await students.findByIdAndDelete({_id:id})
        res.status(200).json(removeStudent)
    }catch(err){
        res.status(401).json(err)
    }

}



exports.StudentLogin =async (req,res)=>{

    const {email,password} = req.body
    console.log(email,password);
    try{
    const existingStudent =await students.findOne({studentEmail:email,studentPswd:password})
    console.log(existingStudent);

    if(existingStudent){

        const token = jwt.sign({studentId:existingStudent._id},"supersecretkey12345")
        res.status(200).json({existingStudent,token})
    }
    else{
        res.status(404).json('Invalid Email or Password')
    }
    }catch(err){
        res.status(401).json(`login request failed due to : ${err}`);
    }
}


exports.editStudLogInfo = async(req,res)=>{
    const {id} = req.params
     console.log(id);
    const {studentEmail,studentPswd} = req.body


    try {
        const updateStudLogInfo = await students.findByIdAndUpdate({_id:id},
            {studentEmail,studentPswd},{new:true})
            console.log(updateStudLogInfo);

        await updateStudLogInfo.save()
        res.status(200).json(updateStudLogInfo)
        
    } catch (err) {       
        res.status(401).json(err) 
    }
}
