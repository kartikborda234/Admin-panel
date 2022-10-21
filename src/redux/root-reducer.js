import {combineReducers} from "redux";
import Reducer from "./Reducer";

const rootReducer=combineReducers({
    data:Reducer,
})
export default rootReducer;
