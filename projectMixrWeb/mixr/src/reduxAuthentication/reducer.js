import { CLIENT_UPLOAD_ACTIONS, CLIENT_FETCH_ACTIONS, DELETE_STATE_ACTIONS } from './actions'
import { STATUS_FAILED, STATUS_REQUESTED, STATUS_SUCCEEDED } from '../store/constants';

export const initialState = {
    loadingFetchClient: false,
    loadingUploadClient: false,
    clientUploadSuccess: false, 
    loadingVerifyClient: false,
    authorizedClient: {},
    existingClient: {},
    errorFetch: [],
    errorUpload: [],
    nonexistentClient: []
}

export default function(state = initialState, action) {
    const { type, status } = action;
    switch (type) {
        case CLIENT_FETCH_ACTIONS.Fetch: {
            switch (status) {
                case STATUS_REQUESTED: {
                    return {
                        ...state,
                        loadingFetchClient: true,
                    };
                }
                case STATUS_SUCCEEDED: {
                    const { authorizedClient } = action
                    return {
                        ...state,
                        loadingFetchClient: false,
                        authorizedClient: authorizedClient,
                    };
                }
                case STATUS_FAILED: {
                    const { errorFetch } = action
                    return {
                        ...state,
                        loadingFetchClient: false,
                        errorFetch: errorFetch,
                    };
                }
            }
        }
        case CLIENT_FETCH_ACTIONS.Verify: {
            switch (status) {
                case STATUS_REQUESTED: {
                    return {
                        ...state,
                        loadingVerifyClient: false,
                    };
                }
                case STATUS_SUCCEEDED: {
                    const { existingClient } = action
                    return {
                        ...state,
                        loadingVerifyClient: true,
                        existingClient: existingClient,
                    };
                }
                case STATUS_FAILED: {
                    const { nonexistentClient } = action
                    return {
                        ...state,
                        loadingVerifyClient: true,
                        nonexistentClient: nonexistentClient,
                    };
                }
            }
        }
        case CLIENT_UPLOAD_ACTIONS.Create: {
            switch (status) {
                case STATUS_REQUESTED: {
                    return {
                        ...state,
                        loadingUploadClient: true,
                    };
                }
                case STATUS_SUCCEEDED: {
                    const { clientUploaded } = action
                    return {
                        ...state,
                        loadingUploadClient: false,
                        authorizedClient: clientUploaded,
                    };
                }
                case STATUS_FAILED: {
                    const { errorUpload } = action
                    return {
                        ...state,
                        loadingUploadClient: false,
                        errorUpload: errorUpload,
                    };
                }
            }
        }
        case DELETE_STATE_ACTIONS.Delete: {
            switch(status) {
                case STATUS_REQUESTED: {
                    return {
                        ...state,
                        errorFetch: []
                    };
                }
            }
        }
        default: {
            return state
        }
    }
}