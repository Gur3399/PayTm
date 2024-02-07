const express  = require('express');
const router   = express.Router();
const zod = require("zod");
const {User} = require("./db")
const jwtSecret = require("./config");
const jwt = require('jsonwebtoken')
const authMiddleware  = require('../middleware')

const signUpSchema = zod.object({
    username:zod.string (),
    password:zod.string(),
    firstName: zod.string(),
    password: zod.string()

})

//schema to check the update data 

const updateBody = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
    
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

    const user = await User.findOne({
        username:body.username
    })
    console.log("this is user var"+user);
     
    if(user._id)
    {
        return res.json({
            msg:"Email already take/ incorrect inputs"
        })
    }
    // creating account and adding random value of money
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    
    const dbUser = await User.create(body);
    
    const token = jwt.sign({userId: dbUser._id}, jwtSecret)

    res.json({
        msg:"user created successfully",
        token:token
    })

})

//update route

route.put("/", async (req, res)=>{
    const {success} = updateBody.safeParse(req.body);
    if(!success)
    {
        res.status(411).json({
            msg:"Error  in updating data"
        })
    }

    await User.updtaeOne(req.body,{
        id:req.userId
    })

    res.json({
        msg:'Data updated'
    })


})

router.get("/bulk", async (req,res)=>{
    //query parm from url 
    const filter = req.query.filter || "";

    //regex mongo fun to match the pattern using substring

    const users = await User.findOne({
        $or:[{
            firstName:{
                 "$regex":filter,
                  "option":"i"
            }
        },{
            lastName:{
                "$regex":filter,
                "$option":"i"
            }
        }]
    })

    res.json({
        user:users.map(user =>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id

        })
        )
    })


})



module.exports = router;