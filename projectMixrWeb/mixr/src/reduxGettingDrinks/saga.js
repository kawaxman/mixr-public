import {
    SEARCH_BY_CATEGORY,
    SEARCH_BY_NAME,
    categorySearchSucceeded,
    categorySearchFailed,
    nameSearchSucceeded,
    nameSearchFailed
} from './actions'
import {
    STATUS_REQUESTED,
} from '../store/constants'
import {
    callFetchDrinksByIngredients,
    callFetchDrinksByName
} from '../MongoDBRealm/index'
import { takeLatest, all, call, put } from 'redux-saga/effects'

export function* fetchDrinksByCategory(inputtedCategories) {
    let input = inputtedCategories.categories
    let ingredientsArray = Object.values(input).filter((ingredient) => {
        if(ingredient !== ""){
            return ingredient
        }
    }).map((ingredient) => {return ingredient})
    try {
        const returnedDrinks = yield call(
            callFetchDrinksByIngredients,
            ingredientsArray
        )
        if(returnedDrinks.length > 0) {
            yield put(categorySearchSucceeded(returnedDrinks))
        }
        else if(returnedDrinks.length === 0) {
            yield put(categorySearchFailed(['No drinks were found containing the given ingredients']))
        }
    }
    catch (err){
        yield put(categorySearchFailed([err]))
    }
}

export function* fetchDrinksByName(inputtedName) {
    const drinkName = inputtedName.drinkName.name
    try {
        const returnedDrinks = yield call(
            callFetchDrinksByName,
            drinkName
        )
        if(returnedDrinks.length > 0) {
            yield put(nameSearchSucceeded(returnedDrinks))
        }
        else if(returnedDrinks.length === 0) {
            yield put(nameSearchFailed(['No drinks were found containing the given name']))
        }
    }
    catch (err){
        yield put(nameSearchFailed([err]))
    }
}

export default function* () {
    yield all([
        takeLatest(
            (action) => 
                action.status === STATUS_REQUESTED &&
                action.type === SEARCH_BY_NAME.fetch,
                fetchDrinksByName
        ),
        takeLatest(
            (action) => 
                action.status === STATUS_REQUESTED &&
                action.type === SEARCH_BY_CATEGORY.fetch,
                fetchDrinksByCategory
        ),
    ])
}