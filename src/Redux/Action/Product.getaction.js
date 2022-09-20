import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Base_url } from '../../Base_URI/Base_url'
import { db, storage } from '../../firebase';
import * as ActionTypes from '../ActionTypes'

export const GetProduct = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "Product"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        });
        console.log(data);
        dispatch({ type: ActionTypes.PRODUCT_GETDATA, payload: data })
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

export const addProduct = (data) => async (dispatch) => {
    console.log(data);

    try {
        const rendomNumber = Math.floor(Math.random() * 10000000).toString()
        const ProductRef = ref(storage, 'Product/' + rendomNumber);
        uploadBytes(ProductRef, data.profile_img)
            .then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(ref(storage, snapshot.ref))
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "Product"), {
                            ...data,
                            profile_img: url,
                            fileName: rendomNumber
                        });
                        dispatch({
                            type: ActionTypes.ADD_PRODUCT, payload:
                            {
                                id: docRef.id,
                                ...data,
                                profile_img: url,
                                fileName: rendomNumber
                            }
                        })

                    })
            });

        // const docRef = await addDoc(collection(db, "Product"), data);
        // console.log("Document written with ID: ", docRef.id);
        // dispatch({ type: ActionTypes.ADD_PRODUCT, payload: { id: docRef.id, ...data } })
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

export const deleteProduct = (data) => async (dispatch) => {
    try {
        console.log(data);

        const productRef = ref(storage, 'Product/' + data.fileName);
        deleteObject(productRef)
            .then(async () => {
                await deleteDoc(doc(db, "Product", data.id));
                dispatch({ type: ActionTypes.DELETE_PRODUCT, payload: data.id })
            }).catch((error) => {
                dispatch(errorProduct(error.message))
            });


        // await deleteDoc(doc(db, "Product", id));
        // dispatch({ type: ActionTypes.DELETE_PRODUCT, payload: id })



        // fetch(Base_url + 'products/' + id, {
        //     method: 'DELETE'
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
        //     .then(dispatch({ type: ActionTypes.DELETE_PRODUCT, payload: id }))
        //     .catch((error) => dispatch(errorProduct(error.message)))

    } catch (error) {
        dispatch(errorProduct(error.message))
    }
}

export const updateProduct = (data) => async (dispatch) => {
    console.log(data);
    try {
        const ProductRef = doc(db, "Product", data.id);

        if (typeof data.profile_img === "string") {

            await updateDoc(ProductRef, {
                name: data.name,
                quantity: data.quantity,
                price: data.price
            });
            dispatch({ type: ActionTypes.UPDATE_PRODUCT, payload: data })
        } else {
            console.log("change image");
            const delProductRef = ref(storage, 'Product/' + data.fileName);
            const rendomNumber = Math.floor(Math.random() * 10000000).toString()
            const insProductRef = ref(storage, 'Product/' + rendomNumber);

            deleteObject(delProductRef)   //1
                .then(async () => {
                    uploadBytes(insProductRef, data.profile_img) //2
                        .then((snapshot) => {
                            getDownloadURL(ref(storage, snapshot.ref))  //3
                                .then(async (url) => {
                                    console.log(url);
                                    await updateDoc(ProductRef, {  //4
                                        name: data.name,
                                        quantity: data.quantity,
                                        price: data.price,
                                        profile_img: url,
                                        fileName: rendomNumber
                                    });
                                    //5
                                    dispatch({
                                        type: ActionTypes.UPDATE_PRODUCT, payload: {
                                            ...data,
                                            profile_img: url,
                                            fileName: rendomNumber
                                        }
                                    })
                                })
                        })
                })

        }

        // fetch(Base_url + 'products/' + data.id, {
        //     method: 'PUT',
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
        //         dispatch({ type: ActionTypes.UPDATE_PRODUCT, payload: data });
        //     })
        //     .catch((error) => dispatch(errorProduct(error.message)))

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