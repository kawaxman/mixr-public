import { STATUS_REQUESTED, STATUS_SUCCEEDED, STATUS_FAILED } from '../store/constants';

export const CHANGE_DETAILS_ACTION = {
    Upload: '[Client Profile Upload] Changing Profile Info'
}

export function uploadNewProfileDataRequested(uploadObject) {
    return {
        status: STATUS_REQUESTED,
        type: CHANGE_DETAILS_ACTION.Upload,
        uploadObject
    }
}

export function uploadNewProfileDataSucceeded(updateConfirmed) {
    return {
        status: STATUS_SUCCEEDED,
        type: CHANGE_DETAILS_ACTION.Upload,
        updateConfirmed
    }
}

export function uploadNewProfileDataFailed(updateError) {
    return {
        status: STATUS_FAILED,
        type: CHANGE_DETAILS_ACTION.Upload,
        updateError
    }
}