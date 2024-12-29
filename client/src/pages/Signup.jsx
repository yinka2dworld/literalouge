import '../css/Auth.css'
import libraryWay from '../assets/libraryWay.jpg';
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { SIGNUP } from "../graphql/mutations.js"
import { useMutation } from '@apollo/client';


const Signup = () => {
const [phoneNumber, setPhoneNumber] = useState('')
const [email, setEmail] = useState('')
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const myHistory = useNavigate()
const [ signup, {loading, error }] = useMutation(SIGNUP);
  

const handleSignup = async (e) => {
       e.preventDefault();
 try {
      const { data } = await signup({ variables: { 
        signupuser: { username, phoneNumber, email, password } }
      });
   
      console.log('Signed up:', data.signup);
    myHistory('/login')
    } catch (error) {
      console.error('Signup error:', error.message);
      console.log( data.signup);
    }
 }

    return(
<div className='signup'>
<img className="LibraryWay2"  src={libraryWay} width={480} height={620} loading='lazy' alt={"library way 1"}/>


<div className="form">
<h1 className='title'>Signup</h1>
 {error && <p className='errorMsg'>{error.message}</p>}
<form action="/signup" method="post" onSubmit={handleSignup}>

<div style={{'marginBottom':'5px', paddingTop:'30px'}}>
<label htmlFor="username" style={{'color':'#070C70', 'fontSize':'25px'}}>Username</label><br/>
<input type="username" className='info' id="username"
value={username}   onChange={(e) => setUsername(e.target.value)}
  required/> <br/>
</div>

<div style={{'marginBottom':'25px'}}>
<label htmlFor="phoneNumber" style={{'color':'#070C70', 'fontSize':'25px'}}>Phonenumber</label><br/>
<input type="text" className='info' id="phoneNumber" 
value={phoneNumber}  onChange={(e) => setPhoneNumber(e.target.value)} 
  required/> <br/>
</div>

<div style={{'marginBottom':'25px'}}>
<label htmlFor="email" style={{'color':'#070C70', 'fontSize':'25px'}}>Email</label><br/>
<input type="email" className='info' id="email"
value={email}  onChange={(e) => setEmail(e.target.value)}
  required/> <br/>
</div>

<div style={{'marginBottom':'15px'}}>
<label htmlFor="password" style={{'color':'#070C70', 'fontSize':'25px'}}>Password</label><br/>
<input type="password" className='info' id="password"
value={password}  onChange={(e) => setPassword(e.target.value)}
 required/> <br/>
</div>

{!loading ? <button>Create Account</button> : <button disabled>Loading...</button>} <br />
<button style={{'backgroundColor':'#070C70','marginTop':'15px', 'color':'#ff1493', borderColor:'#ff1493'}}>Signup with google</button>

</form>

<div className='acc' >
<p style={{'color':'#070C70'}}>Don't have an account?</p>  
<a  href="/admin/login" className='form-link'>Login</a>
</div>
     </div>

</div>
    )}

export default Signup ;



