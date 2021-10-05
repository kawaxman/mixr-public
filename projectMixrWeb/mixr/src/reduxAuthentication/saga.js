import { all, call, put , takeLatest } from 'redux-saga/effects';
import { CLIENT_UPLOAD_ACTIONS, 
         CLIENT_FETCH_ACTIONS, 
         UploadClientFailed, 
         UploadClientSucceeded, 
         GetClientFailed, 
         GetClientSucceeded ,
         VerifyClientRequested,
         VerifyClientSucceeded,
         VerifyClientFailed
} from './actions';
import { STATUS_REQUESTED } from '../store/constants';
import { callPullClientStitch, callCreateClientStitch } from '../MongoDBRealm';

export function* uploadNewUser(clientInfo) {
    const username = clientInfo.clientInfo.Username
    const password = clientInfo.clientInfo.Password
    const firstname = clientInfo.clientInfo.FirstName
    const lastname = clientInfo.clientInfo.LastName
    const email = clientInfo.clientInfo.Email
    try {
        const userToUpload = yield call(
            callCreateClientStitch,
            username,
            password,
            firstname,
            lastname,
            email
        );
        if(userToUpload){
            yield put(UploadClientSucceeded(userToUpload))
        }
        else if(!userToUpload){
            yield put(UploadClientFailed(['The client failed to upload. Please ensure that all fields were entered.']))
        }
    }
    catch(error) {
        console.log(error)
        yield put(UploadClientFailed([error]))
    }
}

export function* fetchUser(inputInfo) {
    const username = inputInfo.clientInfo.Username;
    const password = inputInfo.clientInfo.Password;
    try {
        const pulledUser = yield call(
            callPullClientStitch,
            username,
            password
        );
        console.log(pulledUser)
        if(pulledUser.length > 0){
            yield put(GetClientSucceeded(pulledUser))
        }
        else if(pulledUser.length === 0){
            yield put(GetClientFailed(['This client does not exist.']))
        }
    }
    catch(error) {
        console.log(error)
        yield put(GetClientFailed([error]))
    }
}

export function* verifyUser(uploadInfo) {
    const username = uploadInfo.uploadInfo.Username;
    const password = uploadInfo.uploadInfo.Password;
    try {
        const didFetch = yield call(
            callPullClientStitch,
            username,
            password
        );
        if(didFetch.length > 0){
            yield put(VerifyClientSucceeded(didFetch))
        }
        else if(didFetch.length === 0){
            yield put(VerifyClientFailed(['This client does not already exist']))
        }
    }
    catch(error) {
        console.log(error)
        yield put(VerifyClientFailed([error]))
    }
}

export default function* () {
    yield all([
        takeLatest(
            (action) => 
                action.type === CLIENT_UPLOAD_ACTIONS.Create &&
                action.status === STATUS_REQUESTED,
                uploadNewUser
        ),
        takeLatest(
            (action) => 
                action.type === CLIENT_FETCH_ACTIONS.Fetch &&
                action.status === STATUS_REQUESTED,
                fetchUser
        ),
        takeLatest(
            (action) =>
                action.type === CLIENT_FETCH_ACTIONS.Verify &&
                action.status === STATUS_REQUESTED,
                verifyUser
        )
    ])
}