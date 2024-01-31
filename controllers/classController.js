const classes = require('../Model/classSchema')
const students = require('../Model/studentSchema')
exports.addclass = async (req,res)=>{

    console.log('inside Class add Controller');


    const {className,tuitionFee,classTeacher} = req.body
    console.log(`${className},${tuitionFee},${classTeacher}`);

    try{
        const ExistingClass = await classes.findOne({classTeacher})
        if(ExistingClass){
            res.status(406).json('Class Already Exist...Please Add another Class')
        }
        else{
            const newClass = new classes({
                className,tuitionFee,classTeacher
            })
            
            await newClass.save()
            res.status(200).json(newClass) 
        }


        
    }catch(err){
        res.status(401).json(`Class already Exists.... please try again ${err}`)
    }

}


exports.getallClass = async(req,res)=>{
    const  classsearch = req.query.searchclass
    console.log(classsearch);
    const query ={
        className:{
            $regex:classsearch,$options:'i'
        }
    }
   
   
    try{
        
        const allClass = await classes.find(query)
        res.status(200).json(allClass)

    } catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}


exports.editClassInfo = async(req,res)=>{
    const {id}=req.params
    const adminId = req.payload
    const {className,tuitionFee,classTeacher} = req.body


    try {
        const updateClass = await classes.findByIdAndUpdate({_id:id},
            {className,tuitionFee,classTeacher,adminId},{new:true})

        await updateClass.save()
        res.status(200).json(updateClass)
        
    } catch (err) {       
        res.status(401).json(err) 
    }
}

exports.deleteClass = async (req, res) => {
    const { id } = req.params;
    try {
       
        const removedClass = await classes.findByIdAndDelete({ _id: id });

        
        if (removedClass) {
            await students.deleteMany({ selectedClass: removedClass.className });
        }

        res.status(200).json({ message: 'Class and associated students deleted successfully.' });
    } catch (err) {
        res.status(4010).json(err);
    }
}
