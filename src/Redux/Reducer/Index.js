import { combineReducers } from "redux";
import { categoryReducer } from "./Category.reducer";
import { counterReducer } from "./Counter_Reducer";
import { productReducer } from "./ProductGet.reducer";


export const rootReducer = combineReducers({
    counter : counterReducer,
    product : productReducer,
    categoty : categoryReducer
})