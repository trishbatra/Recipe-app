import {React, useState,useEffect} from 'react'
import '../recipeComp.css'
import { BsPen } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Btn from './Btn'
const Recipecard = (props) => {
  const [r, setr] = useState([])

    useEffect(() => {
      fetch("https://recipe-app-2-n3ax.onrender.com/getrecipe/recipe")
      .then(res=> res.json())
      .then(ress=> setr(ress))
      .catch(err=>alert(err))
    }, [])
    function handleResponse(ress){
      let a = r.filter((elem)=>{  return elem._id!==ress._id})
      setr(a)
      toast.error('DELETED', {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }

  return (
    <> 
    <h3 className='tag' > Explore recipes Of all the Users </h3>
    {r.length ===0 && <p style={{textAlign: "center", fontSize: "30px"}}> Getting recipes  please wait 🙏  ...  </p>}
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
