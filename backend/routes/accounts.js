const router = require('express').Router();
const authMiddleware = require("../middleware")
const mongoose = require("mongoose");
const {Account, User} = require('../db');


router.get("/balance", authMiddleware, async (req,res)=>{

    const account = await Account.findOne({
        userId:req.userId
    });

    res.json({
        balance :account.balance
    })

})

router.post("transfer",authMiddleware,  async(req,res)=>{

    //have to do mogoose transaction here , because  if there is an error we need to rollback all the changes 

    const session = mongoose.startSession();
    session.startTransaction();
    //amount is money to send, TO is var for whom to send money
    const { amount, to} = req.body;

    //fetch the accounts within transaction

    const account = await account.findOne({userId:req.userId}).session(session);

    if(!account || account.balance < amount)
    {   await session.abortTransaction();
        return res.status(400).json({
            msg:"Insuffucient balance"
        })
    }

    const toAccount  = await Account.findOne({userId: to})

    if(!toAccount)
    {
        await session.abortTransactionI();
        return res.status(400).json({
            message:"invalid account"
        })
    }


    // - the amount from the sender account 
    await Account.updateOne({userId:req.userId},{$inc:{balance: -amount} }).session(session);
    // + in receiver account 
    await Account.updateOne({userId: to},{$inc: {balance: amount}}).session(session);


    //commit the transaction

    await session.commitTransaction();

    res.json({
        message: "transfer successfull"
    });







    
})

module.exports=router;