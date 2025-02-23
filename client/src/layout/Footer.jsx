import '../css/layout.css';
import okinLogo from "/assets/Okinlm.svg";
import  InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import {Link} from "react-router-dom";



const Footer = () => {
    const year = new Date().getFullYear()

    return (
<>


<footer style={{backgroundColor:'white'}}>  
    <hr/>
            
  <img src={okinLogo} alt="okinLogo" className='okinLogo' />

    <div className="grid" style={{display:'flex', justifyContent:'center'}}>
   <Link   onClick={() => window.scrollTo(0, 0)} className="footer-link"  style={{color:"#070C70"}}   to="/about" >About</Link>
   <Link   onClick={() => window.scrollTo(0, 0)} className="footer-link" style={{color:"#070C70"}} to="/privacy-policy" >Privacy Policy</Link> 
   <Link   onClick={() => window.scrollTo(0, 0)} className="footer-link" style={{color:"#070C70"}} to="/login" >Login</Link> 
        </div>
        
    <div className="crm">
        <div style={{textAlign:'center', marginBottom:'20px'}}>
        <Link to='https://www.instagram.com/okintechnologies/' className="media-link" target="_blank" rel="noopener noreferrer" style={{color:'#833AB4', marginRight:'10px'}} ><InstagramIcon fontSize="large"/></Link> 
        <Link to='https://web.facebook.com/okintechnologies/' className="media-link" target="_blank" rel="noopener noreferrer" style={{color:'#6767ff', marginRight:'10px'}}><FacebookIcon fontSize="large"/></Link>
        <Link to='https://x.com/okintechnologie/' target="_blank" rel="noopener noreferrer" className="media-link" style={{color:'#070C70'}} ><XIcon  fontSize="large"/></Link> 
        </div>
    </div>
    
      <Link href="https://okin.onrender.com/" target="_blank" rel="noopener noreferrer" style={{color:"#070C70"}} className="footer-link" >&copy; {year} Literalouge - All Rights Reserved | Ọkín technologies</Link> 
      </footer> 
</>
    )
}

export default Footer;