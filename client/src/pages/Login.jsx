import '../css/Auth.css'
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import libraryWay from '/assets/libraryWay.jpg';
import { LOGIN } from "../graphql/mutations.js"
import { useMutation } from '@apollo/client';

const Login = () => {
  const myHistory = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ login, {loading, error }] = useMutation(LOGIN);
 
  

const handleLogin = async (e) => {
       e.preventDefault();
 try {
      const { data } = await login({ variables: { loginuser: { username, password } } });
       
      localStorage.setItem('authToken', data.login.token);
      localStorage.setItem('userId', data.login.userId);
      localStorage.setItem('role', data.login.role)
      const expiryDate = new Date(new Date().getTime() + 5 * 60 * 60 * 1000); // 5 hours from now
      localStorage.setItem('expiryDate', expiryDate.toString());
    myHistory('/home')
    } catch (error) {
      console.error('Login error:', error.message);
    }
 }

    return(
<div className="login"> 
<img className="LibraryWay"  src={libraryWay} width={480} height={620} loading='lazy' alt={"library way 1"}/>

    <div className="form" >
<h1 className='title'>Login</h1>
{error && <p className='errorMsg'>Incorrect username or password</p>} 
{/* {login && <p className='successMsg'>Login successful</p>} */}
<form action="/login" method="post"
onSubmit={handleLogin}>

<div style={{'marginBottom':'35px', paddingTop:'30px'}}>
<label htmlFor="username" style={{'color':'#070C70', 'fontSize':'25px'}}>Username</label><br/>
<input type="username" className='info' id="username"
value={username}   onChange={(e) => setUsername(e.target.value)}
  required/> <br/>
</div>

<div style={{'marginTop':'35px', 'marginBottom':'35px'}}>
<label htmlFor="password" style={{'color':'#070C70', 'fontSize':'25px'}}>Password</label><br/>
<input type="password" className='info' id="password"
value={password}     onChange={(e) => setPassword(e.target.value)}
  required/> <br/>
</div>
{!loading ? <button>Login Account</button> : <button disabled>Loading...</button>} 
<button style={{'backgroundColor':'#070C70','marginTop':'15px', 'color':'#ff1493', borderColor:'#ff1493'}}>Forget password</button>
</form>

         <div className='acc' >
<p style={{'color':'#070C70'}}>Dont have an account?</p>  
<a href="/signup" className='form-link'>Signup</a>
</div>
    </div>

</div>
    )}
export default Login ;