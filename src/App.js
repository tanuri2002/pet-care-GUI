import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import './index.css'; 

const App=() =>{
  return (
   <BrowserRouter>
      <div>
        <NavigationBar>
          <Routes>

          </Routes>
        </NavigationBar>
      </div>
   </BrowserRouter>
  );
}

export default App;
