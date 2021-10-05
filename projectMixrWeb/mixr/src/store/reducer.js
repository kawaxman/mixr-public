import { combineReducers } from 'redux'
import authentication from '../reduxAuthentication/reducer'
import uploadDrinks from '../ReduxDrinks/reducer'
import fetchDrinks from '../reduxGettingDrinks/reducer'
import profileData from '../reduxUpdateProfile/reducer'

//Place all reducer file paths in here to ensure that they are tracked in store
export default combineReducers({
    authentication,
    uploadDrinks,
    fetchDrinks,
    profileData
})