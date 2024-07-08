import {React, useRef, useState} from 'react'
import '../postrecipe.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav';
const Postrecipe = () => {
  const myRef = useRef()
  const [recipeDetail, setrecipeDetail] = useState({name: "", description: "",image : null,ingredients: []  })
  function empty(){
    setrecipeDetail({name: "", description: "",image : "",ingredients: []})
  }

  const handleFileChange = (e) => {
    setrecipeDetail({ ...recipeDetail, image: e.target.files[0] });
    console.log({ ...recipeDetail, image: e.target.files[0] });
  };
  async function sumbitRecipes(e){
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', recipeDetail.name);
    formData.append('description', recipeDetail.description);
    formData.append('image', recipeDetail.image);
    formData.append('ingredients', recipeDetail.ingredients);
    let post = await fetch(`https://recipe-app-2-n3ax.onrender.com/postrecipe/post`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem("tkn")
      },
      body : formData
    })
    let res = await post.json()
    if(res){
      console.log(recipeDetail.image)
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
      <form   onSubmit={sumbitRecipes} encType='multipart/from-data'>
      <div class="form-group">
        <label for="name">Recipe Name</label>
        <input  onChange={handleOnChange}  value={recipeDetail.name}   type="text" id="name" name="name" required/>
      </div>
      
      <div class="form-group">
        <label for="description">Recipe instructions</label>
        <textarea onChange={handleOnChange}  value={recipeDetail.description}   id="description" name="description" required></textarea>
      </div>
        <div class="form-group">
          <label for="image">Recipe Image</label>
          <input ref={myRef} onChange={handleFileChange}  type="file" id="image" name="image" accept="image/*" required/>
        </div>
      
      <div class="form-group">
        <label for="ingredients">Ingredients</label>
        <textarea  onChange={handleOnChange} value={recipeDetail.ingredients}   id="ingredients" name="ingredients" required></textarea>
      </div>
      
    <button className='b' type="submit">Post Recipe</button>
    </form>

    </div>
    </>
  )
}
export default Postrecipe
