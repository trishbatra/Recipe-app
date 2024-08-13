import {React, useState,useEffect} from 'react'
import '../recipeComp.css'
import {MagnifyingGlass} from 'react-loader-spinner'
import 'react-toastify/dist/ReactToastify.css';
import Btn from './Btn'
const Recipecard = (props) => {
  const [r, setr] = useState([])

    useEffect(() => {
      fetch(`http://localhost:5001/getrecipe/recipe`)
      .then(res=> res.json())
      .then(ress=> setr(ress))
      .catch(err=>alert(err))
    }, [])
    

  return (
    <> 
    <h3 className='tag' > Explore recipes Of all the Users </h3>
    {r.length ===0 && <p style={{textAlign: "center"}} > <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </p>}
    {r.length ===0 && <p style={{textAlign: "center", fontSize: "30px"}}> fetching recipes  please wait   ...  </p>}
    <div className='parent' >
       {r.map(elem=>{
          return <div className='child'  key={elem._id} >
           <img  className='img' src={elem.image} alt="" />
           <h3> {elem.name} </h3>
           <p>{elem.description.substring(0,150)}......</p>
           <p>Created By: {elem.user.name}</p>
           <Btn  namee={elem._id} />
         </div>
     })}
     </div>
    </>
  )
}

export default Recipecard
