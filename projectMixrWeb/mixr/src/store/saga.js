import { all, call } from 'redux-saga/effects'
import authenticationSaga from '../reduxAuthentication/saga'
import uploadDrinksSaga from '../ReduxDrinks/saga'
import fetchDrinksSaga from '../reduxGettingDrinks/saga'
import uploadProfileSaga from '../reduxUpdateProfile/saga'

//Place all pathways to saga functions in here
export default function* rootSagaFunction() {
    yield all([
        call(authenticationSaga),
        call(uploadDrinksSaga),
        call(fetchDrinksSaga),
        call(uploadProfileSaga)
    ]);
}