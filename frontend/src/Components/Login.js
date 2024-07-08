import {React, useState} from 'react'
import '../postrecipe.css'
import Nav from './Nav'
import { Link } from 'react-router-dom'
const Login = () => {
  const [creds, setcreds] = useState({email: "", pass: ""})
  function setVals(e){
    setcreds({...creds,[e.target.name] : e.target.value}) 
  }
  async function logUserIn(){
    let user = await  fetch(`https://recipe-app-2-n3ax.onrender.com/auth/login`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({mail : creds.email, pass: creds.pass})
    })
    let jsonUSER = await user.json()
    localStorage.setItem("tkn", jsonUSER.jwtToken)
    alert(` hello sir ${ jsonUSER.naam } `)
  }
  return (
    <>
    <Nav/>
    <div className='a' >
      <h1> Log in  </h1>
      <form>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input  onChange={setVals} value={creds.email} type="email" id="email" name="email" required/>
      </div>
      <div className="form-group">
        <label htmlFor="pass">Password</label>
        <input  onChange={setVals}  value={creds.pass} type="password" id="pass" name="pass" required/>
      </div>
      <button  onClick={logUserIn} type="submit">Submit</button>
      <Link  className='aa' to={"/signup"}> Dont have an account ? Sign Up </Link>
    </form>
    </div>
    </>
  )
}

export default Login
