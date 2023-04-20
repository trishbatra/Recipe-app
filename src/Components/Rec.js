import React, { useContext } from 'react'
import recipeContext from '../Context/recipeContext'
import Nav from './Nav'
import '../mainrecipe.css'
const Rec = (props) => {
  const object = useContext(recipeContext)
  let {obh} = object
  return (
    <div>
     <Nav/>
     <div className="myrec">
      <img  className='imgg' src={`${obh.image}`} alt="" />
      <div className='childd'>
      <h2> {obh.name} </h2>
      <b> Recipe </b>
      <p> {obh.description} </p>
      <h4> Ingredients are:  </h4><p> {obh.ingredients}  </p>
      </div>
     </div>
    </div>
  )
}

export default Rec
