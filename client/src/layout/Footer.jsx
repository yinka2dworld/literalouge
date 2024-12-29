import '../css/layout.css';
import okinLogo from "../assets/Okinlm.svg"
import TelegramIcon from '@mui/icons-material/Telegram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import {Link} from "react-router-dom";



const Footer = () => {
    const year = new Date().getFullYear()

    return (
<>


<footer>  
    <hr/>
            
  <img src={okinLogo} alt="okinLogo" className='okinLogo' />

    <div className="grid" style={{display:'flex', justifyContent:'center'}}>
   <Link className="footer-link"  style={{color:"#070C70"}} to="" >About</Link>
   <Link className="footer-link" style={{color:"#070C70"}} to="" >Privacy Policy</Link> 
   <Link className="footer-link" style={{color:"#070C70"}} to="" >Cookie Policy</Link>
   <Link className="footer-link" style={{color:"#070C70"}} to="/login" >Login</Link> 
        </div>
        
    <div className="crm">
        <div style={{textAlign:'center', marginBottom:'20px'}}>
        <Link to='' className="media-link" style={{color:'#070C70', marginRight:'10px'}} ><TelegramIcon fontSize="large"/></Link> 
        <Link to='' className="media-link" style={{color:'red', marginRight:'10px'}}><YouTubeIcon fontSize="large"/></Link> 
        <Link to='' className="media-link" style={{color:'#6767ff', marginRight:'10px'}}><FacebookIcon fontSize="large"/></Link>
        <Link to='' className="media-link" style={{color:'#070C70'}} ><XIcon  fontSize="large"/></Link> 
        </div>
    </div>
    
      <Link href="https://okin.onrender.com/" style={{color:"#070C70"}} className="footer-link" >&copy; {year} CodeX - All Rights Reserved | Ọkín technologies</Link> 
      </footer> 
</>
    )
}

export default Footer;