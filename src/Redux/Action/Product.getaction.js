import { Base_url } from '../../Base_URI/Base_url'
import * as ActionTypes from '../ActionTypes'

export const GetProduct = () => (dispatch) => {
    try {
        dispatch(LoadingProduct())
        setTimeout(function () {

            fetch(Base_url +'products')
                .then(response => {
                    if (response.ok) {
                        return response;
                    } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                    error => {
                        var errmess = new Error(error.message);
                        throw errmess;
                    })
                .then((response) => response.json())
                .then((data) => dispatch({ type: ActionTypes.PRODUCT_GETDATA, payload: data }))
                .catch((error) => dispatch(errorProduct(error.message)))
        }, 2000)

    } catch (error) {
        console.log(error.message);
    }
}

export const LoadingProduct = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_PRODUCT })
}

export const errorProduct = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_PRODUCT, payload: error })
}