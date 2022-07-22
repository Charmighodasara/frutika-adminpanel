
import * as ActionTypes from "../ActionTypes"
export const increment = ()=> (dispach)=> {
    dispach({type : ActionTypes.INCREMENT_COUNTER})
}
export const decrement = ()=> (dispach)=> {
    dispach({type : ActionTypes.DEREMENT_COUNTER})
}