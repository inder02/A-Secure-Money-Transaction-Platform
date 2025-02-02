const {JWT_SECRET} =require("./config")
const jwt=require("jsonwebtoken")

const authMiddleware=(req, res,next)=>{
    const authHeader=req.headers.authorization;
    console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('bearer ')){
        return res.status(403).json({
            msg:"no jwt"
        })
    }
    const token=authHeader.split(' ')[1];
    console.log(token)
    try{
        // console.log("reached try")
        const decoded=jwt.verify(token, JWT_SECRET);
        console.log("reached here decoded",decoded)
        if(decoded.userId){
            // console.log(decoded.userId,decoded.id)
        req.userId=decoded.userId;
        console.log("arrived")
        next();
        }else return res.status(403).json({
            msg:"invalid token"
        })
       
    }catch(err){
        return res.status(403).json({
            msg:"error"
        })
    }
}
module.exports={
    authMiddleware
}