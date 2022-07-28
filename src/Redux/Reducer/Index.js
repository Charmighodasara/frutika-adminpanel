import { combineReducers } from "redux";
import { counterReducer } from "./Counter_Reducer";
import { productReducer } from "./ProductGet.reducer";


export const rootReducer = combineReducers({
    counter : counterReducer,
    product : productReducer,
})