import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navbar from './pages/Navbar';
import { Route, Routes} from "react-router-dom";
import Join from './pages/Join';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Gig from './pages/Gig';
import GigPage from './pages/GigPage';
import MyOrders from './pages/MyOrders';
import ReceivedOrders from './pages/ReceivedOrders';
import Chat from './pages/Chat';

function App() {
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/join' element={<Join/>}></Route>
        <Route path='/creategig' element={<Gig/>}></Route>
        <Route path='/u/:id' element={<Dashboard/>}></Route>
        <Route path='/gigs/:gigid' element={<GigPage/>}></Route>
        <Route path='/orders' element={<MyOrders/>}></Route>
        <Route path='/ordersreceived' element={<ReceivedOrders/>}></Route>
        <Route path='/orders/chat/:order_id' element={<Chat/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
