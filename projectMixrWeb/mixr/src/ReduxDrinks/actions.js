import { STATUS_FAILED, STATUS_REQUESTED, STATUS_SUCCEEDED } from '../store/constants';

export const DRINK_UPLOAD_ACTIONS = {
    Create: '[Drink Upload] Create Drink'
};

export const DRINK_FETCH_ACTIONS = {
    Fetch: '[Drink Fetch] Fetch Drink',
    FetchPrev: '[Drink Fetch] Fetching Previous Drinks'
};

export function UploadDrinksRequested(drinkInfo) {
    return {
        type: DRINK_UPLOAD_ACTIONS.Create,
        status: STATUS_REQUESTED,
        drinkInfo,
    }
}

export function UploadDrinkSucceeded(drinkUploadSuccess) {
    return {
        type: DRINK_UPLOAD_ACTIONS.Create,
        status: STATUS_SUCCEEDED,
        drinkUploadSuccess,
    }
}

export function UploadDrinkFailed(errorUpload) {
    return {
        type: DRINK_UPLOAD_ACTIONS.Create,
        status: STATUS_FAILED,
        errorUpload,
    }
}

export function GetDrinkRequested(drinkName) {
    return {
        type: DRINK_FETCH_ACTIONS.Fetch,
        status: STATUS_REQUESTED,
        drinkName,
    }
}

export function GetDrinkSucceeded(drinkFound) {
    return {
        type: DRINK_FETCH_ACTIONS.Fetch,
        status: STATUS_SUCCEEDED,
        drinkFound,
    }
}

export function GetDrinkFailed(errorFetch) {
    return {
        type: DRINK_FETCH_ACTIONS.Fetch,
        status: STATUS_FAILED,
        errorFetch,
    }
}

export function GetPreviousRequested(userId) {
    return {
        type: DRINK_FETCH_ACTIONS.FetchPrev,
        status: STATUS_REQUESTED,
        userId,
    }
}

export function GetPreviousSucceeded(prevDrinks) {
    return {
        type: DRINK_FETCH_ACTIONS.FetchPrev,
        status: STATUS_SUCCEEDED,
        prevDrinks,
    }
}

export function GetPreviousFailed(errorPrev) {
    return {
        type: DRINK_FETCH_ACTIONS.FetchPrev,
        status: STATUS_FAILED,
        errorPrev,
    }
}