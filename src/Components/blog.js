import React, {useState} from "react";
import {addBlog, getSingleUser, viewBlogs} from "../redux/Actiontype";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateUser, loadUser, singleUserLogin, deleteUser, resetState, loginUser} from "../redux/Actiontype";
import {useEffect} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField/TextField";
import MyDeshBoard from "./Deshboard";
import Box from "@mui/material/Box";
import MyDeshBoard2 from "./DeshBoard2";


const AddBlog = () => {
    const [blogs, setBlog] = useState({title: '', description: ''})
    let dispatch = useDispatch();
    const navigate = useNavigate();
    const {users, user, blog} = useSelector((state) => state.data);
    console.log(user, "blogusers")
    const local = JSON.parse(localStorage.getItem('Login_User'));
    console.log(local, "local")
    useEffect(() => {
        dispatch(loadUser());
        dispatch(getSingleUser())
    }, []);
    const handleInput = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        const author=local.fname;
        console.log(author,"author")
        setBlog({...blogs,userid:user.id,[name]: value,author})
        console.log(blog, "blog")
    }

    const handleSubmit = () => {
        dispatch(viewBlogs(blogs))
        setBlog({title: '', description: ''})
        navigate("/viewBlogs")
    }
    return (
        <React.Fragment>
            <MyDeshBoard2 />
            <DialogTitle style={{color: 'blue'}} className="container mt-5">Add Blog:~</DialogTitle>

            <div className="container mt-3">
                <TextField id="outlined-basic" name="title" label="Title" value={blogs.title}
                           onChange={(e) => handleInput(e)} variant="outlined" fullWidth={100}/>
            </div>
            <div className="container mt-3">
                <textarea id="outlined-basic" name="description" placeholder="description..." value={blogs.description}
                          rows="7" cols="100" onChange={(e) => handleInput(e)}/>
            </div>
            <div>
                <button type="submit" style={{marginLeft: "8%", width: ""}} className="mt-3 btn btn-success"
                        onClick={handleSubmit}>ADD
                </button>
            </div>

        </React.Fragment>
    )
}
export default AddBlog;