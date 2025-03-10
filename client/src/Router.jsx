import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Main from './pages/Main';
import Book from './pages/Book';
import AddBook from './pages/AddBook';
import Category from './pages/Category'
import UpdateBook from './pages/UpdateBook';
import NotFound from './pages/NotFound';
import Donate from './pages/Donate ';
import Privacy from './pages/Privacy';
import  About from './pages/About';
import Paypal from './pages/Paypal';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
     <Route exact path='/admin/addBook' element={<AddBook/>} />
      <Route exact path='/' element={<Main/>} /> 
      <Route exact path='/login' element={<Login/>} />
     <Route exact path='/signup' element={<Signup/>} /> 
     <Route exact path='/home' element={<Home/>} />
     <Route exact path='/home/:bookId' element={<Book/>} />
     <Route exact path='/home/:category' element={<Category/>} />
     <Route exact path='/admin/updateBook/:bookId' element={<UpdateBook/>} /> 
     <Route exact path ='/donate' element={<Donate/>} />
     <Route path ='/privacy-policy' element={<Privacy/>} />
     <Route path ='/about' element={<About/>} />
     <Route path ='/paypal-donation' element={<Paypal/>} />
     <Route path ='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
};


export default AppRouter;