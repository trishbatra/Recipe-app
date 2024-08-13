import React, { useState } from 'react'
import recipeContext from "./recipeContext";


const RecipeState = (props) => {
    const [obh, setobh] = useState({})
    const [dark, setdark] = useState(false)
    const getObj = async ( id  )=>{
        let obj = await fetch(`${process.env.REACT_APP_backend_url}getrecipe/recipe/${id}`)
        let objJson = await obj.json()
        setobh(objJson.found)
    }
  return (
    <recipeContext.Provider value={{ getObj, obh, dark, setdark }}>
            {props.children}
    </recipeContext.Provider>
  )
}

export default RecipeState
