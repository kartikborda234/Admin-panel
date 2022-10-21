import React, {useEffect, useState} from "react";
import {addUser, loadUser, singleUserForget, updatePassword, userForgetPass} from "../redux/Actiontype";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import RegistrationForm from "./Registration";
import {NavLink} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {singleUserLogin, loginUser} from "../redux/Actiontype";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import NoSsr from "@mui/base/NoSsr/NoSsr";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import InputGroup from 'react-bootstrap/InputGroup';

const LoginPage = () => {
    const [passOpen, setPassOpen] = React.useState({open: false, field: false});
    const [showForget, setShowForget] = useState(false);
    const [state, setState] = useState({email: '', password: '', remember: []});
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [state2, setState2] = useState(null);
    const dispatch = useDispatch();
    const {users, user, index, userForget} = useSelector((state) => state.data);
    console.log(userForget, "userssss")
    const state1 = useSelector((state) => state.data);
    const local = JSON.parse(localStorage.getItem('Login_User'));
    const navigate = useNavigate();
    const {email, password} = state;
    const [show, setShow] = useState(false);
    const [pass, setPass] = useState({password: '', cpassword: '', showPassword: false,showConfirmPassword:false});
    const [forgetpass, setForgetPass] = useState(null);
    const remember_me = JSON.parse(localStorage.getItem('remember_me'));
    console.log(remember_me, "loginuser")
    const handleClose = () => setShowForget(false);
    const handleShow = () => setShowForget(true);
    const [id, setId] = useState(null)
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user])
    useEffect(() => {
        if (local) {
            navigate('/')
        } else {
            navigate('/login')
            // if (remember_me.remember.length && remember_me.remember.length===1) {
            //     setState({...remember_me})
            // }
        }
    }, [])
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'remember') {
            if (e.target.checked) {
                state.remember && state.remember.push(value);
                setState({...state, remember: state.remember})
            } else {
                const i = state.remember && state.remember.indexOf(value)
                state.remember.splice(i, 1);
            }
            setState({...state, remember: state.remember})
        } else {
            setState({...state, [name]: value})
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(state))
        if (email || password) {
            setShow(true)
        }
        setState({email: '', password: ''})
    }
    const handleForget = (e) => {
        const forget = e.target.name;
        const val = e.target.value;
        setForgetPass({...forgetpass, [forget]: val})
    }
    console.log(pass, "forgetpass")
    const handleSubForget = (e) => {
        e.preventDefault();
        dispatch(userForgetPass(forgetpass))
        setPassOpen({open: !passOpen.open, field: true})
    }
    const handleInputPass = (e) => {
        e.preventDefault();
        const fPass = e.target.name;
        const pvalue = e.target.value;
        setPass({...pass, [fPass]: pvalue})
    }
    const handleSubmitPass = (e) => {
        e.preventDefault();
        if (pass.password !== pass.cpassword) {
            setConfirmPasswordError("Confirm password is not matched");
        } else {
            dispatch(updatePassword(userForget.id, pass))
            setShowForget(false)
            setConfirmPasswordError('');
        }
    }
    const handleClickShowPassword = () => {
        setPass({...pass, showPassword: !pass.showPassword});
    };
    const handleClickShowConfirmPassword = () => {
        setPass({...pass, showConfirmPassword: !pass.showConfirmPassword});
    };
    return (
        <React.Fragment>
            <Row style={{display: 'flex', justifyContent: 'end'}}>
                <Col xs={6}>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Body>enter your correct id,password!</Toast.Body>
                    </Toast>
                </Col>
            </Row>
            <div className="container d-flex justify-content-center">
                <form className="mt-5">
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example1">Email address</label>
                        <input type="email" name="email" value={state.email} id="form2Example1"
                               onChange={(e) => handleInputChange(e)} className="form-control"/>
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                        <input name="password" value={state.password} type="password" id="form2Example2"
                               onChange={(e) => handleInputChange(e)} className="form-control"/>
                    </div>
                    <div className="row mb-4">
                        <div className="col d-flex justify-content-center">
                            <div className="form-check">
                                <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                                <input className="form-check-input" name="remember" value="yes"
                                       checked={state.remember && state.remember.includes("yes")}
                                       onChange={(e) => handleInputChange(e)} type="checkbox"/>
                            </div>
                        </div>
                        <div className="col">
                            <a href="#!" onClick={handleShow}>Forgot password?</a>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="button" onClick={handleSubmit}
                                className="btn btn-primary btn-block mb-4 w-100">Sign in
                        </button>
                    </div>
                    <div className="text-center">
                        <p>Not a member? <NavLink to={"/registration"}>Register</NavLink></p>
                    </div>
                </form>
            </div>
            <Modal show={showForget} onHide={handleClose}>
                <Modal.Body>
                    <Form>
                        {passOpen.open ? (
                                <NoSsr field={passOpen.field}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Reset password!</Modal.Title>
                                    </Modal.Header>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1"
                                    >
                                        <Form.Label className="mt-3">Password</Form.Label>
                                        <InputGroup>
                                            <Form.Control name="password" type={pass.showPassword ? "text" : "password"}
                                                          value={pass.password}
                                                          onChange={(e) => handleInputPass(e)}
                                                          placeholder="create new password"/>
                                            {<IconButton
                                                onClick={handleClickShowPassword}>{pass.showPassword ?
                                                <RemoveRedEyeOutlinedIcon/> : <VisibilityOff/>}</IconButton>}
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1"
                                    >
                                        <Form.Label className="mt-3">Confirm Password</Form.Label>
                                        <InputGroup>
                                            <Form.Control name="cpassword" type={pass.showConfirmPassword ? "text" : "password"} value={pass.cpassword}
                                                          onChange={(e) => handleInputPass(e)}
                                                          placeholder="confirm password"/>
                                            {<IconButton
                                                onClick={handleClickShowConfirmPassword}>{pass.showConfirmPassword ?
                                                <RemoveRedEyeOutlinedIcon/> : <VisibilityOff/>}</IconButton>}
                                        </InputGroup>
                                    </Form.Group>
                                    <span style={{color: "red"}}>{confirmPasswordError}</span>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={handleSubmitPass}>
                                            Reset password
                                        </Button>
                                    </Modal.Footer>
                                </NoSsr>
                            ) :
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Modal.Header closeButton>
                                    <Modal.Title>Forgot password!</Modal.Title>
                                </Modal.Header>
                                <Form.Label className="mt-3">Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    autoFocus
                                    onChange={(e) => handleForget(e)}
                                    name="email"
                                />
                                <Modal.Footer>
                                    <Button variant="primary" onClick={handleSubForget}>
                                        Reset password
                                    </Button>
                                </Modal.Footer>
                            </Form.Group>}
                    </Form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}
export default LoginPage;