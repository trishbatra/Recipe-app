const express = require("express")
const { recipeModell } = require("../models/recipe")
const { fetchUser, upload } = require("../middleware/middleware")
const postRecipe = express.Router()
const multer = require("multer")
const upload = multer();

postRecipe.post("/post",fetchUser, upload.none() ,async  (req,res)=>{
    try {
        let {name , description, ingredients, image} = req.body 
        console.log("req.body", req.body)
        if(!name || !description || !ingredients|| !image){
            return res.status(400).json({err: "Bhai yaar detaisl ton dalde recipe ki😤"})
        }
        const rec = new recipeModell({name , description, image : image, ingredients, user: req.user})
        let createdRecipe = await rec.save()
        res.send(createdRecipe)
    } catch (error) {
        console.log(error)
    }
})


postRecipe.post("/postManyRecipesAtOnce", async (req,res)=>{
    const recipesArray = req.body 
     await recipeModell.insertMany(recipesArray)
     return res.send("Hogya check karle")
} )

module.exports = {postRecipe}