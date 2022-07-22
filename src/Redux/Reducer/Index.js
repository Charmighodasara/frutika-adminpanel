import { combineReducers } from "redux";
import { counterReducer } from "./Counter_Reducer";


export const rootReducer = combineReducers({
    counter : counterReducer
})