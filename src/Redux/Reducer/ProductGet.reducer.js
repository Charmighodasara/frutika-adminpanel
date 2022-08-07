import * as ActionTypes from '../ActionTypes'

const initVal = {
    isLoading: false,
    product: [],
    error: ''
}

export const productReducer = (state = initVal, action) => {
    switch (action.type) {
        case ActionTypes.PRODUCT_GETDATA:
            return {
                ...state,
                isLoading: false,
                product: action.payload,
                error: ''
            }
        case ActionTypes.ERROR_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: [],
                error: action.payload
            }
        case ActionTypes.ADD_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: state.product.concat(action.payload),
                error: ''
            }
        case ActionTypes.DELETE_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: state.product.filter((p) => p.id !== action.payload),
                error: ''
            }
        case ActionTypes.UPDATE_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: state.product.map((p) => {
                    if (p.id === action.payload.id) {
                        return action.payload
                    } else {
                        return p
                    }
                }),
                error: ''
            }
        case ActionTypes.LOADING_PRODUCT:
            return {
                ...state,
                isLoading: true,
                error: ''
            }

        default:
            return state;
    }
}