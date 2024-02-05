const {jwtSecret} = require('./config')
const jwt = require("jsonwebtoken");


const authMiddleware  = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer'))
    {
        return res.status(403).json({
            msg:"forbidden request"
        })
    }

    const token = authHeader.split(' ')[1];

    try{
        const decode = jwt.verify(token, jwtSecret);

        if(decode.userId)
        {
            req.userId = decode.userId;
            console.log(decode.userId);
        }

        
        next();
    }
    catch(err)
    {
        return res.status(403).json({
            msg:"forbidden request"
        })
    }


    module.exports ={
        authMiddleware
    };



}
