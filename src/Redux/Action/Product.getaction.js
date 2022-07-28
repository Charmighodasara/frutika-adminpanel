import * as ActionTypes from '../ActionTypes'

export const GetProduct = ()=> (dispatch)=> {
    fetch('http://localhost:3004/products')
    .then((response) => response.json())
    .then((data)=> dispatch({type :ActionTypes.PRODUCT_GETDATA , payload : data}))
    .catch((error)=> console.log(error))
}