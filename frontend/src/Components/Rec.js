import React, { useContext } from 'react'
import recipeContext from '../Context/recipeContext'
import Nav from './Nav'
import '../mainrecipe.css'
import { Hourglass } from 'react-loader-spinner'
// import MainImages from "./MainImages/1720167103101.jpg"
const Rec = (props) => {
  const object = useContext(recipeContext)
  let {obh} = object
  return (
    <div>
      <Nav/>
      {Object.keys(obh).length === 0 &&<p style={{textAlign: "center", fontFamily: "20px"}} > Fetching Recipe .... </p> }
      {
        Object.keys(obh).length === 0 && <div style={{textAlign: "center", fontSize: "20px"}} > <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
        /></div>
      }
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
