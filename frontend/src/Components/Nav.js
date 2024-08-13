import React, { useContext } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { BiSun } from "react-icons/bi";
import 'react-toastify/dist/ReactToastify.css';
import recipeContext from '../Context/recipeContext';
import { IoMoon } from "react-icons/io5";
const Nav = (props) => {
  const data = useContext(recipeContext)
  const {dark,setdark} = data
  let goTo = useNavigate()
  let {ur} = props
  function logUserOut(){
    localStorage.removeItem("tkn")
    toast.success('Logged out', {
      position: "bottom-center",
      autoClose: 400,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
      goTo("/")
      ur([])
  }
  return (
    <div>

    <nav className={dark ? 'nav-dark' : ""}>
      <div className={dark ? "navbar-label-dark": "navbar-label"}>KitchenExchange - Exchange your passion for cooking</div>
      <div className={dark? "navbar-links-dark": "navbar-links"}>
        <Link to="/">Home</Link>
        {localStorage.getItem("tkn") && <Link to="/post">Post Recipe</Link>}
        <Link  title='explore recipes of other users'to="/recipes">See Recipes</Link>
        {dark === true ? <BiSun onClick={()=>{setdark(false)}} style={{fontSize: "25px", marginLeft: "5px",marginRight: "10px", marginTop: "11px", cursor: "pointer"}} /> : <IoMoon onClick={()=>{setdark(true)}} style={{fontSize: "20px", marginLeft: "15px", marginTop: "4px", cursor: "pointer"}}/>}
        {!localStorage.getItem("tkn")?<Link className={dark? "navbar-links-dark": "navbar-links"} to="/login">Login</Link>: <Link onClick={logUserOut} className={dark? "navbar-links-dark": "navbar-links"}> Logout </Link>}
      </div>
    </nav>
    </div>
  )
}

export default Nav
