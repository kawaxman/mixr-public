import { STATUS_FAILED, STATUS_REQUESTED, STATUS_SUCCEEDED } from '../store/constants';
import {
    CHANGE_DETAILS_ACTION
} from './actions'

export const initialState = {
    loadingNewUpload: false,
    updateConfirmed: {},
    updateError: []
}

export default function(state = initialState, action) {
    const { status, type } = action;
    switch(type) {
        case CHANGE_DETAILS_ACTION.Upload: {
            switch(status) {
                case STATUS_REQUESTED: {
                    return {
                        ...state,
                        loadingNewUpload: true
                    }
                }
                case STATUS_SUCCEEDED: {
                    const { updateConfirmed } = action
                    return {
                        ...state,
                        loadingNewUpload: false,
                        updateConfirmed: updateConfirmed
                    }
                }
                case STATUS_FAILED: {
                    const { updateError } = action
                    return {
                        ...state,
                        loadingNewUpload: false,
                        updateError: updateError
                    }
                }
            }
        }
        default: {
            return state
        } 
    }
}