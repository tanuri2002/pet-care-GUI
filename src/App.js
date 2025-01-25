import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUpp from './pages/SignUpp';
import AddAPet from './pages/AddAPet';
import './index.css'; 

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addapet" element={<AddAPet/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/signupp" element={<SignUpp/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

