const {Account}=require("../db")
const zod=require("zod")
const {authMiddleware}=require("../middleware")
const express=require("express");
const { default: mongoose } = require("mongoose");
const router=express.Router();

router.get("/balance", authMiddleware, async(req, res)=>{
    const account=await Account.findOne({
        userId:req.userId
    })
    res.json({
        balance:account.balance
    })
})
router.post("/transfer",authMiddleware,async(req, res)=>{
    
    const {amount, to}=req.body;
    const account=await Account.findOne({
        userId:req.userId
    });
console.log("arrived",account)
    if(!account || account.balance<amount){
       
        return res.status(400).json({
            msg:"insuffecient balance"
        })
    }
    const toAccount=await Account.findOne({
        userId:to
    });
    if(!toAccount){
      
        return res.status(400).json({
            msg:"insuffecient balance"
        })
    }

    await account.updateOne({userId:req.userId},{$inc:{balance:-amount}})
    await toAccount.updateOne({userId:to},{$inc:{balance:amount}})
console.log("success")

    res.json({
        msg:"transfer successful"
    })
})



module.exports=router