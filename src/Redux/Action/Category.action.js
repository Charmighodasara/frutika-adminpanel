import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Base_url } from '../../Base_URI/Base_url'
import { db, storage } from '../../firebase';
import * as ActionTypes from '../ActionTypes'

export const GetCategory = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "Category"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        });
        console.log(data);
        dispatch({ type: ActionTypes.GETDATA_CATEGORY, payload: data })

    } catch (error) {
        dispatch(errorProduct(error.message));
    }
}

export const addCategory = (data) => async (dispatch) => {
    console.log(data);

    try {
        const rendomNum = Math.floor(Math.random() * 10000000).toString()
        const CategoryRef = ref(storage, 'Category/' + rendomNum);

        uploadBytes(CategoryRef, data.profile_img)
            .then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(ref(storage, snapshot.ref))
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "Category"), {
                            ...data,
                            profile_img: url,
                            fileName: rendomNum
                        });
                        dispatch({
                            type: ActionTypes.ADD_CATEGORY, payload:
                            {
                                id: docRef.id,
                                ...data,
                                profile_img: url,
                                fileName: rendomNum
                            }
                        })
                    })
            });

    } catch (error) {
        dispatch(errorProduct(error.message))
    }
}

export const deleteCategory = (data) => async (dispatch) => {
    try {
        console.log(data);

        const CategoryRef = ref(storage, 'Category/' + data.fileName);
        deleteObject(CategoryRef)
            .then(async () => {
                await deleteDoc(doc(db, "Category", data.id));
                dispatch({ type: ActionTypes.DELETE_CATEGORY, payload: data.id })
            }).catch((error) => {
                dispatch(errorProduct(error.message))
            });

    } catch (error) {
        dispatch(errorProduct(error.message))
    }
}

export const updateCategory = (data) => async (dispatch) => {
    console.log(data);
    try {
        const CategoryRef = doc(db, "Category", data.id);

        if (typeof data.profile_img === "string") {
            await updateDoc(CategoryRef, {
                name: data.name
            });
            dispatch({ type: ActionTypes.UPDATE_CATEGORY, payload: data })
        } else {
            console.log("image change");

            const DelCategoryRef = ref(storage, 'Category/' + data.fileName);
            const rendomNum = Math.floor(Math.random() * 10000000).toString()
            const insCategoryRef = ref(storage, 'Category/' + rendomNum);
            deleteObject(DelCategoryRef)
                .then(async () => {
                    uploadBytes(insCategoryRef, data.profile_img)
                        .then((snapshot) => {
                            console.log('Uploaded a blob or file!');
                            getDownloadURL(ref(storage, snapshot.ref))
                                .then(async (url) => {
                                    console.log(url);
                                    await updateDoc(CategoryRef, {
                                        name: data.name,
                                        profile_img: url,
                                        fileName: rendomNum
                                    });
                                    dispatch({
                                        type: ActionTypes.UPDATE_CATEGORY, payload: {
                                            ...data,
                                            profile_img: url,
                                            fileName: rendomNum
                                        }
                                    })

                                })
                        })
                })

        }

    } catch (error) {
        dispatch(errorProduct(error.message))
    }
}

export const errorProduct = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_PRODUCT, payload: error })
}