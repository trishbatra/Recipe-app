const express = require("express")
const { recipeModell } = require("../models/recipe")
const { fetchUser } = require("../middleware/middleware")
const postRecipe = express.Router()
postRecipe.post("/post",fetchUser,async  (req,res)=>{
    try {
        console.log(req.user)
        let {name , description, image, ingredients} = req.body 
        const rec = new recipeModell({name , description, image, ingredients, user: req.user})
        let createdRecipe = await rec.save()
        res.send(createdRecipe)
    } catch (error) {
        console.log(error)
    }
})
postRecipe.post("/postmany",async  (req,res)=>{
    try {
        const all = req.body
        const len = all.length 
        for (let i = 0; i < len; i++) {
            let createPost = await recipeModell.insertMany(all)
            if(!createPost){
                return res.send("ERROR")
            }
            res.send({createPost})
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = {postRecipe}