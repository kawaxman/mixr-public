import { DRINK_UPLOAD_ACTIONS, DRINK_FETCH_ACTIONS } from './actions'
import { STATUS_FAILED, STATUS_REQUESTED, STATUS_SUCCEEDED } from '../store/constants';

export const initialState = {
    loadingFetchDrink: false,
    loadingUploadDrink: false,
    loadingFetchPrev: false,
    DrinkUploadSuccess: false, 
    prevDrinks: [],
    drinkFound: [],
    errorFetch: [],
    errorUpload: [],
    errorPrev: [],
}

export default function(state = initialState, action) {
    const { type, status } = action;
    switch (type) {
        case DRINK_FETCH_ACTIONS.Fetch: {
            switch (status) {
                case STATUS_REQUESTED: {
                    return {
                        ...state,
                        loadingFetchDrink: true,
                    };
                }
                case STATUS_SUCCEEDED: {
                    const { drinkFound } = action
                    return {
                        ...state,
                        loadingFetchDrink: false,
                        drinkFound: drinkFound,
                    };
                }
                case STATUS_FAILED: {
                    const { errorFetch } = action
                    return {
                        ...state,
                        loadingFetchDrink: false,
                        errorFetch: errorFetch,
                    };
                }
            }
        }
        case DRINK_FETCH_ACTIONS.FetchPrev: {
            switch (status) {
                case STATUS_REQUESTED: {
                    return {
                        ...state,
                        loadingFetchPrev: true,
                    };
                }
                case STATUS_SUCCEEDED: {
                    const { prevDrinks } = action
                    return {
                        ...state,
                        loadingFetchPrev: false,
                        prevDrinks: prevDrinks,
                    };
                }
                case STATUS_FAILED: {
                    const { errorPrev } = action
                    return {
                        ...state,
                        loadingFetchPrev: false,
                        errorPrev: errorPrev,
                    };
                }
            }
        }
        case DRINK_UPLOAD_ACTIONS.Create: {
            switch (status) {
                case STATUS_REQUESTED: {
                    return {
                        ...state,
                        loadingUploadDrink: true,
                    };
                }
                case STATUS_SUCCEEDED: {
                    const { drinkUploadSuccess } = action
                    return {
                        ...state,
                        loadingUploadDrink: false,
                        drinkUploadSuccess: drinkUploadSuccess,
                    };
                }
                case STATUS_FAILED: {
                    const { errorUpload } = action
                    return {
                        ...state,
                        loadingUploadDrink: false,
                        errorUpload: errorUpload,
                    };
                }
            }
        }
        default: {
            return state
        }
    }
}