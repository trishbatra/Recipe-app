import {React, useEffect, useState , useRef, useContext} from 'react'
import Nav from './Nav'
import '../home.css'
import { Link } from 'react-router-dom'
import { BsPen } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { FaGithub, FaLinkedin  } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Btn from './Btn';
import { ColorRing } from 'react-loader-spinner';
import recipeContext from '../Context/recipeContext';

const Home = () => {
  const theForm = useRef(null)
  const {dark , setdark}  = useContext(recipeContext)
  const [urRecipes, seturRecipes] = useState([])
  const [isDisabled, setisDisabled] = useState(false)
  const [isloading, setisloading] = useState(false)
  const [updatedRecipe, setupdatedRecipe] = useState({name: "", description: "",image : null,ingredients: ""  })
  const textRef = useRef(null)
  useEffect(() => {
    if (localStorage.getItem("tkn")) {
      fetch(`${process.env.REACT_APP_backend_url}getrecipe/specificrecipe`, {
        method: "GET",
        headers: { 
          'content-type': "application/json",
          'auth-token': localStorage.getItem("tkn")
        }
      })
      .then(res=>res.json())
      .then(ress=> seturRecipes(ress.rec))

    }
  }, [])
  useEffect(() => {
    const wakeUpServer = async () => {
      await fetch(`${process.env.REACT_APP_backend_url}getrecipe/recipe`);
    };
  
    wakeUpServer();
  }, []);
  
  function setR(arr){
    seturRecipes(arr)
  }
  let deleteIt = async (id)=>{
    fetch(`${process.env.REACT_APP_backend_url}getrecipe/delete/${id}`,{method : 'DELETE'})
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
    let a = urRecipes.filter((elem)=>{  return elem._id !== ress._id})
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
  function setID(id){
    localStorage.setItem("Id", id)
    if(    theForm.current.style.display === "block"){
      theForm.current.style.display = "none"
    }else{
      theForm.current.style.display = "block"
    }
  }
  async function updateRecipe() {
    setisloading(true)
    const formData = new FormData()
    if(updatedRecipe.image != null){
      const imgData = new FormData()
      imgData.append("file", updatedRecipe.image )
      imgData.append("upload_preset",'images_preset' )
      let cloudName = process.env.REACT_APP_cloud_name
      let resourceType = 'image' 
      const api_url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`
      const response = await fetch(api_url, {method: "POST", body: imgData})
      const url = await response.json()
      formData.append("image",url.secure_url)
    }

    if(updatedRecipe.name !== ""){
      console.log("change")
      formData.append("name",updatedRecipe.name)
    }
    if(updatedRecipe.description !== ""){
      formData.append("description",updatedRecipe.description)
    }
    if(updatedRecipe.ingredients !== ""){
      formData.append("ingredients",updatedRecipe.ingredients)
    }
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    console.log(formData)
    fetch(`${process.env.REACT_APP_backend_url}getrecipe/update/${localStorage.getItem("Id")}`, {
      method: "PUT",
      body: formData,
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
      setisloading(false)
  }
  function handleRESS(response){
    const newArr = urRecipes.map((e)=>{
      if(e._id === response.recipeToBeUpdated
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
      console.log(updatedRecipe)
  }
  function handleFileChange(e){
    setupdatedRecipe({...updatedRecipe, image: e.target.files[0]})
    console.log(updatedRecipe)

  }
  function closee(){
    theForm.current.style.display = "none"
  }
  const makeItVisible = (e,ref)=>{
    if(ref.current.disabled){
      setisDisabled(true)
    }
  }
  const hideIt = (e,ref)=>{
    if(ref.current.disabled){
      setisDisabled(false)
    }
  }
  return (
    <div className={dark? "dark-bg": ""}>
        <Nav ur={setR }/>
        <div  className={dark ? "containerr-dark" :"containerr"}>
        <img  id='img' src="Images/w.png" alt=''/>
        <div className="descriptionn">
          <h2 className={dark? "headd-dark darkText" :'headd'}>KitchenExchange </h2>
          <p className={dark? "paraa-dark darkText" :'paraa'}>  Welcome to our recipe sharing app, where you can discover and share your favorite recipes with foodies from around the world! Whether you're a professional chef, a home cook, or just someone who loves to experiment in the kitchen, this app is the perfect platform to showcase your culinary skills.

          With our user-friendly interface, you can easily upload your recipes, including photos, ingredients, and step-by-step instructions. 
          
          So what are you waiting for? Join our recipe sharing app today and let's cook up something delicious together!</p>
        </div>
        </div>
        <hr className='hr-dark' />
        <h2 className={dark? "headd-dark darkText" :'headd'} >What would you like to do?</h2>
        <div className={dark? "cards-dark darkText":"cards"}>
        <div  id='card1' className="card" >
          <div className="card-content">
            {dark? <h2 style={{color: "#54ddbdc8"}} >  Post a Recipe  </h2>:<h2>Post a Recipe</h2>}
            { isDisabled ? <p  className={dark? 'tooltipBox-dark': 'tooltipBox'}> First login to Post Recipes </p> : <p  className='tooltipBoxNotDisabled'> First login to Post Recipes </p>  }
            
            {!localStorage.getItem("tkn") &&  
            <div onMouseEnter={(e)=>{makeItVisible(e,textRef)}} onMouseLeave={(e)=>{hideIt(e,textRef)}} >
            <button  ref={textRef} title='please login first to post a recipe'  className={dark ? "button-dark darkText" :"button"} disabled="true" >
              <Link  to="/post" >Get Started</Link>
            </button> 
            </div>}
            {localStorage.getItem("tkn") &&  <Link  to="/post" ><button className={dark ? "button-dark" :"button"} >
              Get Started
            </button> 
            </Link>
            }

          </div>
        </div>

      <div  id='card2' className="card" >
        <div className="card-content">
          {dark?  <h2  style={{color: "#54ddbdc8"}} >See Other Recipes</h2> : <h2>See Other Recipes</h2>}
          <button className={dark ? "button-dark" :"button"} >
               <Link to="/recipes"   title="Explore recipes of other users"  >Browse Now</Link>
          </button>
        </div>
      </div>
      </div>
      <div ref={theForm} className='updateForm '>
       <div className=' form-container ' >
              <h3>Fill the details you want to update</h3>
              <span  onClick={closee} class="close-icon">&#x2716;</span>
              <label for="name">Recipe Name</label>
              <input   className="update" onChange={handleOnChange}  type="text" id="name" name="name" placeholder="Enter recipe name"/>
              <label for="description">Description</label>
              <textarea  className="update"  onChange={handleOnChange}  id="description" name="description" placeholder="Enter recipe description"></textarea>
              <label for="image">Image URL</label>
              <input type="file" className="update"  onChange={handleFileChange} id="image" name="image" placeholder="Enter image URL"/>
              <label for="ingredients">Ingredients</label>
              <textarea className="update"  onChange={handleOnChange} id="ingredients" name="ingredients" placeholder="Enter recipe ingredients"></textarea>
              {isloading && <p> recipe is getting updated please wait.... </p>}
              {isloading && <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#549090', '#549090', '#549090', '#549090', '#549090']}
                />
              }
             <button  id='updateBTN' onClick={updateRecipe}> Update </button>
        </div>  
        </div>
      <div id='urr' className="your">
        <h2 id='h'> Your Recipes  </h2>
        {!localStorage.getItem("tkn")?  <div className="rec-line">Create an Account or Login to Start Posting Recipes</div> : urRecipes.length===0?<div className='rec-line' >  Post some reicpes to see your recipes  </div> : <div className="specific-recipes">
            { urRecipes.map((e)=>{ 
              return <div className='flex-child' >
                <div className='delIcon'> 
                <a href="#f" className='iconUPD'><BsPen size={25} onClick={()=>{setID(e._id)}}  /></a>
                <span className='iconUPD' ><AiFillDelete  size={25} onClick={()=>{deleteIt(e._id)}}  /></span>
                </div>
                <img className='imggg' src={`${e.image}`} alt="" />
                <h2> {e.name} </h2>
                <p> {e.description.substring(0,150)}... </p>
                <Btn namee={e._id}   className='b'  > Read Full </Btn>
              </div>
            })}
        </div>}
            <img src="../../public/images/cardd.jpg" alt="" srcset="" />
      </div>
      <footer className={dark ? "container-dark" :"container"}>
      <div >
      <div className={dark? 'about-us-dark':"about-us"}>
      <h2>About Us</h2>
      <p>I developed an application using the MERN stack (MongoDB,
      Express.js, React.js, Node.js) that allows users to post recipes, view
      other people's recipes, and browse and search for recipes.</p>
      <div className="social-icons">
        <Link to={'https://github.com/trishbatra'} className='iconn' ><FaGithub/></Link>
        <Link to={'https://www.linkedin.com/in/trish-batra-1088b1222/'} className='iconn' ><FaLinkedin/></Link>
      </div>
      </div>
    </div>
  </footer>
    </div>
  )
}

export default Home
