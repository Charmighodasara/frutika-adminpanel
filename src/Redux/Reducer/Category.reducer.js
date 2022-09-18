import * as ActionTypes from '../ActionTypes'

const initVal = {
    isLoading: false,
    categoty: [],
    error: ''
}

export const categoryReducer = (state = initVal, action) => {
    switch (action.type) {
        case ActionTypes.GETDATA_CATEGORY:
            return {
                ...state,
                isLoading: false,
                categoty: action.payload,
                error: ''
            }
        case ActionTypes.ERROR_CATEGORY:
            return {
                ...state,
                isLoading: false,
                categoty: [],
                error: action.payload
            }
        case ActionTypes.ADD_CATEGORY:
            return {
                ...state,
                isLoading: false,
                categoty: state.categoty.concat(action.payload),
                error: ''
            }
        default:
            return state;
    }
}