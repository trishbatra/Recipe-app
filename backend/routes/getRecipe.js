const express = require("express")
const getRecipe = express.Router()
const { fetchUser } = require("../middleware/middleware");
const { recipeModell } = require("../models/recipe");
const multer = require("multer");

const upload = multer();

getRecipe.get("/recipe", async (req,res)=>{
  const recipes = await recipeModell.find({}).populate("user","name")
  if (!recipes) {
    return res.sendStatus(400).send("no recipes found")
  }
  return res.json(recipes)
})

getRecipe.get("/specificrecipe",fetchUser,async (req,res)=>{
    try {
        const rec = await recipeModell.find({
            user : req.user
        })
        res.json({rec})
    } catch (error) {
        console.log(error)
    }
})
getRecipe.get("/recipe/:id", async(req,res)=>{
  let found = await recipeModell.findOne({_id:req.params.id})
  if(!found){
    res.json({me: "deded"})
  }
  res.json({found})
})
getRecipe.put("/update/:id",upload.none(),async(req,res)=>{
  try {
    let {name , description, ingredients, image} = req.body 
    console.log("req.body", req.body)
    let updatedREC = {}
    if(name){updatedREC.name = name}
    if(description){updatedREC.description = description}
    if(image){updatedREC.image = image}
    if(ingredients){updatedREC.ingredients = ingredients}
    let recipeToBeUpdated = await recipeModell.findById(req.params.id)
    recipeToBeUpdated  = await  recipeModell.findByIdAndUpdate(req.params.id,{$set: updatedREC}, {new: true})
    res.json({bodySent: req.body, recipeToBeUpdated}) 
} catch (error) {
    console.log(error)
}
})
getRecipe.delete("/delete/:id", async(req,res)=>{
  const recipeToDelete = await recipeModell.findByIdAndDelete(req.params.id)
  if(!recipeToDelete){
    return res.status(400).send("NOT FOUND")
  }
  res.json({recipeToDelete})
})
getRecipe.get("/all" ,async (req,res)=>{
  let recipes = await recipeModell.find({})
  res.send({recipes})
})
module.exports = {getRecipe}