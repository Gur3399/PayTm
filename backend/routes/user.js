const express  = require('express');
const router   = express.Router();
const zod = require("zod");
const {User, Account} = require("../db")
const jwtSecret = require("../config");
const jwt = require('jsonwebtoken')
const authMiddleware  = require('../middleware')

const signUpSchema = zod.object({
    username:zod.string (),
    password: zod.string(),
    firstName: zod.string(),
    lastName:zod.string()
    

})

//schema to check the update data 

const updateBody = zod.object({
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
    password:zod.string().optional()
    
})

const signinBody = zod.object({
    username:zod.string().email(),
    password:zod.string()

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

    const existingUser = await User.findOne({
        username:body.username
    })
    console.log("this is user var"+success + "agge" + body.userName, existingUser);
     
    if(existingUser)
    {
        return res.json({
            msg:"Email already taken/ incorrect inputs"
        })
    }

    const dbUser = await User.create(body);
    // creating account and adding random value of money

    const userId = dbUser._id;
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    
    
    
    const token = jwt.sign({userId: dbUser._id}, jwtSecret)

    res.json({
        msg:"user created successfully",
        token:token
    })

})

//update route


router.post("/signin", authMiddleware, async(req, res)=>{

    const{success} = signinBody.safeParse(req.body);
    if(!success)
    {
        res.status(411).json({
            msg:"invalid inputs"
        })
    }



   const user = await User.findOne({
      username:req.body.username,
      password:req.body.password
   })

   if(!user)
   {
    res.status(411).json({
        msg:"Invalid credentials"
    })
   }
   else{
     const token = jwt.sign({
        userId:user._id
     }, jwtSecret);

     res.json(
        {
            token: token
        }
     )

   }


})


router.put("/", authMiddleware, async (req, res)=>{
    const {success} = updateBody.safeParse(req.body);
    
    if(!success)
    {
        res.status(411).json({
            msg:"Error  in updating data"
        })
    }

    await User.updateOne(req.body,{
        _id:req.userId
    })

    res.json({
        msg:'Data updated'
    })


})
router.get("/bulk", async (req,res)=>{
    //query parm from url 
    const filter = req.query.filter || "";

    //regex mongo fun to match the pattern using substring

    const users = await User.find({
        $or:[{
            firstName:{
                 "$regex":filter,
                  "$options":"i"
            }
        },{
            lastName:{
                $regex:filter,
                $options:"i"
            }
        }]
    })


  
  console.log("array"+ typeof(users));
    res.json({
        user:users.map(user =>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id

        }))
    })


})





module.exports = router;