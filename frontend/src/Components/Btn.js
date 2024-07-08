import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import recipeContext from '../Context/recipeContext'
const Btn = (props) => {
  const object = useContext(recipeContext)
  let {obh, getObj} = object
  
  return (
    <div>
       <Link to="/rec" > <button onClick={()=>{getObj(props.namee)}} className='btn'> Read Recipe </button></Link>
    </div>
  )
}

export default Btn
