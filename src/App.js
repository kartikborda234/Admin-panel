import {Route, Routes} from 'react-router-dom';
import RegistrationForm from "./Components/Registration";
import MyDeshBoard from "./Components/Deshboard";
import MyDeshBoard2 from "./Components/Deshboard";
import LoginPage from "./Components/Login";
import AddBlog from "./Components/blog";
import React from "react";
import User from "./Components/users";
import ViewBlogs from "./Components/viewBlogs";
import * as app from "dom-helpers";
const port= 4000
function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<MyDeshBoard />}></Route>
            <Route path="/userData" element={<User />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/registration" element={<RegistrationForm />}></Route>
            <Route path="/blog" element={<AddBlog />}></Route>
            <Route path="/viewblogs" element={<ViewBlogs/>}/>
        </Routes>
    </div>
  );
}


export default App;
