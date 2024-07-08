const express = require("express")
const mongoose = require('mongoose');
// const { connectToMongo } = require("./db")
const { auth } = require("./routes/auth")
const { getRecipe } = require("./routes/getRecipe")
// require('dotenv').config();
const { postRecipe } = require("./routes/postRecipe")
const app = express()
const cors = require('cors');
const port = 5001

mongoose.connect('mongodb+srv://Trish:TBbatra18@recipe-app.tpm5bja.mongodb.net/?retryWrites=true&w=majority&appName=Recipe-app',{useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: true, limit: '10mb' })); 
app.use(cors())
app.use("/postrecipe", postRecipe)
app.use("/getrecipe", getRecipe)
app.use("/auth",auth)
app.listen(port, (req,res)=>{
    console.log("Hello")
})
