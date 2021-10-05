import { STATUS_FAILED, STATUS_REQUESTED, STATUS_SUCCEEDED } from '../store/constants';
import {
    SEARCH_BY_NAME,
    SEARCH_BY_CATEGORY
} from './actions'

export const initialState = {
    namedDrinksArr: [],
    categoryDrinksArr: [],
    loadingNamedDrinks: false,
    loadingCategoryDrinks: false,
    nameErrors: [],
    categoryErrors: []
}

export default function(state = initialState, action) {
    const { status, type } = action;
    switch(type) {
        case SEARCH_BY_CATEGORY.fetch: {
            switch(status) {
                case STATUS_REQUESTED: {
                    return {
                        ...state,
                        loadingCategoryDrinks: true
                    }
                }
                case STATUS_SUCCEEDED: {
                    const { drinksArray } = action
                    return {
                        ...state,
                        loadingCategoryDrinks: false,
                        categoryDrinksArr: drinksArray
                    }
                }
                case STATUS_FAILED: {
                    const { errors } = action
                    return {
                        ...state,
                        loadingCategoryDrinks: false,
                        categoryErrors: errors
                    }
                }
            }
        }
        case SEARCH_BY_NAME.fetch: {
            switch(status) {
                case STATUS_REQUESTED: {
                    return {
                        ...state,
                        loadingNamedDrinks: true
                    }
                }
                case STATUS_SUCCEEDED: {
                    const { drinksArray } = action
                    return {
                        ...state,
                        loadingNamedDrinks: false,
                        namedDrinksArr: drinksArray
                    }
                }
                case STATUS_FAILED: {
                    const { errors } = action
                    return {
                        ...state,
                        loadingNamedDrinks: false,
                        nameErrors: errors
                    }
                }
            }
        }
        default: {
            return state
        } 
    }
}