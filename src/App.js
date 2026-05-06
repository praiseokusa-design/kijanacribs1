import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Getproducts from './components/Getproducts';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import MakePayment from './components/MakePayment';
import Addproducts from './components/Addproducts';
import { BookingCart } from './components/BookingCart';
import { PropertyMap } from './components/PropertyMap';
import { Chatbot } from './components/Chatbot';
import { FilterBar } from './components/FilterBar';

function App() {
  // const user=JSON.parse(localStorage.getItem("user"))
  // console.log("user",user)
  return (
    <Router>

      

      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/' element={<Getproducts/>}/>
        <Route path='/makepayment' element={<MakePayment/>}/>
        <Route path='/addproducts' element={<Addproducts/>}/>
        <Route path='/navbar' element={<Navbar/>}/>
        <Route path="/cart" element={<BookingCart/>} />
        <Route path='/map' element={<PropertyMap/>}/>
        <Route path='/bot' element={<Chatbot/>}/>
        <Route path='/Filter' element={<FilterBar/>}/>

      </Routes>
      <Chatbot />

    </Router>
  );
}

export default App;
