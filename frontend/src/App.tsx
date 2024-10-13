import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/Signup";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login />} ></Route>
      <Route path='/Signup' element={<Signup />} ></Route>
      <Route path='/Home' element={<Home />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
