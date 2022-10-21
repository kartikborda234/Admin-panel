import React, {useEffect} from "react";
import axios from "axios";
import {API} from "../apiUrl";

export const getUser = (user1) => {
    console.log(user1, "loadddd")
    return {
        type: 'GET-USER',
        payload: user1
    }
}

export const userAdded = () => {
    return {
        type: 'ADD-USER'
    }
}

const userDeleted = () => {
    return {
        type: 'DELETE-USER'
    }
}
export const singleUser = (user) => {
    console.log(user, "singleuser1")
    return {
        type: 'GET-SINGLE-USER',
        payload: user
    }
}
const userUpdated = () => {
    return {
        type: 'UPDATE'
    }
}
export const resetState = () => {
    localStorage.removeItem('Login_User')
    localStorage.removeItem('add_blog')
    return {
        type: 'RESET'
    }
}
export const singleUserLogin = (item) => {
    // console.log(item,"item")
    return {
        type: 'USER-LOGIN',
        payload: item
    }
}
export const addBlog = () => {
    return {
        type: 'BLOG',
    }
}
export const getBlogs = (item2) => {
    console.log(item2,"loadBlogs2")
    return {
        type: 'GET-BLOGS',
        payload:item2
    }
}
export const singleUserForget=(ele)=>{
    console.log(ele,"singleUserForget")
    return{
        type:'FORGET-PASS',
        payload:ele
    }
}
export const passUpdated = () => {
    return {
        type: 'UPDATE-PASSWORD'
    }
}

export const loadUser = () => {
    return function (dispatch) {
        axios.get(`${API}/user`).then((resp) => {
            console.log("response", resp.data)
            dispatch(getUser(resp.data));
        }).catch((error) => {
            console.log(error);
        });
    };
};

export const addUser = (user) => {
    return function (dispatch) {
        axios.post(`${API}/user`, user).then((resp) => {
            console.log("response", resp.data)
            dispatch(userAdded())
            dispatch(loadUser())
        }).catch((error) => {
            console.log(error)
        })
    }
}

export const deleteUser = (id) => {
    // console.log(id,'idddddddd')
    return function (dispatch) {
        axios.delete(`${API}/user/${id}`).then((resp) => {
            console.log(resp.data, "resp")
            dispatch(userDeleted(id))
            dispatch(loadUser())
        }).catch((error) => {
            console.log(error)
        })
    }
}

export const updateUser = (id, user) => {
    console.log(id, 'idddddddd')
    return function (dispatch) {
        axios.put(`${API}/user/${id}`, user).then((resp) => {
            console.log(resp.data, "resp")
            dispatch(userUpdated(id))
            dispatch(loadUser())
        }).catch((error) => {
            console.log(error)
        })
    }
}
export const getSingleUser = (id) => {
    console.log(id, "ssss")
    return function (dispatch) {
        axios
            .get(`${API}/user/${id}`).then((resp) => {
            console.log("resp", resp);
            dispatch(singleUser(resp.data));
        })
            .catch((error) => {
                console.log(error);
            });
    };
};
export const loginUser = (user) => {
    localStorage.setItem('remember_me',JSON.stringify(user))
    return function (dispatch) {
        axios
            .get(`${API}/user?email=${user.email}&password=${user.password}`,user).then((resp) => {
            if(resp.data){
                console.log(resp.data,"data")
                let data = resp.data[0]
                if(data){
                    localStorage.setItem('Login_User',JSON.stringify(data))
                    dispatch(singleUserLogin(data));
                }else {
                    localStorage.setItem('Login_User',JSON.stringify(''))
                }
            }
            console.log('respLog',resp)
        })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const loadBlogs = () => {
    return function (dispatch) {
        axios.get(`${API}/blogs`).then((resp) => {
            console.log("response", resp.data)
            dispatch(getBlogs(resp.data));
        }).catch((error) => {
            console.log(error);
        });
    };
};

export const viewBlogs = (blog) => {
    return function (dispatch) {
        axios.post(`${API}/blogs`, blog).then((resp) => {
            console.log("response11", resp.data)
            dispatch(addBlog())
        }).catch((error) => {
            console.log(error)
        })
    }
}

export const userForgetPass = (user3) => {
    console.log(user3,"user333")
    return function (dispatch) {
        axios
            .get(`${API}/user?email=${user3.email}`,user3).then((resp) => {
            if(resp.data){
                console.log(resp.data,"dataForget")
                let forgetData = resp.data[0];
                if (forgetData){
                    localStorage.setItem('Forget-pass',JSON.stringify(forgetData))
                    dispatch(singleUserForget(forgetData));
                }else {
                    localStorage.setItem('Forget-pass',JSON.stringify(''))
                }
            }
            console.log('respLog',resp)
        })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const updatePassword = (id,mail) => {
    console.log(mail, 'idddddddd')
    return function (dispatch) {
        axios.patch(`${API}/user/${id}`, mail).then((resp) => {
            console.log(resp.data, "resp")
            dispatch(passUpdated(mail))
            dispatch(loadUser())
        }).catch((error) => {
            console.log(error)
        })
    }
}