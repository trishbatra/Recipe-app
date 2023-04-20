import {React, useEffect, useState , useRef} from 'react'
import Nav from './Nav'
import '../home.css'
import w from '../Images/w.png'
import { Link } from 'react-router-dom'
import { BsPen } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  const theForm = useRef(null)
  const [urRecipes, seturRecipes] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000/getrecipe/recipe", {
      method: "GET",
      headers: { 
        'content-type': "application/json",
        'auth-token': localStorage.getItem("tkn")
      }
    })
    .then(res=>res.json())
    .then(ress=> seturRecipes(ress.rec))
  }, [])
  function setR(arr){
    seturRecipes(arr)
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
  function handleResponse(ress){
    let a = urRecipes.filter((elem)=>{  return elem._id!==ress._id})
    seturRecipes(a)
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
  const [updatedRecipe, setupdatedRecipe] = useState({name: "", description: "",image : "",ingredients: []  })
  function setID(id){
    localStorage.setItem("Id", id)
    if(    theForm.current.style.display == "block"){
      theForm.current.style.display = "none"
    }else{
      theForm.current.style.display = "block"
    }
  }
  function updateRecipe() {
    console.log(localStorage.getItem("Id"))
    fetch(`http://localhost:5000/getrecipe/update/${localStorage.getItem("Id")}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: updatedRecipe.name,
        description: updatedRecipe.description,
        image: updatedRecipe.image,
        ingredients: updatedRecipe.ingredients,
      }),
    })
      .then((res)=>res.json())
      .then((ress) => handleRESS(ress))
      .catch((err) =>
        toast.error(`${err}`, {
          position: "bottom-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      );
  }
  function handleRESS(response){
    const newArr = urRecipes.map((e)=>{
      if(e._id == response.recipeToBeUpdated
        ._id){
        e.name = response.recipeToBeUpdated.name
        e.description = response.recipeToBeUpdated.description
        e.image = response.recipeToBeUpdated.image
        e.ingredients = response.recipeToBeUpdated.ingredients
      }
      return e
    })
    seturRecipes(newArr)
    closee()
  }

  function handleOnChange(e){
      setupdatedRecipe({ ...updatedRecipe, [e.target.name] : e.target.value} )
  }
  function closee(){
    theForm.current.style.display = "none"
  }
  return (
    <>
        <Nav ur={setR }/>
        <div className="containerr">
        <img  id='img' src={w} alt="Image"/>
        <div className="descriptionn">
          <h2 className='headd'>KitchenExchange </h2>
          <p className='paraa'>  Welcome to our recipe sharing app, where you can discover and share your favorite recipes with foodies from around the world! Whether you're a professional chef, a home cook, or just someone who loves to experiment in the kitchen, this app is the perfect platform to showcase your culinary skills.

          With our user-friendly interface, you can easily upload your recipes, including photos, ingredients, and step-by-step instructions. 
          
          So what are you waiting for? Join our recipe sharing app today and let's cook up something delicious together!</p>
        </div>
        </div>
        <h2 className='headd' >What would you like to do?</h2>
        <div className="cards">

       
        <div  id='card1' className="card" >
          <div className="card-content">
            <h2>Post a Recipe</h2>
            <Link to="/post" className="button">Get Started</Link>
          </div>
        </div>

      <div  id='card2' className="card" >
        <div className="card-content">
          <h2>See Other Recipes</h2>
          <Link to="/recipes" className="button">Browse Now</Link>
        </div>
      </div>
      </div>
      <div ref={theForm} className='updateForm '>
       <div   className=' form-container ' >
              <h3>Fill the details you want to update</h3>
              <span  onClick={closee} class="close-icon">&#x2716;</span>
            <form>
              <label for="name">Recipe Name</label>
              <input  onChange={handleOnChange} value={updatedRecipe.name} type="text" id="name" name="name" placeholder="Enter recipe name"/>
              <label for="description">Description</label>
              <textarea  onChange={handleOnChange} value={updateRecipe.description} id="description" name="description" placeholder="Enter recipe description"></textarea>
              <label for="image">Image URL</label>
              <input type="text" onChange={handleOnChange} value={updateRecipe.image} id="image" name="image" placeholder="Enter image URL"/>
              <label for="ingredients">Ingredients</label>
              <textarea onChange={handleOnChange} value={updateRecipe.ingredients} id="ingredients" name="ingredients" placeholder="Enter recipe ingredients"></textarea>
            </form>
             <button  id='updateBTN' onClick={updateRecipe}> Update </button>
        </div>  
        </div>
      <div id='urr' className="your">
        <h2 id='h'> Your Recipes  </h2>
        { urRecipes.length===0?<div className='rec-line' >  Post some reicpes to see your recipes  </div> : <div className="specific-recipes">
            { urRecipes.map((e)=>{ 
              return <div className='flex-child' >
                <a href="#f"><BsPen  onClick={()=>{setID(e._id)}}  id='upd'   className='icons' /></a>
                <AiFillDelete onClick={()=>{deleteIt(e._id)}} id='del' className='icons' />
                <img className='imggg' src={`${e.image}`} alt="" />
                <h2> {e.name} </h2>
                <p> {e.description.substring(0,150)}... </p>
                <button theRec={e._id}  className='b'  > Read Full </button>
              </div>
            })}
        </div>}
      </div>
      <footer>
      <div className="container">
      <div className="about-us">
      <h2>About Us</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel sapien a justo tincidunt elementum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec a nibh id est laoreet congue. Aliquam ac lorem mi. Nullam dictum suscipit aliquam. Sed mollis ex at lacus consectetur luctus. Sed eget libero euismod, malesuada elit vel, ultrices tellus. Quisque quis sapien et lorem imperdiet fringilla vel a nibh. Duis interdum aliquet nisl, eget dictum odio tincidunt vitae.</p>
      <div className="social-icons">
        <a><i className="fab fa-facebook"></i></a>
        <a><i className="fab fa-pinterest"></i></a>
        <a><i className="fab fa-twitter"></i></a>
        <a><i className="fab fa-instagram"></i></a>
      </div>
      </div>
    </div>
  </footer>
    </>
  )
}

export default Home
