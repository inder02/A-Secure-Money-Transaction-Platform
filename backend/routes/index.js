const express = require('express');
const accountRoutes= require("./accountRoutes")
const router = express.Router();
const userRouter= require("./userRoutes")
router.use("/user",userRouter)
router.use("/account",accountRoutes);




module.exports=router;