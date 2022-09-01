import { addDoc, collection } from 'firebase/firestore';
import { Base_url } from '../../Base_URI/Base_url'
import { db } from '../../firebase';
import * as ActionTypes from '../ActionTypes'

export const GetProduct = () => (dispatch) => {
    try {
        // dispatch(LoadingProduct())
        // setTimeout(function () {

        //     fetch(Base_url + 'products')
        //         .then(response => {
        //             if (response.ok) {
        //                 return response;
        //             } else {
        //                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //                 error.response = response;
        //                 throw error;
        //             }
        //         },
        //             error => {
        //                 var errmess = new Error(error.message);
        //                 throw errmess;
        //             })
        //         .then((response) => response.json())
        //         .then((data) => dispatch({ type: ActionTypes.PRODUCT_GETDATA, payload: data }))
        //         .catch((error) => dispatch(errorProduct(error.message)))
        // }, 2000)

    } catch (error) {
        dispatch(errorProduct(error.message));
    }
}

export const addProduct = (data) => async(dispatch) => {
    try {
        const docRef = await addDoc(collection(db, "Product"), data);
          console.log("Document written with ID: ", docRef.id);
        dispatch({type: ActionTypes.ADD_PRODUCT, payload:{id:docRef.id, ...data}})
        // fetch(Base_url + 'products', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         dispatch({ type: ActionTypes.ADD_PRODUCT, payload: data });
        //     })
        //     .catch((error) => dispatch(errorProduct(error.message)))
    } catch (error) {
        dispatch(errorProduct(error.message))
    }
}

export const deleteProduct = (id) => (dispatch) => {
    console.log(id);
    try {
        fetch(Base_url + 'products/' + id, {
            method: 'DELETE'
        })
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
            .then(dispatch({ type: ActionTypes.DELETE_PRODUCT, payload: id }))
            .catch((error) => dispatch(errorProduct(error.message)))

    } catch (error) {
        dispatch(errorProduct(error.message))
    }
}

export const updateProduct = (data) => (dispatch) => {
    console.log(data);
    try {
        fetch(Base_url + 'products/' + data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
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
            .then((data) => {
                dispatch({ type: ActionTypes.UPDATE_PRODUCT, payload: data });
            })
            .catch((error) => dispatch(errorProduct(error.message)))
    } catch (error) {
        dispatch(errorProduct(error.message))
    }
}

export const LoadingProduct = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_PRODUCT })
}

export const errorProduct = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_PRODUCT, payload: error })
}