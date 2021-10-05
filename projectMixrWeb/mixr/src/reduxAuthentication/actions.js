import { STATUS_FAILED, STATUS_REQUESTED, STATUS_SUCCEEDED } from '../store/constants';

export const CLIENT_UPLOAD_ACTIONS = {
    Create: '[Client Upload] Create Client'
};

export const CLIENT_FETCH_ACTIONS = {
    Fetch: '[Client Fetch] Fetch Client',
    Verify: '[Client Fetch] Verify Unique Input Info'
};

export const DELETE_STATE_ACTIONS = {
    Delete: '[Error Delete] Delete Local Error'
}

export function UploadClientRequested(clientInfo) {
    return {
        type: CLIENT_UPLOAD_ACTIONS.Create,
        status: STATUS_REQUESTED,
        clientInfo,
    }
}

export function UploadClientSucceeded(clientUploaded) {
    return {
        type: CLIENT_UPLOAD_ACTIONS.Create,
        status: STATUS_SUCCEEDED,
        clientUploaded,
    }
}

export function UploadClientFailed(errorUpload) {
    return {
        type: CLIENT_UPLOAD_ACTIONS.Create,
        status: STATUS_FAILED,
        errorUpload,
    }
}

export function GetClientRequested(clientInfo) {
    return {
        type: CLIENT_FETCH_ACTIONS.Fetch,
        status: STATUS_REQUESTED,
        clientInfo,
    }
}

export function GetClientSucceeded(authorizedClient) {
    return {
        type: CLIENT_FETCH_ACTIONS.Fetch,
        status: STATUS_SUCCEEDED,
        authorizedClient,
    }
}

export function GetClientFailed(errorFetch) {
    return {
        type: CLIENT_FETCH_ACTIONS.Fetch,
        status: STATUS_FAILED,
        errorFetch,
    }
}

export function VerifyClientRequested(uploadInfo) {
    return {
        type: CLIENT_FETCH_ACTIONS.Verify,
        status: STATUS_REQUESTED,
        uploadInfo,
    }
}

export function VerifyClientSucceeded(existingClient) {
    return {
        type: CLIENT_FETCH_ACTIONS.Verify,
        status: STATUS_SUCCEEDED,
        existingClient,
    }
}

export function VerifyClientFailed(nonexistentClient) {
    return {
        type: CLIENT_FETCH_ACTIONS.Verify,
        status: STATUS_FAILED,
        nonexistentClient,
    }
}

export function clearErrors() {
    return {
        type: DELETE_STATE_ACTIONS.Delete,
        status: STATUS_REQUESTED,
    }
}