import {React, useState} from 'react'
import recipeContext from "./recipeContext";


const RecipeState = (props) => {
    const [obh, setobh] = useState({})
    const getObj = async ( id  )=>{
        let obj = await fetch(`https://recipe-app-2-n3ax.onrender.com/getrecipe/recipe/${id}`)
        let objJson = await obj.json()
        setobh(objJson.found)
    }
  return (
    <recipeContext.Provider value={{ getObj, obh }}>
            {props.children}
    </recipeContext.Provider>
  )
}

export default RecipeState
