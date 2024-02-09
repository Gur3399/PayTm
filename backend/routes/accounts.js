const router = require('express').Router();
const authMiddleware = require("../middleware")
const mongoose = require("mongoose");

router.get("balance", authMiddleware, async (req,res)=>{

    const accountBalance = await Account.findOne({
        userId:req.userId
    });

    res.json({
        balance :accountBalance.balance
    })

})

router.post("transfer", async(req,res)=>{

    //have to do mogoose transaction here , because  if there is an error we need to rollback all the changes 

    const session = mongoose.startSession();
    session.startTransaction();

    const { amount, to} = req.body;

    //fetch the accounts within transaction

    const account = await account.findOne({userId:req.userId}).session(session);

    if(!account && !account.balance < amount)
    {
        res.status(200).json({
            msg:"Insuffucient balance"
        })
    }






    
})

module.exports={
    router
}