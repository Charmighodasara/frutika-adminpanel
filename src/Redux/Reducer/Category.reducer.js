import * as ActionTypes from '../ActionTypes'

const initval = {
    category: [],
    error: ''
}

export const categoryReducer = (state = initval, action) => {
    switch (action.type) {
        case ActionTypes.GETDATA_CATEGORY:
            return {
                ...state,
                category: action.payload,
                error: ''
            }
        case ActionTypes.ERROR_CATEGORY:
            return {
                ...state,
                category: [],
                error: action.payload
            }
        case ActionTypes.ADD_CATEGORY:
            return {
                ...state,
                category: state.category.concat(action.payload),
                error: ''
            }

        default:
            return state;
    }

}