import { put, takeLatest, call, all } from 'redux-saga/effects';
import { STATUS_REQUESTED } from '../store/constants';
import {
    CHANGE_DETAILS_ACTION,
    uploadNewProfileDataFailed,
    uploadNewProfileDataSucceeded
} from './actions'
import { callUpdateProfileData } from '../MongoDBRealm/index'

export function* uploadNewData(uploadObject) {
    console.log('refetch?')
    const userId = uploadObject.uploadObject.userId.toString();
    const field = uploadObject.uploadObject.field;
    const newInfo = uploadObject.uploadObject.newInfo;
    try {
        const uploadSucceeded = yield call(
            callUpdateProfileData,
            field,
            newInfo,
            userId
        )
        console.log(uploadSucceeded)
        if(uploadSucceeded){
            yield put(uploadNewProfileDataSucceeded(uploadSucceeded))
        }
        else if(!uploadSucceeded){
            yield put(uploadNewProfileDataFailed(['This information was not able to be uploaded.']))
        }
    }
    catch (err){
        yield put(uploadNewProfileDataFailed([err]))
    }
}

export default function* () {
    yield all([
        takeLatest(
            (action) => 
                action.status === STATUS_REQUESTED &&
                action.type === CHANGE_DETAILS_ACTION.Upload,
                uploadNewData
        )
    ])
}