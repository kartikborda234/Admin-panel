import React, {useEffect, useState} from "react";
import MyDeshBoard from "./Deshboard";
import {useDispatch, useSelector} from "react-redux";
import {loadBlogs, loadUser} from "../redux/Actiontype";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MyDeshBoard2 from "./DeshBoard2";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const ViewBlogs = () => {
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useState(null);
    let dispatch = useDispatch();
    const {blog, users} = useSelector((state) => state.data);
    console.log(users, "blogs")
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        dispatch(loadBlogs())
        dispatch(loadUser())
    }, [])

    const viewUser = (id) => {
        const userBlogProfile = users && users.find((ele) => ele.id === id);
        console.log(userBlogProfile, "userBlogProfile")
        setUser(userBlogProfile)
        setOpen(true)
    }
    return (
        <React.Fragment>
            <MyDeshBoard2 />
            <div className="viewBlogs mt-5">
                {blog && blog.map((item, i) => (
                    <div key={i} className="view-blogs d-flex justify-content-center mt-3">
                        <Card style={{width: "30%"}}>
                            <CardContent>
                                <Typography variant="h5" component="div">{item.title}</Typography>
                                <Typography variant="body2">
                                    <br/>{item.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <h6>Author:
                                     <Button variant="button"
                                                onClick={() => viewUser(item.userid)}>{item.author}</Button>
                                </h6>
                                {/*<h4>Author:{item.author}</h4>*/}
                            </CardActions>
                            <hr/>
                        </Card>
                    </div>
                ))}
            </div>
            <div>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        view profile
                    </DialogTitle>
                    <DialogContent dividers>
                        {user &&
                        <Typography gutterBottom>
                            <h5>First name:{user.fname}</h5>
                            <h5>Last name:{user.lname}</h5>
                            <h5>Email:{user.email}</h5>
                            <h5>Gender:{user.gender}</h5>
                            <h5>Language:{user.language.join(',')}</h5>
                        </Typography>
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Close
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </div>
        </React.Fragment>
    )
}
export default ViewBlogs;