const { userModel } = require("../models/user");
const express = require('express')
const auth =  express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { fetchUser } = require("../middleware/middleware");
require('dotenv').config();
let secret = "sirftujantahai" 
auth.post("/createUser", body('email').isEmail(),
    body('password').isLength({ min: 5 }).exists()
    ,async (req,res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.json(errors.array())
        }
        let foundSame = await userModel.findOne({email: req.body.email})
        if(foundSame){
            return res.status(400).json("bhai kya kar raha hai yaar tu?")
        }
        let {name, email} = req.body
        let pass = req.body.password
        let theSalt =  bcrypt.genSaltSync(10)
        let modifiedPassword =  bcrypt.hashSync(pass, theSalt)
        let createdUser = {name: name, email : email, password: modifiedPassword}
        let a = await userModel.create(createdUser)
        console.log(a.id)
        let payload =  {
            user: {id: a.id} 
        }
        const token = jwt.sign(payload,secret)
        res.json({token,a})
    }catch (error) {
        console.log(error)
        res.json(error)
    }
})
auth.post("/login", body('email').isEmail(),
    body('password').isLength({ min: 5 }).exists(),
    async (req,res)=>{
        try {
            let success = false 
            let {mail, pass} = req.body
            let find = await userModel.findOne({email: mail})
            if(!find){
                return res.json({err: "BHAI KYA KAR RAHA HAI YRR TU?"})
            }
            let valid = await bcrypt.compare(pass,find.password)
            if(!valid){
                return res.json({error: "BRUH :("})
            }
            const payloadData = {
                user :  {id: find.id}
            }
            const jwtToken =  jwt.sign(payloadData,secret)
            success  = true 
            res.json({jwtToken, success, naam:find.name})
        } catch (error) {
            res.json(error)
        }
})
auth.post("/createManyUsersAtOnce", async (req,res)=>{
    const usersArray = req.body 
    let theSalt = await bcrypt.genSalt(10)
    const result  = await Promise.all(usersArray.map(async (e)=>{ // [1,2,3]
        const hasedPass = await bcrypt.hash(e['password'],theSalt )
        const eToPush = {name  :e.name, email: e.email, password :hasedPass}
        return eToPush
    }))
    await userModel.insertMany(result)
    return res.send("hogya check kar")
})
auth.post("/getUser", fetchUser ,async (req,res)=>{
    try {
        let userId  = req.user.id
        const user = await userModel.findById(userId)
        res.send(user.name)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server error")
    }
})
auth.get("/getAllUsers", async (req,res)=>{
    const users = await userModel.find({user: 1})
    res.send(users)
})
module.exports = {
    auth
}
