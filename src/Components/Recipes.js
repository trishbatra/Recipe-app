import {React, useState, useEffect} from 'react'
import Nav from './Nav'
import Recipecard from './Recipecard.js'
const Recipes = () => {
  const [recipe, setrecipe] = useState([])

  useEffect( () => {
    async function getRecipes(){
      let rs = await fetch('https://recipe-app-2-n3ax.onrender.com/getrecipe/recipe')
      let rss = await rs.json()
      setrecipe(rss)
    }
    getRecipes()
  }, [])
  
  return (
    <div>
      <Nav/>
      <Recipecard/>
    </div>
  )
}

export default Recipes
