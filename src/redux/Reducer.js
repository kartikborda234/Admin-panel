const initialState = {
    users: [{id: '', fname: '', lname: '', email: '', password: '', gender: '', language: [], remember: []}],
    user: null,
    blog: [{title: '', description: ''}],
    index: false,
    userForget:null
}
export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case'GET-USER':
            return {
                ...state,
                users: action.payload,
                index: false
            }
        case 'INSERT':
            return {...state, index: false}
        case 'UPDATE':
            return {...state, index: false}
        case 'DELETE':
            return {...state, index: false}
        case 'GET-SINGLE-USER':
            return {...state, index: true, user: action.payload}
        case'RESET':
            return {user: null}
        case'BLOG':
            return {
                ...state,
                index: false,
            }
        case 'GET-BLOGS':
            return {...state, blog: action.payload, index: false}
        case 'USER-LOGIN':
            return {
                ...state,
                index: false,
                user: action.payload,
            }
        case 'FORGET-PASS':
            return {
                ...state,
                index: false,
                userForget: action.payload,
            }
        case 'UPDATE-PASSWORD':
            return {...state, index: false}
        default:
            return state;
    }
}
export default Reducer;