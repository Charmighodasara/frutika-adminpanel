import * as ActionTypes from '../ActionTypes'

export const GetProduct = () => (dispatch) => {
    try {

        fetch('http://localhost:3004/products')
            .then((response) => response.json())
            .then((data) => dispatch({ type: ActionTypes.PRODUCT_GETDATA, payload: data }))
            .catch((error) => console.log(error.message))

    } catch (error) {
        console.log(error.message);
    }
}