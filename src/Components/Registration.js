import React, {useState} from "react";
import {addUser} from "../redux/Actiontype";
import {useDispatch} from "react-redux";
import { NavLink  } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const RegistrationForm = () => {
    const [user,setUser]=useState({fname:'',lname:'',email:'',password:'',file:'',gender:'',language:[]})
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleInputChange=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        if (name === "language") {
            if (e.target.checked) {
                user.language.push(value);
                console.log(user.language, "langhage")
                setUser({...user, language: user.language})
            } else {
                const i = user.language.indexOf(value)
                user.language.splice(i, 1);
                console.log(i, 'ooo')
            }
            setUser({...user, language: user.language})
        } else {
            setUser({...user, [name]: value})
        }
    }
    console.log(user,"user")
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(addUser(user))
        setUser({fname:'',lname:'',email:'',password:'',gender:''})
        navigate("/")
    }
    return (
        <React.Fragment >
            <div className="container mt-5 vh-100 d-flex justify-content-center">
                <form className="">
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label"  htmlFor="form3Example1">First name</label>
                                <input type="text" name="fname" value={user.fname} onChange={(e)=>handleInputChange(e)} className="form-control"/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="form3Example2">Last name</label>
                                <input type="text" name="lname" value={user.lname} onChange={(e)=>handleInputChange(e)} id="form3Example2" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <label className="label">choose gender:</label>

                        <input type="radio" name="gender" value="male" checked={user.gender == "male"}
                               onChange={(e) => handleInputChange(e)}/>
                        <label className="label">Male</label>
                        <input type="radio" name="gender" value="female" checked={user.gender == "female"}
                               onChange={(e) => handleInputChange(e)}/>
                        <label className="label">Female</label>
                    </div>
                    <div className="form-outline mb-4 mt-3">
                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                        <input type="email" name="email" value={user.email} onChange={(e)=>handleInputChange(e)} id="form3Example3" className="form-control"/>

                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example4">Password</label>
                        <input type="password" name="password" value={user.password} onChange={(e)=>handleInputChange(e)} id="form3Example4" className="form-control"/>
                    </div>
                    <div className="form-group mt-3">
                        <label>Language:</label>
                        <input type="checkbox" name="language" value="hindi" checked={user.language.includes("hindi")}
                               onChange={(e) => handleInputChange(e)}/>Hindi
                        <input type="checkbox" name="language" value="gujarati" checked={user.language.includes("gujarati")}
                               onChange={(e) => handleInputChange(e)}/>Gujarati
                        <input type="checkbox" name="language" value="english" checked={user.language.includes("english")}
                               onChange={(e) => handleInputChange(e)}/>English
                    </div>
                    {/*<div className="form-outline mb-4">*/}
                    {/*    <label className="form-label" htmlFor="form3Example4">add Profile</label>*/}
                    {/*    <input type="file" name="file" value={user.file} onChange={(e)=>handleInputChange(e)} id="form3Example4" className="form-control"/>*/}
                    {/*</div>*/}
                    <div className="text-center mt-3">
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block mb-4 w-100">Sign up</button>
                    </div>
                    <div className="text-center">
                        <p>Already Have an Account <NavLink to={"/"}>Sign in</NavLink></p>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}
export default RegistrationForm;