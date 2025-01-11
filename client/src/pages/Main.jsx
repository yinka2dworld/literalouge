import  '../css/Main.css';
import Library1Image from '/assets/library.jpg';
import Navbar from '../layout/Navbar.jsx'


const Main = () => {
	return (
    <div className="main">
<Navbar/>
<div className='mottoDiv'>
	<p className='motto' >Orating African Literature</p>
</div>

<img className='Library1'  src={Library1Image} loading='lazy' alt="library 1"/>
<div className='Group48'>
<div className='Rectangle12'>
</div>
<div className='Group47'>
<a className='ExploreBooks'   onClick={() => window.scrollTo(0, 0)} href='/home'>Explore books</a>
</div>
</div>

</div>
)};

export default Main;
