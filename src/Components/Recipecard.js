import {React, useState,useEffect} from 'react'
import '../recipeComp.css'
import { BsPen } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Btn from './Btn'
const Recipecard = (props) => {
    const [r, setr] = useState([])
    console.log(r)
    useEffect(() => {
      fetch("http://localhost:5000/getrecipe/recipe", {
        method : "GET",
        headers :{
            'Content-Type'  : 'application/json',
            'auth-token'  :   localStorage.getItem("tkn")
        }
      })
      .then(res=> res.json())
      .then(ress=> setr(ress.rec))
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
    let deleteIt = async (id)=>{
      fetch(`http://localhost:5000/getrecipe/delete/${id}`,{method : 'DELETE'})
      .then(res=>res.json())
      .then(ress=>handleResponse(ress.recipeToDelete))
      .catch(err=>toast.error(`${err}`, {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        }) )
    }
  return (
    <> 
     <ToastContainer
          position="bottom-center"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    <div className='parent' >
       {r.map(elem=>{
          return <div className='child'  key={elem._id} >
           <BsPen id='upd'  className='icons' />
           <AiFillDelete onClick={()=>{deleteIt(elem._id)}} id='del' className='icons' />
           <img  className='img' src={`${elem.image}`} alt="" />
           <h3> {elem.name} </h3>
           <p>{elem.description.substring(0,150)}......</p>
           <Btn  namee={elem._id} />
         </div>
     })}
     </div>
    </>
  )
}

export default Recipecard
