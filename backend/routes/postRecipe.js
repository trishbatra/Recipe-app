const express = require("express")
const { recipeModell } = require("../models/recipe")
const { fetchUser, upload } = require("../middleware/middleware")
const postRecipe = express.Router()
const path = require("path")

postRecipe.post("/post", upload.single('image'), fetchUser, async  (req,res)=>{
    try {
        let {name , description, ingredients} = req.body 
        if(!name || !description || !ingredients){
            return res.status(400).json({err: "Bhai yaar detaisl ton dalde recipe ki😤"})
        }
        if(!req.file){
            return res.status(400).json({err: "image mei koi dikat hai"})
        }
        console.log(req.file)
        const rec = new recipeModell({name , description, image : `Images/${req.file.filename}`, ingredients, user: req.user})
        // console.log("rec", await rec)
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