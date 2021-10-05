import { all, call, put , takeLatest } from 'redux-saga/effects';
import { DRINK_UPLOAD_ACTIONS, 
         DRINK_FETCH_ACTIONS, 
         UploadDrinkFailed, 
         UploadDrinkSucceeded, 
         GetDrinkFailed, 
         GetDrinkSucceeded,
         GetPreviousSucceeded,
         GetPreviousFailed
} from './actions';
import { STATUS_REQUESTED } from '../store/constants';
import { callUploadDrinksStitch, callFetchDrinkById } from '../MongoDBRealm';

export function* uploadNewDrink(drinkInfo) {
    const description = drinkInfo.drinkInfo.drinkDesc
    const name = drinkInfo.drinkInfo.drinkName
    const ingredients = drinkInfo.drinkInfo.ingredients
    const userId = drinkInfo.drinkInfo.uID.toString()
    const image = drinkInfo.drinkInfo.image
    try {
        const drinkToUpload = yield call(
            callUploadDrinksStitch,
            name,
            ingredients,
            description,
            userId,
            image
        );
        if(drinkToUpload){
            yield put(UploadDrinkSucceeded(drinkToUpload))
        }
        else if(!drinkToUpload){
            yield put(UploadDrinkFailed(['The drink failed to upload. Please ensure that all fields were entered.']))
        }
    }
    catch(error) {
        yield put(UploadDrinkFailed([error]))
    }
}

export function* fetchDrink(drinkName) {
    try {
        const pulledDrink = yield call(
            fetchDrink,
            drinkName
        );
        if(pulledDrink){
            yield put(GetDrinkSucceeded(pulledDrink))
        }
        else if(pulledDrink){
            yield put(GetDrinkFailed(['This drink does not exist.']))
        }
    }
    catch(error) {
        yield put(GetDrinkFailed([error]))
    }
}

export function* fetchPreviousDrinks(userId) {
    const filteredId = userId.userId.toString()
    try {
        const returnedDrinks = yield call(
            callFetchDrinkById,
            filteredId
        )
        if(returnedDrinks.length > 0){
            yield put(GetPreviousSucceeded(returnedDrinks))
        }
        else if(returnedDrinks.length === 0){
            yield put(GetPreviousFailed(['This user has not previously uploaded a drink.']))
        }
    }
    catch (err) {
        yield put(GetPreviousFailed([err]))
    }
}

export default function* () {
    yield all([
        takeLatest(
            (action) => 
                action.type === DRINK_UPLOAD_ACTIONS.Create &&
                action.status === STATUS_REQUESTED,
                uploadNewDrink
        ),
        takeLatest(
            (action) => 
                action.type === DRINK_FETCH_ACTIONS.Fetch &&
                action.status === STATUS_REQUESTED,
                fetchDrink
        ),
        takeLatest(
            (action) => 
                action.type === DRINK_FETCH_ACTIONS.FetchPrev &&
                action.status === STATUS_REQUESTED,
                fetchPreviousDrinks
        )
    ])
}