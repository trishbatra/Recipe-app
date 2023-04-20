import {React, useState} from 'react'
import recipeContext from "./recipeContext";


const RecipeState = (props) => {
    const [obh, setobh] = useState({})
    const getObj = async ( id  )=>{
        let obj = await fetch(`http://localhost:5000/getrecipe/recipe/${id}`)
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
