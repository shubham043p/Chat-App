import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })

    res.cookie("jwt",token,{
        maxAge: 15*24*3600*1000, //miliseconds
        httpOnly:true, // prevent xss 
        sameSite:"strict", // prevent csrf attacks
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateTokenAndSetCookie;
