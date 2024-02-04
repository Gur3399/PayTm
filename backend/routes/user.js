const express  = require('express');
const router   = express.Router();
const zod = require("zod");
const {User} = require("./db")
const jwtSecret = require("./config");
const jwt = require('jsonwebtoken')

const signUpSchema = zod.object({
    username:zod.string (),
    password:zod.string(),
    firstNAme: zod.string(),
    password: zod.string()

})
//another way
// const {Router}= require("express");
// const router = Router();
router.post("/signup",  async (req, res)=>{
    const body = req.body;
    const {success} = signUpSchema.safeParse(req.body);
    if(!success)
    {
        return res.json({
            msg:"incorrect inputs"
        })
    }

    const user = User.findOne({
        username:body.username
    })

    if(user._id)
    {
        return res.json({
            msg:"Email already take/ incorrect inputs"
        })
    }

    
    const dbUser = await User.create(body);
    
    const token = jwt.sign({userId: dbUser._id}, jwtSecret)

    res.json({
        msg:"user created successfully",
        token:token
    })

})

router.get("/signin  ", (req, res)=>{
    
})

router.get("/signup", (req, res)=>{
    
})



module.exports = router;