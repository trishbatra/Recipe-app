import React from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Nav = (props) => {
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
      <ToastContainer
        position="bottom-center"
        autoClose={400}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    <nav>
      <div class="navbar-label">KitchenExchange - Exchange your passion for cooking</div>
      <div class="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/post">Post Recipe</Link>
        <Link to="/recipes">See Recipes</Link>
        {!localStorage.getItem("tkn")?<Link to="/login">Login</Link>: <button onClick={logUserOut} className='navBtn'> Logout </button>}
      </div>
    </nav>
    </div>
  )
}

export default Nav
