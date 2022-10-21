import * as React from 'react';
import {alpha, styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import {loadUser, deleteUser, getSingleUser, updateUser, resetState} from "../redux/Actiontype";
import {useEffect} from "react";
import {useState} from "react";
import {useNavigate} from "react-router";
import MyDeshBoard from "./Deshboard";
import MyDeshBoard2 from "./DeshBoard2";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const User = (props) => {
    let dispatch = useDispatch();
    const {users, user, blog} = useSelector((state) => state.data);
    console.log("bloguser11", user)
    const index = useSelector((state) => state.data.index);
    const local = JSON.parse(localStorage.getItem('Login_User'));
    const [Id, setId] = useState(null)
    const [list, setList] = useState([])
    console.log(index, "ind")
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadUser());
    }, []);

    useEffect(() => {
       const list=users && users.filter((item)=>item.id !== local.id);
        console.log(list,"list")
       setList([...list])
    }, [users])
    // console.log("list",list)
    // useEffect(() => {
    //     dispatch(getSingleUser(Id))
    // }, [Id])


    // const handleEdit = (id) => {
    //     console.log(id, "yjjjj")
    //     if (user) {
    //         setState({...user})
    //     }
    //     setId(id)
    //     setClick(true)
    // }


    // const handleDelete = (id) => {
    //     // console.log(id,"idd");
    //     const swalWithBootstrapButtons = Swal.mixin({
    //         customClass: {
    //             confirmButton: 'btn btn-success',
    //             cancelButton: 'btn btn-danger'
    //         },
    //         buttonsStyling: false
    //     })
    //
    //     swalWithBootstrapButtons.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, delete it!',
    //         cancelButtonText: 'No, cancel!',
    //         reverseButtons: true
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             dispatch(deleteUser(id))
    //             swalWithBootstrapButtons.fire(
    //                 'Deleted!',
    //                 'Your file has been deleted.',
    //                 'success'
    //             )
    //         } else if (
    //             /* Read more about handling dismissals below */
    //             result.dismiss === Swal.DismissReason.cancel
    //         ) {
    //             swalWithBootstrapButtons.fire(
    //                 'Cancelled',
    //                 'Your imaginary file is safe :)',
    //                 'error'
    //             )
    //         }
    //     })
    // }
    useEffect(() => {
        dispatch(loadUser())
    }, []);
    return (
        <React.Fragment>
            <MyDeshBoard2 />
            <TableContainer component={Paper} className="mt-5">
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{width: '7%'}}>id</StyledTableCell>
                            <StyledTableCell style={{width: '18%'}} align="center">First name</StyledTableCell>
                            <StyledTableCell style={{width: '17%'}} align="center">Last name</StyledTableCell>
                            <StyledTableCell style={{width: '25%'}} align="center">Email</StyledTableCell>
                            <StyledTableCell style={{width: '15%'}} align="center">Password</StyledTableCell>
                            <StyledTableCell style={{width: '10%'}} align="center">Gender</StyledTableCell>
                            <StyledTableCell style={{width: '8%'}} align="center">Language</StyledTableCell>
                            {/*<StyledTableCell align="center">Action</StyledTableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell style={{width: '7%'}} component="th" scope="row">
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell style={{width: '18%'}} align="center">{row.fname}</StyledTableCell>
                                <StyledTableCell style={{width: '17%'}} align="center">{row.lname}</StyledTableCell>
                                <StyledTableCell style={{width: '25%'}} align="center">{row.email}</StyledTableCell>
                                <StyledTableCell style={{width: '15%'}} align="center">{row.password}</StyledTableCell>
                                <StyledTableCell style={{width: '10%'}} align="center">{row.gender}</StyledTableCell>
                                <StyledTableCell style={{width: '8%'}} align="center">{row.language}</StyledTableCell>
                                {/*<BorderColorOutlinedIcon color="success" onClick={() => handleEdit(row.id)}/>*/}
                                {/*<DeleteIcon color="secondary" onClick={() => handleDelete(row.id)}/>*/}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}
export default User;