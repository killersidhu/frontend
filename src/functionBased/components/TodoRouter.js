import React from "react"

import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import NotMatch from '../pages/NotMatch';
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from '../pages/Home'
import TodoContainer from "./TodoContainer";

const TodoRouter = () => {
  

  return (
    <>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path = "/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}>
            </Route>
            <Route path ='/todo' element={<TodoContainer/>}>
            </Route>
        </Routes>
    </>
  )
}

export default TodoRouter;