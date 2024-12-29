import logo from "../assets/audioLogo.png"
import '../css/layout.css';


const Navbar = () => {
return(
<>
<div className="navbar" >
  <img src={logo} alt="logo"  className="logo" />
  <div className="siteName">
    <p style={{"color":"#ff1493"}}>L</p> 
    <p style={{"color":"#070C70"}}>i</p>  
    <p style={{"color":"#ff1493"}}>t</p>
    <p style={{"color":"#070C70"}}>e</p>  
    <p style={{"color":"#ff1493"}}>r</p>
      <p style={{"color":"#070C70"}}>a</p>
      <p style={{"color":"#ff1493"}}>l</p>  
      <p style={{"color":"#070C70"}}>o</p>  
      <p style={{"color":"#ff1493"}}>u</p>  
      <p style={{"color":"#070C70"}}>g</p>
      <p style={{"color":"#ff1493"}}>e</p>
  </div>
  </div> 
</>
)}
export default Navbar;