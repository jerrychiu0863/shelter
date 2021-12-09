import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

// Components
import Main from './components/Main';
import Detail from './components/Detail';

//image
import Banner from './assets/banner.jpg';

function App() {
  return (
    <>
      <div>
        <img
          src={Banner}
          width="100%"
          height="auto"
          style={{ verticalAlign: 'middle' }}
        />
      </div>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
      </Routes>
    </>
  );
}

export default App;
