import * as ActionTypes from '../ActionTypes'

const initVal ={
    isLoading : false,
    product : [],
    error:''
}

export const productReducer =(state= initVal , action)=>{
    switch (action.type) {
        case ActionTypes.PRODUCT_GETDATA:
           return{
            ...state,
            isLoading : false,
            product : action.payload,
            error:''
           }
    
        default:
           return state;
    }
}