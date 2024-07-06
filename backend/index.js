const express = require("express")
const { connectToMongo } = require("./db")
const { auth } = require("./routes/auth")
const { getRecipe } = require("./routes/getRecipe")
require('dotenv').config();
const { postRecipe } = require("./routes/postRecipe")
const app = express()
const cors = require('cors');
const port = 5001
connectToMongo()
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: true, limit: '10mb' })); 
app.use(cors())
app.use("/postrecipe", postRecipe)
app.use("/getrecipe", getRecipe)
app.use("/auth",auth)
app.listen(port, (req,res)=>{
    console.log("Hello")
})
