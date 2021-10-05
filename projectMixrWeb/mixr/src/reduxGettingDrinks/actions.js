import { STATUS_FAILED, STATUS_REQUESTED, STATUS_SUCCEEDED } from '../store/constants';

export const SEARCH_BY_CATEGORY = {
    fetch: '[Drink Search] Searching By Category'
}

export const SEARCH_BY_NAME = {
    fetch: '[Drink Search] Searching By Name'
}

export function categorySearchRequested(categories) {
    return {
        status: STATUS_REQUESTED,
        type: SEARCH_BY_CATEGORY.fetch,
        categories
    }
}

export function categorySearchSucceeded(drinksArray) {
    return {
        status: STATUS_SUCCEEDED,
        type: SEARCH_BY_CATEGORY.fetch,
        drinksArray
    }
}

export function categorySearchFailed(errors) {
    return {
        status: STATUS_FAILED,
        type: SEARCH_BY_CATEGORY.fetch,
        errors
    }
}

export function nameSearchRequested(drinkName) {
    return {
        status: STATUS_REQUESTED,
        type: SEARCH_BY_NAME.fetch,
        drinkName
    }
}

export function nameSearchSucceeded(drinksArray) {
    return {
        status: STATUS_SUCCEEDED,
        type: SEARCH_BY_NAME.fetch,
        drinksArray
    }
}

export function nameSearchFailed(errors) {
    return {
        status: STATUS_FAILED,
        type: SEARCH_BY_NAME.fetch,
        errors
    }
}