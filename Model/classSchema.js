const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
  
    className:{
        type:String,
        require:true
    },
    tuitionFee:{
        type:Number,
        require:true,
    },
    classTeacher:{
        type:String,
        require:true
    }

})

const classes = mongoose.model("classes",classSchema)


module.exports = classes