
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import * as ActionTypes from '../ActionTypes'

export const GetCategory = () => async (dispatch) => {
    try {
        // const querySnapshot = await getDocs(collection(db, "Category"));
        // let data = []

        // querySnapshot.forEach((doc) => {
        //     data.push({id:doc.id, ...doc.data()})
        //     console.log(`${doc.id} => ${doc.data()}`);
        // });
        
        // dispatch({type: ActionTypes.GETDATA_CATEGORY , payload: data })
        // console.log(data);

    } catch (error) {
        dispatch(errorCategoty(error.message))
    }

}

export const addCategory = (data) => async (dispatch) => {

    try {
        console.log(data);
        // const docRef = await addDoc(collection(db, "Category"), data);
        // console.log("Document written with ID: ", { id: docRef.id, ...data });
        // dispatch({ type: ActionTypes.ADD_CATEGORY, payload: { id: docRef.id, ...data } })

    } catch (error) {
        dispatch(errorCategoty(error.message))
    }

}


export const errorCategoty = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_CATEGORY, payload: error })
}