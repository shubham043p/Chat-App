import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });

    res.cookie("jwt",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,//Milliseconds
        httpOnly: true,  //prevent XSS attacks cross-site scripting attacks
        sameSite:"strict",//CSRF attacks Cross-Site Request Forgery attacks
        secure: process.env.NODE_ENV === "production" ? true : false, // if development me hai toh false else true
    })
};

export default generateTokenAndSetCookie;