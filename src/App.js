import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import './index.css'; 

const App=() =>{
  return (
   <BrowserRouter>
      <div>
        <NavigationBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </NavigationBar>
      </div>
   </BrowserRouter>
  );
}

export default App;
