import React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import {updateUser, loadUser, singleUserLogin, deleteUser, resetState, loginUser} from "../redux/Actiontype";
import {useEffect} from "react";

import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField/TextField";
import Swal from "sweetalert2";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import NoSsr from '@mui/base/NoSsr';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const userList = ['users', 'add blog', 'view blog'];
const settings = ['Logout', 'view Profile'];
const MyDeshBoard2 = () => {
    let dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    // const [login, setLogin] = useState(JSON.parse(localStorage.getItem('user_login')))
    // console.log(login, "local")
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(false);
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const {users, user, blog} = useSelector((state) => state.data);
    console.log(blog, "bloguser")
    const [state, setState] = useState({fname: '', lname: '', email: '', password: '', gender: '', language: []})
    const [Id, setId] = useState(null)
    const [first, setFirst] = React.useState({open: false, firstField: false});
    const [last, setLast] = React.useState({open: false, lastField: false});
    const [email, setEmail] = React.useState({open: false, emailField: false});
    const [pass, setPass] = React.useState({open: false, passField: false});
    const [radio, setRadio] = React.useState({open: false, radioField: false});
    const [check, setCheckBox] = React.useState({open: false, checkField: false});
    const [filteredResults, setFilteredResults] = useState([]);
    const local = JSON.parse(localStorage.getItem('Login_User'));
    const dataBlog = JSON.parse(localStorage.getItem('add_blog'));
    const [openState, setOpenState] = useState(false)
    console.log(local, "local")
    useEffect(() => {
        dispatch(loadUser());
    }, []);
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "language") {
            if (e.target.checked) {
                state.language.push(value);
                console.log(state.language, "langhage")
                setState({...state, language: state.language})
            } else {
                const i = state.language.indexOf(value)
                state.language.splice(i, 1);
                console.log(i, 'ooo')
            }
            setState({...state, language: state.language})
        } else {
            setState({...state, [name]: value})
        }
    }
    useEffect(() => {
        if (user || local) {
            setState({...user, ...blog, ...dataBlog}) || setState({...local, ...blog, ...dataBlog})
            // setId(user.id)
        } else {
            navigate('/login')
        }
    }, [user])
    const handleSubmit = () => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(updateUser(Id, state))
                Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
        setOpen(false)
    }
    const handleFirst = (id) => {
        // console.log(id, "id")
        setFirst({open: !first.open, firstField: true})
    };
    const handleLast = (id) => {
        // console.log(id, "id")
        setLast({open: !last.open, lastField: true})
    };
    const handleEmail = (id) => {
        // console.log(id, "id")
        setEmail({open: !email.open, emailField: true})
    };
    const handlePass = (id) => {
        // console.log(id, "id")
        setPass({open: !pass.open, passField: true})
    };
    const handleRadiio = (id) => {
        // console.log(id, "id")
        setRadio({open: !radio.open, radioField: true})
    };
    const handleCheck = (id) => {
        // console.log(id, "id")
        setCheckBox({open: !check.open, checkField: true})
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDeshBoard = () => {
        navigate('/')
    };
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filterData = users && users.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })
            // console.log(filterData, "filterdata")
            setFilteredResults(filterData)
        } else {
            setFilteredResults(users)
        }
    }
    useEffect(() => {
        setFilteredResults(users)
    }, [users])
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        localStorage.removeItem('Login_User')
    };
    const handleCloseUserProfile = (s) => {
        if (s === 'Logout') {
            setState(null || '')
            dispatch(resetState())
            setAnchorElUser(false);
            setAnchorElUser(null);
            navigate('/login')
        } else if (s === 'view Profile') {
            setOpen(true)
            setAnchorElUser(null);
        }

    }
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleUsers = (p) => {
        if (p === 'users') {
            navigate('/userData')
        } else if (p === 'add blog') {
            navigate('/blog')
        }else if (p === 'view blog') {
            navigate('/viewblogs')
        }
    }
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
        </Menu>
    );
    return (
        <React.Fragment>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            onClick={handleDeshBoard}
                            component="div"
                            sx={{display: {xs: 'none', sm: 'block'}}}
                        >
                            Deshboard
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{'aria-label': 'search'}}
                                onKeyUp={(e) => searchItems(e.target.value)}
                            />
                        </Search>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {userList.map((page) => (
                                <Button
                                    key={page}
                                    onClick={() => handleUsers(page)}
                                    sx={{my: 2, color: 'white', display: 'block'}}>
                                    {page}
                                </Button>
                            ))}
                        </Box>


                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex', marginRight: 20}}}>
                                {/*{login && login.map((page, i) => (*/}
                                <h1
                                    // key={i}
                                    value={state.fname}
                                    // onClick={() => handleLogin()}
                                    sx={{my: 2, color: 'white', display: 'block'}}>
                                    {state.fname}
                                </h1>
                                {/*))}*/}
                            </Box>
                        </Box>
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="" src="/image/Avatar/avtar.jpeg"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserProfile}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleCloseUserProfile(setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
            </Box>
            <div>
                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{position: 'relative'}}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon/>
                            </IconButton>
                            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                                Profile
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleSubmit}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <DialogTitle style={{color: 'blue'}}>Edit Your Profile:~</DialogTitle>

                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex', marginLeft: 20}}}>
                            <h3><label>First name:</label></h3>
                            <h3
                                value={state.fname}
                                sx={{my: 2, color: 'white', display: 'block'}}>
                                {state.fname}
                            </h3>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', marginRight: 5}}>
                            <BorderColorOutlinedIcon color="success"
                                                     onClick={() => handleFirst(state.id)}/>
                        </Box>

                        <Box sx={{width: 300, display: 'flex', flexWrap: 'wrap', marginLeft: 5}}>
                            {first.open ? (
                                <React.Fragment>
                                    <NoSsr firstField={first.firstField}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="First name"
                                            name="fname"
                                            onChange={(e) => handleInput(e)}
                                            value={state.fname}
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </NoSsr>
                                </React.Fragment>
                            ) : null}
                        </Box>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex', marginLeft: 20}}}>
                            <h3><label>Last name:</label></h3>
                            <h3
                                value={state.lname}
                                sx={{my: 2, color: 'white', display: 'block'}}>
                                {state.lname}
                            </h3>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', marginRight: 5}}>
                            <BorderColorOutlinedIcon color="success"
                                                     onClick={() => handleLast(state.id)}/>
                        </Box>
                        <Box sx={{width: 300, display: 'flex', flexWrap: 'wrap', marginLeft: 5}}>
                            {last.open ? (
                                <React.Fragment>
                                    <NoSsr lastField={last.lastField}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Last name"
                                            name="lname"
                                            onChange={(e) => handleInput(e)}
                                            value={state.lname}
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </NoSsr>
                                </React.Fragment>
                            ) : null}
                        </Box>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex', marginLeft: 20}}}>
                            <h3><label>Email address:</label></h3>
                            <h3
                                value={state.email}
                                sx={{my: 2, color: 'white', display: 'block'}}>
                                {state.email}
                            </h3>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', marginRight: 5}}>
                            <BorderColorOutlinedIcon color="success"
                                                     onClick={() => handleEmail(state.id)}/>
                        </Box>
                        <Box sx={{width: 300, display: 'flex', flexWrap: 'wrap', marginLeft: 5}}>
                            {email.open ? (
                                <React.Fragment>
                                    <NoSsr emailField={email.emailField}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Email"
                                            name="email"
                                            onChange={(e) => handleInput(e)}
                                            value={state.email}
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </NoSsr>
                                </React.Fragment>
                            ) : null}
                        </Box>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex', marginLeft: 20}}}>
                            <h3><label>Password:</label></h3>
                            <h3
                                value={state.password}
                                sx={{my: 2, color: 'white', display: 'block'}}>
                                {state.password}
                            </h3>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', marginRight: 5}}>
                            <BorderColorOutlinedIcon color="success"
                                                     onClick={() => handlePass(state.id)}/>
                        </Box>
                        <Box sx={{width: 300, display: 'flex', flexWrap: 'wrap', marginLeft: 5}}>
                            {pass.open ? (
                                <React.Fragment>
                                    <NoSsr passField={pass.passField}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Password"
                                            name="password"
                                            onChange={(e) => handleInput(e)}
                                            value={state.password}
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </NoSsr>
                                </React.Fragment>
                            ) : null}
                        </Box>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex', marginLeft: 20}}}>
                            <h3><label>Gender:</label></h3>
                            <h3
                                value={state.gender}
                                sx={{my: 2, color: 'white', display: 'block'}}>
                                {state.gender}
                            </h3>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', marginRight: 5}}>
                            <BorderColorOutlinedIcon color="success"
                                                     onClick={() => handleRadiio(state.id)}/>
                        </Box>
                        <Box sx={{width: 300, display: 'flex', flexWrap: 'wrap', marginLeft: 5}}>
                            {radio.open ? (
                                <React.Fragment>
                                    <NoSsr radioField={radio.radioField}>
                                        <FormControl>
                                            <FormLabel id="demo-controlled-radio-buttons-group">Gender:~</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                onChange={(e) => handleInput(e)}
                                            >
                                                <FormControlLabel value="female" name="gender"
                                                                  checked={state.gender === "female"}
                                                                  control={<Radio/>} label="Female"/>
                                                <FormControlLabel value="male" name="gender"
                                                                  checked={state.gender === "male"}
                                                                  control={<Radio/>} label="Male"/>
                                            </RadioGroup>
                                        </FormControl>
                                    </NoSsr>
                                </React.Fragment>
                            ) : null}
                        </Box>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex', marginLeft: 20}}}>
                            <h3><label>Language:</label></h3>
                            <h3
                                value={state.language}
                                sx={{my: 2, color: 'white', display: 'block'}}>
                                {state.language}
                            </h3>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', marginRight: 5}}>
                            <BorderColorOutlinedIcon color="success"
                                                     onClick={() => handleCheck(state.id)}/>
                        </Box>
                        <Box sx={{width: 300, display: 'flex', flexWrap: 'wrap', marginLeft: 5}}>
                            {check.open ? (
                                <React.Fragment>
                                    <NoSsr checkField={check.checkField}>
                                        <FormGroup sx={{marginRight: 20}}>
                                            <FormLabel id="demo-controlled-radio-buttons-group">Language:~</FormLabel>
                                            <FormControlLabel value="hindi" name="language" control={<Checkbox/>}
                                                              checked={state.language.includes("hindi")}
                                                              onChange={(e) => handleInput(e)}
                                                              label="Hindi"/>
                                            <FormControlLabel value="gujarati" name="language" control={<Checkbox/>}
                                                              checked={state.language.includes("gujarati")}
                                                              onChange={(e) => handleInput(e)}
                                                              label="Gujarati"/>
                                            <FormControlLabel value="english" name="language" control={<Checkbox/>}
                                                              checked={state.language.includes("english")}
                                                              onChange={(e) => handleInput(e)}
                                                              label="English"/>
                                        </FormGroup>
                                    </NoSsr>
                                </React.Fragment>
                            ) : null}
                        </Box>
                    </List>
                </Dialog>
            </div>
            {/*<div className="img-deshboard">*/}
            {/*    <img src={require('../admin.jpg')} style={{width:"100%"}}/>*/}
            {/*</div>*/}
            {/*<User filter={filteredResults}/>*/}
        </React.Fragment>
    )
}
export default MyDeshBoard2;