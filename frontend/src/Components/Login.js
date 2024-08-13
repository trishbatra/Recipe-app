import {React, useState} from 'react'
import '../postrecipe.css'
import Nav from './Nav'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ColorRing } from 'react-loader-spinner'
const Login = () => {
  const navigate = useNavigate()
  const [creds, setcreds] = useState({email: "", pass: ""})
  const [loading, setloading] = useState(false)
  function emp(){
    setcreds({email: "", pass: ""})
  }
  function setVals(e){
    setcreds({...creds,[e.target.name] : e.target.value}) 
  }
  async function logUserIn(e){
    e.preventDefault()
    setloading(true)
    if(creds.email === "" || creds.pass === ""){
      toast.error('Please Provide all the  credentials', {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
       setloading(false)
        return
    }
    let user = await  fetch(`http://localhost:5001/auth/login`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({mail : creds.email, pass: creds.pass})
    })
    let jsonUSER = await user.json()
    console.log(jsonUSER)
    if (jsonUSER.err) {
      emp()
      toast.error('Login again Wrong credentials', {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: "light"
        });
        setloading(false)
        return
    }
    localStorage.setItem("tkn", jsonUSER.jwtToken)
    toast.success(`Welcome user ${jsonUSER.naam}`, {
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      // theme: "light"
      });
      setloading(false)
      navigate("/")
  }
  return (
    <>
    <Nav/>
    { localStorage.getItem("tkn") ? <p style={{textAlign: "center", fontSize: "30px"  ,margin: "30px"}} > you are already logged in </p>  :
    <div className='a' >
      <h1> Log in  </h1>
      <form >
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input required onChange={setVals} value={creds.email} type="email" id="email" name="email" />
      </div>
      <div className="form-group">
        <label htmlFor="pass">Password</label>
        <input required onChange={setVals}  value={creds.pass} type="password" id="pass" name="pass" />
      </div>
      {/* <button  onClick={logUserIn} type="submit">Submit</button> */}
      { loading && <p>  logging in please wait ... </p>}
    { loading && <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#549090', '#549090', '#549090', '#549090', '#549090']}
      /> }
      <input disabled={loading} className='sumbitButton' type="submit" onClick={logUserIn} />
      <Link style={{marginTop: "75px"}} className='aa' to={"/signup"}> Dont have an account ? Sign Up </Link>
    </form>
    </div> }
    </>
  )
}

export default Login
