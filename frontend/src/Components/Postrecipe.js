import {React, useRef, useState} from 'react'
import '../postrecipe.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from 'react-loader-spinner'
import Nav from './Nav';
const Postrecipe = () => {
  const myRef = useRef()
  const [recipeDetail, setrecipeDetail] = useState({name: "", description: "",image : null,ingredients: []  })
  const [loading, setloading] = useState(false)
  function empty(){
    setrecipeDetail({name: "", description: "",image : null,ingredients: []})
  }

  const handleFileChange = (e) => {
    setrecipeDetail({ ...recipeDetail, image: e.target.files[0] });
  };
  async function sumbitRecipes(e){
    e.preventDefault()
    setloading(true)
    const data = new FormData()
    data.append("file", recipeDetail.image )
    data.append("upload_preset",'images_preset' )
    let cloudName = process.env.REACT_APP_cloud_name
    let resourceType = 'image' 
    const api_url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`
    let uploadPostt =  await fetch(api_url, {method: "POST", body: data })
    let responseCloudinary =  await uploadPostt.json()
                                                                                                                                                  
    const formData = new FormData();
    formData.append('name', recipeDetail.name);
    formData.append('description', recipeDetail.description);
    formData.append('image', responseCloudinary.secure_url);
    formData.append('ingredients', recipeDetail.ingredients);
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    let post = await fetch(`${process.env.REACT_APP_backend_url}postrecipe/post`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem("tkn")
      },
      body : formData
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
      setloading(false)
    }else{
      alert("Bhai kya kar raha hai yaar tu")
    }
    
  }
  function handleOnChange(e){
    setrecipeDetail({ ...recipeDetail, [e.target.name] : e.target.value} )
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
    { loading && <p>  Recipe is getting posted please wait... </p>}
    { loading && <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#549090', '#549090', '#549090', '#549090', '#549090']}
      /> }
    <button disabled={loading} className='b' type="submit">Post Recipe</button>
    </form>

    </div>
    </>
  )
}
export default Postrecipe
