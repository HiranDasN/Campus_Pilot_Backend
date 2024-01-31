const teachers = require('../Model/teacherSchema')

const jwt = require('jsonwebtoken')


exports.registerteacher = async(req,res)=>{
    console.log('inside Teacher register controller ');




    const teacherImage = req.file.filename
    console.log(teacherImage);

    const {teacherName,teacherEmail,teacherPswd,mobileNumber,joiningDate,monthlySalary} = req.body
    console.log(`${teacherImage},${teacherName},${teacherEmail},${teacherPswd},${mobileNumber},${joiningDate},${monthlySalary}`);

    try{
        const ExistingTeacher = await teachers.findOne({teacherEmail})
        if(ExistingTeacher){
            res.status(406).json('Teacher Already Exist...Please register another Teacher')
        }
        else{
            const newTeacher = new teachers({
                teacherImage,teacherName,teacherEmail,teacherPswd,mobileNumber,joiningDate,monthlySalary
            })
            
            await newTeacher.save()
            res.status(200).json(newTeacher)
        }


        
    }catch(err){
        res.status(401).json(`Teacher already Exists.... please try again ${err}`)
    }
}


exports.getallTeachers = async(req,res)=>{
    const  teachersearch = req.query.search
    console.log(teachersearch);
    const query ={
        teacherName:{
            $regex:teachersearch,$options:'i'
        }
    }
    try{
        const allTeachers = await teachers.find(query)
        res.status(200).json(allTeachers)
    }
    catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}


exports.editTeacherInfo = async(req,res)=>{
    const {id}=req.params
    const adminId = req.payload
    const {teacherImage,teacherName,mobileNumber,monthlySalary} = req.body
    const uploadedTeacherImage = req.file?req.file.filename:teacherImage

    try {
        const updateTeacher = await teachers.findByIdAndUpdate({_id:id},
            {teacherImage:uploadedTeacherImage,teacherName,mobileNumber,monthlySalary,adminId},{new:true})

        await updateTeacher.save()
        res.status(200).json(updateTeacher)
        
    } catch (err) {       
        res.status(401).json(err) 
    }
}




exports.deleteTeacher = async(req,res)=>{
    const {id} = req.params
    try{
        const removeTeacher = await teachers.findByIdAndDelete({_id:id})
        res.status(200).json(removeTeacher)
    }catch(err){
        res.status(401).json(err)
    }

}


exports.TeacherLogin =async (req,res)=>{

    const {email,password} = req.body
    console.log(email,password);
    try{
    const existingTeacher =await teachers.findOne({teacherEmail:email,teacherPswd:password})
    console.log(existingTeacher);

    if(existingTeacher){

        //jwt
        const token = jwt.sign({teacherId:existingTeacher._id},"supersecretkey12345")
        res.status(200).json({existingTeacher,token})
    }
    else{
        res.status(404).json('Invalid Email or Password')
    }
    }catch(err){
        res.status(401).json(`login request failed due to : ${err}`);
    }
}


exports.editTchrLogInfo = async(req,res)=>{
    const {id} = req.params
     console.log(id);
    const {teacherEmail,teacherPswd} = req.body


    try {
        const updateTchrLogInfo = await teachers.findByIdAndUpdate({_id:id},
            {teacherEmail,teacherPswd},{new:true})
            console.log(updateTchrLogInfo);

        await updateTchrLogInfo.save()
        res.status(200).json(updateTchrLogInfo)
        
    } catch (err) {       
        res.status(401).json(err) 
    }
}


