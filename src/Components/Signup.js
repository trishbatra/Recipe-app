import {React , useState} from 'react'
import Nav from './Nav'
import '../postrecipe.css'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
const Signup = () => {
  const [creds, setcreds] = useState({name: "",email: "", password: ""})
  function setCreds(e){
    setcreds({...creds,[e.target.name] : e.target.value})
  }
  let history = useNavigate()
  function signUserUp(e){
    e.preventDefault()
    fetch(`http://localhost:5001/auth/createUser`, {method: "POST", headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({name: creds.name, email: creds.email, password: creds.password})})
    .then(res=> res.json())
    .then(ress=> handleRess(ress))
    .catch(err => 
      toast(`${err}`, {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
    )
  }
  function handleRess(ress){
    localStorage.setItem("tkn", ress.token)
    toast('ACC CREATED ✅', {
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      })
      setcreds({name: "",email: "", password: ""})
      history("/")
  }
  return (
    <>
    <Nav/>
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
    <div className='a' >
      <h1> Sign up now free </h1>
      <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input  onChange={setCreds} type="text" id="name" name="name"  value={creds.name} required/>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input onChange={setCreds} type="email" id="email" name="email" value={creds.email} required/>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input onChange={setCreds} type="password" id="password" value={creds.password} name="password" required/>
      </div>
      <button onClick={signUserUp} type="submit">Submit</button>
      <Link  className='aa' to={"/login"} > Already have an account ? Log in </Link>
    </form>
    </div>
    </>
  )
}

export default Signup
