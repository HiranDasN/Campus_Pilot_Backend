const jwt = require('jsonwebtoken')
const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwt middleware');

    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);

    try{
        const jwtResponse = jwt.verify(token,"supersecretkey12345")
        console.log(jwtResponse);
        req.payload = jwtResponse.adminId
        next()
    }catch(err){
        res.status(401).json('Authorization Failed ...Please Login')
    }
    
}

module.exports = jwtMiddleware