import {React, useState} from 'react'
import '../postrecipe.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav';
const Postrecipe = () => {
  const [recipeDetail, setrecipeDetail] = useState({name: "", description: "",image : "",ingredients: []  })
  function empty(){
    setrecipeDetail({name: "", description: "",image : "",ingredients: []})
  }
  async function sumbitRecipes(e){
    e.preventDefault()
    let post = await fetch(`http://localhost:5000/postrecipe/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("tkn")
      },
      body : JSON.stringify({
        name : recipeDetail.name,
        description : recipeDetail.description,
        image : recipeDetail.image,
        ingredients : recipeDetail.ingredients,
      })
    })
    let res = await post.json()
    if(res){
      toast('Post succesful', {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      empty()
    }else{
      alert("Bhai kya kar raha hai yaar tu")
    }
    
  }
  function handleOnChange(e){
    setrecipeDetail({ ...recipeDetail, [e.target.name] : e.target.value} )
    console.log({ ...recipeDetail, [e.target.name] : e.target.value} )
  }
  return (
    <>
    <Nav/>
    <div className='a' >
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
      <h1> Tell the World About Your recipes  </h1>
      <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input  onChange={handleOnChange}  value={recipeDetail.name}   type="text" id="name" name="name" required/>
      </div>
      
      <div class="form-group">
        <label for="description">Description</label>
        <textarea onChange={handleOnChange}  value={recipeDetail.description}   id="description" name="description" required></textarea>
      </div>
      
      <div class="form-group">
        <label for="image">Image</label>
        <input onChange={handleOnChange}  value={recipeDetail.image}   type="file" id="image" name="image" accept="image/*" required/>
      </div>
      
      <div class="form-group">
        <label for="ingredients">Ingredients</label>
        <textarea  onChange={handleOnChange} value={recipeDetail.ingredients}   id="ingredients" name="ingredients" required></textarea>
      </div>
      
      <button  className='b'  onClick={sumbitRecipes} >Post Recipe</button>
    </form>

    </div>
    </>
  )
}
export default Postrecipe
